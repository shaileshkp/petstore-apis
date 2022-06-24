

const { createPet } = require('./createPet')
const { updatePetDetails } = require('./updatePet')
const { findPetByStatus } = require('./findPetByStatus')

const pet = {
    createPet,
    updatePetDetails,
    findPetByStatus
}

module.exports = pet;