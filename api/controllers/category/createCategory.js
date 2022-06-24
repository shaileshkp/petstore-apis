const { Category } = require('../../models');

exports.createCategory = function (req, res) {
    try {
        let { name } = req.body
        if (name && name.trim()) {
            // remove space from name is exists
            name = name.trim();
            // Promise chain for create a new category
            return getCategory({name})
            .then(createIfNotExists)
            .then((categoryResp) => {
                // category holds new or existing category and isNew holds category is newly created or not
                let { category, isNew } = categoryResp;
                let message = isNew ? 'New category is added.' : 'This category is already exists.';
                res.status(200).send({ 
                    message,
                    category,
                })
            }).catch((error) => {
                res.status(400).send(error)
            });
        } else {
            return res.status(400).send({
                'message': 'Required parameter did not send.'
            });
        }
    } catch (error) {
        return res.status(500).send({
            'message': 'Internal Server Error.'
        });
    }
};
/**
 * 
 * @param {name} param0 name of the category
 * @returns Promise with category details
 */
let getCategory = ({name}) => {
    return new Promise((resolve, reject) => {
        Category.findOne({ where: { name } }).then((category) => {
            if (category) {
                resolve(category)
            } else {
                resolve({ name });
            }
        }).catch(err => reject(err))
    })
}
/**
 * 
 * @param {id}      category    id of the category
 * @param {name}    category    name of the category
 * @returns Promise with category and boolean isNew which defines the new category
 */
let createIfNotExists = (category) => {
    return new Promise((resolve, reject) => {
        let { id, name } = category;
        if (id) {
            resolve ({
                category,
                isNew:false
            })
        } else {
            Category.create({ name}).then((category) => {
                resolve({
                    category,
                    isNew: true
                })
            }).catch(err => reject(err))
        }
    })
}