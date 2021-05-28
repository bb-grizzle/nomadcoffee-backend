import { Resolvers } from "../../../type";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

const resolver: Resolvers = {
	Mutation: {
		login: async (_, { keyword, password }, { client }) => {
			try {
				// 01. check user exist
				const loggedInUser = await client.user.findFirst({
					where: {
						OR: [
							{
								username: keyword,
							},
							{
								email: keyword,
							},
						],
					},
				});

				if (!loggedInUser) {
					return {
						ok: false,
						error: "no user",
					};
				}

				// 02. check password
				const checkPw = await bcrypt.compare(password, loggedInUser.password);
				if (!checkPw) {
					return {
						ok: false,
						error: "wrong password",
					};
				}

				// 03. token
				var token = jwt.sign({ userId: loggedInUser.id }, process.env.SECRET_KEY);
				return {
					ok: true,
					token,
				};
			} catch (error) {
				console.log(error);
				return {
					ok: false,
					error: "can't login",
				};
			}
		},
	},
};
export default resolver;
