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
				const { filename, createReadStream } = await avatar;
				const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
				const path = `${process.cwd()}/uploads/${newFilename}`;
				const readStream = createReadStream();
				const writedStream = fs.createWriteStream(path);
				await readStream.pipe(writedStream);
				avatarURL = `http://localhost:4000/static/${newFilename}`;
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
