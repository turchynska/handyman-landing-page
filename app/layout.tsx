import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TurchV LLC Handyman — Charlotte NC",
  description:
    "Professional handyman services in Charlotte NC. TV mounting, drywall repair, furniture assembly and more. Starting at $130.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
      <Script
        id="oaiq-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `!function(w,d,s,u){if(w.oaig)return;var q=function(){q.q.push(arguments)};q.q=[];w.oaig=q;var j=d.createElement(s);j.async=1;j.src=u;var f=d.getElementsByTagName(s)[0];f.parentNode.insertBefore(j,f)}(window,document,"script","https://bzrcdn.openai.com/sdk/oaig.min.js");oaig("init",{pixelId:"7j7AQkNNKFEBPpaydntQ32",debug:true});`,
        }}
      />
    </html>
  );
}
