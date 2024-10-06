import { Types } from 'mongoose';

export type TVote = {
  upVote: [{ userId: Types.ObjectId }];
  downVote: [{ userId: Types.ObjectId }];
};

export type TComment = {
  userId: Types.ObjectId;
  commentText: string;
  like: number;
  reply: [
    {
      userId: Types.ObjectId;
      replyText: string;
    },
  ];
};

export const Badges = ['premium', 'public'];

export type TPost = {
  userId: Types.ObjectId;

  category: 'tips' | 'stories';
  image: string[];
  vote?: TVote;
  comment?: TComment[];
  shareCount?: [{ userId: Types.ObjectId }];
  details: string;
  badges: 'premium' | 'public';
  pricing?: number;

  status: 'active' | 'blocked';
  isDeleted: boolean;
};
