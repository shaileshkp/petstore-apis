const express = require("express");
const { getListOfTags, createTag } = require("../controllers/tag");
const router = express.Router();

router.get('', getListOfTags)
router.post('', createTag)

module.exports = router;
