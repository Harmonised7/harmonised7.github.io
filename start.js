const fs = require( "fs" );

var startFolderName = __dirname;
const blacklist =
[
    __filename,
    ".git",
    "index.html",
    "start.js"
];

const downloadFolders =
[
    "books"
];

function createIndex( dir )
{
    console.log( `indexing ${dir}` );
    var startFolderName = dir;
    const indexes = fs.readdirSync( dir );
    while( startFolderName.includes( "\\" ) )
    {
        startFolderName = startFolderName.slice( startFolderName.indexOf( "\\" ) + 1 );
    }
    while( startFolderName.includes( "/" ) )
    {
        startFolderName = startFolderName.slice( startFolderName.indexOf( "/" ) + 1 );
    }

    var indexList = "";

    indexes.forEach( index =>
    {
        if( !blacklist.includes( index ) )
        {
            var stat = fs.statSync( `${dir}/${index}` );
            if( stat.isDirectory() )
                createIndex( `${dir}/${index}` );

            indexList += `\t\t\t<li>\n`;
            indexList += `\t\t\t\t<a href='${index}'${downloadFolders.includes( startFolderName ) ? " download" : ""}>${index}</a>\n`;
            indexList += `\t\t\t</li>\n`;
        }
    });

    const output = 
    `<!DOCTYPE html>
    <html>
    <head><title>Index of ./${startFolderName}</title></head>
    <body>
        <h2>Index of ./${startFolderName}</h2>
        <hr>
        <ul>
    ${indexList}
        </ul>
    </body>
    </html>`;

    fs.writeFileSync( `${dir}/index.html`, output );
}

createIndex( __dirname );