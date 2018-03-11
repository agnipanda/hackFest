var mongoose = require('mongoose');

var studModel = require('../models/sdata');

var createUser = function (req,res) {
	console.log(req.body);
	var studInfo=req.body;
	var newStud=new studModel({
		name:studInfo.name,
		email:studInfo.email,
		phone:studInfo.phone,
		roomid:studInfo.roomid,
		password:studInfo.password

	});
	newStud.save(function(err,Student){
		if (err) {
			res.render('error',{message:"Database error..!!"})
		}
		else{
			res.render('error',{message:"Success..!!"})
		}
	});
};

module.exports = { "createUser" : createUser };