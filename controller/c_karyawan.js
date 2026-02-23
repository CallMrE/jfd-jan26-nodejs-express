let m_karyawan = require('../model/m_karyawan')
let m_agama = require('../model/m_agama')

module.exports =
{
index: async (req,res)=>{
    res.render('karyawan/all', {
        req: req,
        data_karyawan: await m_karyawan.get_semua_karyawan()
    })
},

detail: async (req,res)=>{
    let id_kry = req.params.id_kry
    res.render('karyawan/profil', {
        profil_karyawan: await m_karyawan.get_1_karyawan(id_kry)
    })
},

// hapus: async (req,res)=>{
//     let id_kry = req.params.id_kry
//     let proses_hapus = await m_karyawan.delete_1_karyawan(id_kry)
//     if (proses_hapus.affectedRows > 0) {
//         res.redirect('/karyawan')
//     }
// },

tambah: async (req,res)=>{
    res.render('karyawan/form-tambah', {
        req: req,
        agama: await m_agama.get_semua_agama(),
    })
},

proses_insert: async (req,res)=>{
    try {
        let proses_insert = await m_karyawan.insert_1_karyawan(req)
        if (proses_insert.affectedRows > 0) {
            res.redirect('/karyawan?success_msg=berhasil input karyawan baru a/n '+ req.body.form_nama)
        }
    } catch (error) {
        res.redirect('/karyawan/tambah?error_msg=' + error.errno +': '+ error.sqlMessage)
    }
},

edit: async (req,res)=>{
    let id_kry = req.params.id_kry
    res.render('karyawan/form-edit', {
        req: req,
        moment: moment,
        agama: await m_agama.get_semua_agama(),
        profil_karyawan: await m_karyawan.get_1_karyawan(id_kry),
    })
},

proses_update: async (req,res)=>{
    try {
        let proses_update = await m_karyawan.update_1_karyawan(req)
        if (proses_update.affectedRows > 0) {
            res.redirect('/karyawan?success_msg=berhasil update data karyawan a/n '+ req.body.form_nama)
        }
    } catch (error) {
        res.redirect(`/karyawan/edit/${req.params.id_kry}?error_msg=` + error.errno +': '+ error.sqlMessage)
    }
},

}