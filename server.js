const axios = require("axios");
const express = require("express");
const { IAM_TOKEN, FOLDER } = require("./keys");
const app = express();
app.use(express.static("."));
app.use(express.json());

app.post("/translate", (req, response) => {
  axios
    .post(
      "https://translate.api.cloud.yandex.net/translate/v2/translate/",
      {
        folder_id: FOLDER,
        texts: [req.body.text],
        targetLanguageCode: "ru",
      },
      {
        headers: {
          "Content-Type": "aaplication/json",
          Authorization: "Bearer " + IAM_TOKEN,
        },
      }
    )
    .then((res) => {
      response.send(res.data.translations[0].text);
    })
    .catch((err) => {
      response.send("err");
    });
});

app.listen(3000, () => console.log("Listening on port 3000"));
