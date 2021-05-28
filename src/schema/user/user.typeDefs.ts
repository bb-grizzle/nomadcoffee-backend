import { gql } from "apollo-server-core";

export default gql`
	type User {
		id: Int!
		createtAt: String!
		updatedAt: String!
		email: String!
		username: String!
		firstName: String!
		lastName: String
		password: String!
		bio: String
	}
`;
