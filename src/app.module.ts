import { TypeOrmModule } from '@nestjs/typeorm';



import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { User } from './entities/user.entity';
import { RequestModule } from './requests/requests.module';
import { Request } from './entities/request.entity';


@Module({
  imports: [
    
    TypeOrmModule.forRoot({
      type: 'mysql',
      port: 3306,
      // host: 'localhost',
      // username: 'root',
      // password: 'root123',
      // database: 'autoservice_db',

      // host: 'http://bezdudvw.beget.tech/',
      host: 'localhost',
      username: 'bezdudvw_db',
      password: 'Bezdudvwpassword123!',
      database: 'bezdudvw_db',
      entities: [User, Request],
      synchronize: false, // set false in prod
      retryAttempts: 3,
      retryDelay: 3000
    }),

    UsersModule,
    RequestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
