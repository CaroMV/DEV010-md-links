const mdLinks = require('./index.js');
const filePath = 'test/pruebas/';
const validate = true; 

mdLinks(filePath, validate)
	.then((links) => {
		console.log('Enlaces encontrados:');
		console.log(links);
		
	})
	.catch((error) => {
		console.error('Error:', error.message);
	});