interface CursorPagenationProps {
	key: string;
	lastId: number;
	take?: number;
}
export const cursorPagenation = ({ take, key, lastId }: CursorPagenationProps) => {
	const skip = lastId ? 1 : 0;
	const cursor = lastId
		? {
				[key]: lastId,
		  }
		: undefined;

	return {
		take: take ? take : 10,
		skip,
		cursor,
	};
};
