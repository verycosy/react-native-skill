import React, {createContext, ReactNode, useContext, useState} from 'react';
import {User} from '../lib/users';

interface IUserContext {
  user: User | null;
  setUser: (user: User) => void;
}

const UserContext = createContext<IUserContext | null>(null);

interface Props {
  children: ReactNode;
}

export function UserContextProvider({children}: Props) {
  const [user, setUser] = useState<User | null>(null);

  return <UserContext.Provider children={children} value={{user, setUser}} />;
}

export function useUserContext() {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error('UserContext.Provider is not found');
  }

  return userContext;
}
