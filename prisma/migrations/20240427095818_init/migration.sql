/*
  Warnings:

  - Added the required column `active` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdAt` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deactivatedAt` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `active` to the `Tag` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdAt` to the `Tag` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deactivatedAt` to the `Tag` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Tag` table without a default value. This is not possible if the table is not empty.
  - Added the required column `active` to the `Holiday` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdAt` to the `Holiday` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deactivatedAt` to the `Holiday` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Holiday` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Task" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "active" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    "deactivatedAt" DATETIME NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "dateTime" DATETIME NOT NULL,
    "duration" INTEGER NOT NULL
);
INSERT INTO "new_Task" ("dateTime", "description", "duration", "id", "title") SELECT "dateTime", "description", "duration", "id", "title" FROM "Task";
DROP TABLE "Task";
ALTER TABLE "new_Task" RENAME TO "Task";
CREATE TABLE "new_Tag" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "active" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    "deactivatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL
);
INSERT INTO "new_Tag" ("id", "name") SELECT "id", "name" FROM "Tag";
DROP TABLE "Tag";
ALTER TABLE "new_Tag" RENAME TO "Tag";
CREATE TABLE "new_Holiday" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "active" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    "deactivatedAt" DATETIME NOT NULL,
    "date" DATETIME NOT NULL,
    "name" TEXT NOT NULL
);
INSERT INTO "new_Holiday" ("date", "id", "name") SELECT "date", "id", "name" FROM "Holiday";
DROP TABLE "Holiday";
ALTER TABLE "new_Holiday" RENAME TO "Holiday";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
