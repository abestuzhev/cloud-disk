const File = require("../model/File");
const FileServices = require("../services/FileServices");


class FileController {
    async createDir(req, res){
        try {
            const {name, type, parent} = req.body;
            const file = new File({name, type, parent, user: req.user.id});
            const parentFile = await File.findOne({_id: parent});
            if(!parentFile) {
                file.path = name;
                await FileServices.createDir(file);
            }else {
                file.path = `${parentFile.path}\\${file.name}`;
                await FileServices.createDir(file);
                parentFile.child.push(file._id)
                await parentFile.save();
            }
            await file.save();
            return res.json(file);
        } catch (error) {
            return res.status(400).json(error)
        }
        

    }

    getFiles(req, res){
        return res.json({message: "getFiles"});
    }
}

module.exports = new FileController();