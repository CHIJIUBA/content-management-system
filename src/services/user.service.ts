import User from '../db/models/user.model';
import NotFoundError from '../errors/notFound.error';

class UserService {
  // constructor(private UserModel: User) {
  //   super();
  // }

  //   private includables = [this.generateIncludables(UserProfile, 'profile')];

  //   public async create(data: Partial<User>) {
  //     const { firstName, lastName, email, isVerified, isAdmin, password } = data;

  //     const attributes = {
  //       firstName,
  //       lastName,
  //       email,
  //       isVerified,
  //       isAdmin,
  //       password,
  //     };

  //     const [user] = await this.UserModel.findOrCreate({
  //       where: { email },
  //       defaults: { ...attributes },
  //     });

  //     return await user.reload();
  //   }

  public async getUser(id: number): Promise<User> {
    const user = await User.findOne({
      where: { id }
    });

    if (!user) {
      throw new NotFoundError('No user with this id found');
    }

    return user;
  }
}

export default new UserService();
