"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { io as ClientIO, Socket } from "socket.io-client";

type SocketContextType = {
  socket: any | null;
  isConnected: boolean;
};

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

export const useSocket = () => {
  const ctx = useContext(SocketContext);

  if (!ctx) {
    throw new Error("useSocket must be used inside SocketProvider");
  }

  return ctx;
};

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<Socket<any, any> | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socketInstance = ClientIO(process.env.NEXT_PUBLIC_SITE_URL!, {
      path: "/api/socket/io",
      addTrailingSlash: false,
    });

    socketInstance.on("connect", () => {
      setIsConnected(true);
    });

    socketInstance.on("disconnect", () => {
      setIsConnected(false);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};
