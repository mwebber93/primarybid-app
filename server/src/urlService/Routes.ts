import { Request, Response, Application } from 'express';
import shortUrlController from './controllers/ShortUrlController';

export const initialiseUrlRoutes = (server: Application) => {
	server.post('/shortUrl', (req: Request, res: Response) => shortUrlController(req, res));
};
