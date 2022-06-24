const express = require("express");
const router = express.Router();

// Importing controllers
const { 
    createPet, 
    updatePetDetails, 
    findPetByStatus 
} = require("../controllers/pet");

// pet routers
router.post('', createPet)
router.put('', updatePetDetails)
router.get('/findByStatus', findPetByStatus)

module.exports = router;
