import * as Yup from 'yup'

export function initialValues(item = null) {
    const data = {
        background_color_catalog: '#FFFFFF',
        image: item?.logo?.thumbnail || '',
        thumbnail: '',
        theme_id: item?.theme_id || 0,
    }
    return data
}

export function validationSchema({ imagenCargada, foto }) {
    const data = {
        background_color_catalog: Yup.string('Formato inválido').required('Ingrese el color de fondo de su catálogo').min(3, 'Mínimo 3 caracteres').max(90, 'Máximo 90 caracteres'),
        theme_id: Yup.number().min(1, 'Seleccione un Tema'),
    }

    if (imagenCargada || !foto) {
        data.image = Yup.object('').required('Por favor, Tome o seleccione una foto')
    }

    return data
}