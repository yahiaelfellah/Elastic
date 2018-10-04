export interface Image {
  _source: {
  accuracy: number,
  date_taken: string,
  date_uploaded: string,
  flickr_farm: string,
  flickr_secret: string,
  flickr_server: string, host: string,
  id: string,
  location:
    {lon: string, lat: string},
  message: string,
  path: string,
  tags: [{string}],
    title: string,
    type: string ,
    userid: string
  views: number,
  x: number,
  y: number,
  z: number,
};
}

export interface Found {
  length: number;
}




