import { Resolvers } from "../../../type";
import * as bcrypt from "bcrypt";
import { hashPassword } from "../user.util";

const resolver: Resolvers = {
	Mutation: {
		createUser: async (_, { email, username, firstName, lastName, password: originPassword, bio }, { client }) => {
			try {
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
						error: "username or email is taken. ",
					};
				}

				// 02. hash password
				const password = await hashPassword(originPassword);

				// 03. create user
				await client.user.create({
					data: {
						email,
						username,
						firstName,
						lastName,
						password,
						bio,
					},
				});
				return {
					ok: true,
				};
			} catch (err) {
				console.log(err);
				return {
					ok: false,
					error: "can't creat user.",
				};
			}
		},
	},
};

export default resolver;
