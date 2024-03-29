import OneSignal from "react-onesignal";

export default async function runOneSignal() {
  if (!process.env.ONESIGNAL_ENV) return false;

  await OneSignal.init({
    appId: process.env.ONESIGNAL_ENV,
    allowLocalhostAsSecureOrigin: true,
  });
}
