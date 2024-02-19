declare namespace Express {
    export interface Request {
        loggedUser: {
            id: string,
            username: string,
            email: string
        }
    }
}