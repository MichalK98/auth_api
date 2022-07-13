import { Express, Request, Response } from 'express';
import {
  createUserSessionHandler,
  getUserSessionsHandler
} from './controller/session.controller';
import { createUserHandler } from './controller/user.controller';
import requireUser from './middleware/requireUser';
import validate from './middleware/validateResource';
import { createSessionHandler } from './schema/session.schema';
import { createUserSchema } from './schema/user.schema';

function routes(app: Express) {
  app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));

  app.post('/api/users', validate(createUserSchema), createUserHandler);

  app.post(
    '/api/sessions',
    validate(createSessionHandler),
    createUserSessionHandler
  );

  app.get('/api/sessions', requireUser, getUserSessionsHandler);
}

export default routes;
