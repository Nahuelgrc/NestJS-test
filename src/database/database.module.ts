import { Module } from '@nestjs/common';
import { Pool } from 'pg';

const dbProvider = {
    provide: 'PG_CONNECTION',
    useValue: new Pool({
        user: 'myuser',
        host: 'localhost',
        database: 'user-profile',
        password: 'mypass',
        port: 5432,
    }),
};

@Module({
    providers: [dbProvider],
    exports: [dbProvider]
})

export class DatabaseModule { }