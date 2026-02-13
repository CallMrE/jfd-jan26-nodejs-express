const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send(
      `<h1>Halaman Utama</h1><hr>
      <p>ini adalah halaman utama kita</p><hr>
      <button>simpan</button>`
    )
})
app.get('/about', (req, res) => {
  res.send(
      `<h1>Halaman about</h1><hr>`
    )
})
app.listen(port, () => {
  console.log(` Aplikasi di port http://localhost:${port}`)
})
