import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TeamMember, TeamMemberDocument } from './schemas/team-member.schema';

@Injectable()
export class TeamMemberService {
  constructor(
    @InjectModel(TeamMember.name)
    private teamMemberModel: Model<TeamMemberDocument>,
  ) {}

  async isEmpty(): Promise<boolean> {
    const count = await this.teamMemberModel.count().exec();
    const isEmpty = Boolean(count);
    return isEmpty;
  }

  async getAll() {
    const allTeamMembers = await this.teamMemberModel.find();
    return allTeamMembers;
  }

  async create(firstName: string, position: string, about: string) {
    return this.teamMemberModel.create({firstName, position, about});
  }
}
