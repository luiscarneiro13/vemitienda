import axios from "axios"
import { BASE_URL } from "../constants/Config"

export async function getAll(url) {
    try {
        return await axios.get(BASE_URL + url, params = null, headers = null)
    } catch (error) {
        throw error
    }
}

export async function storeDB(url, params, headers = {}) {
    try {
        return await axios.post(BASE_URL + url, params = null, headers = null)
    } catch (error) {
        throw error
    }
}

export async function putDB(url, params) {
    try {
        return await axios.put(BASE_URL + url, params)
    } catch (error) {
        throw error
    }
}

export async function deleteDB(url) {
    try {
        return await axios.delete(BASE_URL + url)
    } catch (error) {
        throw error
    }
}