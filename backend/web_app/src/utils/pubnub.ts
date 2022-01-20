import { authActions } from 'app/sharedSlice/auth/slice';
import { pubnubInternalActions } from 'app/sharedSlice/pubnubInternal/slice';
import { getPubnubProviderState, store } from 'index';
import { MessageFragment } from 'app/pages/Chat/MessageListItem';
import uniq from 'lodash/uniq';

import groupBy from 'lodash/groupBy';
export const registerUserOnPubnub = async (loggedUser: any) => {
  const { email, id, name } = loggedUser;
  const pubnub = getPubnubProviderState().pubnub;
  const user = await pubnub.objects.setUUIDMetadata({
    uuid: `${id}`,
    data: {
      name,
      email,
    },
  });
  return user;
};
export const sendMessage = async (message, channel) => {
  const currentUserId = store.getState().auth.pubbunUserId;
  const pubnub = getPubnubProviderState().pubnub;
  const response = await pubnub.publish({
    channel,
    message: {
      text: message,
      senderId: currentUserId,
      // @ts-ignore
      createdAt: Date(Date.now()),
    },
  });

  return response;
};
export const fetchMessages = async (channel, count = 100) => {
  const pubnub = getPubnubProviderState().pubnub;
  const response = await pubnub.fetchMessages({
    channels: [channel],
    count,
  });

  const responseMsgs = response.channels[channel];
  if (responseMsgs?.length > 0) {
    responseMsgs.forEach(msg => {
      const { timetoken, message } = msg;

      const messagePayload = {
        message: {
          senderId: message?.senderId,
          type: message.type || 'text',
          text: message.text,
          ...message,
        },
        channel: channel,
        subscription: null,
        actualChannel: null,
        timetoken: timetoken,
        publisher: message?.senderId,
      };
      store.dispatch({
        type: 'pubnub/MESSAGE_RECEIVED',
        payload: messagePayload,
      });
    });
  }
  return response;
};
export const fetchMemberships = async uuid => {
  const pubnub = getPubnubProviderState().pubnub;

  const membershipRequest = {
    uuid,
    include: {
      channelFields: true,
      customChannelFields: true,
      customFields: true,
      totalCount: true,
    },
  };
  const channels = await pubnub.objects.getMemberships(membershipRequest);

  store.dispatch({
    type: 'pubnub/MEMBERSHIPS_RETRIEVED',
    payload: {
      request: membershipRequest,
      response: channels,
      status: {
        error: false,
        operation: 'PNGetMembershipsOperation',
        statusCode: 200,
      },
    },
  });

  return channels;
};
export const updateChatStatus = async (uuid, chatStatus, userId) => {
  const pubnub = getPubnubProviderState().pubnub;

  const previousChannelData = await pubnub.objects.getChannelMetadata({
    channel: uuid,
  });
  await pubnub.objects.setChannelMetadata({
    channel: previousChannelData?.data.id,
    data: {
      custom: {
        ...previousChannelData?.data?.custom,
        chatStatus, //PENDING , IGNORED , ACCEPTED ,
      },
    },
    include: {
      customFields: true,
    },
  });
  await fetchMemberships(userId);
  if (chatStatus === 'ACCEPTED') {
    await sendMessage('Accepted', uuid);
  }
};
export const initializePubnunbChat = async loggedUser => {
  const { email, id, name } = loggedUser;
  const pubnub = getPubnubProviderState().pubnub;

  const pubnubUid = `${id}`;
  console.log('🚀 ~ file: pubnub.ts ~ line 129 ~ pubnubUid', pubnubUid);

  const previousChannelData = await pubnub.objects.getChannelMetadata({
    channel: 'direct_11_4',
  });
  console.log(
    '🚀 ~ file: pubnub.ts ~ line 95 ~ previousChannelData',
    previousChannelData,
  );
  store.dispatch(authActions.setPubbunUserId(pubnubUid));
  const userId = pubnubUid;
  const userChannels = await pubnub.objects.getMemberships({
    uuid: userId,
    include: {
      channelFields: true,
      customChannelFields: true,
      customFields: true,
      totalCount: true,
    },
  });

  let channelUserList: string[] = [];
  userChannels?.data?.forEach(elem => {
    channelUserList.push(elem?.channel?.custom?.userOne);
    channelUserList.push(elem?.channel?.custom?.userTwo);
  });
  channelUserList = uniq(channelUserList);

  const uuid = userId;
  pubnub.setUUID(uuid);
  pubnub.subscribe({
    channels: [uuid],
    // withPresence: true,
  });

  let channels = await fetchMemberships(uuid);
  console.log('🚀 ~ file: pubnub.ts ~ line 157 ~ channels', channels);
  const conversationChannels = channels.data
    .map(membership => {
      if (membership.channel.id.includes('direct')) {
        return membership.channel.id;
      }
    })
    .filter(channel => channel);
  await pubnub.subscribe({
    channels: conversationChannels,
    // withPresence: true,
  });

  if (conversationChannels.length > 0) {
    let channelMessages = await pubnub.fetchMessages({
      channels: conversationChannels,
      count: 1,
    });

    channelMessages = channelMessages.channels;

    for (const key of Object.keys(channelMessages)) {
      const element = channelMessages[key][0];
      const messagePayload = {
        message: element.message,
        channel: element.channel,
        subscription: null,
        actualChannel: null,
        timetoken: element.timetoken,
        publisher: element.message.senderId,
      };
      store.dispatch({
        type: 'pubnub/MESSAGE_RECEIVED',
        payload: messagePayload,
      });
    }

    const userInfoPromises = channelUserList.map(elem => {
      return pubnub.objects.getUUIDMetadata({
        uuid: elem,
      });
    });
    const info = await Promise.allSettled(userInfoPromises);

    info.map(elem => {
      if (elem.status === 'fulfilled') {
        const userInfo = elem.value.data;
        store.dispatch(pubnubInternalActions.setUserList(userInfo));
      }
    });
    // sendMessage('hi', 'direct_11_4');
  }
};

export const groupByMessages = (messages: MessageFragment[]) => {
  const groupedMessages = groupBy(messages, msg => msg.date);
  return groupedMessages;
};

export const getInitialsOfName = (name: string) => {
  const names = name.split(' ');
  const initials = names.map(n => n.charAt(0)).join('');
  return initials;
};
