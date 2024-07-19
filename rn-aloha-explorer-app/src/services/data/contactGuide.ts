import { instance } from '@/services/instance';


export const contactGuide = async (id: String) => {
	try {

		const response = await instance.post('/api/contact-guide', {
			id,
		});
		return response;
	} catch (error) {
		console.error('Error contacting a guide:', JSON.stringify(error));
		throw error;
	}
};
