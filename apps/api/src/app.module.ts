import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';

import { NoteModule } from './note/note.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        GraphQLModule.forRoot({
            driver: ApolloDriver,
            playground: true,
            autoSchemaFile: join(process.cwd(), 'src/schema.graphql'),
            definitions: { path: join(process.cwd(), 'src/model.ts') },
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            url: process.env.POSTGRES_URL,
            database: process.env.POSTGRES_DATABASE,
            autoLoadEntities: true,
            entities: [__dirname + './src/**/*.entity{.ts,.js}'],
            synchronize: true,
        }),
        NoteModule,
    ],
})
export class AppModule {}
