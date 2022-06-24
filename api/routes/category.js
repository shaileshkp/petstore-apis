const express = require("express");
const { createCategory, getListOfCategories } = require("../controllers/category");
const router = express.Router();

router.get('', getListOfCategories)
router.post('', createCategory)

module.exports = router;
