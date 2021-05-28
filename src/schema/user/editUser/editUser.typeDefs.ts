import { gql } from "apollo-server-core";

export default gql`
	type EditUserResult {
		ok: Boolean!
		error: String
	}
	type Mutation {
		editUser(id: Int!, firstName: String, lastName: String, password: String, bio: String, avatar: Upload): EditUserResult!
	}
`;
