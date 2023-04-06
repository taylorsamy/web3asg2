// uses passport authentication infrastructure to check if authentication is 
// needed at some point in middleware pipeline. 
function ensureAuthenticated (req, resp, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('info', '');
    resp.render('login', {message: req.flash('info')} );
 }
 
 module.exports = { ensureAuthenticated };
 
 