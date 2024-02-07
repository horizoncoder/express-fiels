const express = require('express');
const router = express.Router();
const fileController = require('../controllers/files.controller');
const { validateFile } = require('../middlewares/validate.middleWare')

/**
 * @swagger
 * /files:
 *   post:
 *     summary: Creates a new file
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fileName
 *               - content
 *             properties:
 *               fileName:
 *                 type: string
 *                 example: "newfile"
 *               content:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: "John Doe"
 *     responses:
 *       201:
 *         description: File created successfully
 */

router.post('/', validateFile, fileController.createFile);

/**
 * @swagger
 * /files:
 *   get:
 *     summary: Retrieves a list of JSON files
 *     description: Returns a list of files from the server, filtering to include only .json files.
 *     responses:
 *       200:
 *         description: A list of JSON files
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *               example: ["file1.json", "file2.json"]
 *       404:
 *         description: No files found
 */
router.get('/', fileController.listFiles);

/**
 * @swagger
 * /files/{fileName}:
 *   get:
 *     summary: Returns the content of a file
 *     parameters:
 *       - in: path
 *         name: fileName
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the file to retrieve
 *     responses:
 *       200:
 *         description: Content of the file
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "This is the content of the file."
 */

router.get('/:fileName', fileController.getFile);

/**
 * @swagger
 * /files/{fileName}:
 *   patch:
 *     summary: Updates an existing file
 *     parameters:
 *       - in: path
 *         name: fileName
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the file to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *             content:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: "John Doe"
 *     responses:
 *       200:
 *         description: File updated successfully
 */

router.patch('/:fileName', fileController.updateFile);

/**
 * @swagger
 * /files/{fileName}:
 *   delete:
 *     summary: Deletes a file
 *     parameters:
 *       - in: path
 *         name: fileName
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the file to delete
 *     responses:
 *       200:
 *         description: File deleted successfully
 */

router.delete('/:fileName', fileController.deleteFile);

module.exports = router;
