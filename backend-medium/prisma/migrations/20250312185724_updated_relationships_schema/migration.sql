-- DropForeignKey
ALTER TABLE "Relationships" DROP CONSTRAINT "Relationships_followers_fkey";

-- DropForeignKey
ALTER TABLE "Relationships" DROP CONSTRAINT "Relationships_following_fkey";

-- AlterTable
ALTER TABLE "Relationships" ALTER COLUMN "followers" DROP NOT NULL,
ALTER COLUMN "following" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Relationships" ADD CONSTRAINT "Relationships_following_fkey" FOREIGN KEY ("following") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Relationships" ADD CONSTRAINT "Relationships_followers_fkey" FOREIGN KEY ("followers") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
