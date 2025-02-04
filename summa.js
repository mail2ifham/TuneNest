
// fetch("https://accounts.spotify.com/api/token", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded"
//     },
//     body: new URLSearchParams({
//       grant_type: "client_credentials",
//       client_id: "208afff9d9a44fc69d05be7b767932d8",
//       client_secret: "647b43f0d4c0444e9eb3fa5d9bf9702d"
//     })
//   })
//   .then(response => response.json())
//   .then(data => console.log(data))
//   .catch(error => console.error("Error:", error));



  const generateRandomString = (length) => {
    return crypto.getRandomValues(new BigUint64Array(1))[0].toString(length);
  //   return crypto.randomBytes(60).toString("hex").slice(0, length);
  };

  console.log(generateRandomString(16) ,"Length: ", generateRandomString(16).length);
