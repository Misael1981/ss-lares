/*
  Warnings:

  - You are about to drop the column `quantity` on the `Product` table. All the data in the column will be lost.
  - The `height` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `length` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `width` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."Product" DROP COLUMN "quantity",
ADD COLUMN     "brand" TEXT,
ADD COLUMN     "colors" TEXT[],
DROP COLUMN "height",
ADD COLUMN     "height" DOUBLE PRECISION,
DROP COLUMN "length",
ADD COLUMN     "length" DOUBLE PRECISION,
DROP COLUMN "width",
ADD COLUMN     "width" DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "public"."PackagingVariant" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantityPerPackage" INTEGER,
    "packagePerBox" INTEGER,
    "unitLabel" TEXT,
    "barcodeBox" TEXT,
    "boxHeight" DOUBLE PRECISION,
    "boxWidth" DOUBLE PRECISION,
    "boxLength" DOUBLE PRECISION,
    "boxWeight" DOUBLE PRECISION,
    "price" DOUBLE PRECISION NOT NULL,
    "salePrice" DOUBLE PRECISION,
    "costWithoutTaxes" DOUBLE PRECISION,
    "ipi" DOUBLE PRECISION,
    "st" DOUBLE PRECISION,
    "icms" DOUBLE PRECISION,

    CONSTRAINT "PackagingVariant_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."PackagingVariant" ADD CONSTRAINT "PackagingVariant_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
