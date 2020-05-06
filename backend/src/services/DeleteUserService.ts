import User from '../models/User';
import AppError from '../errors/AppError';

class DeleteToolService {
  public async execute(id: string): Promise<null> {
    const existsUser = await User.findById(id);
    if (!existsUser) {
      throw new AppError('O usuário informado não existe.');
    }
    await User.findByIdAndDelete(id);
    return null;
  }
}

export default DeleteToolService;
