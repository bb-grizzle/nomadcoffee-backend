import { protectResolver } from "../user.util";
import { Resolvers } from "./../../../type.d";
const resolver: Resolvers = {
	Mutation: {
		followUser: protectResolver(async (_, { id }, { client, loggedInUser }) => {
			// 01. check user exist
			const ok = await client.user.findUnique({ where: { id } });
			if (!ok) {
				return {
					ok: false,
					error: "😢 user does not exist.",
				};
			}

			// 02. follow user
			await client.user.update({
				where: {
					id: loggedInUser.id,
				},
				data: {
					following: {
						connect: {
							id,
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
