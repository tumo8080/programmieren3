let { matrix } = require("../handleMatrix");

class Template {
    constructor(z, s, energie) {
        this.zeile = z;
        this.spalte = s;
        this.energie = energie;
        this.platziereSelbstInMatrix();
    };
    platziereSelbstInMatrix(type) {
        matrix[this.zeile][this.spalte] = type;
    };
}

module.exports = Template;