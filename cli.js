// #!/usr/bin/env node

// const program = require('commander');
// const mdLinks = require('./src/index'); 

// program
// 	.version('1.0.0')
// 	.description('Find and validate links in Markdown files.');

// program
// 	.arguments('<path>')
// 	.option('--validate', 'Validate links')
// 	.option('--stats', 'Show statistics')
// 	.action((path, options) => {
// 		const validate = options.validate || false;
// 		const stats = options.stats || false;
    
// 		mdLinks(path, { validate, stats })
// 			.then(results => {
// 				if (stats) {
// 					mdLinks(path, { validate: false })
// 						.then(results => {
// 							const totalLinks = results.length;
// 							const uniqueLinks = [...new Set(results.map(link => link.href))].length;
      
// 							console.log('Total links:', totalLinks);
// 							console.log('Unique links:', uniqueLinks);
      
// 							if (validate) {
// 								const brokenLinks = results.filter(link => link.status !== 200);
// 								const validLinks = results.filter(link => link.status === 200);
// 								const percentageValid = (validLinks.length / totalLinks) * 100;
        
// 								console.log('Broken links:', brokenLinks.length);
// 								console.log('Valid links:', validLinks.length);
// 								console.log('Percentage of valid links:', percentageValid.toFixed(2) + '%');
// 							}
// 						})
// 						.catch(error => {
// 							console.error('An error occurred:', error);
// 						});
// 				} else {
// 					// Print links
// 					results.forEach(link => {
// 						console.log(`File: ${link.file}`);
// 						console.log(`URL: ${link.href}`);
// 						console.log(`Text: ${link.text}`);
// 						if (validate) {
// 							console.log(`Status: ${link.status}`);
// 							console.log(`Status Text: ${link.statusText}`);
// 						}
// 						console.log('------------------------');
// 					});
// 				}
// 			})
// 			.catch(error => {
// 				console.error('An error occurred:', error);
// 			});
// 	});

// program.parse(process.argv);
