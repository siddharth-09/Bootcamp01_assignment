const fs = require("fs");

const contents = fs.readFileSync("a.txt", "utf-8");
let temp = 0;
for(let i = 0;i<=11111111111;i++){
    temp++
}
console.log(contents);
console.log(temp);
const contents2 = fs.readFileSync("b.txt", "utf-8");
console.log(contents2);