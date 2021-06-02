import { connectOrCreateCategories, createManyCoffeeShopPhoto } from "./../coffeeShop.utils";
import { uploadLocal } from "./../../shared/shared.utils";
import { protectResolver } from "../../user/user.util";
import { Resolvers } from "./../../../type.d";
const resolver: Resolvers = {
	Mutation: {
		createCoffeeShop: protectResolver(async (_, { name, latitude, longitude, photos, categories }, { client, loggedInUser }) => {
			// 01. check name exist
			const ok = await client.coffeeShop.findUnique({
				where: { name },
			});

			if (ok) {
				return {
					ok: false,
					error: "😢 coffee shop is already exist.",
				};
			}

			// 02. create with categories
			const categoriesArr = connectOrCreateCategories(categories);

			// 02. upload photo
			const photoUrls = await createManyCoffeeShopPhoto(photos, loggedInUser.id);

			await client.coffeeShop.create({
				data: {
					name,
					latitude,
					longitude,
					user: {
						connect: {
							id: loggedInUser.id,
						},
					},
					categories: {
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
