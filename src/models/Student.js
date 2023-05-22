"use strict";

module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define(
    "Student",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true,
      },
      parent: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      tableName: "student",
      timestamps: true,
      paranoid: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    }
  );

  Student.associate = (models) => {
    Student.hasOne(models.UserParent, {
      foreignKey: "parent",
    });

    Student.hasMany(models.StudentClass, {
      foreignKey: "student",
    });
  };
  return Student;
};
