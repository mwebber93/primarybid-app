import shortUrlController from './ShortUrlController';
import httpMocks from 'node-mocks-http';
import * as database from '../../database';

describe('Short Url Controller tests', () => {
	test('Test that we are returned a 200 status code when the url is successfully created', () => {
		const mockCheckShortUrlExists = jest.spyOn(database, 'checkShortUrlExists');
		mockCheckShortUrlExists.mockImplementation(() => Promise.resolve(false));

		const mockCreateShortUrl = jest.spyOn(database, 'createShortUrl');
		mockCreateShortUrl.mockImplementation(() => Promise.resolve());

		const mockRequest = httpMocks.createRequest({
			method: 'POST',
			url: '/shortUrl',
			body: {
				url: 'test.com',
			},
		});
		const mockResponse = httpMocks.createResponse();

		shortUrlController(mockRequest, mockResponse);

		expect(mockResponse.statusCode).toBe(200);
	});

	test('Test that we are returned a 400 status code if the url is not included in the request body', () => {
		const mockCheckShortUrlExists = jest.spyOn(database, 'checkShortUrlExists');
		mockCheckShortUrlExists.mockImplementation(() => Promise.resolve(false));

		const mockCreateShortUrl = jest.spyOn(database, 'createShortUrl');
		mockCreateShortUrl.mockImplementation(() => Promise.resolve());

		const mockRequest = httpMocks.createRequest({
			method: 'POST',
			url: '/shortUrl',
			body: {},
		});
		const mockResponse = httpMocks.createResponse();

		shortUrlController(mockRequest, mockResponse);

		expect(mockResponse.statusCode).toBe(400);
	});
});
