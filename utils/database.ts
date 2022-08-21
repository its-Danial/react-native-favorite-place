import * as SQLite from "expo-sqlite";

import { Place } from "../models/Place";

const database = SQLite.openDatabase("places.db");

export const db_init = () => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((transaction) =>
      transaction.executeSql(
        `CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY NOT NULL,
            title TEXT NOT NULL,
            imageUri TEXT NOT NULL,
            address TEXT NOT NULL,
            latitude REAL NOT NULL,
            longitude REAL NOT NULL
            )`,
        [],
        (_, resultSet) => {
          resolve(resultSet.insertId);
        },
        // @ts-ignore
        (_, error) => {
          reject(error);
        }
      )
    );
  });

  return promise;
};

export const insertPlacesToDbTable = (place: Place) => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((transaction) => {
      transaction.executeSql(
        `INSERT INTO places 
      (title, imageUri, address, latitude, longitude) VALUES (?,?,?,?,?)`,
        [place.title, place.imageUri, place.address, place.location.latitude, place.location.longitude],
        (_, resultSet) => {
          // console.log(resultSet);
          resolve(resultSet);
        },
        // @ts-ignore
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
};

export const fetchPlacesFromDatabase = () => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((transaction) => {
      transaction.executeSql(
        `SELECT * FROM places`,
        [],
        (_, resultSet) => {
          const loadedPlaces: Place[] = [];

          resultSet.rows._array.forEach((loadedPlace: Place) => {
            loadedPlaces.push(
              new Place(
                loadedPlace.id,
                loadedPlace.title,
                loadedPlace.imageUri,
                loadedPlace.address,
                loadedPlace.location
              )
            );
          });

          resolve(loadedPlaces);
        },
        // @ts-ignore
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
};
