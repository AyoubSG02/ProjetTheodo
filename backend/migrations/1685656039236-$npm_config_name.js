import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class  $npmConfigName1685656039236 {
    name = ' $npmConfigName1685656039236'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "temporary_movie" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "title" varchar NOT NULL,
                "releaseDate" datetime NOT NULL,
                "liked" boolean NOT NULL DEFAULT (0),
                CONSTRAINT "UQ_0e6a6ae9cd0961d172d4eaec9ce" UNIQUE ("title")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_movie"("id", "title", "releaseDate")
            SELECT "id",
                "title",
                "releaseDate"
            FROM "movie"
        `);
        await queryRunner.query(`
            DROP TABLE "movie"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_movie"
                RENAME TO "movie"
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "movie"
                RENAME TO "temporary_movie"
        `);
        await queryRunner.query(`
            CREATE TABLE "movie" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "title" varchar NOT NULL,
                "releaseDate" datetime NOT NULL,
                CONSTRAINT "UQ_0e6a6ae9cd0961d172d4eaec9ce" UNIQUE ("title")
            )
        `);
        await queryRunner.query(`
            INSERT INTO "movie"("id", "title", "releaseDate")
            SELECT "id",
                "title",
                "releaseDate"
            FROM "temporary_movie"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_movie"
        `);
    }
}
