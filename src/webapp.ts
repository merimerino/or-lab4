import express from "express";
import fs from "fs";
import path, { dirname } from "path";
import https from "https";
import bodyParser, { json } from "body-parser";
import { connectDb } from "./db";
import { auth, requiresAuth } from "express-openid-connect";
//process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(__dirname + "/static"));
app.use(
  express.static(
    `C:\Users\marij\Desktop\FER\Diplomski\1.semestar\OR\Labosi\lab2\data`
  )
);

const externalURL = process.env.RENDER_EXTERNAL_URL;

const port =
  externalURL && process.env.PORT ? parseInt(process.env.PORT) : 4080;

const config = {
  authRequired: false,
  idpLogout: true, //login not only from the app, but also from identity provider
  secret: process.env.SECRET,
  baseURL: externalURL || `https://localhost:${port}`,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: "https://working.eu.auth0.com",
  clientSecret: process.env.CLIENT_SECRET,
  authorizationParams: {
    response_type: "code",
    //scope: "openid profile email"
  },
};
// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

app.get("/", function (req, res) {
  let getuser: string | undefined;
  getuser = JSON.stringify(req.oidc.user);
  res.render("index", { getuser });
});
app.get("/sign-up", (req, res) => {
  res.oidc.login({
    returnTo: "/",
    authorizationParams: {
      screen_hint: "signup",
    },
  });
});

app.get("/datatable", requiresAuth(), async function (req, res) {
  let getuser: string | undefined;
  getuser = JSON.stringify(req.oidc.user);
  res.render("datatable", { getuser });
});

app.get("/profile", requiresAuth(), function (req, res) {
  let user = JSON.stringify(req.oidc.user);
  let getuser = JSON.parse(user);
  let verified = "";

  if (getuser.email_verified) {
    verified = "Uspješno verificiran!";
  } else {
    verified = "Potrebna verifikacija.";
  }

  res.render("profile", { getuser, verified });
});

app.get("/getData", function (req, res) {
  connectDb().then((h) => {
    res.end(h);
  });
});

https
  .createServer(
    {
      key: fs.readFileSync("server.key"),
      cert: fs.readFileSync("server.cert"),
    },
    app
  )
  .listen(port, function () {
    console.log(`Server running at https://localhost:${port}/`);
  });
