/**
 *
 * ZoomMeeting
 *
 */
import Header from 'app/components/AppBar';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import ZoomMtgEmbedded from '@zoomus/websdk/embedded';
import { useParams } from 'react-router-dom';
import { BookingType } from 'app/sharedSlice/booking/slice/types';
import { useSelector } from 'react-redux';
import { selectBooking } from 'app/sharedSlice/booking/slice/selectors';
import { selectAuth } from 'app/sharedSlice/auth/slice/selectors';
import { LoadingIndicatorPage } from 'app/components/LoadingIndicator';
import { request } from 'utils/request';
import Iframe from 'react-iframe';
import styled from 'styled-components/macro';
import { FlexDiv } from 'app/components/FlexDiv';
import { ProblemInfoForm } from './ProblemInfoForm';
import zoomHtml from './zoommeeting.html';
import { ZOOM_JWT_API_KEY } from '../../../constants';
// c __html = require('./zoommeeting.html.js');

// import {}'./zoommeeting.html.js');
interface Props {}

export function ZoomMeeting(props: Props) {
  const [booking, setBooking] = useState<BookingType | null>();
  const { user } = useSelector(selectAuth);
  const [meetingLoading, setMeetingLoading] = useState(false);
  const [meetingCreds, setMeetingCreds] = useState<{
    meetingNumber: number;
    userName: string;
    userEmail: string;
    apiKey: string;
    meetingPassword: string;
    role: number;
    signature: string;
  }>();
  const params: { id?: string } = useParams();
  const { id } = params;
  const { bookingList } = useSelector(selectBooking);

  useEffect(() => {
    setMeetingLoading(true);
    const selectedBooking = bookingList?.find(
      elem => elem.id == parseInt(id || ''),
    );
    setBooking(selectedBooking);

    const creds = {
      meetingNumber: parseInt(selectedBooking?.meeting_id || '') || 0,
      apiKey: ZOOM_JWT_API_KEY || '',
      userName: user?.name,
      userEmail: user?.email,
      meetingPassword: selectedBooking?.meeting_password || '',
      role: 1,
      signature: '',
    };
    //temp url to get zoom signature untill we move to our django backend
    const tempSignatuureUrl = 'https://zoom-meeting-signature.herokuapp.com/';
    request(tempSignatuureUrl, 'POST', {
      meetingNumber: selectedBooking?.meeting_id,
      role: 1,
    }).then(data => {
      creds.signature = data?.signature;
      console.log('🚀 ~ file: index.tsx ~ line 71 ~ useEffect ~ creds', creds);
      // startMeeting(creds);
      setMeetingCreds(creds);
      setMeetingLoading(false);
    });
  }, [id]);

  function startMeeting(meetingConfig) {
    const client = ZoomMtgEmbedded.createClient();

    let meetingSDKElement =
      document.getElementById('meetingSDKElement') ?? undefined;

    client.init({
      debug: true,
      zoomAppRoot: meetingSDKElement,
      language: 'en-US',
      customize: {
        meetingInfo: [
          'topic',
          'host',
          'mn',
          'pwd',
          'telPwd',
          'invite',
          'participant',
          'dc',
          'enctype',
        ],
        toolbar: {
          buttons: [
            {
              text: 'Custom Button',
              className: 'CustomButton',
              onClick: () => {},
            },
          ],
        },
      },
    });

    client.join({
      apiKey: meetingConfig.apiKey,
      signature: meetingConfig.signature,
      meetingNumber: meetingConfig.meetingNumber,
      password: meetingConfig.meetingPassword,
      userName: meetingConfig.userName,
      userEmail: meetingConfig.userEmail,
    });
  }

  return (
    <>
      <Helmet>
        <title>Niivana Zoom Meeting</title>
        <meta name="description" content="Niivana Zoom Meeting" />
      </Helmet>

      <div>
        <Header />
        {meetingLoading && (
          <LoadingIndicatorPage
            height="70vh"
            loadingText="Loading Meeting..."
          />
        )}

        {!meetingLoading && meetingCreds && (
          <FlexDiv justifyContent="space-between">
            <iframe
              srcDoc={zoomHtml(meetingCreds)}
              style={{
                height: '90vh',
                width: '75%',
              }}
              allow="camera ; microphone"
            ></iframe>
            <ProblemInfoForm />
          </FlexDiv>
        )}
      </div>
    </>
  );
}
const StyledIfram = styled(Iframe)`
  height: 90vh;
  width: 100vw;
`;
