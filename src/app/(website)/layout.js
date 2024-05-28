import { Lato } from 'next/font/google';
import '../globals.css';
import Header from '@/components/Header';

const lato = Lato({ subsets: ['latin'], weight: ['400', '700'] });

export const metadata = {
  title: 'LinkRoll',
  description:
    'Your one link for everything. Share your links, social profiles, contact info and more on one page',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={lato.className}>
        <main className="overflow-hidden">
          <Header />
          <div className="p-6 max-w-4xl mx-auto">{children}</div>
        </main>
      </body>
    </html>
  );
}
