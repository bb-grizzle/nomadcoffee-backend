import { Resolvers } from "../../../type";
import { hashPassword } from "../user.util";

const resolver: Resolvers = {
	Mutation: {
		createUser: async (_, { email, username, password: originPassword }, { client }) => {
			// 01. check unique
			const isUserExist = await client.user.findFirst({
				where: {
					OR: [
						{
							username,
						},
						{
							email,
						},
					],
				},
			});
			if (isUserExist) {
				return {
					ok: false,
					error: "😢 username or email is taken. ",
				};
			}

			// 02. hash password
			const password = await hashPassword(originPassword);

			// 03. create user
			await client.user.create({
				data: {
					email,
					username,
					password,
				},
			});
			return {
				ok: true,
			};
		},
	},
};

export default resolver;
