import axios from "axios"
import { BASE_URL } from "../constants/Config"

export async function getAll(url) {
    try {
        return await axios.get(BASE_URL + url)
    } catch (error) {
        throw error
    }
}
