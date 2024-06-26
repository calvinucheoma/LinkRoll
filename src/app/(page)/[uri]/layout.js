import { Lato } from 'next/font/google';
import '../../globals.css';

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
        <main>{children}</main>
      </body>
    </html>
  );
}
