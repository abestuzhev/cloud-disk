const config = require("config");
const fs = require('fs')

class FileServices {
    createDir(file){
        const filePath = `${config.get("filePath")}\\${file.user}\\${file.path}`;
        return new Promise((resolve, reject) => {
            try {
                if(!fs.existsSync(filePath)) {
                    fs.mkdirSync(filePath)
                    return resolve({message: 'File создан корректно'})
                }else {
                    return reject({message: 'File уже создан'})
                }
                
            } catch (error) {
                return reject({message: 'File error'});
            }
        })
    }

    deleteFile(file){
        const path = this.getPath(file);
        if(file.type === "dir") {
            fs.rmdirSync(path);
        }else{
            fs.unlinkSync(path);
        }
    }

    getPath(file){
        return `${config.get("filePath")}\\${file.user}\\${file.path}`;
    }
}

module.exports = new FileServices();