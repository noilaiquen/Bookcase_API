var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment');

var BookeSchema = new Schema({
   title: {
      type: String,
      trim: true,
      required: 'Please fill title book'
   },
   author: {
      type: String,
      trim: true,
      required: 'Please fill author'
   },
   page: {
      type: Number,
      default: 0
   },
   thumbnail: {
      type: String,
      default: 'https://vignette.wikia.nocookie.net/darkseries/images/9/96/No_book_cover_lg.jpg/revision/latest?cb=20170826200421'
   },
   date_release: {
      type: String,
      default: moment().format('YYYY-MM-DD')
   },
   finish: {
      type: Boolean,
      default: false
   },
   date_finished: {
	   type: String,
	   default: null
   },
   created: {
      type: String,
      default:  moment().format('YYYY-MM-DD H:m:s')
   }
});

var Book = mongoose.model('Book', BookeSchema);

module.exports = {
   getBooks: function () {
      return new Promise(function (resolve, reject) {
         Book.find(function (err, books) {
            if (err) reject(err);

            resolve(books);
         });
      })
   },
   getBookById: function (book_id) {
      return new Promise(function (resolve, reject) {
         Book.findById(book_id, function (err, book) {
            if (err) reject(err);
            resolve(book);
         })
      })
   },
   addBook: function (data) {
		return new Promise(function (resolve, reject) {
		var book = new Book();
		
		book.title = data.title.trim(),
		book.author = data.author.trim(),
		book.finish = data.is_finished == 1 ? true : false;
		
		if(data.date_release) {
			book.date_release = data.date_release;
		}
		if(book.finish) {
			book.date_finished = data.date_finished;
		}
		if(data.page) {
			book.page = Number(data.page);
		}
		if(data.thumbnail) {
			book.thumbnail = data.thumbnail;
		}
		
		book.save(function (err) {
			if (err) reject(err);
			resolve();
		});
      });
   },
   removeAllBooks: function () {
      return new Promise(function (resolve, reject) {
         Book.remove(function (err) {
            if (err) reject(err);
            resolve();
         });
      });
   },
   removeBook: function (book_id) {
      return new Promise(function (resolve, reject) {
         Book.remove({ _id: book_id }, function (err) {
            if (err) reject(err);
            resolve();
         })
      })
   }
};