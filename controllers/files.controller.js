const fileService = require('../services/files.service');
const e = require("express");

const createFile = async (req, res) => {
    try {
        const { fileName, content } = req.body;
        await fileService.createFile(fileName, content);
        res.status(201).send({ message: 'File created successfully' });
    } catch (error) {
        if (error.message === 'File already exists') {
            return res.status(400).send({ message: 'Error creating file', error: error.message });
        }
       return  res.status(500).send({ message: 'Error creating file', error: error.message });
    }
};

const listFiles = async (req, res) => {
    try {
        const files = await fileService.listFiles();
       return  res.status(200).send(files);
    } catch (error) {
        if(error.message === 'No files found'){
          return   res.status(404).send({ message: "File not found" });
        }
       return  res.status(500).send({ message: 'Error reading files', error: error.message });
    }
};

const getFile = async (req, res) => {
    try {
        const content = await fileService.getFile(req);
        res.status(200).send(content);
    } catch (error) {
        if(error.code== 'ENOENT'){
          return res.status(404).send({ message: "File not found" });
        }
      return res.status(500).send({ message: 'Error reading file', error: error.message });
    }
};

const updateFile = async (req, res) => {
    try {
        await fileService.updateFile(req);
        res.status(200).send({ message: 'File updated successfully' });
    } catch (error) {
        if (error.message === 'File not found') {
             res.status(404).send({ message: "File not found"});
        }
        if(error.message ==='Content error')
        res.status(400).send({ message: 'Error update file', error: error.message });
    }
};

const deleteFile = async (req, res) => {
    try {
        await fileService.deleteFile(req);
       return  res.status(200).send({ message: 'File deleted successfully' });
    } catch (error) {
        if(error.code== 'ENOENT'){
          return res.status(404).send({ message: 'File not found' });
        }
       return res.status(500).send({ message: 'Error deleting file', error: error.message });
    }
};

module.exports = { createFile, listFiles, getFile, updateFile, deleteFile };
