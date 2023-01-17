import { DIGITALOCEAN } from "../../constants/Data"

export const MakePdf = (data, company) => {

  let cadena =
    `
        <!DOCTYPE html>
        <html lang="es">

        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Mis Plantitas</title>
            <style>
                .marca-de-agua {
                    background-image: url("https://luiscarneiro.com/wp-content/uploads/2022/08/marcadeagua-300x300.png");
                    background-repeat: no-repeat;
                    background-position: center;
                    width: 100%;
                    height: auto;
                    margin: auto;
                }
                .marca-de-agua img {
                    padding: 0;
                    width: 100%;
                    height: auto;
                    opacity: 0.7;
                }
            </style>
        </head>

        <body>
        `

  cadena = cadena + `
        <header>
            <table width="100%">
                <tr>
                    <td width="50%" valign="middle">
                        <image width="150px" height="150px" src="${DIGITALOCEAN + company.logo.url}" />
                    </td>
                    <td width="50%" valign="middle" style="padding-left: 20px;">
                        <h1>Mis Plantitas</h2>
                    </td>
                </tr>
            </table>
            <hr />
            </header>
        <table width="100%">
    `

  data.map((item, index) => {
    cadena = cadena + `<tr width="100%">
            <td style="padding-top:10px">
            <center>

            <table width="70%">
                <tr>
                <td colspan="2">
                
                </td>
                </tr>
                <tr>
                    <td>`
    if (index % 2 === 0) {
      cadena = cadena + `
                <center><image width="150" height="150" src="${DIGITALOCEAN + item?.image[0].url}" /></center>
            `
      cadena = cadena + `
            <center><span style="font-size:22px">${item?.name}</span><br/></center>
            <center><span style="font-size:16px">${item?.description}</span><br/></center>
            `

      if (item.price) {
        cadena = cadena + `<center><span style="font-size:16px"><strong>Precio: $${item?.price}</strong></span></center>`
      }
    }

    cadena = cadena + `</td>
                    <td>`
    if (index % 2 != 0) {
      cadena = cadena + `
                <center><image width="150" height="150" src="${DIGITALOCEAN + item?.image[0].url}" /></center>
            `
      cadena = cadena + `
            <center><span style="font-size:22px">${item?.name}</span><br/></center>
            <center><span style="font-size:16px">${item?.description}</span><br/></center>
            `

      if (item.price) {
        cadena = cadena + `<center><span style="font-size:16px"><strong>Precio: $${item?.price}</strong></span></center>`
      }
    }

    cadena = cadena + `</td>
                </tr>
                <tr>
                <td colspan="2">
                `

    cadena = cadena + `<br/><br/></td>
                </tr>
            </table>

            </center>
            </td>
        </tr>
        <tr width="100%"><td><hr/></td></tr>
        `
  })
  cadena = cadena + ` </table></body></html>`

  return cadena
}

export const MakePdfPrueba = (data, company) => {
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
      <div class="col-4 text-rigth">
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
      Template catalog id: ${company.template_catalog_id}<br/>
      Col: ${col}<br/>
      ${JSON.stringify(item.image)}
        <image
          class="img-fluid"
          src="${DIGITALOCEAN + item.image[0].url}"
        />
        <p class="text-center pt-1">
          <span style="font-weight: bold; font-size: 16px">${item.name}</span
          ><br />
          <span style="font-weight: bold; font-size: 20px">${item.price}</span><br />
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