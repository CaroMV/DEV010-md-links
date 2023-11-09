/* eslint-disable no-undef */
const mdLinks  = require('../src/index.js');
const validateLinks = require('../src/lib/linkValidation');
const getFilesFromDir = require('../src/lib/getFilesFromDir');
const { join } = require('path');

jest.mock('../src/lib/getFilesFromDir');

global.fetch = jest.fn();

describe('mdLinks', () => {
	it('should correctly handle absolute and relative paths.', async () => {

		const absolutePath = 'D:/WEB DEV/LABORATORIA/DEV010-md-links/test/pruebas/cosas.md';
		const relativePath = './test/pruebas/cosas.md';
	
		const absoluteLinks = await mdLinks(absolutePath);
		const relativeLinks = await mdLinks(relativePath);
	
		absoluteLinks.forEach(link => {
			expect(link).toEqual(expect.objectContaining({ href: expect.any(String), text: expect.any(String)}));
		});
	
		relativeLinks.forEach(link => {
			expect(link).toEqual(expect.objectContaining({ href: expect.any(String), text: expect.any(String)}));
		});
	});

	it('should be able to check if it is a valid or invalid path.', async () => {
		const validPath = './test/pruebas/cosas.md';
		const invalidPath = '../relative/file.md';
	
		await expect(mdLinks(validPath)).resolves.toEqual(
			expect.arrayContaining([expect.objectContaining({ href: expect.any(String), text: expect.any(String)})])
		);
	
		await expect(mdLinks(invalidPath)).rejects.toThrow();
	});
	

	it('should be able to identify the file extension and throw an error for unsupported formats.', async () => {
		const supportedMd = './test/pruebas/cosas.md';
		const unsupportedTxt = './test/pruebas/sinExtention.txt';
		await expect(mdLinks(supportedMd)).resolves.not.toThrowError();
		await expect(mdLinks(unsupportedTxt)).rejects.toThrowError('El archivo no es de tipo Markdown.');
	});

	it('should be able to detect the links in a markdown file and return an array.', async () => {
		const mdFile = 'test/pruebas/cosas.md';
		const links = await mdLinks(mdFile);

		expect(links).toEqual(expect.arrayContaining([
			expect.objectContaining({ href: expect.any(String), text: expect.any(String) })
		]));
	});

	it('should be able to handle cases where a file does not contain any links.', async () => {
		const fileWithoutLinks = 'test/pruebas/sinLinks.md';
		const links = await mdLinks(fileWithoutLinks);

		expect(links).toHaveLength(0);
	});

	it('should be able to validate the links.', async () => {
		const fileWithoutLinks = 'test/pruebas/sinLinks.md';
		const links = await mdLinks(fileWithoutLinks);

		expect(links).toHaveLength(0);
	});

	it('should validate links and set status and ok properties for valid links', async () => {
		const links = [
			{ href: 'https://www.example.com', text: 'example' },
			{ href: 'https://www.google.com', text: 'google' },
		];
	
		const validatedLinks = await validateLinks(links);
	
		validatedLinks.forEach(link => {
			expect(link.status).toBe(200);
			expect(link.ok).toBe('ok');
		});
	});
	it('should validate links and set status and ok properties for valid links', async () => {
		const mdFileWithLinks = 'test/pruebas/link200.md';
		const links = await mdLinks(mdFileWithLinks, true); // Establece validate en true para validar enlaces
	
		links.forEach(link => {
			expect(link.status).toBe(200);
			expect(link.ok).toBe('ok');
		});
	});
	it('should validate links and set status and ok properties for invalid links', async () => {
		const mdFileWithInvalidLinks = 'test/pruebas/link404.md';
		const links = await mdLinks(mdFileWithInvalidLinks, true);
	
		links.forEach(link => {
			expect(link.status).toBe(404);
			expect(link.ok).toBe('not found');
		});
	});
	it('should call getFilesFromDir when given a directory', async () => {
		const dirWithFiles = join(__dirname, 'pruebas', 'dirWithFiles');
		getFilesFromDir.mockReturnValue(['array', 'of', 'file', 'paths']);
		await mdLinks(dirWithFiles);
		expect(getFilesFromDir).toHaveBeenCalledWith(dirWithFiles);
	});
});
