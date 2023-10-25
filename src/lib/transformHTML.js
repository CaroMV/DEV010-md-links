const marked = require('marked');

const transformToHTML = (data) => {
	const dataHTML = marked.parse(data);
	return dataHTML;
};

module.exports = {
	transformToHTML,
};