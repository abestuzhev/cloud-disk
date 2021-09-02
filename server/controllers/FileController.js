
const fileService = require('../services/fileService')
const File = require('../models/File')
const User = require('../models/User')
const config = require("config");
const fs = require("fs");
const Uuid = require("uuid");


class FileController {
    async createDir(req, res) {
        try {
            const {name, type, parent} = req.body
            const file = new File({name, type, parent, user: req.user.id})
            const parentFile = await File.findOne({_id: parent})
            if(!parentFile) {
                file.path = name
                await fileService.createDir(file)
            } else {
                file.path = `${parentFile.path}\\${file.name}`
                await fileService.createDir(file)
                parentFile.childs.push(file._id)
                await parentFile.save()
            }
            await file.save()
            return res.json(file)
        } catch (e) {
            console.log(e)
            return res.status(400).json(e)
        }
    }

    async getFiles(req, res) {
        try {
            const {sort} = req.query;
            let files;
            switch (sort) {
                case "name":
                    files = await File.find({user: req.user.id, parent: req.query.parent}).sort({name: 1});
                    break;
                case "type":
                    files = await File.find({user: req.user.id, parent: req.query.parent}).sort({type: 1})
                    break;

                case "date":
                    files = await File.find({user: req.user.id, parent: req.query.parent}).sort({date: 1})
                    break;

                default:
                    files = await File.find({user: req.user.id, parent: req.query.parent});
                    break;
            }

            return res.json(files);
        } catch (error) {
            return res.status(500).json({message: `${error}, uncorrect getFile function`})
        }
    }

    async uploadFile(req, res) {
        try {
            const file = req.files.file

            const parent = await File.findOne({user: req.user.id, _id: req.body.parent})
            const user = await User.findOne({_id: req.user.id})

            if (user.usedSpace + file.size > user.diskSpace) {
                return res.status(400).json({message: 'There no space on the disk'})
            }

            user.usedSpace = user.usedSpace + file.size

            let path;
            if (parent) {
                path = `${config.get('filePath')}\\${user._id}\\${parent.path}\\${file.name}`
            } else {
                path = `${config.get('filePath')}\\${user._id}\\${file.name}`
            }

            if (fs.existsSync(path)) {
                return res.status(400).json({message: 'File already exist'})
            }
            file.mv(path);
            let filePath = file.name;
            if(parent) {
                filePath = parent.path + '\\' + file.name;
            }

            const type = file.name.split('.').pop()
            const dbFile = new File({
                name: file.name,
                type,
                size: file.size,
                path: filePath,
                parent: parent?._id,
                user: user._id
            })

            await dbFile.save()
            await user.save()

            res.json(dbFile)
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Upload error", e})
        }
    }

    async downloadFile(req, res){
        try {
            const file = await File.findOne({user: req.user.id, _id: req.query.id});
            const path = `${config.get('filePath')}\\${req.user.id}\\${file.path}`;
            if(fs.existsSync(path)){
                return res.download(path, file.name);
            }
            return res.status(400).json({message: "File not found"});

        }catch(e) {
            return res.status(500).json({message: "Download file error", e})
        }
    }

    async deleteFile(req, res){
        try {
            const file = await File.findOne({user: req.user.id, _id: req.query.id});
            if(!file) {
                return res.status(404).json({message: "File not found"});
            }
            fileService.deleteFile(file);
            await file.remove();
            return res.json({message: "File was created"});
        }catch(e) {
            return res.status(500).json({message: "Delete file error", e})
        }
    }

    async uploadAvatar(req, res){
        try {
            const file = req.files.file
            const user = await User.findById(req.user.id);
            const avatarName = Uuid.v4() + '.jpg';
            const path = config.get("staticPath") + '\\' + avatarName;
            file.mv(path);
            user.avatar = avatarName;
            await user.save();
            return res.json(user);
        }catch(e) {
            return res.status(500).json({message: "Delete file error", e})
        }
    }
    async deleteAvatar(req, res){
        try {
            const user = await User.findById(req.user.id);
            const path = config.get("staticPath") + '\\' + user.avatar;
            fs.unlinkSync(path);
            user.avatar = null;
            await user.save();
            return res.json(user);
        }catch(e) {
            return res.status(500).json({message: "Delete file error", e})
        }
    }
        
}

module.exports = new FileController();