const Error_Map = require('../config/server/ERROR_MAP.js')
const Inherit = require('./es5Inherit.js')

function Rst(message, statusCode) {
    Error.apply(this, message);
    this.isRst = true;
    this.CN = message;
    this.statusCode = statusCode;
}

Inherit(Rst, Error);

Rst.prototype.applyFromError = function (err) {
    if (!err) {
        return this;
    }
    this.statusCode = err.statusCode || err.code;
    this.CN = err.CN || err.message || err.errMsg;
    this.EN = err.EN;
    if (!this.message) {
        this.message = this.CN;
    }
    return this;
}

Rst.prototype.applyFromBizErrKey = function (errKey) {
    let err = Error_Map.BIZ[errKey];
    if (!err) {
        return;
    }
    this.applyFromError(err);
}

Rst.prototype.setLanguageToEn = function () {
    if (this.EN) {
        this.message = this.EN;
    } else {
        this.message = this.CN;
    }
}

Rst.prototype.setLanguageToCN = function () {
    if (this.CN) {
        this.message = this.CN;
    }
}

module.exports = {
    from: function (error) {
        let err = new Rst();
        return err.applyFromError(error);
    },
    create: function (message, statusCode) {
        return new Rst(message, statusCode);
    },
    try: function (testErr, givenErr) {
        if (givenErr.statusCode !== (testErr.statusCode || testErr.code)) {
            return this.from(givenErr);
        }
        return this.from(testErr);
    }
}
