import { MongooseModule } from '@nestjs/mongoose';
import { forwardRef, Module } from "@nestjs/common";
import { TeamMemberService } from './team-member.service';
import { TeamMemberController } from './team-member.controller';
import { TeamMember, TeamMemberSchema } from './schemas/team-member.schema';

@Module({
    providers: [TeamMemberService],
    controllers: [TeamMemberController],
    imports: [
        MongooseModule.forFeature([
            {name: TeamMember.name, schema: TeamMemberSchema}
        ]),
    ],
    exports: [TeamMemberService],
})
export class TeamMemberModule {}