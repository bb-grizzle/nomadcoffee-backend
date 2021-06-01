import { gql } from "apollo-server-core";

export default gql`
	type User {
		id: Int!
		email: String!
		username: String!
		name: String!
		password: String!
		location: String
		avatarURL: String
		githubUsername: String
		createtAt: String!
		updatedAt: String!
		# computed fiedls
		followers(lastUserId: Int): [User]!
		following(lastUserId: Int): [User]!
	}
`;
