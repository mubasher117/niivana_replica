/* --- STATE --- */
export interface PubnubInternalState {
  loading: boolean;
  error?: any;
  selectedConversationId: string | null;
  userList: {
    [key: string]: Partial<{
      custom: any;
      id: string;
      name: string;
      profileUrl: string;
      externalId: string;
      email: string;
      eTag: string;
    }>;
  };
}
