import { CookiesProvider } from "next-client-cookies/server";
import "@/app/globals.css";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Esport",
  description: "Next 14 App",
};

const StartLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="fr">
      <body>
        <CookiesProvider>{children}</CookiesProvider>
      </body>
    </html>
  );
};

export default StartLayout;
