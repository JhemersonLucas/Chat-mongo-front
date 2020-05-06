import { Router } from 'express';

import { startOfDay, endOfDay, parseISO, subHours } from 'date-fns';
import User from '../models/User';
import Messages from '../models/Messages';

import CreateMessageService from '../services/CreateMessageService';
import DeleteMessageService from '../services/DeleteMessageService';
import CreateUserService from '../services/CreateUserService';
import DeleteUserService from '../services/DeleteUserService';

const chatRouter = Router();

chatRouter.get('/login/:login', async (request, response) => {
  const { login } = request.params;
  const user = await User.findOne({ user: login });
  if (!user) {
    return response.status(401).json({ message: 'Usuário inválido' });
  }
  return response.json(user);
});

chatRouter.get('/messages', async (request, response) => {
  const { user, date, sorted } = request.query;
  const filter = {};
  if (user) filter.user_id = user;
  if (date && date.length === 10) {
    const dataIso = parseISO(date);
    filter.createdAt = {
      $gte: subHours(startOfDay(dataIso), 3),
      $lte: subHours(endOfDay(dataIso), 3),
    };
  }
  let ordem = 'createdAt';
  if (sorted && sorted === 'desc') ordem = '-createdAt';
  const messages = await Messages.find(filter)
    .populate({
      path: 'user_id',
      select: 'user',
    })
    .sort(ordem);
  response.json(messages);
});

chatRouter.post('/messages', async (request, response) => {
  const { user, message } = request.body;
  const createMessage = new CreateMessageService();
  const sendMessage = await createMessage.execute({
    user,
    message,
  });
  return response.status(201).json(sendMessage);
});

chatRouter.delete('/messages/:id', async (request, response) => {
  const { id } = request.params;
  const deleteMessage = new DeleteMessageService();
  await deleteMessage.execute(id);
  return response.status(204).send();
});

chatRouter.get('/', async (request, response) => {
  const users = await User.find();
  response.json(users);
});

chatRouter.post('/', async (request, response) => {
  const { login } = request.body;
  const createUser = new CreateUserService();
  const tool = await createUser.execute({
    login,
  });
  return response.status(201).json(tool);
});

chatRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  const deleteUser = new DeleteUserService();
  await deleteUser.execute(id);
  return response.status(204).send();
});

export default chatRouter;
