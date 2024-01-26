import { FC, ReactNode } from 'react';
import { Footer } from '@components/Footer';
import { Header } from '@components/Header';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};
