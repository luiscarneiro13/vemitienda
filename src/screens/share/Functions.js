
export const MakePdf = (data) => {

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
                    <td width="50%" valign="middle" style="text-align:right;padding-right: 20px;">
                        <image width="150px" height="150px" src="https://luiscarneiro.com/wp-content/uploads/2022/08/icon-300x300.png" />
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
                    <td>
                    <center><image width="150" height="150" src="data:image/png;base64,${item?.image_base64}" /></center>
                    </td>
                    <td>
                    <center><image width="150" height="150" src="data:image/png;base64,${item?.image_base64}" /></center>
                    </td>
                </tr>
                <tr>
                <td colspan="2">
                `
        cadena = cadena + `
            <center><span style="font-size:22px"><strong>${item?.category}:</strong> ${item?.name}</span><br/></center>
            `

        if (item.price) {
            cadena = cadena + `<center><span style="font-size:16px"><strong>Precio: $${item?.price}</strong></span></center>`
        }

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
