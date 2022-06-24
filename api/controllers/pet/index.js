

const { createPet } = require('./createPet')
const { updatePetDetails } = require('./updatePet')
const { findPetByStatus } = require('./findPetByStatus')

// Export all pet controllers
const pet = {
    createPet,
    updatePetDetails,
    findPetByStatus
}

module.exports = pet;