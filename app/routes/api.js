require('dotenv').config();
const express = require('express');
const router = express.Router();
const fs = require('fs');
const sharp = require('sharp');
const Book = require('../models/book');

//Middleware
router.use(function (req, res, next) {
   console.log('------middleware-----');
   next();
});

router.get('/', function (req, res) {
   res.json({ message: 'Wellcome to bookcase API!' });
});

router.get('/books', async function (req, res) {
   try {
      var books = await Book.getBooks();
      res.json({ status: 1, data: books });
   } catch (error) {
      es.json({ status: 0, error: 'Something was wrong!' });
   }
});

router.post('/book/add', async (req, res) => {
	
	if(!req.fields.title || !req.fields.author) {
		res.json({ status: 0, error: 'Data not found!' });
	}
	
	if(req.files && req.files.image) {
		var fileUploadName = req.files.image.path.split('\\');
		req.fields.thumbnail = 'http://localhost:' + process.env.PORT + '/public/' + fileUploadName[2];
	}
	
	Book.addBook(req.fields).then(function () {
		res.json({ status: 1, message: 'The book was added successfully!' });
	}).catch(function (error) {
		res.json({ status: 0, error: 'Something was wrong!' });
	});
});

router.get('/book/:book_id', async function (req, res) {
   if (!req.params.book_id) {
      res.json({ status: 0, error: 'No book id found!' });
   }

   try {
      var book = await Book.getBookById(req.params.book_id);
      res.json({ status: 1, data: book });
   } catch (error) {
      es.json({ status: 0, error: 'Something was wrong!' });
   }
});

router.get('/book/remove/:book_id', async function (req, res) {
   if (!req.params.book_id) {
      res.json({ status: 0, error: 'Book ID not found!' });
   }
   
   try {
      await Book.removeBook(req.params.book_id);
      res.json({ status: 1, message: 'The book was successfully removed' });
   } catch (error) {
      res.json({ status: 0, error: 'Something was wrong!' });
   }
});

router.get('/books/remove', async function (req, res) {
   await Book.removeAllBooks();
   res.json({ status: 1, message: 'All books was removed!' });
});

module.exports = router;