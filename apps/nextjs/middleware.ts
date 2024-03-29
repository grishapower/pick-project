import createIntlMiddleware from "next-intl/middleware";
import { type NextRequest } from "next/server"; // Импортируем NextResponse для перенаправления

export async function middleware(req: NextRequest) {
  // const acceptLanguage = req.headers.get("accept-language");
  // Создаем и применяем next-intl middleware
  const intlMiddleware = createIntlMiddleware({
    locales: ["en", "ru"],
    defaultLocale: "ru", // Стандартная локаль
    localeDetection: true,
  });

  // Вызываем next-intl middleware с текущим запросом
  // Важно, чтобы это было выполнено до любых перенаправлений, чтобы гарантировать, что локализация работает корректно
  const response = intlMiddleware(req);

  // Возвращаем ответ от next-intl middleware, если не требуется перенаправление
  return response;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
