var mongoose = require('mongoose'),
    User = mongoose.model('User');

exports.twitter = function(token, tokenSecret, profile, done) {
  User.findOrCreate({
    username: profile.username,
    avatar: profile._json.profile_image_url_https,
    link: 'http://twitter.com/' + profile.username,
    red: 'twitter',
    redId: profile._json.id_str,
    token: token,
    tokenSecret: tokenSecret
  }, done);
  User.update(
    {
      redId: profile._json.id_str
    },
    {
      username: profile.username, 
      link: 'http://twitter.com/' + profile.username,
      avatar: profile._json.profile_image_url_https
    }, function(err){
      if(err) return done(err);      
  });
};

exports.facebook = function(accessToken, refreshToken, profile, done) {
  User.findOrCreate({
    username: profile.username,
    avatar: 'https://graph.facebook.com/'+profile.username+'/picture',
    link: profile.profileUrl,
    red: 'facebook',
    redId: profile.id,
    token: accessToken,
    tokenSecret: refreshToken
  }, done);
  User.update(
    {
      redId: profile.id
    },
    {
      username: profile.username, 
      link: profile.profileUrl,
      avatar: 'https://graph.facebook.com/'+profile.username+'/picture',
    }, function(err){
      if(err) return done(err);      
  });
};

exports.user = function(id, done) {
  User.findById(id, done);
};