const {
    initializeApp,
    applicationDefault,
    cert
  } = require('firebase-admin/app')
  const {
    getFirestore,
    Timestamp,
    FieldValue,
    Filter
  } = require('firebase-admin/firestore')
  
const json = require('../../hepzi-test-0b40fa2e96b6.json')
initializeApp({
  credential: cert(json)
})

const db = getFirestore()
module.exports = db;