import { createContext } from 'react';

const UserContext = createContext<UserContext>({
  user: null,
  setUser: (data: any) => {},
});

export interface User {
  userId: string | null | undefined;
  roles: string | null | undefined;
}

interface UserContext {
  user: any;
  setUser: Function;
}

export default UserContext;
