import { Server as NetServer } from "http";
import { NextApiRequest } from "next";
import { Server as ServerIO } from "socket.io";

import { NextApiResponseServerIO } from "@/types";

export const bodyParser = false;

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (!res.socket?.server.io) {
    const path = "/api/socket/io";
    const httpServer: NetServer = res.socket?.server as any;
    const io = new ServerIO(httpServer, {
      path: path,
      addTrailingSlash: false,
    });

    res.socket = Object.assign(res.socket, { server: { io } });
  }

  res
    .status(201)
    .json({ success: true, message: "Socket is started", socket: `:${4000}` });
};

export default ioHandler;
