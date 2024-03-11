const db = require('../helper/firebase');

const itemController = {
  getAllItems: async (req, res) => {
    try {
      const citiesRef = db.collection('items')
      const snapshot = await citiesRef.get()
      res.json(snapshot.docs.map(doc => doc.data()))
    } catch (e) {
      console.log(e)
    }
  },
  createItem: async (req, res) => {
    const citiesRef = db.collection('items')

    await citiesRef.doc(req.body.id).set(req.body)
    res.status(201).json(req.body)
  },
  getParticularItem: async (req, res) => {
    try {
      const itemRef = db.collection('items')
      const snapshot = await itemRef.where('id', '==', req.params.id).get()
      res.json(snapshot.docs.map(doc => doc.data()))
    } catch (e) {
      console.log(e)
    }
  },
  deleteItem: async (req, res) => {
    try {
        await db.collection('items').doc(req.params.id).delete();
        res.status(200).json({message: 'deleted'})
    } catch (e) {  
        console.log(e);
        res.status(500).json({error: 'Unable to delete'})
    }
  },
  updateItem: async (req, res) => {
    try {
        const itemRef = db.collection('items').doc(req.params.id);

        // Set the 'capital' field of the city
        await itemRef.update(req.body);
        res.status(200).json({message: 'Updated'});
    } catch (e) {
        console.log(e);
        res.status(500).json({error: 'Unable to update'})

    }
  }
}

module.exports = itemController
