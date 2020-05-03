module.exports = (sequelize, DataTypes) => {
    const Customer = sequelize.define('Customer', {
        name: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },

        gender: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },

        birth: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },

        phone: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },

        UserId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
        
    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci',
    });

    Customer.associate = (db) => {
    };

    return Customer;
}