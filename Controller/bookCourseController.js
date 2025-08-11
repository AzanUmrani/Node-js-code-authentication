const db = require("../Model/index");
const BookCourse = db.BookCourse;

exports.createBookCourse = async (req, res) => {
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
