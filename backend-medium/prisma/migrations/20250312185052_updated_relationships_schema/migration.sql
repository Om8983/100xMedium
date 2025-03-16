/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Relationships` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Relationships_followers_following_key";

-- CreateIndex
CREATE UNIQUE INDEX "Relationships_id_key" ON "Relationships"("id");
