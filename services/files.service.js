const fs = require('fs').promises;
const path = require('path');
const filesDir = path.join(__dirname, '..', 'files');

const ensureJsonExtension = (fileName) => {
    if (!fileName.endsWith('.json')) {
        return `${fileName}.json`;
    }
    return fileName;
};

const fileExists = async (filePath) => {
    try {
        await fs.access(filePath);
        return true;
    } catch (error) {
        return false;
    }
};

const createFile = async (fileName, content) => {
    try {
        fileName = ensureJsonExtension(fileName);
        const filePath = path.join(filesDir, fileName);

        if (await fileExists(filePath)) {
            throw new Error('File already exists');
        }
        await fs.writeFile(filePath, JSON.stringify(content, null, 2));
    }catch (err){
        throw err
    }

};

const listFiles = async () => {
    try {
        const files = await fs.readdir(filesDir);
        if (files.length === 0 || !files.filter(file => file.endsWith('.json')).length) {
           throw new  Error('No files found')
        }
        return files.filter(file => file.endsWith('.json'));

    }catch (error){
        throw error
    }

};

const getFile = async (req) => {
    try {
        let { fileName } = req.params;
        fileName = ensureJsonExtension(fileName);
        const filePath = path.join(filesDir, fileName);
        const content = await fs.readFile(filePath, 'utf8');
        return JSON.parse(content);

    }catch (error){
           throw error
    }

};

const updateFile = async (req) => {
    try {
        let { fileName } = req.params;
        const content = req.body;
        fileName = ensureJsonExtension(fileName);

        fileName = ensureJsonExtension(fileName);
        const filePath = path.join(filesDir, fileName);

        try {
            await fileExists()
        } catch (error) {
            throw new Error('File not found');
        }

        if (typeof content !== 'object' || content === null) {
            throw new Error('Content error');
        }

        await fs.writeFile(filePath, JSON.stringify(content, null, 2));

    }catch (error){
        throw error
    }

};

const deleteFile = async (req) => {
    try {
        let { fileName } = req.params;
        fileName = ensureJsonExtension(fileName);
        const filePath = path.join(filesDir, fileName);
        await fs.unlink(filePath);

    }catch (error){
        throw error
    }

};

module.exports = { createFile, listFiles, getFile, updateFile, deleteFile };
