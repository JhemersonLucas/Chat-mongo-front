import Messages from '../models/Messages';
import AppError from '../errors/AppError';

class DeleteMessageService {
  public async execute(id: string): Promise<null> {
    const existsUser = await Messages.findById(id);
    if (!existsUser) {
      throw new AppError('A mensagem informado não existe.');
    }
    await Messages.findByIdAndDelete(id);
    return null;
  }
}

export default DeleteMessageService;
