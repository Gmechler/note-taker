var express = require("express");
var path = require("path");
var fs = require("fs");
var app = express();
var PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "notes.html"));
});

app.get("/assets/css/styles.css", function(req, res) {
  res.sendFile(path.join(__dirname, "./assets/css/styles.css"));
});

app.get("/assets/js/index.js", function(req, res) {
  res.sendFile(path.join(__dirname, "./assets/js/index.js"));
});

app.get("/db2.json", function(req, res) {
  res.sendFile(path.join(__dirname, "db2.json"));
});

app.get("/api/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "db2.json"));
});

app.post("/api/notes", function(req, res) {
  var newNote = req.body;
  console.log(newNote);
  fs.readFile("db2.json", function(err, data) {
    var json = JSON.parse(data);
    json.push(newNote);
    console.log(json.length);
    for (i = 0; i < json.length; i++) {
      json[i].id = i + 1;
    }
    fs.writeFile("db2.json", JSON.stringify(json), function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Note added!");
      }
    });
  });
  res.sendFile(path.join(__dirname, "notes.html"));
});
app.delete("/api/notes/:id", function(req, res) {
  var chosen = req.params.id;
  console.log(chosen);
  fs.readFile("db2.json", function(err, data) {
    var json = JSON.parse(data);
    for (i = 0; i < json.length; i++) {
      if (chosen == json[i].id) {
        console.log(json[i]);
        json.splice(i, 1);
      }
    }
    fs.writeFile("db2.json", JSON.stringify(json), function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Note deleted!");
      }
    });
  });
  res.sendFile(path.join(__dirname, "notes.html"));
});
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
