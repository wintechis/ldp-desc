# Descriptions of Linked Data Platform (LDP) Interfaces

The current ldp-desc script converts an RDF file into a HTML document.
The RDF file contains descriptions of HTTP request/response pairs in the [W3C HTTP Vocabulary](https://www.w3.org/TR/HTTP-in-RDF/) using URIs in [RFC 6570 URI Template](https://www.rfc-editor.org/rfc/rfc6570) syntax.
The look and feel of the HTML document emulates [OpenAPI descriptions](https://swagger.io/specification/).

## Installation

    $ npm install
    $ npm run build

## Run

The script `dist/index.js` reads RDF in Turtle syntax from stdin and outputs HTML to stdout.
To create an HTML document from an RDF description, run the following command.

    $ cat desc/msds-api.ttl | node dist/index.js > desc/msds-api.html

The `desc/msds-api.ttl` file contains descriptions of individual HTTP request/response pairs or HTTP request/response templates.

    :READ-hostname-200
        rdfs:label "Retrieve information about /msds/{hostname}/" ;
        http:methodName "GET" ;
        http:absolutePath "/msds/{hostname}/" ;
        http:resp [ http:statusCodeNumber 200 ] .

The `desc/msds-api.ttl` file also contains general descriptions.

    <> a owl:Ontology ;
        dc:title "Minimal Solid Dataspace Server API" ;
        owl:versionInfo "0.1.0 (Waischenfeld)" ;
        rdfs:seeAlso :hostname .

The first three triples contain general information.
The `dc:title` becomes the `h1` tag in the generated HTML document.
The `owl:versionInfo` is rendered after the title.
The `rdfs:seeAlso` triple(s) link to groups of HTTP requests (read on).

To be able to group HTTP requests together, ldp-desc abuses the `http:requests` property, which is supposed to relate multiple HTTP requests to a connection.

    :hostname http:requests :READ-hostname-200 ;
        rdfs:label "Hosts" ;
        rdfs:comment "The collection resource for hosts identified via hostname." .

In ldp-desc, we interpret a "connection" as a group of HTTP requests, where the `rdfs:label` becomes a `h2` tag in the generated HTML document and the `rdfs:comment` is rendered as a brief description.

## Linking the Style Sheet

The generated HTML file references `style.css`.
Make sure that the CSS file is in the same directory as the generated HTML document.

## See Also

https://github.com/Interactions-HSG/wot-td-java/tree/master/samples

https://redocly.github.io/redoc/#tag/Events/operation/listSpecialEvents

https://gist.github.com/oseiskar/dbd51a3727fc96dcf5ed189fca491fb3 (swagger-yaml-to-html.py)

## Example TD

Note to self: for inspiration a very basic [W3C Web of Things Thing Description](https://www.w3.org/TR/wot-thing-description11/) in Turtle serialisation.

    @prefix td: <https://www.w3.org/2019/wot/td#> .
    @prefix htv: <http://www.w3.org/2011/http#> .
    @prefix hctl: <https://www.w3.org/2019/wot/hypermedia#> .
    @prefix wotsec: <https://www.w3.org/2019/wot/security#> .
    @prefix dct: <http://purl.org/dc/terms/> .
    @prefix jsonschema: <https://www.w3.org/2019/wot/json-schema#> .
    @prefix bdo: <https://freumi.inrupt.net/BinaryDataOntology.ttl#> .
    @prefix sbo: <https://freumi.inrupt.net/SimpleBluetoothOntology.ttl#> .
    
    [] a td:Thing ;
      td:title "Flower"@en ;
      td:description "Xiaomi Flower Care sensor in room 40."@en ;
      td:hasPropertyAffordance [
        td:name "temperature" ;
        jsonschema:readOnly "True" ;
        td:description "In degrees Celsius."@en ;
        bdo:pattern "{temp}0000000000023c00fb349b";
        td:hasForm [ 
          sbo:methodName sbo:read;
          hctl:hasTarget "gatt://${MAC}/00001204-0000-1000-8000-00805f9b34fb/00001a01-0000-1000-8000-00805f9b34fb";
          hctl:hasOperationType td:invokeAction
        ]
      ] .