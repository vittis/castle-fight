"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GraphNode = (function () {
    function GraphNode(x, y, z, weight) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.weight = weight;
        this.connections = [];
    }
    GraphNode.prototype.getConnections = function () { return this.connections; };
    GraphNode.prototype.connectTo = function (b) {
        this.connections.push(b);
    };
    return GraphNode;
}());
exports.GraphNode = GraphNode;
