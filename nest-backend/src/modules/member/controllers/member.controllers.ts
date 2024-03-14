import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { MemberServices } from '../services/member.services';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { DeleteMemberDto } from '../dtos/requests/delete-member.dto';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { CreateMemberDto } from '../dtos/requests/create-member.dto';
import { UpdateMemberDto } from '../dtos/requests/updateMember.dto';
import { PermissionGuard } from 'src/guards/permission.guard';
import { MemberGuard } from 'src/guards/member.guard';

@ApiTags('Member')
@UseGuards(AuthGuard)
@Controller('member')
export class MemberControllers {
  constructor(private memberService: MemberServices) {}

  @UseGuards(PermissionGuard)
  @Post()
  async create(
    @Body() body: CreateMemberDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const member = await this.memberService.addMember(body, req.user.id);
    return res.status(HttpStatus.CREATED).json({
      data: member,
      status: HttpStatus.CREATED,
    });
  }

  @UseGuards(PermissionGuard)
  @Delete()
  async remove(
    @Body() dto: DeleteMemberDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    await this.memberService.delete(dto, req.user.id);
    return res.status(HttpStatus.OK).json({
      message: 'Member removed',
      status: HttpStatus.OK,
    });
  }

  @UseGuards(MemberGuard)
  @Get('/list/:projectId')
  async listMembers(
    @Param('projectId') projectId: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const members = await this.memberService.listMembers(
      projectId,
      req.user.id,
    );

    return res.status(HttpStatus.OK).json({
      data: members,
      status: HttpStatus.OK,
    });
  }

  @UseGuards(PermissionGuard)
  @Patch()
  async changeRole(
    @Body() dto: UpdateMemberDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const member = await this.memberService.changeRole(dto, req.user.id);
    return res.status(HttpStatus.OK).json({
      data: member,
      status: HttpStatus.OK,
    });
  }

  @UseGuards(MemberGuard)
  @Get(':projectId')
  async getMember(
    @Param('projectId') projectId: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const member = await this.memberService.showMember(
      req.body.userId,
      projectId,
    );
    return res.status(HttpStatus.OK).json({
      data: member,
      status: HttpStatus.OK,
    });
  }
}
