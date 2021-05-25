/*
  Warnings:

  - You are about to drop the column `author` on the `movie` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `movie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "movie" DROP COLUMN "author",
ADD COLUMN     "createtAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "genre" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "year" INTEGER NOT NULL;
