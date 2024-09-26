import { parseRdf } from "@ldo/ldo";
import { LdpApiDescShapeType } from "../.ldo/ldpApiDesc.shapeTypes";
import { HttpConnection, HttpRequest } from "../.ldo/ldpApiDesc.typings";

export async function run(turtle: string) {
  const ldo = await parseRdf(turtle, {
    baseIRI: "file:///",
  });

  const apiDesc = ldo.usingType(LdpApiDescShapeType).fromSubject("file:///");

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

  console.log(html);
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
    result = result.concat(`<details class="interaction ${item.method.toLowerCase()}">\n`);
    result = result.concat(`<summary><span class="method ${item.method.toLowerCase()}">${item.method}</span>\n`);
    result = result.concat(`<span class="path">${item.absolutePath}</span>\n`);
    result = result.concat(`<span class="label">${item.label}</span></summary>\n`);
    result = result.concat('<p>foobar</p>\n');
    if (item.resp !== undefined) {
      result = result.concat(`<p>${item.resp.statusCodeNumber}</p>`);
    }
    result = result.concat(`<a href="${item['@id']}">${item['@id']}</a>`);
    result = result.concat('</details>\n');
  }

  return result;
}
