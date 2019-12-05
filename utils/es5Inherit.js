function object(o) {
    function F() {
    }

    F.prototype = o.prototype;
    return new F();
}

function inheritPrototype(subtype, supertype) {
    var prototype = object(supertype);
    prototype.constructor = subtype;
    subtype.prototype = prototype;
}

module.exports = inheritPrototype;
