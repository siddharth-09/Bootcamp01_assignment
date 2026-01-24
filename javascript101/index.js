function isLegal(users){
    let legalUsers = [];

    for(let i = 0;i<users.length;i++){
        if(users[i].age>=18){
            legalUsers.push(users[i]);
        }
    }
    return legalUsers;
}


const users = [{
    name : "Sidd",
    age : 21,
},{
    name : "gw",
    age : 17
},{
    name : "safa",
    age : 28
},{
    name : "raman",
    age : 57
},
]

const result = isLegal(users);

console.log(result[0])