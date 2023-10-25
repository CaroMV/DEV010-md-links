const mdLinks = require('./index.js');
const filePath = 'D:/WEB DEV/LABORATORIA/DEV010-md-links/test/pruebas/cosas.md';
const validate = false; 

mdLinks(filePath, validate)
	.then((links) => {
		console.log('Enlaces encontrados:');
		console.log(links);
		
	})
	.catch((error) => {
		console.error('Error:', error.message);
	});