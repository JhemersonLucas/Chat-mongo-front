import User from '../models/User';
import AppError from '../errors/AppError';

interface Request {
  login: string;
  verificacao?: boolean;
}

class CreateUserService {
  public async execute({ login, verificacao = true }: Request): Promise<User> {
    const existsUser = await User.find({ login });
    if (existsUser && verificacao) {
      throw new AppError('O usuário informado já está sendo utilizado.');
    }
    const user = await User.create({ user: login });
    await user.save();
    return user;
  }
}

export default CreateUserService;
