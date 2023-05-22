const fs = require("fs");
const path = require("path");
const { Sequelize, Op } = require("sequelize");
const config = require("./settings");
const target = path.join(__dirname, "../models");

const sequelize = new Sequelize(
  config.database.name,
  config.database.user,
  config.database.pass,
  {
    logging: config.database.log,
    dialect: "mysql",
    host: "localhost",
    port: 3306,
    define: {
      timestamps: true,
    },
    operatorsAliases: {
      $eq: Op.eq,
      $ne: Op.ne,
      $gte: Op.gte,
      $gt: Op.gt,
      $lte: Op.lte,
      $lt: Op.lt,
      $not: Op.not,
      $in: Op.in,
      $notIn: Op.notIn,
      $is: Op.is,
      $like: Op.like,
      $notLike: Op.notLike,
      $iLike: Op.iLike,
      $notILike: Op.notILike,
      $regexp: Op.regexp,
      $notRegexp: Op.notRegexp,
      $iRegexp: Op.iRegexp,
      $notIRegexp: Op.notIRegexp,
      $between: Op.between,
      $notBetween: Op.notBetween,
      $overlap: Op.overlap,
      $contains: Op.contains,
      $contained: Op.contained,
      $adjacent: Op.adjacent,
      $strictLeft: Op.strictLeft,
      $strictRight: Op.strictRight,
      $noExtendRight: Op.noExtendRight,
      $noExtendLeft: Op.noExtendLeft,
      $and: Op.and,
      $or: Op.or,
      $any: Op.any,
      $all: Op.all,
      $values: Op.values,
      $col: Op.col,
    },
  }
);
const db = {};

fs.readdirSync(target)
  .filter((file) => {
    return file.indexOf(".") !== 0 && file.indexOf(".map") === -1;
  })
  .forEach((file, index) => {
    const model = require(path.join(__dirname, "../models", file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
    console.log(index, ".- ", model.name, " imported.");
  });

Object.keys(db).forEach((name) => {
  if ("associate" in db[name]) {
    console.log("associating... ", db[name]);
    db[name].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.init = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

db.init();

module.exports = db;
