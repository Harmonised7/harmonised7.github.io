const fs = require( "fs" );
const { dirname } = require("path");
const runFileName = getFileNameFromFullDir( __filename );
const blacklist =
[
    runFileName,
    ".git",
    "index.html",
    "start.js"
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

    indexes.forEach( index =>
    {
        if( !blacklist.includes( index ) )
        {
            var stat = fs.statSync( `${dir}/${index}` );
            if( stat.isDirectory() )
                createIndex( `${dir}/${index}` );
            indexList += `\t\t\t<li><a href='${index}'${downloadFolders.includes( startFolderName ) ? " download" : ""}><font size="+10">${index}</font></a></li>\n`;
        }
    });
    indexList = indexList.slice( 0, indexList.length - 1 );

    const output = 
    `<!DOCTYPE html>
    <html>
    <head><title><font size="+10">Index of ./${dir.slice( __dirname.length + 1 )}</font></title></head>
    <body>
        <h2><font size="+10">Index of ./${dir.slice( __dirname.length + 1 )}</font></h2>
        <hr>
        <ul>${dir == __dirname ? "" : `\n\t\t\t<li><a href='..'><font size="+10">..</font></a></li>`}
${indexList}
        </ul>
    </body>
    </html>`;

    fs.writeFileSync( `${dir}/index.html`, output );
}

createIndex( __dirname );