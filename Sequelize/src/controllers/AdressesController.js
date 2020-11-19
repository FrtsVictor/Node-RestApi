const { json } = require("sequelize");
const Adresses = require("../models/Addresses");
const User = require("../models/User");

module.exports = {
  async index(req, resp) {
    const { user_id } = req.params;

    const user = await User.findByPk(user_id);

    if (!user) {
      return resp.status(400).json({ error: "User not found" });
    }

    return resp.json(users);
  },

  async Store(req, resp) {
    const { user_id } = req.params;
    const { zipcode, street, number, state } = req.body;

    const user = await User.findByPk(user_id);

    if (!user) {
      return resp.status(400).json({ error: "User not found" });
    }

    const addresses = await Adresses.create({
      zipcode,
      street,
      number,
      state,
      user_id,
    });

    return resp.json(addresses);
  },
};
