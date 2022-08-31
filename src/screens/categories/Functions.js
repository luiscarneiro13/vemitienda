import * as Yup from 'yup'
import { queryDB } from '../../constants/DataBase'

export function initialValues(detalle) {
    return {
        name: detalle?.name || '',
    }
}

export function validationSchema() {
    return {
        name: Yup.string('Formato inválido').required('Ingrese el nombre de la categoría').min(3, 'Mínimo 3 caracteres').max(90, 'Máximo 90 caracteres'),
    }
}

export async function handleForm(datos, accion, detalle = null) {
    let message = ''
    let status = 200
    let data = null

    if (accion === 'Update') {
        try {
            queryDB(`UPDATE categories SET name = ? WHERE id = ?;`, [datos.name, detalle.id])
            message = "Categoría actualizada con éxito"
            data = { id: detalle.id, name: datos.name }
        } catch (error) {
            message = "Error al tratar de actualizar la Categoría"
        }
    } else {
        try {
            const id = Math.floor(Math.random() * 100000000)
            queryDB(`insert into categories (id, name) values (?, ?)`, [id, datos.name])
            data = { id, name: datos.name }
        } catch (error) {
            message = "Error al tratar de agregar la Categoría"
        }
    }
    return { status, message, data }
}

export async function handleDelete(detalle) {
    let message = ''
    let status = 200
    let data = null

    try {
        queryDB(`delete from categories where id=?`, [detalle.id])
        message = "Categoría eliminada con éxito"
    } catch (error) {
        message = "Error al tratar de eliminar la Categoría"
    }

    return { status, message, data: detalle.id }
}