"use strict";
module.exports = (sequelize, DataTypes) => {
  const UserTeacher = sequelize.define(
    "UserTeacher",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true,
      },
      user: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
      },
      license: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      tableName: "user_teacher",
      timestamps: true,
      paranoid: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    }
  );

  UserTeacher.associate = (models) => {
    UserTeacher.belongsTo(models.User, {
      foreignKey: "user",
    });

    UserTeacher.hasMany(models.Class, {
      foreignKey: "teacher",
    });
  };
  return UserTeacher;
};
