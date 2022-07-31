const express = require("express")

const router = express.Router()
router.get('/login', (req, res) => {
    res.status(200).json({
        message:" This is Login Route"
    })
})

module.exports = router