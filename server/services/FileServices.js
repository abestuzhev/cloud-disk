const config = require("config");

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
}

module.exports = new FileServices();