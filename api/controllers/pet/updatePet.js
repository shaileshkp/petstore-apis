const { Pet } = require('../../models');

const { isValidPetDetails, getCategoryById, getTagsByIdList, parsePetDetails } = require('./helpers');

exports.updatePetDetails = async function (req, res) {
    try {
        let petId = req.body?.id;
        if (petId && typeof petId == 'number' && isValidPetDetails(req.body)) {
            let { category, tags } = req.body;
            let petDetails = await getPetDetailsById(petId)
            if (!petDetails) {
                return res.status(404).send({
                    'message': 'Pet not found',
                })
            }
            let checkCategory = getCategoryById(category)
            let checkTags = getTagsByIdList(tags)
            Promise.all([checkCategory, checkTags]).then((resp) => {
                let categoryResp = resp[0];
                let tagsResp = resp[1]
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