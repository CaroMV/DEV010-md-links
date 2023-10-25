const path = require('node:path');


function isMarkdownFile(filePath) {
	const markdownExtensions = ['.md', '.mkd', '.mdwn', '.mdown', '.mdtxt', '.mdtext', '.markdown', '.text'];
	const ext = path.extname(filePath);
	return markdownExtensions.includes(ext);
}

module.exports = isMarkdownFile;