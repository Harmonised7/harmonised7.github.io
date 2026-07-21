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
    "code.sh",
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
    const fileNames = fs.readdirSync( dir );

    var indexList = "";

    console.log( startFolderName );
    for(const fileName of fileNames)
    {
        type = "";
        const path = `${dir}/${fileName}`
        var stat = fs.statSync( path );
        if( stat.isDirectory() )
        {
            createIndex( path );
        }
        else
        {
            if(fileName.toLowerCase().includes(".html"))
            {
                const content = fs.readFileSync(path, "utf8")
                const filteredContent = content.replace(`<div id="copyright">Created With  <a href="https://www.edrawsoft.com/" target="_blank" title="edrawsoft">EdrawMind</a></div>`, "")
                if(content !== filteredContent)
                {
                    fs.writeFileSync(path, filteredContent)
                }
            }
        }
        if(!okayToWrite)
        {
            continue
        }
        // else if( downloadFolders.includes( startFolderName ) )
        //     type = " download";
        if( !blacklist.includes( fileName ) )
        {
            indexList += `\t\t\t<li><a href="${fileName}"${type}>${fileName}</a></li>\n`;
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