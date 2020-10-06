const express = require('express')
const app = express()
const port =process.env.PORT || 3000

const https = require('https');
app.use(express.urlencoded({
  extended: true
}));
//requiring the mailchimp
const mailchimp = require("@mailchimp/mailchimp_marketing");
//relative! when accesing from html move as if you are in public
//static is when you use local file in server
app.use(express.static("public"));



app.get('/', function(req, res) {

  res.sendFile(__dirname + "/signup.html")

});

mailchimp.setConfig({
  apiKey: "a6341267fcd4c6a2e7b97a1bf481acbc",
  server: "us2",

});

//

app.post("/", function(req, res) {

  var firstName = req.body.firstName
  var lastName = req.body.lastName
  var email = req.body.email

  const listId = "fdb7c038a4";
const subscribingUser = {
  firstName: firstName,
  lastName: lastName,
  email: email
};

async function run() {
  const response = await mailchimp.lists.addListMember(listId, {
    email_address: subscribingUser.email,
    status: "subscribed",
    merge_fields: {
      FNAME: subscribingUser.firstName,
      LNAME: subscribingUser.lastName
    }
  });
//If all goes well logging the contact's id
res.sendFile(__dirname + "/success.html")
  console.log(
    `Successfully added contact as an audience member. The contact's id is ${
      response.id
    }.`
  );
}

run().catch(e => res.sendFile(__dirname + "/failure.html"));

})

//

app.listen(process.env.PORT || 3000, function() {
  console.log("App listening at port 3000")
});



// list id
