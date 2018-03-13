'use strict';

const Auth = require('../model/auth');
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');
const basicAuth = require('../lib/basic-auth-middleware');
const superagent = require('superagent');
const GOOGLE_OAUTH_URL = 'https://www.googleapis.com/oauth2/v4/token';
const OPEN_ID_URL = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';

module.exports = function(router){

  router.get('/oauth/google', (req, res) => {
    if(!req.query.code){
      res.redirect(process.env.CLIENT_URL);
    } else {
      console.log('__CODE__', req.query.code);
    }

    return superagent.post(GOOGLE_OAUTH_URL)
      .type('form')
      .send({
        code: req.query.code,
        grant_type: 'authorization_code',
        client_id: process.env.GOOGLE_OAUTH_ID,
        client_secret: process.env.GOOGLE_OAUTH_SECRET,
        redirect_uri: `${process.env.API_URL}/oauth/google`,
      })
      .then(tokenResponse => {
        console.log('Step 3.2 - GOOGLE TOKEN');
        if(!tokenResponse.body.access_token){
          res.redirect(process.env.CLIENT_URL);
        }
        const token = tokenResponse.body.access_token;
console.log('token', token, 'url', OPEN_ID_URL);
        return superagent.get(OPEN_ID_URL)
          .set('Authorization', `Bearer ${token}`);
      })
      .then(openIDResponse => {
        console.log('Back from OpenID');
        console.log(openIDResponse.body);
        res.cookie('X-401d21-OAuth-Token','This is the TOKEN from our backend');
        res.redirect(process.env.CLIENT_URL);
      })
      .catch(error => {
        console.log('__ERROR__', error);
        res.cookie('X-401d21-OAuth-Token','');
        res.redirect(process.env.CLIENT_URL + '?error=oauth');
      });
  });
}
