const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Doc = require('../models/Docs');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

//Get docs list
router.get('/', (req, res) =>  
     Doc.findAll()
         .then(Docs => res.render('docs', {
             Docs
         }))
     .catch(err => console.log('Error: ' + err)));

//Display add docs form
router.get('/add', (req, res) => res.render('add')); 


//Add a doc
  router.post('/add', (req, res) => {
    let {title, specialization, budget, description, contact_email} = req.body;
    let errors =[];

    if(!title) {
      errors.push({ text: 'Please add a title' });
    }
    if(!specialization) {
      errors.push({ text: 'Please add some specialization' });
    }
    if(!description) {
      errors.push({ text: 'Please add a description' });
    }
    if(!contact_email) {
      errors.push({ text: 'Please add a contact email' });
    }

//Check for errors
    if(errors.length > 0) {
        res.render('add', {
          errors,
          title, 
          specialization, 
          budget, 
          description, 
          contact_email
        });
    } else {
      if(!budget){
        budget = 'Unknown';
      }else{
        budget = 'UAH${budget}';
      }
//Make lowercase and remove space after comma
      specialization = specialization.toLowerCase().replace(/, /g, ',');

      // Insert into table
    Doc.create({
      title, 
      specialization, 
      budget, 
      description, 
      contact_email
    })
      .then(Doc => res.redirect('/docs'))
      .catch(err => console.log(err));
    }
  });

  //Search for vacancy
  router.get('/search', (req, res) =>{
    let { term } = req.query;
  
  //Make lowercase
    term = term.toLowerCase();

  Doc.findAll({ where: {specialization: { [Op.like]: '%' + term + '%'} } })
  .then(docs => res.render('docs',{ docs }))
  .catch(err => res.render('error', {error: err}));
  ;
  });

module.exports = router;