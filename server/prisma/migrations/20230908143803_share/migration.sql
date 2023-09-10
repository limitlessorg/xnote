-- CreateTable
CREATE TABLE "x_share" (
    "id" VARCHAR(32) NOT NULL,
    "blockId" VARCHAR(32) NOT NULL,
    "userId" VARCHAR(32) NOT NULL,
    "category" VARCHAR(255) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "description" TEXT,

    CONSTRAINT "x_share_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "x_share" ADD CONSTRAINT "x_share_blockId_fkey" FOREIGN KEY ("blockId") REFERENCES "x_block"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "x_share" ADD CONSTRAINT "x_share_userId_fkey" FOREIGN KEY ("userId") REFERENCES "x_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
