const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/authMiddleware')
const method = require("../controller/controller")

router.get('/',verifyToken,method.getMethod)
router.post('/create', method.postMethod)
router.put('/update', method.updateRecord)
router.delete('/:id', method.deleteData)

router.post('/register',method.register)
router.post('/login',method.login)
module.exports = router