module.exports = (sequelize, DataTypes) => {
    const BookCourse = sequelize.define("BookCourse", {
        package_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        experience: {
            type: DataTypes.STRING,
            allowNull: true
        },
        transmission: {
            type: DataTypes.STRING,
            allowNull: true
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        contact_no: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        license_number: {
            type: DataTypes.BIGINT,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { isEmail: true }
        },
        addresses: {
            type: DataTypes.JSON, // store array
            allowNull: true
        },
        addtional_information: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        have_you_been_ordered: {
            type: DataTypes.STRING,
            allowNull: true
        },
        preferred_start_date: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        instructor_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'book_course',
        timestamps: false
    });

    return BookCourse;
};
