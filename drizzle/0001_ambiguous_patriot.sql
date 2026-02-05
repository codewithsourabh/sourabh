CREATE TABLE `blog_summaries` (
	`id` int AUTO_INCREMENT NOT NULL,
	`postSlug` varchar(255) NOT NULL,
	`postTitle` text NOT NULL,
	`summary` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `blog_summaries_id` PRIMARY KEY(`id`),
	CONSTRAINT `blog_summaries_postSlug_unique` UNIQUE(`postSlug`)
);
