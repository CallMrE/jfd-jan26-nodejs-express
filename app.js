const express = require('express')
const app = express()
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
app.get('/karyawan', async (req,res)=>{
  res.render('karyawan/all', {
       data_karyawan: await require('./model/m_karyawan').get_semua_karyawan()
  })
})
app.get('/karyawan/detail/:id_kry', async (req,res)=>{
  let id_kry = req.params.id_kry
  res.render('karyawan/profil',{
       profil_karyawan: await require('./model/m_karyawan').get_1_karyawan(id_kry)
  })
}),
// app.get('/karyawan/hapus/:id_kry', async (req,res)=>{
//   let id_kry = req.params.id_kry
//   let proses_hapus = await require('./model/m_karyawan').hapus_1_karyawan(id_kry)
//   if (proses_hapus.affectedRows > 0) {
//         res.redirect('karyawan/all')
//       }
// }),
app.get('/karyawan/tambah', (req,res)=>{
    res.render('karyawan/form-tambah')
}),
app.post('/karyawan/proses-insert', async (req,res)=>{
    try {
        let proses_insert = await require('./model/m_karyawan').insert_1_karyawan(req)
        if (proses_insert.affectedRows > 0) {
            res.redirect('/karyawan')
        }
    } catch (error) {
        res.redirect('/karyawan/tambah')
    }
}),
app.listen(port, () => {
  console.log(`Aplikasi di port http://localhost:${port}`)
})