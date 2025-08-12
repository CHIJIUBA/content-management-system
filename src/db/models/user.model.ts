import {
  Sequelize,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  CreationOptional
} from 'sequelize';
import UserAttributeI from '../../interface/user.interface';
import bcrypt from 'bcrypt';

class User
  extends Model<InferAttributes<User>, InferCreationAttributes<User>>
  implements UserAttributeI
{
  declare id: CreationOptional<number>;
  declare firstName: string;
  declare lastName: string;
  declare email: string;
  declare password: string;
  declare role: CreationOptional<string>;
  declare isVerified: CreationOptional<boolean>;

  public async comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}

export const init = (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      role: {
        type: DataTypes.ENUM('user', 'admin', 'guest'),
        defaultValue: 'user',
        allowNull: false
      }
    },
    {
      sequelize,
      tableName: 'users',
      timestamps: true,

      hooks: {
        beforeCreate: async (user) => {
          if (user.password) {
            user.password = await bcrypt.hash(user.password, 10);
          }
        }
      },

      defaultScope: {
        attributes: {
          exclude: ['password']
        }
      },

      scopes: {
        withPassword: {
          attributes: {
            include: ['password']
          }
        }
      }
    }
  );
};

export const associations = (seqelize: Sequelize) => {
  User.hasMany(seqelize.models.Post, {
    foreignKey: 'authorId',
    as: 'posts'
  });
  User.hasMany(seqelize.models.Comment, {
    foreignKey: 'userId',
    as: 'comments'
  });
};

export default User;
