const router = require("express").Router();

const notifications = require("./notifications");

router.use(notifications);

module.exports = router;
