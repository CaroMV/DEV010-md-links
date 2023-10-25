const fs = require('fs').promises;
const isMarkdownFile = require('./lib/fileExtension');
const { extractLinks } = require('./lib/extractLinks');
const validateLinks = require('./lib/linkValidation');
const pathTransform = require('./lib/pathTransform');
/**
 * 
 * @param {string} filePath 
 * @param {boolean} validate 
 * @returns {Array<object>}
 */
function mdLinks(filePath, validate = false) {
	return new Promise((resolve, reject) => {
		const absolutePath = pathTransform(filePath);
		//console.log('Absolute Path:', absolutePath);

		fs.access(absolutePath)
			.then(() => {
				return fs.stat(absolutePath);
			})
			.then((stats) => {
				//console.log('File Stats:', stats);

				if (stats.isDirectory()) {
					console.log('It\'s a directory');
					throw new Error('La ruta debe apuntar a un archivo, no a un directorio.');
				}

				if (!isMarkdownFile(absolutePath)) {
					console.log('Not a Markdown file');
					throw new Error('El archivo no es de tipo Markdown.');
				}

				return extractLinks(absolutePath);
			})
			.then((links) => {
				if (validate) {
					console.log('Validating links');
					return validateLinks(links);
				} else {
					console.log('Links extraction complete');
					resolve(links);
				}
			})
			.then((result) => {
				console.log('Final result:', result);
				resolve(result);
			})
			.catch((error) => {
				console.log('Error:', error);
				reject(error);
			});
	});
}
  
module.exports = mdLinks;