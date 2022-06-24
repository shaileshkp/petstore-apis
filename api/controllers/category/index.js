const { getListOfCategories } = require("./listCategory")
const { createCategory } = require('./createCategory')

// Exporting all modules as tag
const tag = {
    getListOfCategories,
    createCategory
}

module.exports = tag;