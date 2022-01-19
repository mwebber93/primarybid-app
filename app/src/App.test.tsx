import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

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

test('tests that valid urls do not trigger our error message', () => {
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

	expect(titleElement).toBeInTheDocument();
	expect(helpTextElement).toBeInTheDocument();
	expect(labelElement).toBeInTheDocument();
	expect(submitElement).toBeInTheDocument();
	expect(errorElement).toBeNull();
});