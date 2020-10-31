DROP SCHEMA IF EXISTS public CASCADE;

CREATE SCHEMA public;

SET
    search_path = public;

CREATE TABLE Country (
    id serial PRIMARY KEY,
    name varchar(100) NOT NULL
);

CREATE TABLE City (
    id serial PRIMARY KEY,
    countryId INT NOT NULL,
    name varchar(100) NOT NULL,
    CONSTRAINT fk_country FOREIGN KEY(countryId) REFERENCES Country(id)
);

CREATE TABLE Address (
    id serial PRIMARY KEY,
    cityId INT NOT NULL,
    street varchar(100) NOT NULL,
    CONSTRAINT fk_city FOREIGN KEY(cityId) REFERENCES City(id)
);

CREATE TABLE AppUser (
    id serial PRIMARY KEY,
    username varchar(100) UNIQUE NOT NULL,
    password varchar(100) NOT NULL
);

CREATE TABLE Profile (
    id serial PRIMARY KEY,
    userId INT NOT NULL,
    addressId INT NOT NULL,
    name varchar(100) NOT NULL,
    CONSTRAINT fk_user FOREIGN KEY(userId) REFERENCES AppUser(id),
    CONSTRAINT fk_address FOREIGN KEY(addressId) REFERENCES Address(id)
);