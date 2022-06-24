const express = require("express");
const router = express.Router();

// Importing controllers related to tag
const { 
    getListOfTags, 
    createTag 
} = require("../controllers/tag");

// tag routes
router.get('', getListOfTags)
router.post('', createTag)

module.exports = router;
