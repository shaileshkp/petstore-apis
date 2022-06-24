const { Tag, Category } = require('../../../models');

// fixed status list
let statusList = ['available', 'pending', 'sold']
/**
 * Validating pet details is correct or not by the required params
 * @param {*} petDetails - Object which holds pet details
 * @returns 
 */
let isValidPetDetails = (petDetails) => {
    try {
        let { category, name, photoUrls, tags, status } = petDetails
        // If category is not available return false
        if (!(category && typeof category == 'number')) return false;
        // If name is not available then return false
        if (!(name && name.trim() != "")) return false;
        // if status is not available and doesn't hold values based on our existing list
        if (!(status && status.trim() != "" && statusList.indexOf(status.trim())!= -1)) return false;
        return true && validatePhotoUrls(photoUrls) && validateTags(tags);
    } catch (error) {
        console.error('Error while validating request isValidPetDetails.', error)
        return false;
    }
}
/**
 * Checking is any empty array on the list
 * @param {*} photoUrls list of urls
 * @returns boolean valid or not
 */
function validatePhotoUrls(photoUrls) {
    try {
        if (photoUrls && typeof photoUrls == "object" && photoUrls.length){
            let isValid = true;
            photoUrls.map((url)=> {
                if (url && url.trim() == '') isValid = false;
            })
            return isValid;
        } else {
            return false
        }
    } catch (error) {
        console.error('Error while validatePhotoUrls.', error)
        return false
    }
}
/**
 * checking all tags are numeric or not and it is in array
 * @param {*} tags list of tags 
 * @returns 
 */
function validateTags(tags) {
    try {
        if (tags && typeof tags == "object" && tags.length) {
            let isValid = true;
            tags.map((tag)=> {
                if (typeof tag != 'number') isValid = false;
            })
            return isValid;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error while validateTags.', error)
        return false
    }
}

/**
 * Find category from DB
 * @param id category id
 * @returns Promise with category details
 */
let getCategoryById = (id) => {
    return new Promise((resolve, reject) => {
        Category.findByPk(id).then((category) => {
            if (category) {
                resolve(category)
            } else {
                resolve(null);
            }
        }).catch(err => reject(err))
    })
}

/**
 * Find tags based on the ids
 * @param tagIds - list of tag ids
 * @returns Promise with tag details
 */
let getTagsByIdList = (tagIds) => {
    return new Promise((resolve, reject) => {    
        Tag.findAll({
            where: {
                id: tagIds
            }
        }).then((tag) => {
            resolve({
                tag
            })
        }).catch(err => reject(err))
    })
}

/**
 * It parse the pet details like removing spaces if exists in body
 * @param {*} petDetails  Holds pet details
 * @returns petDetails 
 */
let parsePetDetails = (petDetails) => {
    try {
        petDetails.name = petDetails.name.trim();
        petDetails.status = petDetails.status.trim();
        petDetails.photoUrls = petDetails.photoUrls.map((url) => { return url.trim() });
        delete petDetails.id;
        return petDetails;
    } catch (error) {
        console.error('Error while parsing pet details.')
        throw error
    }
}

let checkValidStatusList = (stList) => {
    try {
        let isValid = true;
        stList.forEach(status => {
            if (statusList.indexOf(status) == -1) isValid = false;
        });
        return isValid;
    } catch (error) {
        console.error('Error while checkValidStatusList.', error)
        return false
    }
}

module.exports =  {
    isValidPetDetails,
    getCategoryById,
    getTagsByIdList,
    parsePetDetails,
    checkValidStatusList
}