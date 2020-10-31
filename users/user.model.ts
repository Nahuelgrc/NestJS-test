export class User {
    id: Number;
    username: String;
    password: String;

    constructor(id: Number, username: String, password: String) {
        this.id = id;
        this.username = username;
        this.password = password;
    };
}