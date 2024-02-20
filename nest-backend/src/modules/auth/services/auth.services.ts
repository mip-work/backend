import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/modules/User/repositories/user.repository';

@Injectable()
export class AuthServices {
  constructor(private userRepository: UserRepository) {}
}
