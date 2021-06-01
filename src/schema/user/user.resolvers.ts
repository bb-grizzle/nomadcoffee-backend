import { cursorPagenation } from "./shared/shared.utils";
import { Resolvers } from "./../../type.d";
const resolver: Resolvers = {
	User: {
		followers: async ({ id }, { lastUserId }, { client }) => {
			const { take, skip, cursor } = cursorPagenation({ lastId: lastUserId, key: "id" });

			return client.user.findMany({
				where: {
					following: {
						some: {
							id,
						},
					},
				},
				take,
				skip,
				cursor,
			});
		},
		following: async ({ id }, { lastUserId }, { client }) => {
			const { take, skip, cursor } = cursorPagenation({ lastId: lastUserId, key: "id" });

			client.user.findMany({
				where: {
					followers: {
						some: {
							id,
						},
					},
				},
				take,
				skip,
				cursor,
			});
		},
	},
};

export default resolver;
