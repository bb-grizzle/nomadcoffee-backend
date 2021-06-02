import { Resolvers } from "./../../../type.d";
const resolver: Resolvers = {
	Query: {
		seeCoffeeShop: async (_, { id }, { client }) =>
			client.coffeeShop.findUnique({
				where: { id },
				include: {
					user: true,
					photos: true,
					categories: true,
				},
			}),
	},
};
export default resolver;
