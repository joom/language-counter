(function() {
  var getCount, getForUser, show, submit;

  getForUser = function(username) {
    var ownLang, starredLang, watchingLang;
    ownLang = getCount(username, 'repos', show);
    starredLang = getCount(username, 'starred', show);
    return watchingLang = getCount(username, 'subscriptions', show);
  };

  getCount = function(username, whatToGet, cb) {
    return $.getJSON("https://api.github.com/users/" + username + "/" + whatToGet + "?page=1&per_page=500", function(repos) {
      var counters;
      counters = {};
      repos.forEach(function(repo) {
        var lang;
        lang = repo.language;
        if (typeof lang === "undefined" || (lang == null)) {
          return;
        }
        return counters[lang] = (counters[lang] ? counters[lang] + 1 : 1);
      });
      return cb(whatToGet, counters);
    });
  };

  show = function(whatToGet, counters) {
    ($("ul[data-pie-id='" + whatToGet + "-chart']")).html('');
    ($("div[id='" + whatToGet + "-chart']")).html('');
    $.each(counters, function(key, value) {
      return ($("ul[data-pie-id='" + whatToGet + "-chart']")).append("<li data-value=\"" + value + "\">" + key + " (" + value + ")</li>");
    });
    return Pizza.init();
  };

  submit = function(e) {
    var user;
    user = ($('#username')).val();
    if (!user) {
      return;
    }
    getForUser(user);
    ($('.content h1')).html("<a href=\"http://github.com/" + user + "\">@" + user + "</a>");
    return ($('.content')).show();
  };

  $(document).ready(function() {
    ($("button")).click(submit);
    return ($('input')).bind('keypress', function(e) {
      if (e.keyCode === 13) {
        return submit();
      }
    });
  });

}).call(this);
