module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define('Message', {
        id: { 
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true 
        },
        booking_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'bookings',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        sender_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        recipient_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        message_text: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        is_read: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        sent_at: {
            type: DataTypes.DATE,
            defaultValue: sequelize.fn('now'),
        },
    }, {
        tableName: 'messages',
        timestamps: false,
    });

    // Message.associate = (models) => {
    //     Message.belongsTo(models.Booking, { foreignKey: 'booking_id', targetKey: 'id' });
    //     Message.belongsTo(models.User, { foreignKey: 'sender_id', targetKey: 'id' });
    //     Message.belongsTo(models.User, { foreignKey: 'recipient_id', targetKey: 'id' });
    // };

    return Message;
};
