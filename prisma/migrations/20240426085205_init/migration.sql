/*
  Warnings:

  - You are about to drop the column `description` on the `Tag` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Tag` table. All the data in the column will be lost.
  - Added the required column `name` to the `Tag` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tag" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    "deactivatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Tag" ("active", "createdAt", "deactivatedAt", "id", "updatedAt") SELECT "active", "createdAt", "deactivatedAt", "id", "updatedAt" FROM "Tag";
DROP TABLE "Tag";
ALTER TABLE "new_Tag" RENAME TO "Tag";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
