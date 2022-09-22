import { Controller, Get, Query } from '@nestjs/common';
import { TeamMemberService } from './team-member.service';

@Controller('team-member')
export class TeamMemberController {
  constructor(private readonly teamMemberService: TeamMemberService) {}

  @Get()
  async getAll(@Query('firstName') firstName: string) {
    const teamMembers = await this.teamMemberService.getAll(firstName);
    return teamMembers;
  }
}
