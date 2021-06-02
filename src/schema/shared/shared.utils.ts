import * as fs from "fs";
interface CursorPagenationProps {
	lastId: number;
	key?: string;
	take?: number;
}
export const cursorPagenation = ({ take, key, lastId }: CursorPagenationProps) => {
	const skip = lastId ? 1 : 0;
	const cursorKey = key ? key : "id";
	const cursor = lastId
		? {
				[cursorKey]: lastId,
		  }
		: undefined;

	return {
		take: take ? take : 10,
		skip,
		cursor,
	};
};

export const uploadLocal = async (file, userId) => {
	const { filename, createReadStream } = await file;
	const newFilename = `${userId}-${Date.now()}-${filename}`;
	const path = `${process.cwd()}/uploads/${newFilename}`;
	const readStream = createReadStream();
	const writedStream = fs.createWriteStream(path);
	await readStream.pipe(writedStream);
	return `http://localhost:4000/static/${newFilename}`;
};
