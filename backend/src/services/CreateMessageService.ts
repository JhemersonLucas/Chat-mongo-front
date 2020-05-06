import User from '../models/User';
import Messages from '../models/Messages';
import AppError from '../errors/AppError';

interface Request {
  user: string;
  message: string;
}

class CreateMessageService {
  public async execute({ user, message }: Request): Promise<Messages> {
    const existsUser = await User.findById(user);
    if (!existsUser) {
      throw new AppError('O usuário informado não é válido.');
    }
    const sendMessage = await Messages.create({ user_id: user, message });
    await sendMessage.save();
    return sendMessage;
  }
}

export default CreateMessageService;
