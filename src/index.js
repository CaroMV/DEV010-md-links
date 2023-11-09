const fs = require('fs').promises;
const isMarkdownFile = require('./lib/fileExtension');
const { extractLinks } = require('./lib/extractLinks');
const validateLinks = require('./lib/linkValidation');
const pathTransform = require('./lib/pathTransform');
const getFilesFromDir = require('./lib/getFilesFromDir');
/**
 * 
 * @param {string} filePath 
 * @param {boolean} validate 
 * @returns {Array<object>}
 */
function mdLinks(filePath, validate = false) {
	// estaba pensando en utilizar async await para evitar las anidaciones posteriores
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
					//console.log('It\'s a directory');
					// Si es un directorio
					const files = getFilesFromDir(absolutePath);
					//console.log('Qué files hay en el directorio?', files);
					const markdownFiles = files.filter(file => isMarkdownFile(file));
					//console.log('markdown files path',markdownFiles);
					const allLinksPromises = markdownFiles.map(markdownFile => {
						return extractLinks(markdownFile);
					});

					Promise.all(allLinksPromises)
						.then(allLinks => {
							const flattenedLinks = [].concat(...allLinks);

							if (validate) {
								const validatedLinks = validateLinks(flattenedLinks);
								//console.log('Validating links');
								resolve(validatedLinks);
							} else {
								//console.log('Links extraction complete');
								resolve(flattenedLinks);
							}
						})
						.catch(error => {
							reject(error);
						});
				} else if (!isMarkdownFile(absolutePath)) {
					//no es markdown
					//console.log('Not a Markdown file');
					reject(new Error('El archivo no es de tipo Markdown.'));
				} else {
					// es archivo markdown
					extractLinks(absolutePath)
						.then((links) => {
							if (validate) {
								const validatedLinks = validateLinks(links);
								//console.log('Validating links');
								resolve(validatedLinks);
							} else {
								//console.log('Links extraction complete');
								resolve(links);
							}
						})
						.catch((error) => {
							reject(error);
						});
				}
			})
			.catch((error) => {
				//console.log('Error:', error);
				reject(error);
			});
	});
}
  
module.exports = mdLinks;