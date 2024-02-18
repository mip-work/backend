import { User } from '../dtos/user';
import { ViewUserDTO } from '../dtos/responses/view-user.dto';

export class UserBuilder {
  static createViewUser(user: User): ViewUserDTO {
    const { id, username, email, profileUrl, lastLoggedIn } = user;

    return { id, username, email, profileUrl, lastLoggedIn };
  }
}
