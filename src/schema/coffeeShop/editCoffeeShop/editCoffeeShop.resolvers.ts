import { createManyCoffeeShopPhoto, connectOrCreateCategories } from "./../coffeeShop.utils";

import { protectResolver } from "../../user/user.util";
import { Resolvers } from "./../../../type.d";
const resolver: Resolvers = {
	Mutation: {
		editCoffeeShop: protectResolver(async (_, { id, name, latitude, longitude, addphotos, deletePhotos, categories }, { client, loggedInUser }) => {
			// 01. check is mine
			const prevCoffeeShop = await client.coffeeShop.findUnique({ where: { id }, select: { id: true, categories: true } });
			if (!prevCoffeeShop) {
				return {
					ok: false,
					error: "😢 coffeeshop not found.",
				};
			}

			// 02. check name exist
			if (name) {
				const nameCheck = await client.coffeeShop.findUnique({ where: { name }, select: { id: true } });
				if (nameCheck) {
					return {
						ok: false,
						error: "😢 name is taken.",
					};
				}
			}

			// 03. delete selected photos\
			// - disconnect first
			// - delete photo
			if (deletePhotos && deletePhotos.length > 0) {
				deletePhotos.forEach(async (deletePhotoId) => {
					await client.coffeeShopPhoto.delete({
						where: {
							id: deletePhotoId,
						},
					});
				});
			}

			// 05. update coffee shop with new categories & new photo
			const categoriesArr = connectOrCreateCategories(categories);

			// 02. upload photo
			const photoUrls = await createManyCoffeeShopPhoto(addphotos, loggedInUser.id);

			await client.coffeeShop.update({
				where: {
					id,
				},
				data: {
					name,
					latitude,
					longitude,
					categories: {
						disconnect: prevCoffeeShop.categories.map((el) => ({ id: el.id })),
						connectOrCreate: categoriesArr,
					},
					// photos,
					photos: {
						createMany: {
							data: photoUrls,
						},
					},
				},
			});

			return {
				ok: true,
			};
		}),
	},
};
export default resolver;
