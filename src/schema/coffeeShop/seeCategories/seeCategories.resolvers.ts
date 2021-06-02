import { cursorPagenation } from "../../shared/shared.utils";
import { Resolvers } from "./../../../type.d";
const resolver: Resolvers = {
	Query: {
		seeCategories: async (_, { lastId }, { client }) => {
			const pagenation = cursorPagenation({ lastId });
			return client.category.findMany({
				...pagenation,
			});
		},
	},
};
export default resolver;
