const BizReq = require('../../utils/bizReq');
const Req = require('../../utils/request.js');
const System = require('../../utils/system.js');
const API_URI = require('../../config/API_URI.js');
const Tools = require('../../utils/tools.js');


class My {

    static getAllVRLessonByPage(){
        let _request = new BizReq();
        return Req.Get(_request.buildDomainStr(API_URI.VRLesson.URI_VR_LIST))
            .then(function(data){
                return data;
            });
        // return _request.auth_post_api(API_URI.Helper.URI_VR_LIST)
        // .then(function(d){
        //   return d.data;
        // });
    }




}

module.exports = My;