const fetch = require('isomorphic-fetch');

async function validateLinks(links) {
	const promises = links.map(async (link) => {
		try {
			const response = await fetch(link.href, { method: 'HEAD' });
			link.status = response.status;
			link.ok = 'ok';
		}	catch (error) {
			link.status = 404; 
			link.ok = 'not found';
		}
		return link;
	});
	return Promise.all(promises);
}

module.exports = validateLinks;
// quitar async await