const { Tag, Category } = require('../../../models');
let statusList = ['available', 'pending', 'sold']
let isValidPetDetails = (petDetails) => {
    try {
        let { category, name, photoUrls, tags, status } = petDetails
        // If category is not available return false
        if (!(category && typeof category == 'number')) return false;
        if (!(name && name.trim() != "")) return false;
        if (!(status && status.trim() != "" && statusList.indexOf(status.trim())!= -1)) return false;
        return true && validatePhotoUrls(photoUrls) && validateTags(tags);
    } catch (error) {
        console.error('Error while validating request isValidPetDetails.', error)
        return false;
    }
}

function validatePhotoUrls(photoUrls) {
    if (photoUrls && typeof photoUrls == "object" && photoUrls.length){
        let isValid = true;
        photoUrls.map((url)=> {
            if (url && url.trim() == '') isValid = false;
        })
        return isValid;
    } else {
        return false
    }
}

function validateTags(tags) {
    if (tags && typeof tags == "object" && tags.length) {
        let isValid = true;
        tags.map((tag)=> {
            if (typeof tag != 'number') isValid = false;
        })
        return isValid;
    } else {
        return false;
    }
}


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
    let isValid = true;
    stList.forEach(status => {
        if (statusList.indexOf(status) == -1) isValid = false;
    });
    return isValid;
}

module.exports =  {
    isValidPetDetails,
    getCategoryById,
    getTagsByIdList,
    parsePetDetails,
    checkValidStatusList
}