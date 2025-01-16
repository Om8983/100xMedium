/*
  Warnings:

  - You are about to drop the column `likeCount` on the `Upvotes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "likeCount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Upvotes" DROP COLUMN "likeCount";
