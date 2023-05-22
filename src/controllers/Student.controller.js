const { User, UserTeacher, Student } = require("../config/sequelize");
const Constants = require("../tools/constants");

const getAllStudent = (req, res) => {
  return Promise.resolve()
    .then(async () => {
      const { id } = req.params;

      const criteria = {
        where: {
          parent: id,
        },
        attributes: ["id", "name", "lastname"],
        raw: true,
      };

      let listStudent = await Student.findAndCountAll(criteria);

      res.status(200).json({
        status: Constants.Response.Success,
        data: listStudent,
      });
    })
    .catch((error) =>
      res
        .status(error.statusCode || 500)
        .json({ message: error.message, status: error.statusCode } || "ERROR")
    );
};

const createStudent = (req, res) => {
  return Promise.resolve()
    .then(async () => {
      const { name, lastname } = req.body;
      const id = req.params.id;

      const dataToCreate = {
        parent: id,
        name,
        lastname,
      };
      const newStudent = await Student.create(dataToCreate);

      res.status(200).json({
        status: Constants.Response.Success,
        data: {
          newStudent,
        },
      });
    })
    .catch((error) =>
      res
        .status(error.statusCode || 500)
        .json({ message: error.message, status: error.statusCode } || "ERROR")
    );
};

const getOneStudent = (req, res) => {
  return Promise.resolve()
    .then(async () => {
      const id = req.params.id;

      const StudentModel = await Student.findByPk(id);

      if (!StudentModel) {
        let newError = new Error("Datos no encontrados");
        newError.statusCode = 401;

        throw newError;
      }
      res.status(200).json({
        status: Constants.Response.Success,
        data: {
          StudentModel,
        },
      });
    })
    .catch((error) =>
      res
        .status(error.statusCode || 500)
        .json({ message: error.message, status: error.statusCode } || "ERROR")
    );
};

const updateStudent = (req, res) => {
  let back = {};

  return Promise.resolve()
    .then(async () => {
      const id = req.params.id;

      let StudentModel = await Student.findByPk(id);

      if (!StudentModel) {
        let newError = new Error("Datos no encontrados");
        newError.statusCode = 401;

        throw newError;
      }

      back.StudentModel = StudentModel;
    })
    .then(async () => {
      const { name, lastname } = req.body;

      const dataToUpdate = {
        name,
        lastname,
      };

      await back.StudentModel.update(dataToUpdate);

      res.status(200).json({
        status: Constants.Response.Success,
        data: {
          StudentModel,
        },
      });
    })
    .catch((error) =>
      res
        .status(error.statusCode || 500)
        .json({ message: error.message, status: error.statusCode } || "ERROR")
    );
};

const deleteStudent = (req, res) => {
  let back = {};

  return Promise.resolve()
    .then(async () => {
      const id = req.params.id;

      let StudentModel = await Student.findByPk(id);

      if (!StudentModel) {
        let newError = new Error("Datos no encontrados");
        newError.statusCode = 401;

        throw newError;
      }

      back.StudentModel = StudentModel;
    })
    .then(async () => {
      await back.StudentModel.destroy();

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
  getAllStudent,
  createStudent,
  getOneStudent,
  updateStudent,
  deleteStudent,
};
