"use strict";

module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define(
    "Notification",
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
      body: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
      },
      seen_at: {
        type: DataTypes.TIME,
        allowNull: true,
      },
    },
    {
      tableName: "attendance",
      timestamps: true,
      paranoid: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    }
  );

  Notification.associate = (models) => {
    Notification.hasOne(models.Student, {
      foreignKey: "student",
    });
    Notification.hasOne(models.Class, {
      foreignKey: "class",
    });
    Notification.belongsTo(models.AttendanceClass, {
      foreignKey: "notification",
    });
  };
  return Notification;
};
