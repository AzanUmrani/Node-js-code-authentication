module.exports = (sequelize, DataTypes) => {
    const InstructorDocument = sequelize.define('InstructorDocument', {
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
        document_type: {
            type: DataTypes.ENUM('driving_license', 'dvsa_badge', 'insurance_certificate', 'vehicle_photo', 'dbs_certificate'),
            allowNull: false,
        },
        document_url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        verification_status: {
            type: DataTypes.ENUM('pending', 'approved', 'rejected', 'expired'),
            defaultValue: 'pending',
        },
        verified_by: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'id',
            },
        },
        verified_at: {
            type: DataTypes.DATE,
        },
        rejection_reason: {
            type: DataTypes.TEXT,
        },
        expiry_date: {
            type: DataTypes.DATE,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: sequelize.fn('now'),
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: sequelize.fn('now'),
        },
    }, {
        tableName: 'instructor_documents',
        timestamps: false,
    });

    return InstructorDocument;
};
