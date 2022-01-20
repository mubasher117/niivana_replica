/**
 *
 * ChatWrapper
 *
 */
import React, { useState } from 'react';
import { Chat } from '../Chat';
import { Conversation } from '../HomePage/Conversation';

interface Props {}

export function ChatWrapper(props: Props) {
  const [state, setState] = useState('list');
  const [chatInfo, setChatInfo] = useState<any | null>(null);
  return (
    <div>
      {state === 'list' && (
        <Conversation setState={setState} setChatInfo={setChatInfo} />
      )}
      {state === 'chat' && <Chat chatInfo={chatInfo} setState={setState} />}
    </div>
  );
}
