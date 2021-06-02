import { cursorPagenation } from "../../shared/shared.utils";
import { Resolvers } from "./../../../type.d";
const resolver: Resolvers = {
	Query: {
		seeCoffeeShops: async (_, { lastId }, { client }) => {
			const { take, cursor, skip } = cursorPagenation({ lastId, key: "id" });
			return client.coffeeShop.findMany({
				take,
				cursor,
				skip,
			});
		},
	},
};
export default resolver;
