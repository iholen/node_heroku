var express = require('express')
var superagent = require('superagent')
var cheerio = require('cheerio')

var app = express()

app.get('/', function(req, res, next){
	superagent.get('https://cnodejs.org')
		.end(function(err, sres){
			if(err){
				return next(err)
			}

			var $ = cheerio.load(sres.text)
			var items = []
			var $users = $("#topic_list .user_avatar img")
			$("#topic_list .topic_title").each(function(idx, element){
				var $element = $(element)
				var $user = $users.eq(idx)
				console.log($user.attr('title'))
				items.push({
					title: $element.attr('title'),
					href: $element.attr('href'),
					author: $user.attr('title')
				})
			})
			res.send(items)
		})
})

app.listen(process.env.PORT || 5000, function(){
	console.log('Node server start on port 3000')	
})