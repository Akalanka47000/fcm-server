const admin = require("firebase-admin");

exports.sendNotification = async (req, res) => {

  const { title, body, device_tokens } = req.body;

  if (!title) res.status(400).json({ error: "A message title is required" });

  if (!body) res.status(400).json({ error: "A message body is required" });

  if (!device_tokens)
    res.status(400).json({ error: "A set of device tokens are required" });

  if (!Array.isArray(device_tokens))
    res.status(400).json({ error: "Property device_tokens must be of type array" });

  const payload = {
    notification: {
      title: title,
      body: body,
    },
  };

  const options = {
    priority: "normal",
    timeToLive: 60 * 60,
  };

  let errors = [];
  await Promise.all(
    device_tokens.map(async (token) => {
      await admin
        .messaging()
        .sendToDevice(token, payload, options)
        .catch((error) => {
          errors.push(error);
        });
    })
  );

  if (errors.length === 0) {
    res.status(200).json({ message: "Message broadcasted successfully" });
  } else {
    res.status(500).json({ errors: errors });
  }

};
