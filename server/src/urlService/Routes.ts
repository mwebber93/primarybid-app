import { Request, Response, Application } from 'express';
import shortUrlController from './controllers/shortUrlController/ShortUrlController';
import listShortUrlsController from './controllers/listShortUrlsController/listShortUrlsController';

export const initialiseUrlRoutes = (server: Application) => {
	server.post('/shortUrl', (req: Request, res: Response) => shortUrlController(req, res));
	server.get('/shortUrls', (req: Request, res: Response) => listShortUrlsController(req, res));
};
