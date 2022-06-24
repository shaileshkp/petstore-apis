const { Pet } = require('../../models');
// imported helpers methods 
const { 
    isValidPetDetails, 
    getCategoryById, 
    getTagsByIdList, 
    parsePetDetails 
} = require('./helpers');

exports.updatePetDetails = async function (req, res) {
    try {
        let petId = req.body?.id;
        // Check if id is passed and request is valid
        if (petId && typeof petId == 'number' && isValidPetDetails(req.body)) {
            let { category, tags } = req.body;
            // Get pet details by id
            let petDetails = await getPetDetailsById(petId)
            // If pet not find then return
            if (!petDetails) {
                return res.status(404).send({
                    'message': 'Pet not found',
                })
            }
            // Check category and tags
            let checkCategory = getCategoryById(category)
            let checkTags = getTagsByIdList(tags)
            Promise.all([checkCategory, checkTags]).then((resp) => {
                let categoryResp = resp[0];
                let tagsResp = resp[1]
                // If tags and category is valid and exists then update the tag
                if (categoryResp && tagsResp?.tag && tagsResp.tag.length == tags.length) {
                    let parsedPetDetails = parsePetDetails(req.body);
                    petDetails.update(parsedPetDetails).then((newPet) => {
                        res.status(200).send({
                            'message': 'Pet details updated!',
                            'pet': newPet,
                        })
                    })
                } else {
                    res.status(405).send({
                        'message': 'Invalid request, category or tags are not available.'
                    })
                }
            })
        } else {
            return res.status(405).send({
                'message': 'Validation exception'
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
 * Find pet details by id
 * @param id Pet id 
 * @returns Promise with pet details
 */
let getPetDetailsById = (id) => {
    return new Promise((resolve, reject) => {
        Pet.findByPk(id).then((petDetails) => {
            if (petDetails) {
                resolve(petDetails)
            } else {
                resolve(null);
            }
        }).catch(err => reject(err))
    })
}