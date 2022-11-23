import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthMiddleware } from './middleware/auth.milddleaware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { AuthModule } from './auth/auth.module';
require('dotenv').config()

@Module({
  imports: [UserModule,RoleModule,AuthModule,TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: 5432,
    username: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: false,
    // url: process.env.DATABASE_URL,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
  }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    })],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
