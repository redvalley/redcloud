

var ContactRepository = function(contactDb){
	this._db = contactDb;
};


ContactRepository.prototype.getAll = function(){
	var contactCollection = this._db.collection('contacts');
	var promise = new Promise(function(resolve, reject){
		contactCollection.find({}).toArray(function(err, contacts){
			if(err){
				reject(err);
			}else{
				resolve(contacts);
			}
		});
	});	
	
	return promise;  
};



ContactRepository.prototype.add = function(newContact){
	var contactCollection = this._db.collection('contacts');
	var promise = new Promise(function(resolve, reject){
		contactCollection.insert(newContact, function(err, result){
			if(err){
				reject(err);
			}else{
				resolve(result);
			}
		});
	});	
	
	return promise;  
};


module.exports = ContactRepository;


