import {
  Sequelize,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  CreationOptional
} from 'sequelize';
import PostAttributeI from '../../interface/post.interface';

class Post
  extends Model<InferAttributes<Post>, InferCreationAttributes<Post>>
  implements PostAttributeI
{
  declare id: CreationOptional<number>;
  declare title: string;
  declare content: string;
  declare slug: string;
  declare status: string;
  declare authorId: CreationOptional<number>;
}

export const init = (sequelize: Sequelize) => {
  Post.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false
      },
      authorId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      status: {
        type: DataTypes.ENUM('draft', 'published', 'archived'),
        defaultValue: 'draft',
        allowNull: true
      }
    },
    {
      sequelize,
      tableName: 'posts',
      timestamps: true
    }
  );
};

export const associations = (seqelize: Sequelize) => {
  Post.belongsTo(seqelize.models.User, {
    foreignKey: 'authorId',
    as: 'author'
  });
  Post.hasMany(seqelize.models.Comment, {
    foreignKey: 'postId',
    as: 'comments'
  });
};

export default Post;
