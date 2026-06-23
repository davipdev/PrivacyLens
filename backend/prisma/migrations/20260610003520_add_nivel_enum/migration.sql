/*
  Warnings:

  - Changed the type of `nivel` on the `historicoConsultas` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "NivelRisco" AS ENUM ('baixo', 'medio', 'alto', 'critico');

-- AlterTable
ALTER TABLE "historicoConsultas" DROP COLUMN "nivel",
ADD COLUMN     "nivel" "NivelRisco" NOT NULL;
