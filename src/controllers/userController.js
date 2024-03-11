const db = require('../helper/firebase');
const secretKey = require('../constant');
const { uuid } = require('uuidv4');
const jwt = require('jsonwebtoken');

const userController = {
    login: async (req, res) => {
        const itemRef = db.collection('users')
        const snapshot = await itemRef.where('email', '==', req.body.email).get()
        const user = snapshot.docs.map(doc => doc.data());
      
        if (!user?.length) {
          return res.status(401).json({ message: 'Invalid credentials' });
        }
        const foundUser = user[0];
        const accessToken = jwt.sign({ email: foundUser.email, id: foundUser.id }, secretKey);
        res.json({ accessToken });
    },
    signUp: async (req, res) => {
        const citiesRef = db.collection('users')

        await citiesRef.doc(req.body.email).set({...req.body, id: uuid()})
        res.status(201).json(req.body)
    }
}

module.exports = userController;