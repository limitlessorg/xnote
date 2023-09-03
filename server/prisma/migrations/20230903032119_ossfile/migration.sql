-- CreateTable
CREATE TABLE "OssFile" (
    "uid" VARCHAR(32) NOT NULL,
    "size" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "filename" VARCHAR(255) NOT NULL,
    "lastModifiedDate" TIMESTAMP(3) NOT NULL,
    "url" VARCHAR(255) NOT NULL,
    "thumbUrl" VARCHAR(255) NOT NULL,
    "status" VARCHAR(16) NOT NULL,
    "error" VARCHAR(512),
    "userId" VARCHAR(64),
    "spaceId" VARCHAR(64),

    CONSTRAINT "OssFile_pkey" PRIMARY KEY ("uid")
);
