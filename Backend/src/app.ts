import cors from "cors";
import express from "express";
import expressFileUpload from "express-fileupload";
import catchAll from "./3-middleware/catch-all";
import preventXss from "./3-middleware/prevent-xss";
import routeNotFound from "./3-middleware/route-not-found";
import appConfig from "./4-utils/app-config";
import authRoutes from "./6-routes/auth-routes";
import dataRoutes from "./6-routes/data-routes";

const server = express();

server.use((req, res, next) => {
  res.set('Referrer-Policy', 'same-origin');
  next();
});

server.use(cors());
server.use(express.json());
server.use(preventXss);
server.use(expressFileUpload());
server.use("/api", dataRoutes);
server.use("/api", authRoutes);
server.use(routeNotFound);
server.use(catchAll);

server.listen(appConfig.port, () => {
  console.log("Listening on http://localhost:" + appConfig.port);
});

export default {
  server
}
