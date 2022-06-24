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