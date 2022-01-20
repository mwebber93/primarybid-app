import mongoose, { Connection, Schema } from 'mongoose';

let db: Connection;

// In a regular app the connection string would NOT be part of the codebase...
const connectionString =
	'mongodb://test_admin:test_password@mongo:27017/?authSource=admin&readPreference=primary&ssl=false';

export const initialiseDbConnection = async () => {
	await mongoose.connect(connectionString, {
		user: 'test_admin',
		pass: 'test_password',
	});
	db = mongoose.connection;
	console.log('mongoose connected');
};

const urlSchema = new Schema({
	originalUrl: { type: 'string' },
	shortUrl: { type: 'string' },
});

export const checkShortUrlExists = async (shortUrl: string): Promise<boolean> => {
	const Model = mongoose.model('UrlDetail', urlSchema);
	const result = await Model.findOne({ shortUrl }).exec();
	return !!result;
};

export const createShortUrl = async (originalUrl: string, shortUrl: string) => {
	const Model = mongoose.model('UrlDetail', urlSchema);

	const urlDetail = new Model();
	urlDetail.originalUrl = originalUrl;
	urlDetail.shortUrl = shortUrl;

	await urlDetail.save();
};

export const listShortUrls = async () => {
	const Model = mongoose.model('UrlDetail', urlSchema);
	const results = await Model.find({}).sort({ _id: -1 }).limit(10);
	return results;
};
