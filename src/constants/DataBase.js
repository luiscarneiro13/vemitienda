import * as SQLite from 'expo-sqlite'

export function conectar() {
    const db = SQLite.openDatabase("db010.db");
    return db;
}

const db = conectar()

export const QueryCreateTableCategories = 'CREATE TABLE IF not exists categories (id INTEGER, name text);'
export const QueryCreateTablePlants = 'CREATE TABLE IF not exists plants (' +
    'id INTEGER,' +
    'name TEXT,' +
    'price TEXT,' +
    'image TEXT,' +
    'image_base64 TEXT,' +
    'image2 TEXT,' +
    'image2_base64 TEXT,' +
    'category_id INTEGER,' +
    'share INTEGER,' +
    'FOREIGN KEY(category_id) REFERENCES categories(id)' +
    ');'

export const CrearTablas = () => {
    queryDB(QueryCreateTableCategories, [])
    queryDB(QueryCreateTablePlants, [])
}

export const queryDB = (query, params) => {
    db.transaction(tx => {
        try {
            tx.executeSql(query, params)
        } catch (error) {
            console.log(error)
        }
    })
}

export const deleteDB = (query, params) => {
    queryDB(query, params)
}

export const selectDB = (query, params = [], callback) => {
    db.transaction(tx => {
        try {
            tx.executeSql(query, params, (_, { rows }) => { callback(rows._array) })
        } catch (error) {
            console.log(error)
        }
    })
}