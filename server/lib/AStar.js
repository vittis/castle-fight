"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Graph_1 = require("./Graph");
var PathNode_1 = require("./PathNode");
var AStar = (function () {
    function AStar(heuristic) {
        this.graph = new Graph_1.Graph();
        this.setHeuristic(heuristic);
    }
    AStar.prototype.getGraph = function () { return this.graph; };
    AStar.prototype.getNode = function (x, y) { return this.graph.getNode(x, y); };
    AStar.prototype.setHeuristic = function (heuristic) { this.heuristic = heuristic; };
    AStar.prototype.path = function (a, b) {
        var open = new Array(), closed = new Array();
        var next = new PathNode_1.PathNode(0, this.heuristic.getHeuristic(a.x, a.y, a.z, b.x, b.y, b.z), null, a);
        while (next.data != b) {
            var lowest = null;
            var lowestIndex = -1;
            for (var i = 0; i < open.length; i++) {
                if (lowest == null || lowest.f() > open[i].f()) {
                    lowest = open[i];
                    lowestIndex = i;
                }
            }
            if (lowest != null) {
                open.splice(lowestIndex, 1);
                closed.push(lowest);
                next = lowest;
            }
            var connections = next.data.getConnections();
            for (var i = 0; i < connections.length; i++) {
                var add = true, openIndex = -1;
                for (var j = 0; j < open.length; j++)
                    if (open[j].data.x == connections[i].x &&
                        open[j].data.y == connections[i].y &&
                        open[j].data.z == connections[i].z)
                        openIndex = j;
                for (var j = 0; j < closed.length; j++)
                    if (closed[j].data.x == connections[i].x &&
                        closed[j].data.y == connections[i].y &&
                        closed[j].data.z == connections[i].z)
                        add = false;
                var node = connections[i];
                var g = next.g;
                g += Math.sqrt(Math.pow(next.data.x - node.x, 2) +
                    Math.pow(next.data.y - node.y, 2) +
                    Math.pow(next.data.z - node.z, 2)) * node.weight;
                var h = this.heuristic.getHeuristic(node.x, node.y, node.z, b.x, b.y, b.z);
                if (openIndex == -1 && add)
                    open.push(new PathNode_1.PathNode(g, h, next, node));
                else if (openIndex > -1 &&
                    g + h < open[openIndex].f() && add) {
                    open[openIndex].g = g;
                    open[openIndex].h = h;
                    open[openIndex].previous = next;
                }
            }
        }
        var path = new Array();
        while (next != null) {
            path.push(next.data);
            next = next.previous;
        }
        path.reverse();
        return path;
    };
    AStar.prototype.load = function (data) {
        this.graph.fromArray(data);
    };
    return AStar;
}());
exports.AStar = AStar;
