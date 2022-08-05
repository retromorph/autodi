import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import mongoConfig from "./_config/mongo.config";
import typeormConfig from "./_config/typeorm.config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MongooseModule } from "@nestjs/mongoose";
import { FileModule } from './file/file.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [mongoConfig, typeormConfig],
      ignoreEnvFile: process.env.NODE_ENV === "production",
    }),
    TypeOrmModule.forRoot(typeormConfig()),
    MongooseModule.forRoot(...mongoConfig()),
    FileModule,
  ],
})
export class AppModule {
}
