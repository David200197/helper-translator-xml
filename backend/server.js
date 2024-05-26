import express from "express";
import open from "open";
const app = express();
const port = 8080;

app.post("/api/close", (_, res) => {
  process.exit(1);
});

app.use("/", express.static("public"));

app.listen(port, async () => {
  console.log(`Example app listening on port ${port}`);
  await open(`http://localhost:${port}/`);
});
