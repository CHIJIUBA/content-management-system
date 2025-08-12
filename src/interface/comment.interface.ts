interface CommentAttributeI {
  id: number;
  postId: number;
  userId: number;
  content: string;
  isApproved: boolean;
  isDeleted: boolean;
}

export default CommentAttributeI;
