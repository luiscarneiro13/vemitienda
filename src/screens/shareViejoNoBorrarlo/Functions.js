import { DIGITALOCEAN } from "../../constants/Data"

export const MakePdf = (data, company) => {
  let cadena = `
    
    <!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${company.name}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap"
      rel="stylesheet"
    />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
    />
    <style>
      body {
        font-family: "Roboto", sans-serif;
      }
    </style>
  </head>
  <body class="container" style="background-color: ${company.background_color_catalog}">
    <div class="row">
      <div class="col-4 text-center">
        <image
          class="img-fluid"
          src="${DIGITALOCEAN + company?.logo?.url}"
        />
      </div>
      <div class="col-8">
        <div
          class="text-center"
          style="font-size: 52px; font-weight: bolder; margin-top: 65px"
        >
          ${company.name}
        </div>
        <div class="text-center" style="font-size: 32px">
          ${company.slogan}
        </div>
      </div>
    </div>

    <hr />

    <div class="row">
`


  data.map(item => {
    let col = 0
    switch (company.template_catalog_id) {
      case 1:
        col = 12
        break
      case 2:
        col = 6
        break
      case 3:
        col = 4
        break
      case 4:
        col = 3
        break
    }

    cadena = cadena +
      `<div class="col-${col} p-1">
        <div class="text-center">
          <image
          class="img-fluid"
            src="${DIGITALOCEAN + item.image[0].url}"
          />
        </div>
        <p class="text-center">
          <span style="font-weight: bold; font-size: 14px">${item.name}</span
          ><br />
          <span style="font-weight: bold; font-size: 16px">$${item.price}</span><br />
        </p>
      </div>`
  })



  cadena = cadena +
    `
    </div>
  </body>
</html>
    `
  return cadena
}