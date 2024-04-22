import { User } from "@prisma/client";
import { comparePassword } from "../modules/auth.js";
import { MutationResolvers } from "../types.js";

export const signIn: MutationResolvers['signIn'] = async (_, { username, password }, { dataSources }) => {
    try {
        const users: User[] = await dataSources.db.user.findMany()
        let verifiedUser: User | null = null
        for (let user of users) {
            if (await comparePassword(password, user.password) && user.username === username) {
                verifiedUser = user
            }
        }
        if (verifiedUser) {
            return {
                code: 201,
                message: 'Log in successfully',
                success: true,
            }
        } else {
            return {
                code: 401,
                message: 'Username or password incorrect',
                success: false,
            }
        }
    } catch (e) {
        return {
            code: 400,
            message: (e as Error).message,
            success: false,
        }
    }
}