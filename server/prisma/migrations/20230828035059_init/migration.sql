-- CreateEnum
CREATE TYPE "SpaceType" AS ENUM ('personal', 'team');

-- CreateTable
CREATE TABLE "x_user" (
    "id" VARCHAR(64) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "code" VARCHAR(64) NOT NULL,
    "password" VARCHAR(64) NOT NULL,
    "email" VARCHAR(64),
    "phone" VARCHAR(32),
    "wechat" VARCHAR(64),
    "logo" VARCHAR(255),
    "remark" VARCHAR(255),

    CONSTRAINT "x_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "x_space" (
    "id" VARCHAR(64) NOT NULL,
    "spaceType" "SpaceType" NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "logo" VARCHAR(255),

    CONSTRAINT "x_space_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "x_block" (
    "id" VARCHAR(32) NOT NULL,
    "spaceId" VARCHAR(64) NOT NULL,
    "blockType" VARCHAR(64) NOT NULL,
    "content" JSONB,
    "layout" JSONB,
    "parentId" VARCHAR(32),
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "x_block_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SpaceToUser" (
    "A" VARCHAR(64) NOT NULL,
    "B" VARCHAR(64) NOT NULL
);

-- CreateTable
CREATE TABLE "_ContainerItems" (
    "A" VARCHAR(32) NOT NULL,
    "B" VARCHAR(32) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "x_user_code_key" ON "x_user"("code");

-- CreateIndex
CREATE UNIQUE INDEX "x_user_email_key" ON "x_user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "x_user_phone_key" ON "x_user"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "x_user_wechat_key" ON "x_user"("wechat");

-- CreateIndex
CREATE UNIQUE INDEX "_SpaceToUser_AB_unique" ON "_SpaceToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_SpaceToUser_B_index" ON "_SpaceToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ContainerItems_AB_unique" ON "_ContainerItems"("A", "B");

-- CreateIndex
CREATE INDEX "_ContainerItems_B_index" ON "_ContainerItems"("B");

-- AddForeignKey
ALTER TABLE "x_block" ADD CONSTRAINT "x_block_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "x_space"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "x_block" ADD CONSTRAINT "x_block_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "x_block"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SpaceToUser" ADD CONSTRAINT "_SpaceToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "x_space"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SpaceToUser" ADD CONSTRAINT "_SpaceToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "x_user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContainerItems" ADD CONSTRAINT "_ContainerItems_A_fkey" FOREIGN KEY ("A") REFERENCES "x_block"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContainerItems" ADD CONSTRAINT "_ContainerItems_B_fkey" FOREIGN KEY ("B") REFERENCES "x_block"("id") ON DELETE CASCADE ON UPDATE CASCADE;
