const express = require('express')
const app = express()
const port = 3000

app.set('view engine','ejs') // setting penggunan tampate engine untuk express
app.set('views','./view') //setting enunaan folder untuk menyimpan file .ejs

app.get('/', (req, res) => {
  res.render('beranda')
})
app.get('/profil', (req, res) => {
  res.render('profil')
})

app.listen(port, () => {
  console.log(` Aplikasi di port http://localhost:${port}`)
})
