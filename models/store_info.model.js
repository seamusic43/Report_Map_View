const { DataTypes, Sequelize } = require('sequelize');
//const sequelize = new Sequelize('');

module.exports = (sequelize) => {
    return sequelize.define('Store', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            comment: '고유번호'
        },
        site_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: 'Site'
            },
            comment: '사이트 고유번호'
        },
        title: {
            type: DataTypes.CHAR(100),
            allowNull: false,
            unique: true,
            comment: '체험 타이틀'
        },
        location: {
            type: DataTypes.CHAR(50),
            comment: '지역명'
        },
        category: {
            type: DataTypes.ENUM(['BLOG', 'DELIVERY', 'REPORT']),
            allowNull: false,
            comment: '카테고리 타입'
        },
    }, {
        timestamps: true,
        charset: 'utf8',
        indexes: [
            {
                name: 'site_name',
                type: 'UNIQUE',
                unique: true,
                fields: ['name'],
            }
        ]

    })
}