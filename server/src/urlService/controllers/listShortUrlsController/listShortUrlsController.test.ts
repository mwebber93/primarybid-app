import shortUrlController from './listShortUrlsController';
import httpMocks from 'node-mocks-http';
import * as database from '../../../database';

describe('List Short Urls Controller tests', () => {
	test('Test that we are returned a 200 status code if we request the latest short urls', () => {
		const mockListShortUrls = jest.spyOn(database, 'listShortUrls');
		mockListShortUrls.mockImplementation(() => Promise.resolve([]));

		const mockRequest = httpMocks.createRequest({
			method: 'GET',
			url: '/shortUrls',
			body: {},
		});
		const mockResponse = httpMocks.createResponse();

		shortUrlController(mockRequest, mockResponse);

		expect(mockResponse.statusCode).toBe(200);
	});
});
