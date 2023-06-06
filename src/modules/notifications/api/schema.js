const { Joi } = require("celebrate");

exports.sendSchema = Joi.object({
  title: Joi.string().required(),
  body: Joi.string().required(),
  priority: Joi.string().valid("normal", "high"),
  device_tokens: Joi.array().items(Joi.string()).required()
});
