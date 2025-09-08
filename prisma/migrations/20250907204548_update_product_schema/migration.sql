/*
  Warnings:

  - The `imageUrl` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."Product" ADD COLUMN     "height" DOUBLE PRECISION,
ADD COLUMN     "length" DOUBLE PRECISION,
ADD COLUMN     "quantity" INTEGER,
ADD COLUMN     "salePrice" DOUBLE PRECISION,
ADD COLUMN     "tags" TEXT[],
ADD COLUMN     "weight" DOUBLE PRECISION,
ADD COLUMN     "width" DOUBLE PRECISION,
DROP COLUMN "imageUrl",
ADD COLUMN     "imageUrl" TEXT[];
