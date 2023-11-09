const fs = require('fs');
/**
 * extractLinks its a function thats returns an array with the links found in a markdown file
 * @param {string} filePath 
 * @returns {Array<Array>}
 */
async function extractLinks(filePath) {
	const markdownContent = await fs.promises.readFile(filePath, 'utf8');
	const links = [];
	const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  
	let match;
	while ((match = linkRegex.exec(markdownContent)) !== null) {
		let [, text, href] = match;
  
		if (href.startsWith('https:https://')) {
			
			href = href.replace('https:https://', 'https://');
		}
  
		links.push({ href, text });
	}
  
	return links;
}

module.exports = {
	extractLinks,
};
