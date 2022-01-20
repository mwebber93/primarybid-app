import { act, fireEvent, prettyDOM, render, screen, waitFor } from '@testing-library/react';
import App from './App';

describe('Url Shortener tests', () => {
	afterEach(() => {
		jest.restoreAllMocks();
	});

	test('tests that the url form renders', () => {
		render(<App />);
		const titleElement = screen.getByText(/URL Shortener/i);
		const helpTextElement = screen.getByText(/Please enter the url that you want to shorten./i);
		const labelElement = screen.getByText(/URL:/i);
		const submitElement = screen.getByText(/Submit/i);

		expect(titleElement).toBeInTheDocument();
		expect(helpTextElement).toBeInTheDocument();
		expect(labelElement).toBeInTheDocument();
		expect(submitElement).toBeInTheDocument();
	});

	test('tests that invalid urls trigger our error message', () => {
		render(<App />);
		const titleElement = screen.getByText(/URL Shortener/i);
		const helpTextElement = screen.getByText(/Please enter the url that you want to shorten./i);
		const labelElement = screen.getByText(/URL:/i);
		const submitElement = screen.getByText(/Submit/i);

		const urlInput = screen.getByLabelText<HTMLInputElement>('URL:');

		fireEvent.change(urlInput, { target: { value: 'badUrl' } });

		expect(urlInput.value).toBe('badUrl');

		fireEvent.submit(submitElement);

		const errorElement = screen.queryByText(/The URL is invalid./i);

		expect(titleElement).toBeInTheDocument();
		expect(helpTextElement).toBeInTheDocument();
		expect(labelElement).toBeInTheDocument();
		expect(submitElement).toBeInTheDocument();
		expect(errorElement).toBeInTheDocument();
	});

	test('tests that valid urls triggers our success message', () => {
		global.fetch = jest.fn(() =>
			Promise.resolve({ json: () => Promise.resolve({ newUrl: 'https://pbid.io/abcd1234' }) })
		) as jest.Mock;

		render(<App />);
		const titleElement = screen.getByText(/URL Shortener/i);
		const helpTextElement = screen.getByText(/Please enter the url that you want to shorten./i);
		const labelElement = screen.getByText(/URL:/i);
		const submitElement = screen.getByText(/Submit/i);

		const urlInput = screen.getByLabelText<HTMLInputElement>('URL:');

		fireEvent.change(urlInput, { target: { value: 'goodurl.com' } });

		expect(urlInput.value).toBe('goodurl.com');

		fireEvent.submit(submitElement);

		const errorElement = screen.queryByText(/The URL is invalid./i);
		const successElement = screen.queryByText(/Your new shortened url is: https:\/\/pbid.io\/abcd1234/i);

		expect(titleElement).toBeInTheDocument();
		expect(helpTextElement).toBeInTheDocument();
		expect(labelElement).toBeInTheDocument();
		expect(submitElement).toBeInTheDocument();
		expect(successElement).toBeNull();
		expect(errorElement).toBeNull();
	});

	test('tests that valid urls get added to our previously shortened urls list', async () => {
		global.fetch = jest.fn(() =>
			Promise.resolve({ json: () => Promise.resolve({ newUrl: 'https://pbid.io/abcd1234' }) })
		) as jest.Mock;

		render(<App />);

		const submitElement = screen.getByText(/Submit/i);

		const urlInput = screen.getByLabelText<HTMLInputElement>('URL:');

		fireEvent.change(urlInput, { target: { value: 'goodurl.com' } });

		expect(urlInput.value).toBe('goodurl.com');

		fireEvent.submit(submitElement);

		expect(await waitFor(() => screen.findByText(/Previously shortened urls:/i))).toBeVisible();
	});
});
