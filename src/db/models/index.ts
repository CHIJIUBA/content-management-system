import { Sequelize } from 'sequelize';

import User, { init as initUser, associations as userAssocations } from './user.model';
import Post, { init as initPost, associations as postAssociations } from './post.model';
import Comment, { init as initComment, associations as commentAssociations } from './comment.model';

export const associations = (seqelize: Sequelize) => {
  userAssocations(seqelize);
  commentAssociations;
  postAssociations(seqelize);
};

export { User };
export { Comment };
export { Post };

export const init = (sequelize: Sequelize) => {
  initUser(sequelize);
  initPost(sequelize);
  initComment(sequelize);
  associations(sequelize);
};
