const db = require("../Model/index");
const BookCourse = db.BookCourse;
const User = db.user;
const Package = db.Package;

const createBookCourse = async (req, res) => {
    try {
        const {
            package_id,
            experience,
            transmission,
            first_name,
            contact_no,
            license_number,
            email,
            addresses,
            addtional_information,
            have_you_been_ordered,
            preferred_start_date,
            instructor_id
        } = req.body;

        if (!package_id || !first_name || !contact_no || !email || !instructor_id) {
            return res.status(400).json({
                success: false,
                message: "Required fields missing"
            });
        }

        const addressArray = Array.isArray(addresses) ? addresses : [];

        const booking = await BookCourse.create({
            package_id,
            experience,
            transmission,
            first_name,
            contact_no,
            license_number,
            email,
            addresses: addressArray,
            addtional_information,
            have_you_been_ordered,
            preferred_start_date,
            instructor_id
        });

        res.status(201).json({
            success: true,
            message: "Course booking created successfully",
            data: booking
        });

    } catch (err) {
        console.error("Create Book Course Error:", err);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

const getInstructorBookings = async (req, res) => {
    try {
        const { instructor_id } = req.params;

        const bookings = await BookCourse.findAll({
            where: { instructor_id },
            include: [
                {
                    model: User,
                    as: 'instructor',
                },
                { 
                    model: Package,
                    as: 'package' 
                }
            ]
        });

        if (!bookings.length) {
            return res.status(404).json({
                status: false,
                message: "No bookings found for this instructor"
            });
        }

        res.status(200).json({
            status: true,
            total_bookings: bookings.length,
            data: bookings
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: "Server error" });
    }
};

module.exports = {
    createBookCourse,
    getInstructorBookings
};
