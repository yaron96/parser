import { Controller, Get } from '@nestjs/common';
import { TeamMemberService } from './team-member.service';

@Controller('team-member')
export class TeamMemberController {
  constructor(private readonly teamMemberService: TeamMemberService) {}

  @Get()
  async getAll() {
    const teamMembers = await this.teamMemberService.getAll();
    return teamMembers;
  }
}
