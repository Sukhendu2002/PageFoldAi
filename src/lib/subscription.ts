import { getAuthSession } from "./auth";
import { prisma } from "./db";

const DAY_IN_MS = 1000 * 60 * 60 * 24;

export const checkSubscription = async () => {
  const session = await getAuthSession();
  if (!session?.user) {
    return false;
  }
  const userSubscription = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });
  if (!userSubscription) {
    return false;
  }

  const isValid = userSubscription.credits > 0;

  return !!isValid;
};
