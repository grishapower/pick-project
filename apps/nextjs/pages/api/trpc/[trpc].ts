import { appRouter, createTRPCContext } from "@pickem/api";
import { createNextApiHandler } from "@trpc/server/adapters/next";
// import { unstable_getServerSession } from "next-auth";
// import { getAuthOptions } from "~/configs/authOptions";
import { unstable_getServerSession } from "next-auth/next";
import { getAuthOptions } from "~/configs/authOptions";

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext: async ({ req, res }) => {
    const session = await unstable_getServerSession(
      req,
      res,
      //@ts-ignore
      getAuthOptions(req),
    );

    return createTRPCContext({ req, res, session }); // Возвращаем контекст, включая сессию
  },
});
