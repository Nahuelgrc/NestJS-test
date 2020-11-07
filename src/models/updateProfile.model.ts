export class UpdateProfileModel {
    userId: number;
    street: string;
    cityId: number;
    countryId: number;

    constructor(userId: number, street: string, cityId: number, countryId: number) {
        this.userId = userId;
        this.street = street;
        this.cityId = cityId;
        this.countryId = countryId;
    };
}