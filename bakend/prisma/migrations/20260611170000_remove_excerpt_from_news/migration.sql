BEGIN TRANSACTION;

CREATE TABLE "NewsItem_new" (
  "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "title" TEXT NOT NULL,
  "content" TEXT,
  "createdBy" TEXT,
  "imagePath" TEXT,
  "date" TEXT,
  "source" TEXT,
  "url" TEXT,
  "published" DATETIME,
  "section" TEXT NOT NULL DEFAULT 'news',
  "active" BOOLEAN NOT NULL DEFAULT 1,
  "updatedAt" DATETIME NOT NULL
);

INSERT INTO "NewsItem_new" ("id", "title", "content", "createdBy", "imagePath", "date", "source", "url", "published", "section", "active", "updatedAt")
SELECT "id", "title", "content", "createdBy", "imagePath", "date", "source", "url", "published", "section", "active", "updatedAt" FROM "NewsItem";

DROP TABLE "NewsItem";
ALTER TABLE "NewsItem_new" RENAME TO "NewsItem";

COMMIT;
