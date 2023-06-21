'use client'

import { USER_TYPE } from '@/helpers/contants';
import React, { useState } from 'react';

interface IGlobalContextProps {
  userId: string;
  userType: string,
  loading: boolean;
  openDrawer: boolean;
  setUserId: (user: string) => void;
  setUserType: (userType: string) => void;
  setLoading: (loading: boolean) => void;
  setOpenDrawer: (open: boolean) => void;
}

export const GlobalContext = React.createContext<IGlobalContextProps>({
  userId: "",
  loading: true,
  userType: "",
  openDrawer: false,
  setUserId: () => {},
  setUserType: () => {},
  setLoading: () => {},
  setOpenDrawer: () => {},
});

export const GlobalContextProvider = (props: { children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; }) => {
  const [userId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [userType, setUserType] = useState(USER_TYPE.DRIVER);
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <GlobalContext.Provider
      value={{
        userId,
        userType,
        loading: isLoading,
        openDrawer,
        setUserType,
        setUserId,
        setLoading: setIsLoading,
        setOpenDrawer
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};