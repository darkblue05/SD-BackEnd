const {
  User,
  UserTeacher,
  Student,
  Class,
  StudentClass,
  AttendanceClass,
} = require("../config/sequelize");
const Constants = require("../tools/constants");

const getAllAttendanceClass = (req, res) => {
  return Promise.resolve()
    .then(async () => {
      const { studentId, classId } = req.query;

      const criteria = {
        where: {
          student: studentId,
          class: classId,
        },
        attributes: ["id", "class"],
        include: [
          {
            model: Class,
            attributes: ["id", "code", "name"],
          },
          {
            model: AttendanceClass,
            attributes: ["attendance", "created_at"],
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

const createAttendanceClass = (req, res) => {
  return Promise.resolve()
    .then(async () => {
      const { students, classId } = req.body;
      const id = req.params.id;

      const classModel = await Class.findByPk(classId);

      if (!classModel) {
        let newError = new Error("Datos no encontrados");
        newError.statusCode = 401;

        throw newError;
      }

      students.forEach(async (element) => {
        const dataToCreate = {
          class: classModel.id,
          student: element.id,
          attendance: element.attendance,
        };

        const newAttendance = await AttendanceClass.create(dataToCreate);

        console.log("Asistencia creada");
      });

      res.status(200).json({
        status: Constants.Response.Success,
        data: { message: "OK" },
      });
    })
    .catch((error) =>
      res
        .status(error.statusCode || 500)
        .json({ message: error.message, status: error.statusCode } || "ERROR")
    );
};

module.exports = {
  getAllAttendanceClass,
  createAttendanceClass,
};
