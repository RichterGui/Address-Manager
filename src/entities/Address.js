import '../types/types.js';

export default class Address {
  /**
   *@param {AddressType} Address
   */
  constructor({
    id,
    description,
    number,
    street,
    district,
    reference,
    zipcode,
    city,
    state,
    country,
  }) {
    this.id = id;
    this.setDescription(description);
    this.setNumber(number);
    this.setStreet(street);
    this.setDistrict(district);
    this.setReference(reference);
    this.setZipcode(zipcode);
    this.setCity(city);
    this.setState(state);
    this.setCountry(country);
  }

  setDescription(description) {
    if (!description) throw new Error('Description not informed');
    this.description = description;
  }

  setNumber(number) {
    if (!number) throw new Error('Number not informed');

    this.number = number;
  }

  setStreet(street) {
    if (!street) throw new Error('Street not informed');

    this.street = street;
  }
  setDistrict(district) {
    if (!district) throw new Error('District not informed');

    this.district = district;
  }
  setReference(reference) {
    if (!reference) throw new Error('Reference not informed');

    this.reference = reference;
  }

  setZipcode(zipcode) {
    if (!zipcode) throw new Error('Zipcode not informed');

    this.zipcode = zipcode;
  }

  setCity(city) {
    if (!city) throw new Error('City not informed');

    this.city = city;
  }
  setState(state) {
    if (!state) throw new Error('State not informed');

    this.state = state;
  }
  setCountry(country) {
    if (!country) throw new Error('Country not informed');

    this.country = country;
  }
}
