const axios = require("axios");
const express = require("express");
const app = express();
app.use(express.static("."));
app.use(express.json());
const IAM_TOKEN =
  "t1.9euelZqbx5SbmJjLlonImsmezZmNy-3rnpWamZTIi5XLk5mby5STkc3IyZPl8_dAO1B_-e9nBAAw_t3z9wBqTX_572cEADD-.NuIh4fz95hYV3fcsUNx9z7TzcZUG-TuHVc6rX-O2EZxqPVnyfvKhpSEWkTHk-zksHBFL0GdgBwPWwN4QzJsRAA";
const FOLDER = "b1ghe29nv5heb4q8ffol";

app.post("/translate", (req, response) => {
  const newGood = req.body;
  let result = axios
    .post(
      "https://translate.api.cloud.yandex.net/translate/v2/translate/",
      {
        folder_id: FOLDER,
        texts: [newGood.text],
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
      console.log(res.data.translations[0].text);
      response.send(res.data.translations[0].text);
    })
    .catch((err) => {
      console.log(err);
    });
  //response.send(result.res);
});

app.listen(3000, () => console.log("Listening on port 3000"));
