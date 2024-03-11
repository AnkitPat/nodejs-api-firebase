const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const jwt = require('jsonwebtoken');
const secretKey = require('../constant');
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
  
    jwt.verify(token, secretKey, (err, user) => {
      if (err) return res.status(403).json({ message: 'Forbidden' });
      req.user = user;
      next();
    });
  };
router.get('/',authenticateToken, itemController.getAllItems);
router.get('/:id',authenticateToken,  itemController.getParticularItem);
router.post('/',authenticateToken, itemController.createItem);
router.put('/:id', itemController.updateItem);
router.delete('/:id',authenticateToken, itemController.deleteItem);

module.exports = router;