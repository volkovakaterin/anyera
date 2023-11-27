import localFont from "next/font/local";

export const ceraPro = localFont({
  src: [
    {
      path: "./fonts/ceraPro/CeraPro-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/ceraPro/CeraPro-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-ceraPro",
});

export const circe = localFont({
  src: [
    {
      path: "./fonts/circe/circe-bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-circe",
});
