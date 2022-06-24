const { Category } = require('../../models');

exports.getListOfCategories = function (req, res) {
    try {
        return Category.findAll({})
        .then((categories) => {
            res.status(200).send({
                categories: categories || []
            })
        }).catch(err => res.status(400).send(err))        
    } catch (error) {
        res.status(400).send(error)
    }
};