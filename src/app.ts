
import checkRouter from "src/entrypoint/route/check.route";
import express, { Request, Response } from "express";


const app = express();
app.use(express.json());

app.get("/healths", (request: Request, response: Response) => {
  return response.json({ message: "OK" });
});


app.use(checkRouter);


export default app