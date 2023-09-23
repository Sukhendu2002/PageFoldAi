import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";

const bodyParser = z.object({
  userId: z.string(),
});

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    const { userId } = bodyParser.parse(body);

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    console.log(user);
  } catch (error) {
    console.log(error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: error.issues,
        },
        { status: 400 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          error: "Internal Server Error",
        },
        { status: 500 }
      );
    }
  }
}
