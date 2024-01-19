const fs = require( "fs" );
const { dirname } = require("path");
const runFileName = getFileNameFromFullDir( __filename );
const blacklist =
[
    runFileName,
    ".git",
    "index.html",
    "start.js",
    "start.bat",
    "js",
    "css",
    "images",
    "15233251",
    "wompers_club"
];

const downloadFolders =
[
    "books"
];

function getFileNameFromFullDir( input )
{
    while( input.includes( "\\" ) )
    {
        input = input.slice( input.indexOf( "\\" ) + 1 );
    }
    while( input.includes( "/" ) )
    {
        input = input.slice( input.indexOf( "/" ) + 1 );
    }

    return input;
}

function createIndex( dir )
{
    console.log( `indexing ${dir}` );
    var startFolderName = getFileNameFromFullDir( dir );
    const indexes = fs.readdirSync( dir );

    var indexList = "";

    console.log( startFolderName );
    indexes.forEach( index =>
    {
        if( !blacklist.includes( index ) )
        {
            type = "";
            var stat = fs.statSync( `${dir}/${index}` );
            if( stat.isDirectory() )
                createIndex( `${dir}/${index}` );
            // else if( downloadFolders.includes( startFolderName ) )
            //     type = " download";
            indexList += `\t\t\t<li><a href="${index}"${type}>${index}</a></li>\n`;
        }
    });
    indexList = indexList.slice( 0, indexList.length - 1 );

    const output = 
    `<!DOCTYPE html>
    <html>
    <head><title>Index of ./${dir.slice( __dirname.length + 1 )}</title></head>
    <body>
        <h2>Index of ./${dir.slice( __dirname.length + 1 )}</h2>
        <hr>
        <font size="+10">
        <ul>${dir == __dirname ? "" : `\n\t\t\t<li><a href='..'>..</a></li>`}
${indexList}
        </font>
        </ul>
    </body>
    </html>`;

    fs.writeFileSync( `${dir}/index.html`, output );
}

createIndex( __dirname );