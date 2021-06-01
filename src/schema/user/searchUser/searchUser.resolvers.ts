import { cursorPagenation } from "./../shared/shared.utils";
import { Resolvers } from "./../../../type.d";
const resolver: Resolvers = {
	Query: {
		searchUser: async (_, { keyword, lastUserId }, { client }) => {
			const { take, skip, cursor } = cursorPagenation({ lastId: lastUserId, key: "id" });
			// 01. search name, usernmae
			return client.user.findMany({
				where: {
					OR: [
						{
							name: { startsWith: keyword },
						},
						{
							username: { startsWith: keyword },
						},
					],
				},
				skip,
				take,
				cursor,
			});
		},
	},
};
export default resolver;
