const express = require("express");
const bodyParser = require("body-parser");
require("express-group-routes");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

const genreContr = require("./controllers/genre");
const filmContr = require("./controllers/film");
const scheduleContr = require("./controllers/schedule");
const authContr = require("./controllers/auth");
const userContr = require("./controllers/user");
const cinemaContr = require("./controllers/cinema");
const studioContr = require("./controllers/studio");
const paymentContr = require("./controllers/payment");
const seatContr = require("./controllers/seat");
const timeContr = require("./controllers/time");

app.group("/api/genres", router => {
  router.get("/", genreContr.index);
  router.post("/create", genreContr.create);
  router.put("/edit/:id", genreContr.edit);
  router.delete("/delete/:id", genreContr.delete);
});

app.group("/api/films", router => {
  router.get("/", filmContr.index);
  router.post("/create", filmContr.input);
  router.get("/:id", filmContr.byId);
  router.put("/edit/:id", filmContr.edit);
  router.delete("/delete/:id", filmContr.delete);
});

app.group("/api/schedules", router => {
  router.get("/release", scheduleContr.indexRelease);
  router.get("/comingSoon", scheduleContr.indexComingSoon);
  router.get("/byFilm/:id", scheduleContr.filmSchedule);
  router.post("/create", scheduleContr.create);
  router.get("/", scheduleContr.index);
  router.get("/:id/:id_film", scheduleContr.indexByStudio);
});

app.group("/api/auth", router => {
  router.post("/login", authContr.login);
  router.post("/register", authContr.register);
});

app.group("/api/users", router => {
  router.get("/user/:id", userContr.show);
  router.put("/edit/:id", userContr.edit);
  router.delete("/delete/:id", userContr.delete);
  router.get("/", userContr.index);
});

app.group("/api/cinemas", router => {
  router.get("/", cinemaContr.index);
  router.post("/create", cinemaContr.input);
  router.delete("/delete/:id", cinemaContr.delete);
  router.put("/edit/:id", cinemaContr.edit);
});

app.group("/api/studio", router => {
  router.get("/", studioContr.index);
  router.get("/:id", studioContr.indexByCinema);
  router.post("/create", studioContr.create);
  router.delete("/delete/:id", studioContr.delete);
  router.put("/edit/:id", studioContr.edit);
});

app.group("/api/payments", router => {
  router.post("/create", paymentContr.create);
  router.get("/pending/:id", paymentContr.byUserPending);
  router.get("/confirm/:id", paymentContr.byUserConfirm);
  router.get("/approved/:id", paymentContr.byUserApproved);
  router.put("/update/:id", paymentContr.update);
  router.get("/status/:id", paymentContr.status);
});

app.group("/api/seats", router => {
  router.get("/:id/:id_studio", seatContr.seatIndex);
  router.post("/create", seatContr.create);
  router.delete("/delete/:id", seatContr.delete);
  router.put("/edit/:id", seatContr.edit);
  router.get("/", seatContr.countChairs);
  router.get("/:id", seatContr.by_studio);
});

app.group("/api/times", router => {
  router.get("/", timeContr.index);
  router.get("/:id/:id_film", timeContr.byStudio);
  router.get("/:id", timeContr.show);
});

app.listen(port);
