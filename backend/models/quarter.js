module.exports = (sequelize, DataTypes) => {
    const Quarter = sequelize.define('Quarter', {
        name: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },

        customerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }

    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci',
    });

    Quarter.associate = (db) => {
    };

    return Quarter;
}