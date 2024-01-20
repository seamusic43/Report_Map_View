const { DataTypes, Sequelize } = require('sequelize');
//const sequelize = new Sequelize('');

module.exports = (sequelize) => {
    return sequelize.define('Site', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            comment: '고유번호'
        },
        name: {
            type: DataTypes.CHAR(100),
            allowNull: false,
            unique: true,
            comment: '사이트 이름'
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: '사이트 url'
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            comment: '생성 날짜'
        },
        updatedAt: {
            type: DataTypes.DATE,
            comment: '수정 날짜'
        }
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