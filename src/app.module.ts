import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ParserModule } from './modules/parser/parser.module';
import { TeamMemberModule } from './modules/team-members/team-member.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_URL),
    ParserModule,
    TeamMemberModule
  ],
})
export class AppModule {}
