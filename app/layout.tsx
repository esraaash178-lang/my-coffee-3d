import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: 'AURA COFFEE | تجربة القهوة المختصة والسينمائية',
  description: 'اكتشف عالم من النكهات السحرية والقهوة المختصة المصنوعة بكل شغف. اصنع فنجانك بنفسك واستمتع بتجربة 3D فريدة.',
  keywords: ['Aura Coffee', 'أورا كافيه', 'قهوة مختصة', 'Specialty Coffee', '3D Coffee Experience'],
  
  // 🌟 كارت المشاركة (Open Graph)
  openGraph: {
    title: 'AURA COFFEE | تجربة القهوة المختصة والسينمائية ☕✨',
    description: 'تذوق أروع أنواع القهوة العضوية واصنع فنجانك المفضل بتجربة تفاعلية ساحرة.',
    url: 'https://aura-coffee.vercel.app',
    siteName: 'AURA COFFEE',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Aura Coffee Preview',
      },
    ],
    locale: 'ar_EG',
    type: 'website',
  },
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
    </html>
  );
}
