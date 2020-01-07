const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

app.listen(port, function() {
  console.log("App listening on Port " + port);
});

app.get("/notes", function(re, res) {
  res.sendFile(path.join(_dirname, "..public"));
});
