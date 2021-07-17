const express = require("express");
const https = require("https");

const app = express();
app.use(express.static("public"));
app.use(express.urlencoded()); //alternative for deprecated bodyparser

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
  const fName = req.body.fName;
  const sName = req.body.sName;
  const email = req.body.email;

	console.log(fName, sName, email);


  const userData = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_feilds: {
          FNAME: fName,
          LNAME: sName,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(userData);

  const url = "https://us6.api.mailchimp.com/3.0/lists/5da87f9081";

  const options = {
    method: "POST",
    auth:
  }

  const request = https.request(url, options, (response) => {
    console.log(response.statusCode); //check connection status
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", (data) => {
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();
});

app.post("/failure", (req, res) => { //route post request
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running");
});
