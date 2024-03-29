import NextAuth from "next-auth/next";

import { NextRequest, NextResponse } from "next/server";
import { getAuthOptions } from "~/configs/authOptions";

async function handler(
  req: NextRequest,
  res: NextResponse,
  ctx: { params: { nextauth: string[] } },
) {
  // @ts-expect-error
  return NextAuth(req, res, getAuthOptions(req));
}

export { handler as GET, handler as POST };
