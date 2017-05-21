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
    /**
     * Find the cheapest path between two nodes
     * @param a Origin
     * @param b Destination
     */
    AStar.prototype.path = function (a, b) {
        var open = new Array(), closed = new Array();
        var next = new PathNode_1.PathNode(0, this.heuristic.getHeuristic(a.x, a.y, a.z, b.x, b.y, b.z), null, a);
        // find lowest
        while (next.data != b) {
            var lowest = null;
            var lowestIndex = -1;
            for (var i = 0; i < open.length; i++) {
                if (lowest == null || lowest.f() > open[i].f()) {
                    lowest = open[i];
                    lowestIndex = i;
                }
            }
            // add to closed
            if (lowest != null) {
                // open[open.length-1] = open[lowestIndex];
                open.splice(lowestIndex, 1);
                closed.push(lowest);
                next = lowest;
            }
            // for all next connections, add to open if not in closed or open
            var connections = next.data.getConnections();
            for (var i = 0; i < connections.length; i++) {
                // list check
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
                // calculate score
                var node = connections[i];
                var g = next.g;
                g += Math.sqrt(Math.pow(next.data.x - node.x, 2) +
                    Math.pow(next.data.y - node.y, 2) +
                    Math.pow(next.data.z - node.z, 2)) * node.weight;
                var h = this.heuristic.getHeuristic(node.x, node.y, node.z, b.x, b.y, b.z);
                // if not in open
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
    /**
     * Load an array into graph
     * @param data The 2d array containing weights of each tile
     */
    AStar.prototype.load = function (data) {
        this.graph.fromArray(data);
    };
    return AStar;
}());
exports.AStar = AStar;
