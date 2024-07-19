import { instance } from '@/services/instance';
import { isMockBuild, guides } from './mockData';


export const contactGuide = async (id: String) => {
	try {
		if (isMockBuild) {
			const guide = guides.find(g => g.id.toString() === id);
			if (guide) {

				return {
					status: 200,
					data: `You have contacted ${guide.name}, They will reach out to you soon`,
				};
			} else {

				return {
					status: 404,
					data: `Guide contact details not found `,
				};
			}
		}
		const response = await instance.post('/api/contact-guide', {
			id,
		});
		return response;
	} catch (error) {
		console.error('Error contacting a guide:', JSON.stringify(error));
		throw error;
	}
};
