import axios from "axios"

export async function getAll(url) {
    try {
        return await axios.get(url, params = null, headers = null)
    } catch (error) {
        throw error
    }
}

export async function postDB(url, params = null, headers = null) {
    try {
        return await axios.post(url, params, headers)
    } catch (error) {
        throw error
    }
}

export async function putDB(url, params) {
    try {
        return await axios.put(url, params)
    } catch (error) {
        throw error
    }
}

export async function deleteDB(url) {
    try {
        return await axios.delete(url)
    } catch (error) {
        throw error
    }
}