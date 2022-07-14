import { Express, Request, Response } from 'express';
import {
  createProductHandler,
  deleteProductHandler,
  getProductHandler,
  updateProductHandler
} from './controller/product.controller';
import {
  createUserSessionHandler,
  deleteUserSessionHandler,
  getUserSessionsHandler
} from './controller/session.controller';
import { createUserHandler } from './controller/user.controller';
import requireUser from './middleware/requireUser';
import validateResource from './middleware/validateResource';
import {
  createProductScheme,
  deleteProductScheme,
  getProductScheme,
  updateProductScheme
} from './schema/product.schema';
import { createSessionHandler } from './schema/session.schema';
import { createUserSchema } from './schema/user.schema';

function routes(app: Express) {
  app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));

  app.post('/api/users', validateResource(createUserSchema), createUserHandler);

  app.post(
    '/api/sessions',
    validateResource(createSessionHandler),
    createUserSessionHandler
  );

  app.get('/api/sessions', requireUser, getUserSessionsHandler);

  app.delete('/api/sessions', requireUser, deleteUserSessionHandler);

  app.post(
    '/api/products',
    [requireUser, validateResource(createProductScheme)],
    createProductHandler
  );

  app.put(
    '/api/products/:productId',
    [requireUser, validateResource(updateProductScheme)],
    updateProductHandler
  );

  app.get(
    '/api/products/:productId',
    validateResource(getProductScheme),
    getProductHandler
  );

  app.delete(
    '/api/products/:productId',
    [requireUser, validateResource(deleteProductScheme)],
    deleteProductHandler
  );
}

export default routes;
