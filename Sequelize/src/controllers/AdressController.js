const { json } = require("sequelize");
const Address = require("../models/Address");
const User = require("../models/User");

module.exports = {
  async index(req, resp) {
    const { user_id } = req.params;

    const user = await User.findByPk(user_id, {
      include: { association: "addresses" },
    });

    if (!user) {
      return resp.status(400).json({ error: "User not found" });
    }

    //user.adress
    return resp.json(user);
  },

  async Store(req, resp) {
    const { user_id } = req.params;
    const { zipcode, street, number, state } = req.body;

    const user = await User.findByPk(user_id);

    if (!user) {
      return resp.status(400).json({ error: "User not found" });
    }

    const addresses = await Address.create({
      zipcode,
      street,
      number,
      state,
      user_id,
    });

    return resp.json(addresses);
  },
};
