import * as Yup from 'yup'

export function initialValues(item = null) {
    return {
        name: item?.name || '',
    }
}

export function validationSchema() {
    return {
        name: Yup.string('Formato inválido').required('Ingrese el nombre de la Categoría').min(3, 'Mínimo 3 caracteres').max(90, 'Máximo 90 caracteres'),
    }
}