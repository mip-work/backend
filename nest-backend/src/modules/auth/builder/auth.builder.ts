import { User } from "src/modules/User/dtos/user";
import { SavePayloadUser } from "../dtos/save-token-user.dto";

export class AuthBuilder {
    static createPayloadToSaveToken(user: User): SavePayloadUser {
        const { id, username, email } = user;

        return { id, username, email };
    }
}