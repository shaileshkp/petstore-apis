const { Pet } = require('../../models');

// import helper methods  
const { 
    isValidPetDetails, 
    getCategoryById, 
    getTagsByIdList, 
    parsePetDetails 
} = require('./helpers');

exports.createPet = function (req, res) {
    try {
        if (isValidPetDetails(req.body)) {
            let { category, tags } = req.body;
            // Promise to check category and tags exists
            let checkCategory = getCategoryById(category)
            let checkTags = getTagsByIdList(tags)
            // call all promises
            Promise.all([checkCategory, checkTags]).then((resp) => {
                let categoryResp = resp[0];
                let tagsResp = resp[1]
                // If category or tag did not find then don't create pet
                if (categoryResp && tagsResp?.tag && tagsResp.tag.length == tags.length) {
                    // Parse details and create new pet
                    let parsedPetDetails = parsePetDetails(req.body);
                    createNewPet(parsedPetDetails).then((newPet) => {
                        res.status(200).send({
                            'message': 'New pet added!',
                            'pet': newPet,
                        })
                    }).catch(err => {
                        console.error('Internal server error on create pet, ', err);
                        res.status(500).send({
                            'message': 'Internal Server Error.'
                        });
                    })
                } else {
                    res.status(405).send({
                        'message': 'Invalid request, category or tags are not available.'
                    })
                }
            })
        } else {
            return res.status(405).send({
                'message': 'Invalid request.'
            });
        }
    } catch (error) {
        console.error('Error occured in create pet', error)
        return res.status(500).send({
            'message': 'Internal Server Error.'
        });
    }
};
/**
 * 
 * @param {*} petDetails Details of the pet object
 * @returns Promise with new pet details
 */
function createNewPet(petDetails) {
    return new Promise((resolve, reject) => {
        Pet.create(petDetails).then((newPet) => {
            resolve(newPet)
        }).catch(err => reject(err))
    })
}
