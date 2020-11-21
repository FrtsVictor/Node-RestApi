const { json } = require("sequelize");
const User = require("../models/User");
const Tech = require("../models/Tech");

module.exports = {
  async index(req, resp) {
    const { user_id } = req.params;

    const user = await User.findByPk(user_id, {
      include: {
        association: "techs",
        attributes: ["name"], //attributes returned on requests TECHS, by default bring all
        through: { attributes: ["user_id"] }, //attributes returned on requests USER_TECHS, by default bring all
      },
    });

    return resp.json(user.techs);
  },

  async Store(req, resp) {
    const { user_id } = req.params;
    const { name } = req.body;

    const user = await User.findByPk(user_id);

    if (!user) {
      return resp.status(400).json({ error: "User not found" });
    }

    const [tech, created] = await Tech.findOrCreate({
      where: { name },
    });

    // searching a tech where name = ... if not exists create
    await user.addTech(tech);
    return resp.json(tech);
  },

  async delete(req, resp) {
    const { user_id } = req.params;
    const { name } = req.body;

    const user = await User.findByPk(user_id);

    if (!user) {
      return resp.status(400).json({ error: "User not found" });
    }

    const tech = await Tech.findOne({
      where: { name },
    });

    await user.removeTech(tech);
    return resp.json();
  },
};
