export enum UserROLE {
  user = 'user',
  admin = 'admin',
}

export interface User {
  name: string;
  password: string;
  username : string;
}

export interface imageUpload{
  UserID : number;
  ImagePath : string;
  UploadDate : string;
  EloRating: number;
}

export interface Vote {
  userID: number;
  imageID: number;
  elorating: number;
}