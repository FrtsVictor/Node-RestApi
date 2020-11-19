const User = require("../models/User");

module.exports = {
  async index(req, resp) {
    const users = await User.findAndCountAll();
    return resp.json(users);
  },

  async Store(req, resp) {
    const { name, username, email } = req.body;

    const user = await User.create({ name, username, email });

    return resp.json(user);
  },
};
