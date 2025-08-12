import User from '../../db/models/user.model';
import ConflictError from '../../errors/conflict.errors';
import bcrypt from 'bcrypt';
import BadRequestError from '../../errors/notFound.error';
import NotFoundError from '../../errors/notFound.error';
import jwt from 'jsonwebtoken';
import { DecodedToken } from '../../interface/auth.interface';

class AuthService {
  constructor(private UserModel: typeof User) {}

  public async login(user: User) {
    // extract the password for the user information //
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user.toJSON();
    const payloadUser = userWithoutPassword;

    // generate an access token for the new user //
    const accessToken = this.generateAccessToken(payloadUser);

    // return the new information //
    return { user: userWithoutPassword, accessToken };
  }

  public async checkUserExistAndPasswordMatch(email: string, password: string) {
    const user = await this.UserModel.scope('withPassword').findOne({
      where: { email }
    });

    // check if user exist
    if (!user) {
      return 'User not found';
      // throw new NotFoundError('User not found');
    }
    // check if the password is actually correct //
    if (!this.validatePassword(user, password)) {
      // return 'Invalid Password';
      throw new ConflictError('Admin email or password is incorrect');
    }

    return false;
  }

  public async getUserForLogin(email: string, password: string) {
    // find the user //
    const user = await this.UserModel.scope('withPassword').findOne({
      where: { email }
    });

    return user;
  }

  public async registerUser(user: Partial<User>) {
    // check if the user exist //
    const userExist = await this.UserModel.findOne({
      where: { email: user.email }
    });

    // if the user exist throw an error //
    if (userExist) {
      // throw new ConflictError('User already exist');
      return { message: 'User already exist' };
    }

    // create a new user //
    const newUser = await this.UserModel.create({
      ...user
    });

    const { password, ...userWithouPassword } = newUser.toJSON();

    //generate an access token for the new user //
    const accessToken = this.generateAccessToken(newUser);

    // // return the new user //
    return { user: userWithouPassword as User, accessToken };
  }
  // put a pin on this
  public verifyToken(token: string): DecodedToken {
    try {
      const payload = jwt.verify(token, 'secret') as unknown as User;
      return {
        payload,
        expired: false
      };
    } catch (error) {
      return {
        payload: null,
        expired: error.message.includes('expired') ? error.message : error
      };
    }
  }

  // put a pin on this one //
  private generateAccessToken(user: Partial<User>) {
    // generate the access token and then send it out - input the payload, the secrete and the options you want //
    const accessToken = jwt.sign({ ...user }, 'secret', {
      // algorithm: 'RS256',
      expiresIn: '10h'
    });

    // return the accessToken //
    return accessToken;
  }

  private validatePassword(user: User, password: string): boolean {
    try {
      // check if teh password is correct //
      return bcrypt.compareSync(password, user.password);
    } catch (error) {
      throw new BadRequestError('Error validation password at the moment');
    }
  }

  //   private async updateLastLogin(user: User): Promise<void> {
  //     await user.set('lastLogin', new Date()).save();
  //   }
}

export default new AuthService(User);
