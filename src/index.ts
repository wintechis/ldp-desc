/**
 * Index file for generating a HTML document
 * from the LDP API description in RDF.
 * 
 * Andreas Harth, 2024
 * 
 * @module
 */

import { run } from './generate';
import { readFileSync } from 'fs';

// handle ctrl-c
process.on('SIGINT', function() {
	console.log('SIGINT, stopping...');
	process.exit(-2);
});

/**
 *
 */
function usage() {
	console.log('Usage: node index.js (reads from stdin, writes to stdout)');
}

async function main2() {
    let data = readFileSync(0, 'utf-8');

	await run(data);
}

try {
	if (process.argv.length != 2) {
		usage();
		process.exit(1);
	}

    void main2();
} catch (e) {
	console.error(e);
}