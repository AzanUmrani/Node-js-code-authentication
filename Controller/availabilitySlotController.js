const db = require('../Model');
const AvailabilitySlot = db.Availabilityslot;
const User = db.user;
// Create slot
exports.createSlot = async (req, res) => {
    try {
        const { instructor_id, day_of_week, start_time, end_time, is_available, slot_date } = req.body;

        // Validation - instructor_id required hai
        if (!instructor_id) {
            return res.status(400).json({ message: 'Instructor ID is required' });
        }

        const slot = await AvailabilitySlot.create({
            instructor_id,
            day_of_week,
            start_time,
            end_time,
            is_available,
            slot_date
        });

        res.status(201).json({
            message: 'Availability slot created successfully',
            slot
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error creating slot',
            error: error.message
        });
    }
};

// Get all slots

exports.getAllSlots = async (req, res) => {
    try {
        const slots = await AvailabilitySlot.findAll({
            include: [{
                model: User,
                attributes: ['id', 'first_name', 'email']
            }]
        });
        res.json(slots);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching slots',
            error: error.message
        });
    }
};

exports.getSlotById = async (req, res) => {
  try {
    const { id } = req.params;  // URL param se id lo

    const slot = await AvailabilitySlot.findOne({ where: { id } });

    if (!slot) {
      return res.status(404).json({ message: 'Slot not found' });
    }

    const instructor = await User.findOne({
      where: { id: slot.instructor_id },
      attributes: ['id', 'first_name', 'email']
    });

    const slotWithInstructor = {
      ...slot.toJSON(),
      User: instructor || null
    };

    res.json(slotWithInstructor);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching slot', error: error.message });
  }
};



// Update slot
exports.updateSlot = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await AvailabilitySlot.update(req.body, { where: { id } });

        if (updated[0] === 0) return res.status(404).json({ message: 'Slot not found or no changes made' });

        res.json({ message: 'Slot updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating slot', error: error.message });
    }
};

exports.deleteSlot = async (req, res) => {
    try {
        const deleted = await AvailabilitySlot.destroy({ where: { id: req.params.id } });

        if (!deleted) return res.status(404).json({ message: 'Slot not found' });

        res.json({ message: 'Slot deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting slot', error: error.message });
    }
};
