'use client'

import { USER_TYPE } from '@/helpers/contants';
import React, { useState } from 'react';

interface IGlobalContextProps {
  userId: string;
  userType: string,
  loading: boolean;
  setUserId: (user: any) => void;
  setUserType: (user: any) => void;
  setLoading: (loading: boolean) => void;
}

export const GlobalContext = React.createContext<IGlobalContextProps>({
  userId: "",
  loading: true,
  userType: "",
  setUserId: () => {},
  setUserType: () => {},
  setLoading: () => {},
});

export const GlobalContextProvider = (props: { children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; }) => {
  const [userId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [userType, setUserType] = useState(USER_TYPE.DRIVER);

  return (
    <GlobalContext.Provider
      value={{
        userId,
        userType,
        loading: isLoading,
        setUserType,
        setUserId,
        setLoading: setIsLoading,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};