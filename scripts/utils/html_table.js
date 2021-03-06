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
var readFile = require( '@stdlib/fs/read-file' ).sync;
var replace = require( '@stdlib/string/replace' );
var objectKeys = require( '@stdlib/utils/keys' );


// VARIABLES //

var TMPL;


// FUNCTIONS //

/**
* Returns an HTML template.
*
* @private
* @returns {string} HTML template
*/
function template() {
	var fopts;
	var fpath;

	// Load the HTML template, if not already loaded:
	if ( !TMPL) {
		fopts = {
			'encoding': 'utf8'
		};
		fpath = resolve( __dirname, '..', '..', 'docs', 'table_template.html' );
		TMPL = readFile( fpath, fopts );
		if ( TMPL instanceof Error ) {
			throw TMPL;
		}
	}
	return TMPL;
}


// MAIN //

/**
* Generates an HTML table from a JSON array.
*
* @private
* @param {Array<Object>} data - JSON array
* @param {string} title - table title
* @returns {(string|void)} HTML table
*/
function createTable( data, title ) {
	var keys;
	var html;
	var out;
	var N;
	var M;
	var d;
	var i;
	var j;
	var k;


	keys = objectKeys( data[ 0 ] );
	N = keys.length;

	out = '<table>\n';
	out += '<thead>\n<tr>\n';
	for ( i = 0; i < N; i++ ) {
		out += '<th>' + keys[ i ] + '</th>\n';
	}
	out += '</tr>\n</thead>\n';

	out += '<tbody>\n';
	M = data.length;
	for ( i = 0; i < M; i++ ) {
		d = data[ i ];
		out += '<tr>\n';
		for ( j = 0; j < N; j++ ) {
			k = keys[ j ];
			if ( j === 0 ) {
				out += '<th>' + d[ k ] + '</th>\n';
			} else {
				out += '<td>' + d[ k ] + '</td>\n';
			}
		}
		out += '</tr>\n';
	}
	out += '</tbody>\n';
	out += '</table>';

	// Generate the HTML table:
	html = replace( template(), '{{TITLE}}', title );
	html = replace( html, '{{TABLE}}', out );

	return html;
}


// EXPORTS //

module.exports = createTable;
