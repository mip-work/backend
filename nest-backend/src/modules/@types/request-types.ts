declare namespace Express {
    export interface Request {
        user: {
            id: string,
            username: string,
            email: string
        }
    }
}   