const express = require('express')
const app = express()
const moment = require('moment')
const port = 3005

app.use(express.urlencoded({extended:false}))
app.set('view engine','ejs') // setting penggunan tampate engine untuk express
app.set('views','./view') //setting enunaan folder untuk menyimpan file .ejs

app.get('/', (req, res) => {
  res.render('beranda')
})
app.get('/profil', (req, res) => {
  res.render('profil')
})
app.get('/pengalaman', (req, res) => {
  let namaLengkap ='Si A'
  // data harus di kirim dan di pangil ke view
  res.render('detil-pengalaman',{
    nama: namaLengkap,
    alamat: 'Jakarta',
    posisi: 'Programer',
    perusahaan: 'PT. Sukses',
    gaji: 9000000,
    // pajak: (this.gaji > 10000000) ? 'kena pajak' : 'tidak perlu bayar pph'
  })
})
// synchronous = berjalan berurutan
// asynchronous = berjalan tidak berurutan
let c_karyawan = require('./controller/c_karyawan')

app.get('/karyawan', c_karyawan.index)
app.get('/karyawan/detail/:id_kry', c_karyawan.detail)
// app.get('/karyawan/hapus/:id_kry', c_karyawan.hapus)
app.get('/karyawan/tambah', c_karyawan.tambah)
app.post('/karyawan/proses-insert', c_karyawan.proses_insert)
app.get('/karyawan/edit/:id_kry', c_karyawan.edit)
app.post('/karyawan/proses-update/:id_kry', c_karyawan.proses_update)

app.listen(port, () => {
  console.log(`Aplikasi di port http://localhost:${port}`)
})