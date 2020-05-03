module.exports = (sequelize, DataTypes) => {
    const Asset = sequelize.define('Asset', {
        purpose: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },

        goal: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },

        depart: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },

        name: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },

        month_ex: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },

        month_real: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },

        year: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },

        total: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },

        present: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },

        enddate: {
            type: DataTypes.STRING(10),
            allowNull: true,
        },

        term: {
            type: DataTypes.STRING(10),
            allowNull: true,
        },

        risk: {
            type: DataTypes.STRING(10),
            allowNull: true,
        },

        ex_bm: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },

        money: {
            type: DataTypes.STRING(5),
            allowNull: true,
        },

        date: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },

        startdate: {
            type: DataTypes.STRING(10),
            allowNull: true,
        },

        account: {
            type: DataTypes.STRING(30),
            allowNull: true,
        },

        addition: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },

        customerId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },

        FamilyId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },

        quarterId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
        
    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci',
    });

    Asset.associate = (db) => {
    };

    return Asset;
}