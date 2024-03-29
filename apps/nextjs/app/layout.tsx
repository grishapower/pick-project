import { PropsWithChildren } from "react";

import "normalize.css";
import "react-toastify/dist/ReactToastify.min.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "~/styles/globals.css";

// Next.js 13.2 new metadata definition standard (https://beta.nextjs.org/docs/api-reference/metadata)
export const metadata = {
  // add Metadata type
  title: {
    default: "pickem",
    template: "%s | pickem",
  },
  icons: {
    icon: "/favicon.ico",
    // shortcut: "/shortcut-icon.png",
    // apple: "/apple-icon.png",
    other: {
      // rel: "apple-touch-icon-precomposed",
      url: "/favicon.ico",
    },
  },
  description: "Welcome to Pickem",
};

// do not cache this layout
export const revalidate = 0;

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin={"anonymous"}
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Sans+Condensed:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js"
          defer
        ></script>

        {/* <script
          src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js"
          defer
        /> */}
      </head>

      <body>{children}</body>
    </html>
  );
}
