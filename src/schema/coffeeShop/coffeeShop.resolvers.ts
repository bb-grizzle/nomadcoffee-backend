import { Resolvers } from "./../../type.d";
const resolver: Resolvers = {
	Category: {
		totalShops: ({ id }, _, { client }) =>
			client.coffeeShop.count({
				where: {
					categories: { some: { id } },
				},
			}),
	},
};
export default resolver;
