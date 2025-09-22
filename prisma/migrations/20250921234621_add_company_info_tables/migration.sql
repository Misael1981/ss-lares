-- CreateTable
CREATE TABLE "public"."CompanyInfo" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'SS Lares',
    "email" TEXT NOT NULL,
    "social" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CompanyInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Phone" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "contactName" TEXT,
    "number" TEXT NOT NULL,
    "companyId" INTEGER NOT NULL,

    CONSTRAINT "Phone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Address" (
    "id" SERIAL NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipCode" TEXT,
    "companyId" INTEGER NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Address_companyId_key" ON "public"."Address"("companyId");

-- AddForeignKey
ALTER TABLE "public"."Phone" ADD CONSTRAINT "Phone_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "public"."CompanyInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Address" ADD CONSTRAINT "Address_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "public"."CompanyInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
