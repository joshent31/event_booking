CREATE TABLE `mobile_tokens` (
	`hash` text PRIMARY KEY NOT NULL,
	`owner` text NOT NULL,
	`expires` text NOT NULL,
	`created` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `mobile_tokens_owner` ON `mobile_tokens` (`owner`);