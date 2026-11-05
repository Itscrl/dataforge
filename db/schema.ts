import {sqliteTable,text,integer} from 'drizzle-orm/sqlite-core';
export const userProgress=sqliteTable('user_progress',{userId:text('user_id').primaryKey(),revision:integer('revision').notNull(),payload:text('payload').notNull(),updatedAt:text('updated_at').notNull()});
