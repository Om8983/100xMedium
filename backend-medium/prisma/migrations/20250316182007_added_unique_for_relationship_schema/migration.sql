/*
  Warnings:

  - A unique constraint covering the columns `[following,followers]` on the table `Relationships` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Relationships_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "Relationships_following_followers_key" ON "Relationships"("following", "followers");
