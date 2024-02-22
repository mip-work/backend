import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { MemberRepository } from '../repositories/member.repository';
import { UserRepository } from 'src/modules/User/repositories/user.repository';
import { ProjectRepository } from 'src/modules/project/repositories/project.repository';
import { DeleteMemberDto } from '../dtos/requests/delete-member.dto';
import { Role } from '../dtos/enums/role.enum';
import { CreateMemberDto } from '../dtos/requests/create-member.dto';

@Injectable()
export class MemberServices {
  constructor(
    private memberRepository: MemberRepository,
    private userRepository: UserRepository,
    private projectRepository: ProjectRepository,
  ) {}

  async addMember(dto: CreateMemberDto, userId: string) {
    const currentMember = await this.memberRepository.findInProject(
      userId,
      dto.projectId,
    );

    if (!currentMember) {
      throw new NotFoundException(
        `User not found in project: ${dto.projectId}`,
      );
    }

    if (currentMember.role == Role.COMMON) {
      throw new ForbiddenException('Not authorized');
    }

    const user = await this.userRepository.findById(dto.userId);
    if (!user) {
      throw new NotFoundException('This user does not exist');
    }

    const checkMember = await this.memberRepository.findInProject(
      user.id,
      dto.projectId,
    );

    if (checkMember) {
      throw new ForbiddenException('User already in the project');
    }

    const member = await this.memberRepository.addMember({
      userId: user.id,
      projectId: dto.projectId,
      role: Role.COMMON,
    });

    if (!member) {
      throw new InternalServerErrorException('Could not create');
    }

    return member;
  }

  async listMembers(projectId: string, userId: string) {
    const currentUser = await this.memberRepository.findInProject(
      userId,
      projectId,
    );

    if (!currentUser) {
      throw new ForbiddenException('You do not have access to this project');
    }
    const project = await this.projectRepository.get(projectId);

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    const members = await this.memberRepository.listMembers(projectId);

    return members;
  }

  async delete(dto: DeleteMemberDto, userId: string) {
    const currentUser = await this.memberRepository.findInProject(
      userId,
      dto.projectId,
    );

    if (!currentUser) {
      throw new ForbiddenException('You cannot access this project');
    }

    if (currentUser.role == Role.COMMON) {
      throw new ForbiddenException('Not authorized');
    }

    const member = await this.memberRepository.findInProject(
      dto.id,
      dto.projectId,
    );

    if (!member) {
      throw new BadRequestException(
        'This member is not a part of this project',
      );
    }

    if (member.role == Role.OWNER) {
      throw new BadRequestException('You cannot remove the owner');
    }

    await this.memberRepository.delete(member.id);
    return;
  }
}
