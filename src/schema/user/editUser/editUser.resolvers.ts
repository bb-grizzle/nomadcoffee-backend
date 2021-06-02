import { uploadLocal } from "./../../shared/shared.utils";
import { protectResolver } from "./../user.util";
import { Resolvers } from "../../../type";
import { hashPassword } from "../user.util";
import * as fs from "fs";

const resolver: Resolvers = {
	Mutation: {
		editUser: protectResolver(async (_, { id, name, password: originPassword, location, avatar, githubUsername }, { client, loggedInUser }) => {
			// 01. check login
			// : by protect resolver

			// 02. user check
			if (id !== loggedInUser.id) {
				return {
					ok: false,
					error: "😫 can't edit user.",
				};
			}

			// 03. password generate
			let password = undefined;
			if (originPassword) {
				password = await hashPassword(originPassword);
			}

			// 04. avatar
			let avatarURL = undefined;
			if (avatar) {
				avatarURL = await uploadLocal(avatar, loggedInUser.id);
			}

			// 04. update
			await client.user.update({
				where: { id },
				data: {
					avatarURL,
					password,
					name,
					location,
					githubUsername,
				},
			});
			return {
				ok: true,
			};
		}),
	},
};

export default resolver;
