import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { generateRandomString } from "./utils/utils.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URI, credentials: true }));

app.get("/login", function (req, res) {
  var state = generateRandomString(16);
  var scope = "user-read-private user-read-email";
  const param = new URLSearchParams({
    response_type: "code",
    client_id: process.env.CLINT_ID,
    scope: scope,
    redirect_uri: process.env.REDIRECT_URI,
    state: state,
  }).toString();

  console.log(param);

  res.redirect("https://accounts.spotify.com/authorize?" + param);
});

app.get("/callback", async function (req, res) {
  const code = req.query.code || null;
  const state = req.query.state || null;
  const prams = new URLSearchParams({ error: "state_mismatch" }).toString();

  if (state === null) {
    res.redirect("/#" + prams);
  } else {
    var authOptions = {
      url: "https://accounts.spotify.com/api/token",
      method: "post",
      data: {
        code: code,
        redirect_uri: process.env.REDIRECT_URI,
        grant_type: "authorization_code",
      },
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          new Buffer.from(
            process.env.CLIENT_ID + ":" + process.env.CLINT_SECRET
          ).toString("base64"),
      },
    };

    res.send("Hello");
  }
});

app.get("/logout", (req, res) => {
  res.redirect("https://accounts.spotify.com/logout");

});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
