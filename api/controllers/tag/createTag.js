const { Tag } = require('../../models');

exports.createTag = function (req, res) {
    try {
        let { name } = req.body
        if (name && name.trim()) {
            // remove space from name is exists
            name = name.trim();
            // Promise chain for create a new tag
            return getTag({name})
            .then(createIfNotExists)
            .then((tagResp) => {
                let { tag, isNew } = tagResp;
                let message = isNew ? 'New tag is added.' : 'This tag is already exists.';
                res.status(200).send({ 
                    message,
                    tag,
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

let getTag = ({name}) => {
    return new Promise((resolve, reject) => {
        Tag.findOne({ where: { name } }).then((tag) => {
            if (tag) {
                resolve(tag)
            } else {
                resolve({ name });
            }
        }).catch(err => reject(err))
    })
}

let createIfNotExists = (tag) => {
    return new Promise((resolve, reject) => {
        let { id, name } = tag;
        if (id) {
            resolve ({
                tag,
                isNew:false
            })
        } else {
            Tag.create({ name}).then((tag) => {
                resolve({
                    tag,
                    isNew: true
                })
            }).catch(err => reject(err))
        }
    })
}