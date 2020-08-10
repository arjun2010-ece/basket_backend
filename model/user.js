const bcrypt = require("bcrypt");

/**
 * User Model
 */
module.exports = function(sequelize, DataTypes) {
	var User = sequelize.define(
		"User",
		{
			id: {
				allowNull: false,
				defaultValue: DataTypes.UUIDV4,
				type: DataTypes.UUID,
				primaryKey: true,
				unique: true,
			},
			username: {
				type: DataTypes.STRING,
				allowNull: false,
				field: "email",
				unique: true,
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
				field: "password",
			}
		},
		{
			freezeTableName: true,
			tableName: "user"
		}
	);

	return User;
};
