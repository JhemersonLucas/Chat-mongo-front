import { Router } from 'express';

import toolsRouter from './chat.routes';

const routes = Router();

routes.use('/chat', toolsRouter);

export default routes;
