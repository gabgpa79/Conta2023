const sharp = require('sharp')
const multer = require('multer')

var storage = multer.diskStorage({
    destination: function (req,file,cb) {
        cb(null,'api/public/images/trash')
    },
    filename: function (_req,file,cb){
        cb(null,Date.now()+ '-'+ file.originalname)
    }
})

var upload = multer({storage: storage}).single('file')

const _empresa = (req, res) =>{
    return new Promise((resolve)=>{
        upload(req,res,function(err){
            if(err instanceof multer.MulterError){
                resolve(err)
            }else if(err){
                resolve(err)
            }
            sharp(req.file.path).resize({height: 450}).toFile('./api/public/images/empresas/lg/'+req.file.filename);
            sharp(req.file.path).resize({height: 250}).toFile('./api/public/images/empresas/md/'+req.file.filename);
            sharp(req.file.path).resize({height: 120}).toFile('./api/public/images/empresas/sm/'+req.file.filename);
            resolve(req.file)
        })
    })
}



module.exports={    
    _empresa
}