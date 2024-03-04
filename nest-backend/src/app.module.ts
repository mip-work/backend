import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './db/prisma.service';
import { AssigneeModule } from './modules/assignee/assignee.module';
import { UserModule } from './modules/User/users.module';
import { ProjectModule } from './modules/project/project.module';
import { CommentModule } from './modules/comment/comment.module';
import { IssueModule } from './modules/issue/issue.module';
import { ListModule } from './modules/list/list.module';
import { MemberModule } from './modules/member/member.module';
import { SprintModule } from './modules/sprint/sprint.module';
import { AuthModule } from './modules/auth/auth.module';
import { MiddlewareAuth } from './modules/middlewares/middleware-auth';
import { UserControllers } from './modules/User/controllers/user.controllers';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
    }),
    AuthModule,
    CommentModule,
    AssigneeModule,
    IssueModule,
    ListModule,
    MemberModule,
    ProjectModule,
    SprintModule,
    UserModule,
  ],
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(MiddlewareAuth)
        .forRoutes(UserControllers)
  }
}