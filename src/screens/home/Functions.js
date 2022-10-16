import * as Yup from 'yup'

export function initialValues(item = null) {
    return {
        name: item?.name || 'Prueba API 1',
        image1: item?.images[0]?.url || 'Descripción 1',
        image1_base64: '',
        image2: '',
        image2_base64: '',
        price: '0',
        category_id: 0,
        share: 0,
    }
}

export function validationSchema() {
    return {
        name: Yup.string('Formato inválido').required('Ingrese el nombre de la Plantita').min(3, 'Mínimo 3 caracteres').max(90, 'Máximo 90 caracteres'),
        image1: Yup.string('Formato inválido').required('Por favor, Tome una foto de la Plantita'),
        image2: Yup.string('Formato inválido'),
        category_id: Yup.number().min(1, 'Seleccione una Categoría'),
    }
}

export async function handleForm(datos, accion = null, detalle = null) {
    let message = ''
    let status = 200
    let data = null

    try {
        if (datos.category_id) { datos.category_id = parseInt(datos.category_id) }
        datos.price ? parseInt(datos.price) : 0
        datos.share = parseInt(datos.category_id)

        const formData = new FormData()


    } catch (error) {
        message = "Error al tratar de agregar el Producto"
    }

    return { status, message, data }
}

export async function handleDelete(detalle) {
    let message = ''
    let status = 200

    // try {
    //     queryDB(`delete from plants where id=?`, [detalle.id])
    //     message = "Plantita eliminada con éxito"
    // } catch (error) {
    //     message = "Error al tratar de eliminar la Plantita"
    // }

    return { status, message }
}

export function filtrar(items, filter) {
    return items.filter(item => item?.name?.toLowerCase().includes(filter.toLowerCase()) || item?.category?.toLowerCase().includes(filter.toLowerCase()))
}