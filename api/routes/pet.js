const express = require("express");
const { createPet, updatePetDetails, findPetByStatus } = require("../controllers/pet");
const router = express.Router();

router.post('', createPet)
router.put('', updatePetDetails)
router.get('/findByStatus', findPetByStatus)

module.exports = router;
