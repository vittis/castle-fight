interface Data {
    name : string;
    hp : number;
    attackRange : number;
}

interface DataQ extends Data {
    ehViado? : false;
}

class Entidade {

    protected dataq : Data;

    constructor(data : Data) {
        this.dataq = data;
    }

}

class Unidade extends Entidade {

    get data() : DataQ {
        return this.dataq;
    }

    constructor() {
        super(require('./bixo.json'));
    }

}


var bixao = new Unidade();
bixao.data.name = "gravido";
console.log(bixao.data.name+", "+bixao.data.hp+", "+bixao.data.attackRange+", "+bixao.data.ehViado);