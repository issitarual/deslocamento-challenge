"use client";

import { USER_TYPE } from "@/helpers/contants";
import React, { useState } from "react";

interface IGlobalContextProps {
  userId: string;
  userType: string;
  vehicleId: string;
  loading: boolean;
  openDrawer: boolean;
  setUserId: (user: string) => void;
  setVehicleId: (vehicle: string) => void;
  setUserType: (userType: string) => void;
  setLoading: (loading: boolean) => void;
  setOpenDrawer: (open: boolean) => void;
}

export const GlobalContext = React.createContext<IGlobalContextProps>({
  userId: "",
  vehicleId: "",
  loading: true,
  userType: "",
  openDrawer: false,
  setUserId: () => {},
  setVehicleId: () => {},
  setUserType: () => {},
  setLoading: () => {},
  setOpenDrawer: () => {},
});

export const GlobalContextProvider = (props: {
  children:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | Iterable<React.ReactNode>
    | React.ReactPortal
    | React.PromiseLikeOfReactNode
    | null
    | undefined;
}) => {
  const [userId, setUserId] = useState("");
  const [vehicleId, setVehicleId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState(USER_TYPE.DRIVER);
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <GlobalContext.Provider
      value={{
        userId,
        vehicleId,
        userType,
        loading: isLoading,
        openDrawer,
        setUserType,
        setUserId,
        setVehicleId,
        setLoading: setIsLoading,
        setOpenDrawer,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
