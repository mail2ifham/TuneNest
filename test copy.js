
import express from "express";

// import crypto from "";
import axios from "axios";

var app = express();
app.use(express.json());

const generateRandomString = (length) => {
    return crypto.getRandomValues(new BigUint64Array(1))[0].toString(length);
};

app.get("/login", function (req, res) {
  var state = generateRandomString(16);
  var scope = "user-read-private user-read-email";
  const param = new URLSearchParams({
    response_type: "code",
    client_id: client_id,
    scope: scope,
    redirect_uri: redirect_uri,
    state: state,
  }).toString();

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
        redirect_uri: redirect_uri,
        grant_type: "authorization_code",
      },
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          new Buffer.from(client_id + ":" + client_secret).toString("base64"),
      },
    };
    try {
      const response = await axios(authOptions);

      //   console.log(response.data);
      const { access_token, refresh_token } = response.data;
      const prams = new URLSearchParams({
        access_token,
        refresh_token,
      }).toString();
      res.redirect("/" + prams);
    } catch (error) {
      console.error(error);
      res.send(error);
    }
  }
});

app.get("/logout", function (req, res) {
  res.clearCookie("spotify_auth_state");
  res.send("logged out");
});
app.get("/", async function (req, res) {
  const a_token = req.query.access_token;
  const r_token = req.query.refresh_token;
  // console.log("access: ",a_token,"refress: ",r_token);

  const response = await axios.get("https://api.spotify.com/v1/search", {
    headers: {
      Authorization:
        "Bearer " +
        "BQC505v_3PAGktJQ51mNTUApY9zl5x9nxrFvebQO9Iaea9FDI-7qMGVI73BRNqjVWa6GaYDoidtPia-SbxnV5diUR8cnGjpKgDSDAA9E02KYNsjJvl3J8Y9LOkrU6nHl4NVQL4ucGP76Y9xg1XLF8NjUovEAQJPMohb4GH2Qfgrvp1JIXwgnlXJkqJMxNUjzvhbS7U1epH11jTv6q399EbvI10n_-jiCXedHTsRqg9r4TuALTGyiRA",
      "Content-Type": "application/json",
    },
    params: {
      q: "a.r.rahman",
      type: "artist",
    },
  });

  console.log("9*****", response);

  const data = response.data.artists.items.map((item) => item.name);

  res.send(data);
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
