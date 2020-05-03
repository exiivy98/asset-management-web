module.exports = (sequelize, DataTypes) => {
    const Family = sequelize.define('Family', {
        name: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },

        relation: {
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

    Family.associate = (db) => {
    };

    return Family;
}