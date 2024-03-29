import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import React from "react";
import { ToastContainer } from "react-toastify";
import { AdBgBanner, Footer, Header, StikyMobileNav } from "~/components";
import { TRPCProvider } from "~/contexts/TRPCProvider";
import { Providers } from "../providers";

import { Onboarding } from "~/components/Onboarding";
import bg from "~/images/arts/bg.svg";

import { BannerTop } from "~/components/BannerTop";
import { GeoProvider } from "~/contexts/GeoContext";

export async function generateStaticParams() {
  return [{ locale: "ru" }, { locale: "en" }];
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string }; //TODO
}) {
  let messages;
  try {
    messages = (await import(`../../locales/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <GeoProvider>
      <Providers>
        <TRPCProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {false ? (
              <Onboarding />
            ) : (
              <>
                <div className="flex flex-col justify-between">
                  <Header />
                  <main>
                    <AdBgBanner />
                    <div className="inner-container relative h-full">
                      <BannerTop />
                      <div
                        className="bg-bgMain min-h-[100vh] px-4 py-6 sm:px-8 sm:py-6" // todo fix after
                        style={{ backgroundImage: `url(${bg.src})` }} // fix it mobile version
                      >
                        {children}
                      </div>
                    </div>
                  </main>
                  <Footer />
                  <ToastContainer />
                </div>
                <StikyMobileNav />
              </>
            )}
          </NextIntlClientProvider>
        </TRPCProvider>
      </Providers>
    </GeoProvider>
  );
}
