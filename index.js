// init project
require('dotenv').config(); 
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/:date", (req, res) => {
  let dateString = req.params.date;

  if (/\d{5,}/.test(dateString)) {
    let dateInt = parseInt(dateString);
    res.json({ unix: parseInt(dateString), utc: new Date(dateInt).toUTCString() });
  } else {
      let dateObject = new Date(dateString);

       if (dateObject.toString() === "Invalid Date") {
        res.json({ error: "Invalid Date" });
      } else {
        res.json({ unix: parseInt(dateObject.valueOf()), utc: dateObject.toUTCString() });
      }
  }
});

app.get("/api", (req, res) => {
  let date = new Date();
  res.json({ unix: parseInt(date.valueOf()), utc: date.toUTCString() });
})

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});