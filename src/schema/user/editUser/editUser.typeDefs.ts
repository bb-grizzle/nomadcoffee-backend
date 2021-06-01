import { gql } from "apollo-server-core";

export default gql`
	type Mutation {
		editUser(id: Int!, name: String, password: String, location: String, avatar: Upload, githubUsername: String): MutationResult!
	}
`;
