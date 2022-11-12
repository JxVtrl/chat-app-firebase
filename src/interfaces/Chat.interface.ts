export interface iChat {
  chats: {
    id: number;
    uid: string;
    chat: {
      id: number;
      message: string;
      active: boolean;
      timestamp: string;
    }[];
  }[];
}
