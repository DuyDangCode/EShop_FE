'use client';

import UserContext, { User } from '@/context/userContext';
import { ReactNode, useEffect, useState } from 'react';

export function Provider({
  children,
  defaultUser,
}: {
  children: ReactNode;
  defaultUser: User;
}) {
  const [user, setUser] = useState(defaultUser);
  useEffect(() => {
    setUser(defaultUser);
  }, [defaultUser]);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}