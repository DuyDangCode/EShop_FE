'use client';

import UserContext, { User } from '@/context/userContext';
import { ReactNode, useState } from 'react';

export function Provider({
  children,
  defaultUser,
}: {
  children: ReactNode;
  defaultUser: User;
}) {
  const [user, setUser] = useState(defaultUser);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {user.userId && <>Logged</>}
      {children}
    </UserContext.Provider>
  );
}
