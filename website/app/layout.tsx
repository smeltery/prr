import Link from "next/link";
import type { Metadata } from "next";
import "@fontsource-variable/dm-sans";
import "@/styles/globals.css";
import "@/styles/site.css";
import { MarketingNav } from "@/components/MarketingLayout";
import { MarketingFooter } from "@/components/MarketingFooter";

const siteUrl = process.env.SITE_URL;
const socialImage = siteUrl
  ? `${siteUrl}/og.png`
  : "https://raw.githubusercontent.com/smeltery/prr/master/assets/og.png";

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: { default: "prr — A second look. A better change.", template: "%s · prr" },
  description:
    "Thoughtful AI code reviews for GitHub pull requests and local branches. Your agents, your workflow, one simple command.",
  openGraph: {
    title: "prr — A second look. A better change.",
    description: "Your agents, your workflow, one simple command.",
    images: [{ url: socialImage, width: 1200, height: 630, alt: "prr — Good code deserves a second look." }],
    type: "website",
  },
  twitter: { card: "summary_large_image", images: [socialImage] },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" id="top">
      <body>
        <Link className="skip" href="#main">
          Skip to content
        </Link>
        <MarketingNav />
        {children}
        <MarketingFooter />
      </body>
    </html>
  );
}
