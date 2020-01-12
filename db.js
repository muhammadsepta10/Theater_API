const mysql = require("mysql");
const connetcion = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "movie_theater"
});
