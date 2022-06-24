const { Tag } = require('../../models');

exports.getListOfTags = function (req, res) {
    try {
        return Tag.findAll({})
        .then((tags) => {
            res.status(200).send({
                tags: tags || []
            })
        }).catch(err => res.status(400).send(err))        
    } catch (error) {
        res.status(400).send(error)
    }
};