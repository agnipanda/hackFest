var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));

var studSchema = new Schema({
	name: {type : String , required : true},
	email: {type : String , required : true},
	phone: {type : String , required : true},
	roomid: {type : String , required : true},
	pasword: {type : String , required : true},
});
var studModel = mongoose.model('sdata',studSchema);

module.exports=studModel;