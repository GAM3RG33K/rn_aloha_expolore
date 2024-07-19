import { instance } from '@/services/instance';
import { isMockBuild, guides } from './mockData';


export const bookATrip = async (name: String, destination: String, date: String) => {
	try {

		if (isMockBuild) {
			return {
				status: 200,
				data: `Trip booked for ${name} to ${destination} on ${date}`,
			};
		}
		const response = await instance.post('/api/book-trip', {
			name,
			destination,
			date
		});
		return response;
	} catch (error) {
		console.error('Error Booking A trip:', JSON.stringify(error));
		throw error;
	}
};
