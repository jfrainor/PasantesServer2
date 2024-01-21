const express = require("express");
const cors = require("cors");
const dbConfig = require("./config/dbConfig.js");
const app = express();

/* var corOptions = {
  origin: "https://localhost:8081",
};
 */
///Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const router = require("./routes/index.js");
app.use("/api", router.login); ///Endpoint de autenticación

app.use("/api/usuarios", router.usuarios);
app.use("/api/pasantes", router.pasantes);
app.use("/api/tutores", router.tutores);
app.use("/api/institucion", router.instituciones);

app.get("/", (req, res) => {
  res.json({ message: "Hello" });
});

const PORT = process.env.PORT || 6498;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
