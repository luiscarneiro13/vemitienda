import * as Yup from 'yup'

export function initialValues(item = null, image, thumbnail, theme_id) {
    const data = {
        name: item?.name || '',
        slogan: item?.slogan || '',
        phone: item?.phone || '',
        theme_id: theme_id,
        background_color_catalog: '#FFFFFF',
        image: image,
        thumbnail: image,
        imagenCargada: true,
    }
    return data
}

export function validationSchema() {
    const data = {
        name: Yup.string('Formato inválido').required('Ingrese el nombre de la Tienda').min(3, 'Mínimo 3 caracteres').max(90, 'Máximo 90 caracteres'),
        slogan: Yup.string('Formato inválido').required('Ingrese el Slogan de su Tienda').min(3, 'Mínimo 3 caracteres').max(90, 'Máximo 90 caracteres'),
        phone: Yup.string('Formato inválido').required('Ingrese el número de teléfono de su Tienda').min(3, 'Mínimo 3 caracteres').max(90, 'Máximo 90 caracteres'),
    }
    return data
}