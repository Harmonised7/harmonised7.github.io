const fs = require( "fs" );

var startFolderName = __dirname;
const indexes = fs.readdirSync( "./" );
while( startFolderName.includes( "\\" ) )
{
    startFolderName = startFolderName.slice( startFolderName.indexOf( "\\" ) + 1 );
}

indexList = "";

indexes.forEach( index =>
{
    if( index != __filename )
    {
        indexList += `\t\t\t<li>\n`;
        indexList += `\t\t\t\t<a href='${index}'>${index}</a>\n`;
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

fs.writeFileSync( "./index.html", output );