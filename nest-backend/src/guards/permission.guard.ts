import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Role } from 'src/modules/member/dtos/enums/role.enum';
import { MemberRepository } from 'src/modules/member/repositories/member.repository';
import { ProjectRepository } from 'src/modules/project/repositories/project.repository';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private memberRepository: MemberRepository,
    private projectRepository: ProjectRepository,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId: string = request.user.id;
    const member = await this.memberRepository.findInProject(
      userId,
      await this.getProjectFromParam(request),
    );

    if (!member) {
      throw new ForbiddenException('Cannot access this project');
    }

    if (member.role === Role.COMMON) {
      throw new UnauthorizedException('Only Admins can perform this action');
    }
    return true;
  }

  private async getProjectFromParam(req: Request): Promise<string | undefined> {
    const projectId = req.params.projectId;
    if (!projectId) {
      throw new BadRequestException('Did not found a project ID');
    }
    const project = await this.projectRepository.get(projectId);

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return projectId;
  }
}
