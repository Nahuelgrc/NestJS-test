export class UpdateProfileModel {
    userId: number;
    password: string;
    name: string;
    street: string;
    cityId: number;
    countryId: number;

    constructor(userId: number, password: string, name: string, street: string, cityId: number, countryId: number) {
        this.userId = userId;
        this.password = password
        this.name = name;
        this.street = street;
        this.cityId = cityId;
        this.countryId = countryId;
    };
}