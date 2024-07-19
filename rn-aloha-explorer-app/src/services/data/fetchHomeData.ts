import { instance } from '@/services/instance';
import { isMockBuild, highlights, categories, guides, topSpots } from './mockData';

export const fetchHomeHeader = async () => {
	try {

		if (isMockBuild) {
			return new Promise((resolve, error) => {
				resolve({ "message": "Welcome to Hawaii", "image": "https://i.imgur.com/zJTZkay.png" });
			});
		}
		const response = await instance.get('/api/header');
		return response.data;
	} catch (error) {
		console.error('Error fetching home header data:', JSON.stringify(error));
		throw error;
	}
};


export const fetchHighlightsData = async () => {
	try {
		if (isMockBuild) {
			return new Promise((resolve, error) => {
				resolve(highlights);
			});
		}
		const response = await instance.get('/api/highlights');
		return response.data;
	} catch (error) {
		console.error('Error fetching highlights data:', JSON.stringify(error));
		throw error;
	}
};


export const fetchCategories = async () => {
	try {
		if (isMockBuild) {
			return new Promise((resolve, error) => {
				resolve(categories);
			});
		}
		const response = await instance.get('/api/categories');
		return response.data;
	} catch (error) {
		console.error('Error fetching categories data:', JSON.stringify(error));
		throw error;
	}
};

export const fetchGuides = async () => {
	try {
		if (isMockBuild) {
			return new Promise((resolve, error) => {
				resolve(guides);
			});
		}
		const response = await instance.get('/api/guides');
		return response.data;
	} catch (error) {
		console.error('Error fetching guides data:', JSON.stringify(error));
		throw error;
	}
};

export const fetchTopSpots = async () => {
	try {
		if (isMockBuild) {
			return new Promise((resolve, error) => {
				resolve(topSpots);
			});
		}
		const response = await instance.get('/api/top-spots');
		return response.data;
	} catch (error) {
		console.error('Error fetching top spots data:', JSON.stringify(error));
		throw error;
	}
};

export const fetchAllHomeData = async () => {
	try {
		const [header, highlights, categories, guides, topSpots] = await Promise.all([
			fetchHomeHeader(),
			fetchHighlightsData(),
			fetchCategories(),
			fetchGuides(),
			fetchTopSpots()
		]);

		return { header, highlights, categories, guides, topSpots };
	} catch (error) {
		console.error('Error fetching all home data:', JSON.stringify(error));
		throw error;
	}
};
