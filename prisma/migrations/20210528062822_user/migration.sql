/*
  Warnings:

  - You are about to drop the `movie` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "movie";

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "createtAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT,
    "password" TEXT NOT NULL,
    "bio" TEXT,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user.email_unique" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user.username_unique" ON "user"("username");
