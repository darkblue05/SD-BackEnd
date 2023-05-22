"use strict";

module.exports = (sequelize, DataTypes) => {
  const UserParent = sequelize.define(
    "UserParent",
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
      phone: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      tableName: "user_parent",
      timestamps: true,
      paranoid: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    }
  );

  UserParent.associate = (models) => {
    UserParent.belongsTo(models.User, {
      foreignKey: "user",
    });

    UserParent.hasMany(models.Student, {
      foreignKey: "parent",
    });
  };
  return UserParent;
};
