function startSnowflakes()
{
    const fps = 30;     //How many times a second should the Snowflakes position update
    var lastFrame = Date.now();
    snowflakes = new Set();     //A Set is similar to an Array, but the items do not have indexes
    for( var i = 0; i < 100; i++ )
    {
        //Initialize Each Snowflake
        var flake = document.createElement( "img" );    //Create an Image Element
        flake.id = "snowflake";                         //Give ID
        flake.src = "images/snowflake.png";             //Load Image
        flake.z = 0.025 + Math.random();                //Decide a Distance value
        flake.rotDir = Math.floor( Math.random()*2 ) == 1 ? 1 : -1; //Decide a random rotation direction
        flake.style.left = Math.random()*100 + "%";     //Decide a random horizontal position
        flake.style.top = Math.random()*100 + "%";      //Decide a random vertical position
        flake.style.transform = `rotate( ${Math.random()*360}deg )`;    //Decide a random intial rotation
        flake.style.height = flake.z * 30 + "px";       //Scale size to Distance
        flake.style.opacity = Math.random();            //Decide a random Transparency level
        document.body.appendChild( flake );             //Add the new Snowflake to the Document
        snowflakes.add( flake );                        //Add to Set (List) of Snowflakes
    }
    setInterval( () =>
    {
        //Tick Each Snowflake
        var y;
        snowflakes.forEach( flake =>
        {
            timeScale = ( Date.now() - lastFrame ) / 100;   //Get a Delta (Time Difference) multiplier for later use
            y = parseFloat( flake.style.top.replace( "%" ) ) + 0.1 + 0.3 * flake.z * timeScale;     //Offset Vertically, according to Distance and Time Passed
            if( y > 100 )   //If below screen
            y = -5;         //Move Above screen
            x = parseFloat( flake.style.left.replace( "%" ) ) + 0.03 + 0.05 * flake.z * timeScale;  //Offset Horizontally, according to Distance and Time Passed
            if( x > 100 )   //If outside screen to the right
                x = -5;     //Move to the Left of screen
            deg = parseFloat( flake.style.transform.replace( /[^0-9.,]/g, "" ) );   //Convert String Degrees to a Float value, by removing characters, and parsing as Float
            deg += 3 * flake.z * flake.rotDir * timeScale;  //Add some Degrees, depending on Distance, and Time Scale, in a specific Direction
            if( deg < 0 )           //If Degree value negative
                deg = 360 - deg;    //Simulate an Underflow from 360
            flake.style.top = y + "%";      //Set the new Vertical position as Percentage
            flake.style.left = x + "%";     //Set the new Horizontal position as Percentage
            flake.style.transform = `rotate( ${deg}deg )`;  //Set the new Rotation value as Degrees
        });
        lastFrame = Date.now(); //Take note of last frame time
    }, 1000/fps );
}