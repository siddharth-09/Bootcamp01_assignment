

class React { 
    constructor(width,height,color){
        this.width = width;
        this.height = height;
        this.color = color;
    }

    area(){
        return this.height * this.width;
    }
}

let r1 = new React(10,11,"Red");

console.log(r1.area())