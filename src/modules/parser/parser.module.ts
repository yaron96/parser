import { TeamMemberModule } from './../team-members/team-member.module';
import { forwardRef, Module } from "@nestjs/common";
import { ParserService } from "./parser.service";

@Module({
    providers: [ParserService],
    imports: [forwardRef(() => TeamMemberModule)],
})
export class ParserModule {}