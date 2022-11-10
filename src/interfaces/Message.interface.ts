export interface iMessage {
  id: number;
  text: string;
  timestamp: string;
  user: {
    name: string;
    avatar: string;
  };
}
