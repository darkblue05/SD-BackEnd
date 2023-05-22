"use strict";

module.exports = (sequelize, DataTypes) => {
  const AttendanceClass = sequelize.define(
    "AttendanceClass",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true,
      },
      notification: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
      },
      student: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
      },
      class: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
      },
      attendance: {
        type: DataTypes.TINYINT,
        allowNull: false,
      },
    },
    {
      tableName: "attendance_class",
      timestamps: true,
      paranoid: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    }
  );

  AttendanceClass.associate = (models) => {
    AttendanceClass.hasOne(models.StudentClass, {
      foreignKey: "student",
    });
    AttendanceClass.hasOne(models.Class, {
      foreignKey: "class",
    });
    AttendanceClass.hasOne(models.Notification, {
      foreignKey: "notification",
    });
  };
  return AttendanceClass;
};
