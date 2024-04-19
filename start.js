const fs = require( "fs" );
const runFileName = getFileNameFromFullDir( __filename );
const SAFE_TO_REMOVE_KEY = "<!-- SAFE-TO-REMOVE -->"
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
    const indexPath = `${dir}/index.html`
    let okayToWrite = true
    if(fs.existsSync(indexPath))
    {
        const indexFileContent = fs.readFileSync(indexPath, "utf8")
        if(!indexFileContent.includes(SAFE_TO_REMOVE_KEY))
        {
            okayToWrite = false
        }
    }

    console.log( `indexing ${dir}, okayToWrite: ${okayToWrite}` );
    var startFolderName = getFileNameFromFullDir( dir );
    const indexes = fs.readdirSync( dir );

    var indexList = "";

    console.log( startFolderName );
    for(const index of indexes)
    {
        type = "";
        var stat = fs.statSync( `${dir}/${index}` );
        if( stat.isDirectory() )
        {
            createIndex( `${dir}/${index}` );
        }
        if(!okayToWrite)
        {
            continue
        }
        // else if( downloadFolders.includes( startFolderName ) )
        //     type = " download";
        if( !blacklist.includes( index ) )
        {
            indexList += `\t\t\t<li><a href="${index}"${type}>${index}</a></li>\n`;
        }
    }
    if(!okayToWrite)
    {
        return
    }
    indexList = indexList.slice( 0, indexList.length - 1 );

    const output = 
    `${SAFE_TO_REMOVE_KEY}
    <!DOCTYPE html>
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

    fs.writeFileSync( indexPath, output );
}

createIndex( __dirname );