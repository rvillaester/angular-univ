export class User{
    name: string;
    email: string;
    username: string;

    constructor(name: string, email: string, username: string){
        this.email = email;
        this.name = name;
        this.username = username;
    }
}