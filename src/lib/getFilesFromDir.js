const fs = require('fs');
const { join } = require('path');

function getFilesFromDir(directoryPath) {
	const files = [];
	try {
		const items = fs.readdirSync(directoryPath);
		for (const item of items) {
			const itemPath = join(directoryPath, item);
			const stats = fs.statSync(itemPath);

			if (stats.isFile()) {
				files.push(itemPath);
			} else if (stats.isDirectory()) {
				const subdirectoryFiles = getFilesFromDir(itemPath);
				files.push(...subdirectoryFiles);
			}
		}
		return files;
	} catch (error) {
		console.error('Error:', error);
		return [];
	}
}
module.exports = getFilesFromDir;
