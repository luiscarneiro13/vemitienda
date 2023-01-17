import * as Yup from 'yup'

export function initialValues(item = null) {
    return {
        name: item?.name || '',
        slogan: item?.slogan || '',
        email: item?.email || '',
        phone: item?.phone || '',
        template_catalog_id: item?.template_catalog_id || 3,
        background_color_catalog: item?.background_color_catalog || '#FFFFFF'
    }
}

export function validationSchema() {
    return {
        name: Yup.string('Formato inválido').required('Ingrese el nombre de la Tienda').min(3, 'Mínimo 3 caracteres').max(90, 'Máximo 90 caracteres'),
        slogan: Yup.string('Formato inválido').required('Ingrese el Slogan de su Tienda').min(3, 'Mínimo 3 caracteres').max(90, 'Máximo 90 caracteres'),
        email: Yup.string('Formato inválido').required('Ingrese el email de su Tienda').min(3, 'Mínimo 3 caracteres').max(90, 'Máximo 90 caracteres'),
        phone: Yup.string('Formato inválido').required('Ingrese el número de teléfono de su Tienda').min(3, 'Mínimo 3 caracteres').max(90, 'Máximo 90 caracteres'),
    }
}