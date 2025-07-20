import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import { Provider } from "@/components/ui/provider"
import "./globals.css";


const lexend = Lexend({
  weight: ['100','200','300','400','500','600', '700','800','900'],
  subsets: ['latin'],
  variable: '--font-lexend'
});

export const metadata: Metadata = {
  title: "Dakicodeur",
  description: "Fullstack developer passionate about AI, cloud, and workflow automation (n8n, Make, Zapier). Available for freelance, full-time, or contract roles.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark overflow-x-hidden md:overflow-x-visible ">
      <body
        className={`${lexend.variable}  antialiased overflow-x-hidden md:overflow-x-visible `}
      > 
      
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
