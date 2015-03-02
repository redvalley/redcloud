var koa = require('koa');
var mongoClient = require('mongodb').MongoClient;
var app = koa();

var ContactRepository = require('./contact-repository');

app.use(function *(next){
	var url = 'mongodb://localhost:27017/contacts';
	var self = this;
	yield new Promise(function(resolve, reject){
		mongoClient.connect(url, function(err, db){
			self._db = db;
			if(err){
				reject(err)
			}else{
				resolve();
			}
		});	
	}); 

	yield next;  
});


app.use(function *(next){
	var newContactRepository = new ContactRepository(this._db);
	var self = this;

	yield newContactRepository.findAll().then(function(result){
		self.body = result;
	});

	yield next;
});



app.use(function *(next){
	var newContactRepository = new ContactRepository(this._db);
	var self = this;

	yield newContactRepository.add({
		firstName: 'Rupert',
		lastName: 'Eder'
	});

	yield next;
});




console.log("listening to port 5000");

app.listen(5000);