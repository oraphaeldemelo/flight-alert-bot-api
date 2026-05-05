export type SendMessageInput = {
  chatId: string;
  message: string;
};

export abstract class NotificationPort {
  abstract sendMessage(input: SendMessageInput): Promise<void>;
}
