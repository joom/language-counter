# Github Language Counter

getForUser = (username) ->
	ownLang			= getCount username, 'repos', show
	starredLang 	= getCount username, 'starred', show
	watchingLang 	= getCount username, 'subscriptions', show

getCount = (username, whatToGet, cb) ->
	$.getJSON "https://api.github.com/users/#{username}/#{whatToGet}?page=1&per_page=500", (repos) ->
	  counters = {}
	  repos.forEach (repo) ->
	    lang = repo.language
	    return if typeof (lang) is "undefined" or not lang?
	    counters[lang] = (if counters[lang] then counters[lang] + 1 else 1)

	  cb whatToGet, counters

show = (whatToGet, counters) ->
	($ "ul[data-pie-id='#{whatToGet}-chart']").html ''
	($ "div[id='#{whatToGet}-chart']").html ''
	$.each counters, (key, value) ->
		($ "ul[data-pie-id='#{whatToGet}-chart']").append("<li data-value=\"#{value}\">#{key} (#{value})</li>");
	Pizza.init()

submit = (e) ->
  	user = ($ '#username').val()
  	if !user then return
  	getForUser user
  	($ '.content h1').html "<a href=\"http://github.com/#{user}\">@#{user}</a>"
  	($ '.content').show()

$(document).ready ->
  ($ "button").click submit
  ($ 'input').bind 'keypress', (e) ->
  	if e.keyCode == 13 then submit()