module.exports = (sequelize, DataTypes) => {
    const ComplianceAlert = sequelize.define('ComplianceAlert', {
        id: { 
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true 
        },
        instructor_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        alert_type: {
            type: DataTypes.ENUM('low_rating', 'expired_document', 'dispute_flag', 'verification_required', 'license_expiry'),
            allowNull: false,
        },
        alert_level: {
            type: DataTypes.ENUM('low', 'medium', 'high', 'critical'),
            defaultValue: 'medium',
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        is_resolved: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        resolved_by: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'id',
            },
        },
        resolved_at: {
            type: DataTypes.DATE,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: sequelize.fn('now'),
        },
    }, {
        tableName: 'compliance_alerts',
        timestamps: false,
    });

    return ComplianceAlert;
};
