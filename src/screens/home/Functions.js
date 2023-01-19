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