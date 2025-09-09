/*
  Warnings:

  - You are about to drop the column `points` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."users" DROP COLUMN "points",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "doneQuiz" TEXT[],
ADD COLUMN     "paypoints" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalpoints" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "public"."Administrador" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Administrador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Jogo" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "points" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Jogo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Medalha" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "icon" TEXT NOT NULL,

    CONSTRAINT "Medalha_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ConteudoEducativo" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "texto" TEXT NOT NULL,

    CONSTRAINT "ConteudoEducativo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ConteudoImagem" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "ConteudoImagem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Loja" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Loja_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."MedalhaDisponivelNaLoja" (
    "id" TEXT NOT NULL,
    "preco" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "MedalhaDisponivelNaLoja_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Administrador_email_key" ON "public"."Administrador"("email");
