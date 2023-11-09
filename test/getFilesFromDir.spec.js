/* eslint-disable no-undef */
const getFilesFromDir = require('../src/lib/getFilesFromDir');
const { join } = require('path');

describe('getFilesFromDir', () => {
	it('should return an empty array for an empty directory', () => {
		const emptyDirectory = join(__dirname, 'pruebas', 'emptyDir');
		const files = getFilesFromDir(emptyDirectory);
		expect(files).toEqual([]);
	});

	it('should return an array of file paths for a directory containing files', () => {
		const dirWithFiles = join(__dirname, 'pruebas', 'dirWithFiles');
		const files = getFilesFromDir(dirWithFiles);
		const expectedFiles = [
			join(dirWithFiles, 'cosas.md'),
			join(dirWithFiles, 'segundo.md'),
			join(dirWithFiles, 'sinLinks.md'),
		];
		expect(files).toEqual(expectedFiles);
	});

	it('should return an array of file paths for a directory with subdirectories', () => {
		const dirWithSubdirs = join(__dirname, 'pruebas', 'dirWithSubdirs');
		const files = getFilesFromDir(dirWithSubdirs);
		const expectedFiles = [
			join(dirWithSubdirs, 'cosas.md'),
			join(dirWithSubdirs, 'subDir', 'cosas.md'), // Corregir la ruta
		];
		expect(files).toEqual(expectedFiles);
	});

	it('should handle cases where there are no files in the directory', () => {
		const nonExistentDirectory = join(__dirname, 'pruebas', 'nonExistentDir');
		const files = getFilesFromDir(nonExistentDirectory);
		expect(files).toEqual([]);
	});

	it('should handle errors and return an empty array if the directory is not accessible', () => {
		const inaccessibleDirectory = '/root';
		const files = getFilesFromDir(inaccessibleDirectory);
		expect(files).toEqual([]); 
	});
});
