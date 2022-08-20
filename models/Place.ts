type LocationType = {
  latitude: number;
  longitude: number;
};

export class Place {
  id: string;
  title: string;
  imageUri: string;
  address: string;
  location: LocationType;
  constructor(title: string, imageUri: string, address: string, location: LocationType) {
    this.id = new Date().toString() + Math.random().toString();
    this.title = title;
    this.imageUri = imageUri;
    this.address = address;
    this.location = location;
  }
}
