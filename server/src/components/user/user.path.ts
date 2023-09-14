export function queryCreateUser(name:string,pass:string,role:string){
    return `INSERT INTO users (id, name, password, role) VALUES (null,'${name}','${pass}','${role}')`
}