#!/usr/bin/env node

/**
* @license MIT
*
* Copyright (c) 2020 Python Data APIs Consortium.
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/

'use strict';

// MODULES //

var resolve = require( 'path' ).resolve;
var readJSON = require( '@stdlib/fs/read-json' ).sync;
var pluck = require( '@stdlib/utils/pluck' );
var rankByUsage = require( './utils/rank_by_usage.js' );


// MAIN //

/**
* Main execution sequence.
*
* @private
*/
function main() {
	var fpath;
	var fopts;
	var list;
	var out;

	fopts = {
		'encoding': 'utf8'
	};
	// Load the threshold data:
	fpath = resolve( __dirname, '..', 'data', 'threshold.json' );
	list = readJSON( fpath, fopts );
	if ( list instanceof Error ) {
		console.error( list.message );
		return;
	}
	// Extract a list of NumPy APIs:
	list = pluck( list, 'numpy' );

	// Rank the list of NumPy APIs based on relative usage:
	out = rankByUsage( list );

	// Print the result:
	console.log( JSON.stringify( out ) );
}

main();
