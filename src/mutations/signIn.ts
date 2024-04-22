import { User } from "@prisma/client";
import { comparePassword } from "../modules/auth.js";
import { MutationResolvers } from "../types.js";

export const signIn: MutationResolvers['signIn'] = async (_, { username, password }, { dataSources }) => {
    try {
        const user: User | null = await dataSources.db.user.findUnique({ where: { username } })
        let verifiedUser: User | null = null
        if (user?.username === username && await comparePassword(password, user.password)) {
            verifiedUser = user
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