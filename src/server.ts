import checkRouter from "src/entrypoint/route/check.route";
import app from "./app";

const serverPort = Number(8080);
app.use(checkRouter);

app.listen(serverPort, () =>
  console.log("Server running on localhost:" + serverPort)
);

export default app;
