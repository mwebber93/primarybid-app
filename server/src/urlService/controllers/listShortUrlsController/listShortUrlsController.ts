import { Request, Response } from 'express';
import { listShortUrls } from '../../../database';

const listShortUrlsController = async (req: Request, res: Response) => {
	const shortUrls = await listShortUrls();

	return res.status(200).jsonp({
		urls: shortUrls,
	});
};

export default listShortUrlsController;
