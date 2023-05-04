require("dotenv").config()
let getHomepage = (req, res) => {
  return res.send("Xin chao");
};
let getWebhook = (req, res) => {
    let VERIFY_TOKEN = process.env.VERIFY_TOKEN
  // Parse the query params
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  // Check if a token and mode is in the query string of the request
  if (mode && token) {
    // Check the mode and token sent is correct
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      // Respond with the challenge token from the request
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      // Respond with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
};
let postWebhook = (req, res) => {
  let body = req.body;
  if(body.object === 'page') {
    body.entry.forEach(entry => {
        let webhook_event = entry.messaging[0];
        console.log(webhook_event)
    })
    res.status(200).send('EVENT_RECEIVED');
  }else {
    res.sendStatus(404)
  }
};
module.exports = {
  getHomepage: getHomepage,
  getWebhook: getWebhook,
  postWebhook: postWebhook,
};
