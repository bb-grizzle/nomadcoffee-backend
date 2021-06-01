import { gql } from "apollo-server-core";

export default gql`
	type Query {
		searchUser(keyword: String!, lastUserId: Int): [User]!
	}
`;
