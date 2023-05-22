const { User, UserTeacher, Class } = require("../config/sequelize");
const Constants = require("../tools/constants");

const getAllClass = (req, res) => {
  return Promise.resolve()
    .then(async () => {
      const { id } = req.params;

      const criteria = {
        where: {
          teacher: id,
        },
        attributes: ["id", "name", "code"],
        raw: true,
      };

      let listClass = await Class.findAndCountAll(criteria);

      res.status(200).json({
        status: Constants.Response.Success,
        data: listClass,
      });
    })
    .catch((error) =>
      res
        .status(error.statusCode || 500)
        .json({ message: error.message, status: error.statusCode } || "ERROR")
    );
};

const createClass = (req, res) => {
  return Promise.resolve()
    .then(async () => {
      const { name, code, grade, group, state, town, school } = req.body;
      const id = req.params.id;

      const dataToCreate = {
        teacher: id,
        name,
        code,
        grade,
        group,
        state,
        town,
        school,
      };
      const newClass = await Class.create(dataToCreate);

      res.status(200).json({
        status: Constants.Response.Success,
        data: {
          newClass,
        },
      });
    })
    .catch((error) =>
      res
        .status(error.statusCode || 500)
        .json({ message: error.message, status: error.statusCode } || "ERROR")
    );
};

const getOneClass = (req, res) => {
  return Promise.resolve()
    .then(async () => {
      const id = req.params.id;

      const classModel = await Class.findByPk(id);

      if (!classModel) {
        let newError = new Error("Datos no encontrados");
        newError.statusCode = 401;

        throw newError;
      }
      res.status(200).json({
        status: Constants.Response.Success,
        data: {
          classModel,
        },
      });
    })
    .catch((error) =>
      res
        .status(error.statusCode || 500)
        .json({ message: error.message, status: error.statusCode } || "ERROR")
    );
};

const updateClass = (req, res) => {
  let back = {};

  return Promise.resolve()
    .then(async () => {
      const id = req.params.id;

      let classModel = await Class.findByPk(id);

      if (!classModel) {
        let newError = new Error("Datos no encontrados");
        newError.statusCode = 401;

        throw newError;
      }

      back.classModel = classModel;
    })
    .then(async () => {
      const { name, code, grade, group, state, town, school } = req.body;

      const dataToUpdate = {
        name,
        code,
        grade,
        group,
        state,
        town,
        school,
      };

      await back.classModel.update(dataToUpdate);

      res.status(200).json({
        status: Constants.Response.Success,
        data: {
          classModel,
        },
      });
    })
    .catch((error) =>
      res
        .status(error.statusCode || 500)
        .json({ message: error.message, status: error.statusCode } || "ERROR")
    );
};

const deleteClass = (req, res) => {
  let back = {};

  return Promise.resolve()
    .then(async () => {
      const id = req.params.id;

      let classModel = await Class.findByPk(id);

      if (!classModel) {
        let newError = new Error("Datos no encontrados");
        newError.statusCode = 401;

        throw newError;
      }

      back.classModel = classModel;
    })
    .then(async () => {
      await back.classModel.destroy();

      res.status(200).json({
        status: Constants.Response.Success,
        data: {
          deleted: "OK",
        },
      });
    })
    .catch((error) =>
      res
        .status(error.statusCode || 500)
        .json({ message: error.message, status: error.statusCode } || "ERROR")
    );
};

module.exports = {
  getAllClass,
  createClass,
  getOneClass,
  updateClass,
  deleteClass,
};
