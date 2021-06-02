import { uploadLocal } from "./../shared/shared.utils";
interface UrlIc {
	url: string;
}

export const createManyCoffeeShopPhoto = async (photos, userId) => {
	const photoUrls: UrlIc[] = photos
		? await Promise.all(
				photos.map(async (photo) => {
					const url = await uploadLocal(photo, userId);
					return { url };
				})
		  )
		: [];
	return photoUrls;
};

export const connectOrCreateCategories = (categories) => {
	const categoriesArr = categories
		? categories.map((el) => ({
				where: {
					name: el,
				},
				create: {
					name: el,
					slug: el,
				},
		  }))
		: [];
	return categoriesArr;
};
