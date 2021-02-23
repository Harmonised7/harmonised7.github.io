function startSnowflakes()
{
    var lastFrame = Date.now();
    snowflakes = new Set();
    for( var i = 0; i < 1000; i++ )
    {
        var flake = document.createElement( "img" );
        flake.id = "snowflake";
        flake.src = "images/snowflake.png";
        flake.z = Math.random();
        flake.rotDir = Math.floor( Math.random()*2 ) == 1 ? 1 : -1;
        flake.style.position = "absolute";
        flake.style.left = Math.random()*100 + "%";
        flake.style.top = Math.random()*100 + "%";
        flake.style.transform = `rotate( ${Math.random()*360}deg )`;
        flake.style.height = flake.z * 30 + "px";
        flake.style.opacity = Math.random();
        document.body.appendChild( flake );
        snowflakes.add( flake );
    }
    setInterval( () =>
    {
        var y;
        snowflakes.forEach( flake =>
        {
            timeScale = ( Date.now() - lastFrame ) / 100;
            y = parseFloat( flake.style.top.replace( "%" ) ) + 0.1 + 0.3 * flake.z * timeScale;
            if( y > 100 )
            y = -5;
            x = parseFloat( flake.style.left.replace( "%" ) ) + 0.03 + 0.05 * flake.z * timeScale;
            if( x > 100 )
                x = -5;
            deg = parseFloat( flake.style.transform.replace( /[^0-9.,]/g, "" ) );
            deg += 3 * flake.z * flake.rotDir * timeScale;
            if( deg < 0 )
                deg = 360 - deg;
            flake.style.top = y + "%";
            flake.style.left = x + "%";
            flake.style.transform = `rotate( ${deg}deg )`;
        });
        lastFrame = Date.now();
    }, 50 );
}