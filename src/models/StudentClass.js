"use strict";

module.exports = (sequelize, DataTypes) => {
  const StudentClass = sequelize.define(
    "StudentClass",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true,
      },
      student: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
      },
      class: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
      },
    },
    {
      tableName: "student_class",
      timestamps: true,
      paranoid: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    }
  );

  StudentClass.associate = (models) => {
    StudentClass.hasOne(models.Student, {
      foreignKey: "student",
    });
    StudentClass.hasOne(models.Class, {
      foreignKey: "class",
    });
  };
  return StudentClass;
};
