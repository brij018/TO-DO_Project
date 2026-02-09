import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

let tasks = [];

app.get("/", (req, res) => {
  res.render("index", { tasks });
});

app.post("/add", (req, res) => {
  const taskText = req.body.task;

  if (taskText && taskText.trim() !== "") {
    tasks.push({
      text: taskText,
      completed: false
    });
  }

  res.redirect("/");
});

app.post("/toggle/:index", (req, res) => {
  const i = req.params.index;
  tasks[i].completed = !tasks[i].completed;
  res.redirect("/");
});

app.post("/delete/:index", (req, res) => {
  tasks.splice(req.params.index, 1);
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Server running on port :${PORT}`);
});
