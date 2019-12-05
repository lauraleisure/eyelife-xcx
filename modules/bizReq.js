const Q = require('../utils/q.js')
const base = require('../utils/request.js')
const wxTools = require('../utils/wxTools.js')
const JWT = require('../utils/jsrsasign-jwths-min.js')
const Rst = require('../utils/rst.js')
const STORAGE_KEYS = require('../config/page/STORAGE_KEYS.js')
const API_CONFIG = require('../config/server/API_SERVER.js')
const Error_MAP = require('../config/server/ERROR_MAP.js')
const Sys_Errors = Error_MAP.SYS

function Requester(){}

Requester.prototype = base;

Requester.prototype.applyToken = function(tokenKey){
  var that = this;
  return Q.fcall(function(){
    return wxTools.getStorage(tokenKey || STORAGE_KEYS.SYSTEM_USER).then(function (token) {
      if(!token){
        throw 'no token';
      }
      that.tokenPrefix = "Bearer ";
      that.token = token;
    }).catch(function (err) {
      throw Rst.from(Sys_Errors.NO_TOKEN);
    });
  });
}

Requester.prototype.applyJWT = function(){
  var that = this;
  return Q.fcall(function(){
    let jwtToken = JWT.jws.JWS.sign(null, { alg: "HS256", cty: "JWT" }, {}, API_CONFIG.JWT_SECRET);
    that.tokenPrefix = "Jwt ";
    that.token = jwtToken;
  }).catch(function(err){
    throw Rst.create('jwt error');
  })
}

Requester.prototype.buildDomainStr = function(uri){
  return API_CONFIG.PROTOCOL + "://" + API_CONFIG.DOMAIN + (API_CONFIG.PORT === 80 ? '' : (":" + API_CONFIG.PORT)) + uri;
}

Requester.prototype.post_api = function(uri,data){
  return this.Post(this.buildDomainStr(uri), data, this.token, this.tokenPrefix);
}

Requester.prototype.get_api = function (uri) {
  return this.Get(this.buildDomainStr(uri), this.token, this.tokenPrefix);
}
/*不需要登录授权权限的接口访问方式：post请求访问*/
Requester.prototype.jwt_post_api = function(uri,data){
  var that = this;
  return this.applyJWT().then(function(){
    return that.post_api(uri,data);
  });
}
/*不需要登录授权权限的接口访问方式：get请求访问*/
Requester.prototype.jwt_get_api = function (uri) {
  var that = this;
  return this.applyJWT().then(function () {
    return that.get_api(uri);
  });
}
/*需要登录授权权限的接口访问方式：get请求访问*/
Requester.prototype.auth_post_api = function (uri, data,tokenKey) {
  var that = this;
  return this.applyToken(tokenKey).then(function () {
    return that.post_api(uri, data);
  });
}
/*需要登录授权权限的接口访问方式：get请求访问*/
Requester.prototype.auth_get_api = function (uri, tokenKey) {
  var that = this;
  return this.applyToken(tokenKey).then(function () {
    return that.get_api(uri);
  });
}

Requester.prototype.third_get_api = function (uri) {
    return this.third_Get(uri);
}

module.exports = Requester;
