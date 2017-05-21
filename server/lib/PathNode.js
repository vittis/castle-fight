"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PathNode = (function () {
    function PathNode(g, h, previous, data) {
        this.g = g;
        this.h = h;
        this.previous = previous;
        this.data = data;
    }
    PathNode.prototype.f = function () { return this.g + this.h; };
    return PathNode;
}());
exports.PathNode = PathNode;
