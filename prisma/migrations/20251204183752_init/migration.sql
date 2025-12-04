/*
  Warnings:

  - The values [EN_PROCRESO] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('PENDIENTE', 'EN_PROCESO', 'TERMINADO');
ALTER TABLE "Ticket" ALTER COLUMN "estatus" TYPE "Status_new" USING ("estatus"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "public"."Status_old";
COMMIT;
