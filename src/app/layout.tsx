import RootLayout from '@/components/layout/RootLayout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Postrizerz - Wooden Wall Art Posters',
  description: 'Transform your space with our curated wooden poster collection. Explore movie, TV show, game, and anime designs.',
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RootLayout>{children}</RootLayout>;
}
