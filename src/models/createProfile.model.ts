export class CreateProfileModel {
    username: string;
    password: string;
    name: string;
    street: string;
    cityId: number;

    constructor(username: string, password: string, name: string, street: string, cityId: number) {
        this.username = username;
        this.password = password
        this.name = name;
        this.street = street;
        this.cityId = cityId;
    };
}