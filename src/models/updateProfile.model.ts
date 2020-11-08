export class UpdateProfileModel {
    userProfileId: number;
    name: string;
    street: string;
    cityId: number;

    constructor(userProfileId: number, name: string, street: string, cityId: number) {
        this.userProfileId = userProfileId;
        this.name = name;
        this.street = street;
        this.cityId = cityId;
    };
}