/**
 * Functions for generating a HTML document
 * from the LDP API description in RDF.
 * 
 * Andreas Harth, 2024
 * 
 * @module
 */

import { parseRdf } from '@ldo/ldo';
import { LdpApiDescShapeType } from '../.ldo/ldpApiDesc.shapeTypes';
import { HttpConnection, HttpRequest } from '../.ldo/ldpApiDesc.typings';
import { html_beautify as htmlBeautify } from 'js-beautify';

const BASE = 'file:///';

export async function run(turtle: string) {
    const ldo = await parseRdf(turtle, {
        baseIRI: BASE,
    });

    const apiDesc = ldo.usingType(LdpApiDescShapeType).fromSubject(BASE);

    const html = `<html>
<head>
<title>${apiDesc.title}</title>
<link rel="stylesheet" href="style.css"/>
</head>
<body>
<h1>${apiDesc.title}</h1>
<dl><dt>versionInfo</dt>
<dd>${apiDesc.versionInfo}</dd></dl>
${renderConnections(apiDesc.seeAlso)}
</body>
</html>`;

    console.log(htmlBeautify(html));
}

function renderConnections(items: HttpConnection[] | undefined) {
    let result = '';
    if (items === undefined) {
        return result;
    }

    for (const item of items) {
        result = result.concat(`<h2>${item.label}</h2>\n`);
        result = result.concat(`<p>${item.comment}</p>\n`);
        result = result.concat(renderRequestResponse(item.requests));
    }

    return result;
}

function renderRequestResponse(items: HttpRequest[] | undefined) {
    let result = '';
    if (items === undefined) {
        return result;
    }

    for (const item of items) {
        const id = item['@id']?.replace(BASE, '');

        if (id === undefined) {
            return result;
        }

        result = result.concat(`<details id="${id.replace('#', '')}" class="interaction ${item.method.toLowerCase()}">\n`);
        result = result.concat(`<summary><span class="method ${item.method.toLowerCase()}">${item.method}</span>\n`);
        result = result.concat(`<span class="path">${item.absolutePath}</span>\n`);
        result = result.concat(`<span class="label">${item.label}</span></summary>\n`);
        if (item.resp !== undefined) {
            result = result.concat(`<p>${item.resp.statusCodeNumber}</p>`);
        }

        result = result.concat(`<a href="${id}">${id}</a>`);
        result = result.concat('</details>\n');
    }

    return result;
}
