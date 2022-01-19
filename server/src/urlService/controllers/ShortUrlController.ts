import { Validator } from 'jsonschema';
import { generate } from 'randomstring';
import { Request, Response } from 'express';
import { checkShortUrlExists, createShortUrl } from '../../database';

const validator = new Validator();

const urlSchema = {
	id: '/shortUrl',
	type: 'object',
	properties: {
		url: { type: 'string' },
	},
	required: ['url'],
};

const shortUrlController = async (req: Request, res: Response) => {
	const { errors } = validator.validate(req.body, urlSchema);
	if (errors.length > 0) {
		res.status(400).jsonp({ message: errors[0].message });
	} else {
		let shortUrl = generate({
			length: 8,
			capitalization: 'lowercase',
		});
		let shortUrlExists = await checkShortUrlExists(shortUrl);
		// If short url exists then keep regenerating them until a non-existent one is found.
		while (shortUrlExists) {
			shortUrl = generate({
				length: 8,
				capitalization: 'lowercase',
			});
			shortUrlExists = await checkShortUrlExists(shortUrl);
		}

		// Persist the url detail to the database.
		await createShortUrl(req.body.url, shortUrl);

		return res.status(200).jsonp({
			newUrl: `https://pbid.io/${shortUrl}`,
		});
	}
};

export default shortUrlController;
