import * as Yup from 'yup'
import { queryDB } from '../../constants/DataBase'

export const defaultInputs = {
    name: 'Nombre XXXXX',
    image: '',
    image_base64: '',
    image2: '',
    image2_base64: '',
    price: '1',
    category_id: 0,
    share: 0,
}

export function initialValues() { return defaultInputs }

export function validationSchema() {
    return {
        name: Yup.string('Formato inválido').required('Ingrese el nombre de la Plantita').min(3, 'Mínimo 3 caracteres').max(90, 'Máximo 90 caracteres'),
        image: Yup.string('Formato inválido').required('Por favor, Tome una foto de la Plantita'),
        image2: Yup.string('Formato inválido'),
        category_id: Yup.number().min(1, 'Seleccione una Categoría'),
    }
}

export async function handleForm(datos, accion = null, detalle = null) {
    let message = ''
    let status = 200
    let data = null

    try {
        const id = Math.floor(Math.random() * 100000000)
        const category_id = parseInt(datos.category_id)
        const share = parseInt(datos.share)
        const precio = datos.price ? parseInt(datos.price) : 0
        const dataForm = [
            datos.name,
            precio,
            datos.image,
            datos.image_base64,
            datos.image2 ? datos.image2 : '',
            datos.image2_base64 ? datos.image2_base64 : '',
            category_id,
            datos.share
        ]

        dataForm.unshift(id)

        queryDB(`insert into plants (id, name, price, image, image_base64, image2, image2_base64, category_id, share) values (?,?,?,?,?,?,?,?,?)`, dataForm)
        data = {
            id,
            name: datos.name,
            price: datos.price,
            image: datos.image,
            image_base64: datos.image_base64,
            image2: datos.image2,
            image2_base64: datos.image2_base64,
            category_id,
            share,
        }
    } catch (error) {
        message = "Error al tratar de agregar la Plantita"
    }

    return { status, message, data }
}

export async function handleDelete(detalle) {
    let message = ''
    let status = 200

    try {
        queryDB(`delete from plants where id=?`, [detalle.id])
        message = "Plantita eliminada con éxito"
    } catch (error) {
        message = "Error al tratar de eliminar la Plantita"
    }

    return { status, message }
}

export function filtrar(items, filter) {
    return items.filter(item => item?.name?.toLowerCase().includes(filter.toLowerCase()) || item?.category?.toLowerCase().includes(filter.toLowerCase()))
}