import { Injectable } from '@nestjs/common';
import { Parser, TeamMember } from './utils/parser';
import { TeamMemberService } from '../team-members/team-member.service';

@Injectable()
export class ParserService {
  constructor(private teamMemerService: TeamMemberService) {
    this.initialize();
  }

  async initialize() {
    const isParsingComplete = await this.teamMemerService.isEmpty();
    if (!isParsingComplete) {
      const team = await this.getTeam();
      await this.saveTeam(team);
    }
  }

  async getTeam() {
    const parser = new Parser(1000, Infinity);
    const team = await parser.getTeamMembers();
    return team;
  }

  async saveTeam(team: TeamMember[]) {
    return await Promise.all(
      team.map(async (member) => {
        this.teamMemerService.create(
          member.firstName,
          member.position,
          member.about,
        );
      }),
    );
  }
}
