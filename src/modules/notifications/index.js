const router = require("express").Router();

const legacyController = require("./api/legacy/controller");
const v1Controller = require("./api/v1/controller");

const prefix = "notifications";

router.use(`/legacy/${prefix}`, legacyController);
router.use(`/v1/${prefix}`, v1Controller);

module.exports = router;
