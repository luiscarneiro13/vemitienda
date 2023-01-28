import * as Yup from 'yup'

export function initialValues(item = null) {
    return {
        name: item?.name || '',
        description: '',
        image: item?.image ? item?.image[0]?.thumbnail : '',
        price: item?.price || 0, // Debe ser entero AJURO
        category_id: item?.category_id || 0,
        share: item?.share ? item?.share : 1,
        thumbnail: ''
    }
}

export function validationSchema({ imagenCargada, foto }) {
    const data = {
        name: Yup.string('Formato inválido').required('Ingrese el nombre').min(3, 'Mínimo 3 caracteres').max(90, 'Máximo 90 caracteres'),
        category_id: Yup.number().min(1, 'Seleccione una Categoría')
    }

    if (imagenCargada || !foto) {
        data.image = Yup.object('').required('Por favor, Tome o seleccione una foto')
    }

    return data
}