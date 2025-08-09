const express = require('express');
const router = express.Router();
const slotController = require('../Controller/availabilitySlotController');
const authMiddleware = require('../Middleware/authMiddleware');

router.post('/create', authMiddleware, slotController.createSlot);

router.get('/get-all', slotController.getAllSlots);

router.get('/get/:id', slotController.getSlotById);

router.put('/update/:id', authMiddleware, slotController.updateSlot);

router.delete('/delete/:id', authMiddleware, slotController.deleteSlot);

module.exports = router;
