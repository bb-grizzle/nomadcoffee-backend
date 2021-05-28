import { gql } from "apollo-server-core";

export default gql`
	type CreateUserResult {
		ok: Boolean!
		error: String
	}
	type Mutation {
		createUser(email: String!, username: String!, firstName: String!, lastName: String, password: String!, bio: String): CreateUserResult!
	}
`;
