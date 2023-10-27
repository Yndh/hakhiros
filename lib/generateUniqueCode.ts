import { generateCode } from "./generateCode";
import { prisma } from "./prisma";

export async function generateUniqueCode(lenght: number) {
    if (lenght < 1) {
        throw RangeError("Expected positive number, but got negative instead")
    }

    let code: string;
    let codeExists;
    for (let i = 0; i <= lenght; i++) {
        code = generateCode(lenght)
        codeExists = await prisma.house.findUnique({
            where: {
                code
            }
        })
        if (!codeExists) {
            return code
        }
    }
    throw RangeError("Maximum number of tries")
}