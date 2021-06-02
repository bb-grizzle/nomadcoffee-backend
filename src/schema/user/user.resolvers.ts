import { cursorPagenation } from "../shared/shared.utils";
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
		totalFollowing: ({ id }, _, { client }) => client.user.count({ where: { followers: { some: { id } } } }),
		totalFollowers: ({ id }, _, { client }) => client.user.count({ where: { following: { some: { id } } } }),
		isMe: ({ id }, _, { loggedInUser }) => (loggedInUser ? loggedInUser.id === id : false),
		isFollowing: async ({ id }, _, { loggedInUser, client }) => {
			if (!loggedInUser) {
				return false;
			}
			const check = await client.user.findFirst({
				where: {
					id,
					followers: { some: { id: loggedInUser.id } },
				},
			});
			return Boolean(check);
		},
		coffeeShops: async ({ id }, { lastId }, { client }) => {
			const pagenation = cursorPagenation({ lastId });
			return client.coffeeShop.findMany({
				where: {
					userId: id,
				},
				...pagenation,
			});
		},
	},
};

export default resolver;
