export type TCreateChatInput = {
  msgContent: string;
  senderId: string;
  recipientId: string;
};

export type TEventCreateNewChatInput = {
  msgContent: string;
  recipientId: string;
};
