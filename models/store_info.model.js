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
        store_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            unique: true,
            comment: '사이트 체험 고유 번호 '
        },
        title: {
            type: DataTypes.CHAR(100),
            allowNull: false,
            comment: '체험 타이틀'
        },
        location: {
            type: DataTypes.CHAR(50),
            comment: '지역명'
        },
        category: {
            type: DataTypes.ENUM(['VISIT', 'DELIVERY', 'REPORT']),
            allowNull: false,
            comment: '카테고리 타입'
        },
        post_type: {
            type: DataTypes.ENUM(['BLOG', 'INSTA']),
            allowNull: false,
            comment: '포스팅 타입',
        },
        address: {
            type: DataTypes.CHAR(255),
            allowNull: false,
            comment: '주소',
        },
        lat: {
            type: DataTypes.FLOAT,
            comment: '위도',
        },
        long: {
            type: DataTypes.FLOAT,
            comment: '경도'
        },
        apply_started_at: {
            type: DataTypes.DATEONLY,
            comment: '신청 시작일'
        },
        apply_ended_at: {
            type: DataTypes.DATEONLY,
            comment: '신청 종료일'
        },
        selected_at: {
            type: DataTypes.DATEONLY,
            comment: '당첨 발표일'
        },
        posting_started_at: {
            type: DataTypes.DATEONLY,
            comment: '포스팅 시작일'
        },
        posting_ended_at: {
            type: DataTypes.DATEONLY,
            comment: '포스팅 종료일'
        },
        is_display: {
            type: DataTypes.BOOLEAN,
            comment: '노출여부'
        }
    }, {
        timestamps: true,
        charset: 'utf8'
    })
}