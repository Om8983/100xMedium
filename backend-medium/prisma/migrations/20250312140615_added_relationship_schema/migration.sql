-- CreateTable
CREATE TABLE "Relationships" (
    "id" TEXT NOT NULL,
    "followers" TEXT NOT NULL,
    "following" TEXT NOT NULL,

    CONSTRAINT "Relationships_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Relationships_followers_following_key" ON "Relationships"("followers", "following");

-- AddForeignKey
ALTER TABLE "Relationships" ADD CONSTRAINT "Relationships_following_fkey" FOREIGN KEY ("following") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Relationships" ADD CONSTRAINT "Relationships_followers_fkey" FOREIGN KEY ("followers") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
