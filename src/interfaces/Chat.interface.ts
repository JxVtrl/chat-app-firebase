export interface iChat {
  chats: {
    id: number;
    uid: string;
    name: string;
    username: string;
    chat: {
      id: number;
      message: string;
      active: boolean;
      timestamp: string;
    }[];
  }[];
}
