const path = require('node:path');

const pathTransform = (inputPath) => {
	if (!path.isAbsolute(inputPath)){
		// do this
		const absolutePath = path.resolve(inputPath);
		//console.log('La ruta ingresada es relativa. Se ha transformado a absoluta');
		return absolutePath;
	} else {
		//console.log('La ruta ingresada es absoluta');
		//transformación
		return inputPath;
	}  
};
module.exports = pathTransform;