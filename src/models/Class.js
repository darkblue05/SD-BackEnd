"use strict";

module.exports = (sequelize, DataTypes) => {
  const Class = sequelize.define(
    "Class",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true,
      },
      teacher: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      code: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      town: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      state: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      grade: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      group: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      group: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      tableName: "class",
      timestamps: true,
      paranoid: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    }
  );

  Class.associate = (models) => {
    Class.hasOne(models.UserTeacher, {
      foreignKey: "teacher",
    });

    Class.hasMany(models.StudentClass, {
      foreignKey: "class",
    });
    Class.hasMany(models.AttendanceClass, {
      foreignKey: "class",
    });
    Class.hasMany(models.Notification, {
      foreignKey: "class",
    });
  };
  return Class;
};
