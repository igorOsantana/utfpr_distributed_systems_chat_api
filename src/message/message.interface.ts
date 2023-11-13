export type TCreateMessageInput = {
  content: string;
  ownerId: string;
  chatId: string;
};

export type TEventSendNewMessageInput = {
  content: string;
  chatId: string;
};
