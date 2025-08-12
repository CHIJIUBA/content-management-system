import {
  Sequelize,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  CreationOptional
} from 'sequelize';
import CommentAttributeI from '../../interface/comment.interface';

class Comment
  extends Model<InferAttributes<Comment>, InferCreationAttributes<Comment>>
  implements CommentAttributeI
{
  declare id: CreationOptional<number>;
  declare postId: number;
  declare userId: number;
  declare content: string;
  declare isApproved: boolean;
  declare isDeleted: boolean;
}

export const init = (sequelize: Sequelize) => {
  Comment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      isApproved: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      }
    },
    {
      sequelize,
      tableName: 'comments',
      timestamps: true
    }
  );
};

export const associations = (seqelize: Sequelize) => {
  Comment.belongsTo(seqelize.models.Post, {
    foreignKey: 'postId',
    as: 'post'
  });
  Comment.belongsTo(seqelize.models.User, {
    foreignKey: 'userId',
    as: 'user'
  });
};

export default Comment;
