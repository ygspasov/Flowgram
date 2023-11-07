export type Post = {
  downloadURL: string;
  id: string;
  lastModified: number;
  uploadDate: number;
  name: string;
  size: number;
  type: string;
  uid: string;
  description: string;
  username: string;
  likes: { [userId: string]: boolean };
};
