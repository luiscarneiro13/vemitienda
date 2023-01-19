import * as Yup from 'yup'

export function initialValues(item = null) {
    return {
        name: item?.name || 'Prueba API 2',
        description: item?.description || 'Descripción 1',
        image: item?.image ? item?.image[0]?.url : '',
        price: item?.price || 0, // Debe ser entero AJURO
        category_id: item?.category_id || 0,
        share: item?.share ? 1 : 0,
        thumbnail:''
    }
}

export function validationSchema() {
    return {
        name: Yup.string('Formato inválido').required('Ingrese el nombre').min(3, 'Mínimo 3 caracteres').max(90, 'Máximo 90 caracteres'),
        description: Yup.string('Formato inválido').required('Ingrese la descripción').min(3, 'Mínimo 3 caracteres').max(90, 'Máximo 90 caracteres'),
        image: Yup.object('').required('Por favor, Tome o seleccione una foto'),
        category_id: Yup.number().min(1, 'Seleccione una Categoría')
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