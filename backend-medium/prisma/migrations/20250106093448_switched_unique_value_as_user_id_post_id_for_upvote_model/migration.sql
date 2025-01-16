/*
  Warnings:

  - A unique constraint covering the columns `[userId,postId]` on the table `Upvotes` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Upvotes_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "Upvotes_userId_postId_key" ON "Upvotes"("userId", "postId");
