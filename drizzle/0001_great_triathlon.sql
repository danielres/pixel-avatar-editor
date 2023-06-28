CREATE TABLE `drawings` (
	`id` text PRIMARY KEY NOT NULL,
	`data` text NOT NULL,
	`authorId` text NOT NULL,
	`createdAt` integer NOT NULL,
	FOREIGN KEY (`authorId`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
