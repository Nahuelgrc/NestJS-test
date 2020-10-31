export const convertProfile = (profile: any) => {
    return {
        id: profile.id,
        name: profile.profilename,
        address: {
            street: profile.street,
            city: profile.cityname,
            country: profile.countryname,
        }
    }
};