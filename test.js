var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Entidade = (function () {
    function Entidade(data) {
        this.dataq = data;
    }
    return Entidade;
}());
var Unidade = (function (_super) {
    __extends(Unidade, _super);
    function Unidade() {
        return _super.call(this, require('./bixo.json')) || this;
    }
    Object.defineProperty(Unidade.prototype, "data", {
        get: function () {
            return this.dataq;
        },
        enumerable: true,
        configurable: true
    });
    return Unidade;
}(Entidade));
var bixao = new Unidade();
bixao.data.name = "gravido";
console.log(bixao.data.name + ", " + bixao.data.hp + ", " + bixao.data.attackRange + ", " + bixao.data.ehViado);
