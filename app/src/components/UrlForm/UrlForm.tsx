import React, { FC, useCallback, useEffect, useState } from 'react';
import './UrlForm.css';

type ShortUrlRequest = {
	url: string;
};

type ShortUrlResponse = {
	newUrl: string;
};

type ListShortUrlsResponse = {
	urls: {
		_id: string;
		originalUrl: string;
		shortUrl: string;
	}[];
};

interface Props {}

const UrlForm: FC<Props> = () => {
	const [submitPressed, setSubmitPressed] = useState(false);
	const [url, setUrl] = useState<string>('');
	const [isUrlValid, setIsUrlValid] = useState(false);
	const [shortUrl, setShortUrl] = useState<string | null>(null);
	const [previousUrls, setPreviousUrls] = useState<string[]>([]);

	const getLatestShortUrls = useCallback(async (): Promise<void> => {
		const response = await fetch('http://localhost:3001/shortUrls', {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		});

		const { urls } = (await response.json()) as ListShortUrlsResponse;
		setPreviousUrls(urls.map((url) => `https://pbid.io/${url.shortUrl}`));
	}, []);

	const initialisePreviousUrls = useCallback(async () => {
		await getLatestShortUrls();
	}, [getLatestShortUrls]);

	useEffect(() => {
		initialisePreviousUrls();
	}, [initialisePreviousUrls]);

	const onUrlChange = useCallback((e: React.FormEvent<HTMLInputElement>) => {
		setUrl(e.currentTarget.value);
	}, []);

	const validateUrl = useCallback((url: string) => {
		const urlRegex = new RegExp(
			'[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)'
		);
		const isValid = urlRegex.test(url);
		setIsUrlValid(isValid);
		return isValid;
	}, []);

	const sendShortUrlRequest = useCallback(
		async (data: ShortUrlRequest): Promise<void> => {
			const response = await fetch('http://localhost:3001/shortUrl', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});

			const { newUrl } = (await response.json()) as ShortUrlResponse;
			setShortUrl(newUrl);
			await getLatestShortUrls();
		},
		[getLatestShortUrls]
	);

	const handleSubmit = useCallback(
		async (event: React.FormEvent) => {
			event.preventDefault();
			if (!submitPressed) {
				setSubmitPressed(true);
			}

			const isValid = validateUrl(url);
			if (isValid) {
				setIsUrlValid(true);
				await sendShortUrlRequest({
					url,
				});
			} else {
				setShortUrl('');
			}
		},
		[sendShortUrlRequest, submitPressed, url, validateUrl]
	);

	return (
		<div className="Form-wrapper">
			<form onSubmit={handleSubmit}>
				<span>Please enter the url that you want to shorten.</span>
				<fieldset>
					<label htmlFor="url">URL:</label>
					<input type="text" id="url" name="url" onChange={onUrlChange} placeholder="URL" value={url} />
					<input type="submit" value="Submit" />
					{submitPressed && !isUrlValid && <span className="Form-error">The URL is invalid.</span>}
					{submitPressed && shortUrl && (
						<span className="Form-success">Your new shortened url is: {shortUrl}</span>
					)}
				</fieldset>
			</form>
			{previousUrls.length > 0 && (
				<div className="Previous-urls">
					<span>Previously shortened urls:</span>
					<ul>
						{previousUrls.map((url, index) => (
							<li key={index}>{url}</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default UrlForm;
