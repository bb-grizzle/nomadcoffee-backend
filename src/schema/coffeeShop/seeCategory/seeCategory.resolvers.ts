import { cursorPagenation } from "../../shared/shared.utils";
import { Resolvers } from "./../../../type.d";
const resolver: Resolvers = {
	Query: {
		seeCategory: async (_, { name, lastId }, { client }) => {
			const pagenation = cursorPagenation({ lastId, key: "id" });
			return client.coffeeShop.findMany({
				where: {
					categories: {
						some: {
							name,
						},
					},
				},
				...pagenation,
			});
		},
	},
};
export default resolver;
