/*
  Warnings:

  - A unique constraint covering the columns `[postId,userId]` on the table `SavedBlogs` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "SavedBlogs_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "SavedBlogs_postId_userId_key" ON "SavedBlogs"("postId", "userId");
