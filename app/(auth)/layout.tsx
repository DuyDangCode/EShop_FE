import { getUserServer, redirectUserLogged } from '@/actions/user';
import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  // redirectUserLogged();
  return <>{children}</>;
}
