import * as Yup from 'yup'

export function initialValues(item = null, company) {

    const data = {
        name: item?.name || '',
        description: '',
        image: item?.image ? item?.image[0]?.url : '',
        price: item?.price || 0, // Debe ser entero AJURO
        category_id: item?.category_id || 0,
        share: item?.share ?? 1,
        thumbnail: '',
        available: item?.available ?? 0,
        code: item?.code || ''
    }
    return data
}

export function validationSchema({ imagenCargada, foto, company }) {
    const data = {
        name: Yup.string('Formato inválido').required('Ingrese el nombre').min(3, 'Mínimo 3 caracteres').max(90, 'Máximo 90 caracteres'),
        category_id: Yup.number().min(1, 'Seleccione una Categoría')
    }

    if (company.is_shop) {
        data.available = Yup.number('La disponibilidad debe ser un número').min(0, 'La disponibilidad debe ser un número').required('Por favor, ingrese la cantidad disponible')
    }

    if (imagenCargada || !foto) {
        data.image = Yup.object('').required('Por favor, Tome o seleccione una foto')
    }

    return data
}