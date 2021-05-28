import { protectResolver } from "./../user.util";
import { Resolvers } from "../../../type";
import { hashPassword } from "../user.util";
import * as fs from "fs";

const resolver: Resolvers = {
	Mutation: {
		editUser: protectResolver(async (_, { id, firstName, lastName, password: originPassword, bio, avatar: avatarFile }, { client, loggedInUser }) => {
			try {
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
				let avatar = undefined;
				if (avatarFile) {
					const { filename, createReadStream } = await avatarFile;
					const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
					const path = `${process.cwd()}/uploads/${newFilename}`;
					const readStream = createReadStream();
					const writedStream = fs.createWriteStream(path);
					await readStream.pipe(writedStream);
					avatar = `http://localhost:4000/static/${newFilename}`;
				}

				// 04. update
				await client.user.update({
					where: { id },
					data: {
						firstName,
						lastName,
						password,
						bio,
						avatar,
					},
				});
				return {
					ok: true,
				};
			} catch (error) {
				console.log(error);
				return {
					ok: false,
					error: "😫 can't edit user",
				};
			}
		}),
	},
};

export default resolver;
