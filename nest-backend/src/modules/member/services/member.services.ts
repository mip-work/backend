import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { MemberRepository } from '../repositories/member.repository';
import { UserRepository } from 'src/modules/User/repositories/user.repository';
import { ProjectRepository } from 'src/modules/project/repositories/project.repository';
import { DeleteMemberDto } from '../dtos/requests/delete-member.dto';
import { Role } from '../dtos/enums/role.enum';
import { CreateMemberDto } from '../dtos/requests/create-member.dto';
import { UpdateMemberDto } from '../dtos/requests/updateMember.dto';

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
        `User not found in the project: ${dto.projectId}`,
      );
    }

    if (currentMember.role == Role.COMMON) {
      throw new ForbiddenException('Not authorized');
    }

    const user = await this.userRepository.findById(dto.userId);
    if (!user) {
      throw new NotFoundException(`This user doesn't exist`);
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
      throw new InternalServerErrorException('Could not be created');
    }

    return member;
  }

  async listMembers(projectId: string, userId: string) {
    const currentUser = await this.memberRepository.findInProject(
      userId,
      projectId,
    );

    if (!currentUser) {
      throw new ForbiddenException(`You don't have access to this project`);
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
      throw new ForbiddenException('This project cannot be accessed');
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
      throw new BadRequestException('The owner cannot be removed');
    }

    await this.memberRepository.delete(member.id);
    return;
  }

  async changeRole(dto: UpdateMemberDto, userId: string) {
    const currentMember = await this.memberRepository.findInProject(
      userId,
      dto.projectId,
    );

    if (!currentMember) {
      throw new ForbiddenException(`You don't have access to this project`);
    }

    if (currentMember.role == Role.COMMON) {
      throw new UnauthorizedException('Not authorized');
    }

    const findMember = await this.memberRepository.findInProject(
      dto.userId,
      dto.projectId,
    );

    if (!findMember) {
      throw new UnauthorizedException('User not present in the project');
    }

    if (findMember.role == Role.OWNER) {
      throw new ForbiddenException(`The owner's role cannot be changed`);
    }

    const member = await this.memberRepository.changeRole({
      ...dto,
      id: findMember.id,
    });

    return member;
  }

  async showMember(userId: string, projectId: string) {
    const memberInProject = await this.memberRepository.findInProject(
      userId,
      projectId,
    );

    if (!memberInProject) {
      throw new NotFoundException('This member is not a part of this project');
    }

    return memberInProject;
  }
}
