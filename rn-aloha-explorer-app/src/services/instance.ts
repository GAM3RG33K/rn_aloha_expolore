import axios from 'axios';

export const instance = axios.create({
	baseURL: process.env.API_URL,
});

instance.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		// Print any errors in response if encountered
		console.error('Response Error:', error.response);
		throw error;
	}
);

instance.interceptors.request.use(
	(config) => {
		return config;
	},
	(error) => {
		// Print any errors in request if encountered
		console.error('Request Error:', error);
		throw error;
	}
);
