const { json } = require("sequelize");
const User = require("../models/User");
const Tech = require("../models/Tech");

module.exports = {
  async index(req, resp) {},

  async Store(req, resp) {
    const { user_id } = req.params;
    const { name } = req.body;

    const user = await User.findByPk(user_id);

    if (!user) {
      return resp.status(400).json({ error: "User not found" });
    }

    const [tech] = await Tech.findOrCreate({
      where: { name },
    });

    await user.addTech(tech);

    return resp.json(tech);
  },
};
