const {
  User,
  UserTeacher,
  Student,
  Class,
  StudentClass,
} = require("../config/sequelize");
const Constants = require("../tools/constants");

const getAllStudentClass = (req, res) => {
  return Promise.resolve()
    .then(async () => {
      const { id } = req.params;

      const criteria = {
        where: {
          student: id,
        },
        attributes: ["id", "class"],
        include: [
          {
            model: Class,
            attributes: ["id", "code", "name"],
          },
        ],
        raw: true,
      };

      let listStudent = await StudentClass.findAndCountAll(criteria);

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

const createStudentClass = (req, res) => {
  return Promise.resolve()
    .then(async () => {
      const { code } = req.body;
      const id = req.params.id;

      const classModel = await Class.findOne({ where: { code } });

      if (!classModel) {
        let newError = new Error("Datos no encontrados");
        newError.statusCode = 401;

        throw newError;
      }

      const dataToCreate = {
        student: id,
        class: classModel.id,
      };

      const newStudentClass = await StudentClass.create(dataToCreate);

      res.status(200).json({
        status: Constants.Response.Success,
        data: newStudentClass,
      });
    })
    .catch((error) =>
      res
        .status(error.statusCode || 500)
        .json({ message: error.message, status: error.statusCode } || "ERROR")
    );
};

const deleteStudentClass = (req, res) => {
  let back = {};

  return Promise.resolve()
    .then(async () => {
      const id = req.params.id;

      let StudentModel = await StudentClass.findByPk(id);

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
  getAllStudentClass,
  createStudentClass,
  deleteStudentClass,
};
