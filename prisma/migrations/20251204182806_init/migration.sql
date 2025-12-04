/*
  Warnings:

  - The values [EN_PROGRESO] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('PENDIENTE', 'EN_PROCRESO', 'TERMINADO');
ALTER TABLE "Ticket" ALTER COLUMN "estatus" TYPE "Status_new" USING ("estatus"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "public"."Status_old";
COMMIT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" SET NOT NULL;
