import * as Yup from 'yup'

export function initialValues(item = null) {
    const data = {
        name: item?.name || '',
        slogan: item?.slogan || '',
        email: item?.email || '',
        phone: item?.phone || '',
        background_color_catalog: '#FFFFFF',
        image: item?.logo?.thumbnail || '',
        thumbnail: ''
    }
    return data
}

export function validationSchema({ imagenCargada, foto }) {
    const data = {
        name: Yup.string('Formato inválido').required('Ingrese el nombre de la Tienda').min(3, 'Mínimo 3 caracteres').max(90, 'Máximo 90 caracteres'),
        slogan: Yup.string('Formato inválido').required('Ingrese el Slogan de su Tienda').min(3, 'Mínimo 3 caracteres').max(90, 'Máximo 90 caracteres'),
        email: Yup.string('Formato inválido').required('Ingrese el email de su Tienda').min(3, 'Mínimo 3 caracteres').max(90, 'Máximo 90 caracteres'),
        phone: Yup.string('Formato inválido').required('Ingrese el número de teléfono de su Tienda').min(3, 'Mínimo 3 caracteres').max(90, 'Máximo 90 caracteres'),
        background_color_catalog: Yup.string('Formato inválido').required('Ingrese el color de fondo de su catálogo').min(3, 'Mínimo 3 caracteres').max(90, 'Máximo 90 caracteres'),
    }

    if (imagenCargada || !foto) {
        data.image = Yup.object('').required('Por favor, Tome o seleccione una foto')
    }

    return data
}