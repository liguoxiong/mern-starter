import path from "path";
import "dotenv/config";
import express from "express";
import cors from "cors";
import routes from "./routes";
import "./configs/database";

const app = express(),
  DIST_DIR = __dirname,
  ADMIN_HTML_FILE = path.join(DIST_DIR, "admin/index.html"),
  HOME_HTML_FILE = path.join(DIST_DIR, "index.html");
app.use(express.static(DIST_DIR));
app.use(cors());
app.use(
  require("prerender-node").set("prerenderToken", "i8cyfM0flaG7Ls7lNrHR")
);
app.use(express.json({ limit: "50mb" }));
app.get("/admin/*", (req, res) => {
  res.sendFile(ADMIN_HTML_FILE);
});
app.use("/api/v1", routes);
app.get("/*", (req, res) => {
  res.sendFile(HOME_HTML_FILE);
});
const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`App listening to ${PORT}....`);
  console.log("Press Ctrl+C to quit.");
});
