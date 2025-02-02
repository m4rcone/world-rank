import './global.css'
import { Be_Vietnam_Pro } from 'next/font/google'
import Header from './ui/header';

const beVietnamPro = Be_Vietnam_Pro({
  weight: ["400", "500", "600", "700"],
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={beVietnamPro.className}>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
