import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 3306,
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_NAME || 'nestjs_db',
      autoLoadModels: true,
      synchronize: true,
    }),
    SequelizeModule.forFeature([User]),
    UsersModule,
  ],
})
export class AppModule {}
