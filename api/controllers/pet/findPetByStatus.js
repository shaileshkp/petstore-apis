const { sequelize } = require('../../models');
const { QueryTypes } = require('sequelize');
const { checkValidStatusList } = require('./helpers');

exports.findPetByStatus = function (req, res) {
    try {
        // Find status from query
        let { status } = req.query;
        let isValidStatusList = true;
        // If status exists then check
        if (status && status.length) {
            // Check for array and single status 
            if (typeof status == 'object')
                status = status.map((st) => { return st.trim()})
            else if (typeof status == 'string') {
                status = [status.trim()]
            }
            isValidStatusList = checkValidStatusList(status);
        } else {
            isValidStatusList = false;
        }
        // If status is not valid then reject
        if (isValidStatusList) {
            // Query on status 
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
/**
 * Get Pet query with join in category and tags
 * @returns SQL query for retrieve pet details
 */
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
        GROUP BY p.id, p.name, c.name, c.id
        ORDER BY p.id DESC`;
}