const { Pet, Category, Sequelize, sequelize } = require('../../models');
const { QueryTypes } = require('sequelize');
const { checkValidStatusList } = require('./helpers');

exports.findPetByStatus = function (req, res) {
    try {
        let { status } = req.query;
        let isValidStatusList = true;
        if (status && status.length) {
            if (typeof status == 'object')
                status = status.map((st) => { return st.trim()})
            else if (typeof status == 'string') {
                status = [status.trim()]
            }
            isValidStatusList = checkValidStatusList(status);
        } else {
            isValidStatusList = false;
        }

        if (isValidStatusList) {
            sequelize.query(
                getPetsJoinQuery(),
                {
                    replacements: { status },
                    type: QueryTypes.SELECT
                }
            ).then(resp => {
                res.status(200).send({'pets': resp})
            }).catch(err => {
                res.send(err)
            });
        } else {
            res.status(400).send({
                'message': 'Invalid status value.'
            });
        }
    } catch (error) {
        console.error('error', error)
        res.status(500).send(error)
    }
};

let getPetsJoinQuery = () => {
    return `SELECT 
        p.id, 
        p.name, 
        p."photoUrls", 
        p.status, 
        array_agg(json_build_object('id', t.id, 'name', t.name)) tags, 
        json_build_object('id', c.id, 'name', c.name) AS category 
        FROM pets p JOIN tags t ON t.id = ANY (p.tags) 
        left join categories as c on p.category = c.id 
        WHERE status IN (:status)
        GROUP BY p.id, p.name, c.name, c.id`;
}