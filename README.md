# Descriptions of Linked Data Platform (LDP) Interfaces

npm install

npm run build

cat desc/msds-api.ttl | node dist/src/index.js > desc/msds-api.htm

## See also

https://github.com/Interactions-HSG/wot-td-java/tree/master/samples

https://redocly.github.io/redoc/#tag/Events/operation/listSpecialEvents

https://gist.github.com/oseiskar/dbd51a3727fc96dcf5ed189fca491fb3 (swagger-yaml-to-html.py)

## Example TD

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