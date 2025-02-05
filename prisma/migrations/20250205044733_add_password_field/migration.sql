-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT,
ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "updateAt" DROP NOT NULL;
