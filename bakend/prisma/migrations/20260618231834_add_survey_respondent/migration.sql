/*
  Warnings:

  - Added the required column `respondentId` to the `SurveyResponse` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "SurveyRespondent" (
    "id" SERIAL NOT NULL,
    "cedula" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SurveyRespondent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SurveyRespondent_cedula_key" ON "SurveyRespondent"("cedula");

-- AlterTable
ALTER TABLE "SurveyResponse" ADD COLUMN "respondentId" INTEGER;

-- Preserve existing responses by assigning them to a legacy respondent record
INSERT INTO "SurveyRespondent" ("cedula") VALUES ('legacy') ON CONFLICT ("cedula") DO NOTHING;
UPDATE "SurveyResponse"
SET "respondentId" = (SELECT "id" FROM "SurveyRespondent" WHERE "cedula" = 'legacy')
WHERE "respondentId" IS NULL;

ALTER TABLE "SurveyResponse" ALTER COLUMN "respondentId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "SurveyResponse" ADD CONSTRAINT "SurveyResponse_respondentId_fkey" FOREIGN KEY ("respondentId") REFERENCES "SurveyRespondent"("id") ON DELETE CASCADE ON UPDATE CASCADE;
