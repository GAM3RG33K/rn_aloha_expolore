import { instance } from '@/services/instance';


export const bookATrip = async (name: String, destination: String, date: String) => {
	try {

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
