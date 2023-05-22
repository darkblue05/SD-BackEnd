const { User, UserTeacher, UserParent } = require("../config/sequelize");
const constants = require("../tools/constants");
const Constants = require("../tools/constants");

const login = (req, res) => {
  return Promise.resolve()
    .then(async () => {
      const { email, password } = req.body;

      const userData = await User.findOne({ where: { email } });

      if (userData && userData.password === password) {
        if (userData.type === constants.UserType.teacher) {
          const teacherData = await UserTeacher.findOne({
            where: { user: userData.id },
            attributes: ["id", "license"],
          });

          if (!teacherData) {
            let newError = new Error("Datos no encontrados");
            newError.statusCode = 401;

            throw newError;
          }

          res.status(200).json({
            status: Constants.Response.Success,
            data: {
              user: {
                ...userData.dataValues,
                ...teacherData.dataValues,
              },
            },
          });
        } else {
          const parentData = await UserParent.findOne({
            where: { user: userData.id },
            attributes: ["id", "phone"],
          });

          if (!parentData) {
            let newError = new Error("Datos no encontrados");
            newError.statusCode = 401;

            throw newError;
          }

          res.status(200).json({
            status: Constants.Response.Success,
            data: {
              user: {
                ...userData.dataValues,
                ...parentData.dataValues,
              },
            },
          });
        }
      } else {
        let newError = new Error("Contraseña incorrecta");
        newError.statusCode = 401;

        throw newError;
      }
    })
    .catch((error) =>
      res
        .status(error.statusCode || 500)
        .json({ message: error.message, status: error.statusCode } || "ERROR")
    );
};

const register = (req, res) => {
  return Promise.resolve()
    .then(async () => {
      const { name, lastname, type, email, password } = req.body;

      if (Constants.UserType.teacher === type) {
        const { license } = req.body;

        const dataToCreate = {
          name,
          lastname,
          type,
          email,
          type,
          password,
        };

        const userFound = await User.findOne({ where: { email } });

        if (userFound) {
          let newError = new Error("El email ya está registrado");
          newError.statusCode = 401;

          throw newError;
        }

        const newUser = await User.create(dataToCreate);

        const newTeacher = await UserTeacher.create({
          license,
          user: newUser.id,
        });

        console.log(newTeacher);

        res.status(200).json({
          status: Constants.Response.Success,
          data: {
            teacher: {
              ...newUser.dataValues,
              license,
            },
          },
        });
      } else {
        const { phone } = req.body;

        const dataToCreate = {
          name,
          lastname,
          type,
          email,
          type,
          password,
        };

        const userFound = await User.findOne({ where: { email } });

        if (userFound) {
          let newError = new Error("El email ya está registrado");
          newError.statusCode = 401;

          throw newError;
        }

        const newUser = await User.create(dataToCreate);

        const newParent = await UserParent.create({
          phone,
          user: newUser.id,
        });

        console.log(newParent);

        res.status(200).json({
          status: Constants.Response.Success,
          data: {
            teacher: {
              ...newUser.dataValues,
              phone,
            },
          },
        });
      }
    })
    .catch((error) =>
      res
        .status(error.statusCode || 500)
        .json({ message: error.message, status: error.statusCode } || "ERROR")
    );
};

module.exports = {
  register,
  login,
};
