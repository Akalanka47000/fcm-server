const admin = require("firebase-admin");
const router = require("express").Router();
const { celebrate, Segments } = require("celebrate");
const { sendSchema } = require("../schema");

router.post("/send", celebrate({ [Segments.BODY]: sendSchema }), async (req, res) => {
  let errors = [];
  await Promise.all(
    req.body.device_tokens.map(async (token) => {
      await admin
        .messaging()
        .send({
          token: token,
          notification: { title: req.body.title, body: req.body.body }
        })
        .catch((error) => errors.push(error));
    })
  );
  if (!errors.length) {
    return res.status(200).json({ message: "Message broadcasted successfully" });
  }
  return res.status(424).json({ errors: errors });
});

module.exports = router;
