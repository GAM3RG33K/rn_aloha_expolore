import { instance } from '@/services/instance';


export const fetchHomeHeader = async () => {
	try {
		
		const response = await instance.get('/api/header');
		return response.data;
	} catch (error) {
		console.error('Error fetching home header data:', JSON.stringify(error));
		throw error;
	}
};


export const fetchHighlightsData = async () => {
	try {
		const response = await instance.get('/api/highlights');
		return response.data;
	} catch (error) {
		console.error('Error fetching highlights data:', JSON.stringify(error));
		throw error;
	}
};

export const fetchGuides = async () => {
	try {
		const response = await instance.get('/api/guides');
		return response.data;
	} catch (error) {
		console.error('Error fetching guides data:', JSON.stringify(error));
		throw error;
	}
};

export const fetchTopSpots = async () => {
	try {
		const response = await instance.get('/api/top-spots');
		return response.data;
	} catch (error) {
		console.error('Error fetching top spots data:', JSON.stringify(error));
		throw error;
	}
};

export const bookTrip = async (name: string, destination: string, date: string) => {
	try {
		const response = await instance.post('/api/book-trip', { name, destination, date });
		return response.data;
	} catch (error) {
		console.error('Error booking trip:', JSON.stringify(error));
		throw error;
	}
};

export const fetchAllHomeData = async () => {
	try {
		const [header, highlights, guides, topSpots] = await Promise.all([
			fetchHomeHeader(),
			fetchHighlightsData(),
			fetchGuides(),
			fetchTopSpots()
		]);
		return { header, highlights, guides, topSpots };
	} catch (error) {
		console.error('Error fetching all home data:', JSON.stringify(error));
		throw error;
	}
};
