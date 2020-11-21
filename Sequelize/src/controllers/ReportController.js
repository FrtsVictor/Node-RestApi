const { Op } = require("sequelize"); //import sequelize operators
const User = require("../models/User");

module.exports = {
  async show(req, resp) {
    const users = await User.findAll({
      where: {
        email: {
          [Op.iLike]: "%@gmail", //using [] on Op.Like set the name variable value to attribute object
        },
      },
      include: [
        { association: "addresses", where: { street: "rua yamatos" } }, //adress

        {
          association: "techs",
          required: false, //don't exclude the rest of result if don't have the especifiv assosiation closure
          where: {
            name: {
              [Op.iLike]: "React%",
            },
          },
        },
      ],
    });

    return resp.json(users);
  },
};
