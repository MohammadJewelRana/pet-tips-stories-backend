import  { Schema, model, } from 'mongoose';
import { TPost } from './post.interface';

const voteSchema = new Schema({
  upVote: [{ userId: { type: Schema.Types.ObjectId, ref: 'User' } }],
  downVote: [{ userId: { type: Schema.Types.ObjectId, ref: 'User' } }],
});

const commentSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  commentText: { type: String, required: true },
  like: { type: Number, default: 0 },
  reply: [
    {
      userId: { type: Schema.Types.ObjectId, ref: 'User' },
      replyText: { type: String, required: true },
    },
  ],
});

const postSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    category: { type: String, enum: ['tips', 'stories'], required: true },
    image: { type: [String], required: true, default: [] },
    vote: { type: voteSchema },
    comment: { type: [commentSchema] },
    shareCount: [{ userId: { type: Schema.Types.ObjectId, ref: 'User' } }],
    details: { type: String, required: true },
    badges: { type: String, enum: ['premium', 'public'], required: true },
    pricing: { type: Number, default: 0 },
    status: { type: String, enum: ['active', 'blocked'], default: 'active' },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const Post = model<TPost>('Post', postSchema);
