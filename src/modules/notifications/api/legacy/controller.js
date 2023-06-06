const admin = require("firebase-admin");
const router = require("express").Router();
const { celebrate, Segments } = require("celebrate");
const { sendSchema } = require("../schema");

router.post("/send", celebrate({ [Segments.BODY]: sendSchema }), async (req, res) => {
  const payload = {
    notification: { title: req.body.title, body: req.body.body }
  };
  const options = { priority: req.body.priority ?? "normal", timeToLive: 60 * 60 };
  let errors = [];
  await Promise.all(
    req.body.device_tokens.map(async (token) => {
      await admin
        .messaging()
        .sendToDevice(token, payload, options)
        .catch((error) => errors.push(error));
    })
  );
  if (!errors.length) {
    return res.status(200).json({ message: "Message broadcasted successfully" });
  }
  return res.status(424).json({ errors: errors });
});

module.exports = router;
