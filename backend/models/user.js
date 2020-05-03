module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        userId: {
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        gender: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        position: {
            type: DataTypes.STRING(30),
            allowNull: true,
        },
        department: {
            type: DataTypes.STRING(30),
            allowNull: true,
        },
        phone: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        adminState: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        approveState: {
            type: DataTypes.STRING(10),
            allowNull: false,
        }
    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci',
    });

    User.associate = (db) => {
    };

    return User;
}
