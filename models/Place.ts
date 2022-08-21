export type LocationType = {
  latitude: number;
  longitude: number;
};

export class Place {
  id: number;
  title: string;
  imageUri: string;
  address: string;
  location: LocationType;
  constructor(id: number, title: string, imageUri: string, address: string, location: LocationType) {
    this.id = id;
    this.title = title;
    this.imageUri = imageUri;
    this.address = address;
    this.location = location;
  }
}
