const buttonNames = [ "#newsButton", "#coursesButton", "#libraryButton", "#contactUsButton" ];
const boxNames = [ "#newsBox", "#coursesBox", "#libraryBox", "#contactUsBox" ];
const animationTime = 500;
var activeButton = 0;       //Default section is the News
var lastActiveButton = 0;   //Default section is the News
var expanded = true;        //The default section is open

window.onresize = updateDisplaySizeNoAnimation; //Update the dynamic box sizes when the screen is resized

function registerEvents()
{
    //Register button actions
    $( buttonNames[0] ).click( () => { handleButtonClick( 0 ); });
    $( buttonNames[1] ).click( () => { handleButtonClick( 1 ); });
    $( buttonNames[2] ).click( () => { handleButtonClick( 2 ); });
    $( buttonNames[3] ).click( () => { handleButtonClick( 3 ); });
    updateDisplaySizeNoAnimation(); //Update the sizes
}

function handleButtonClick( buttonID )
{
    lastActiveButton = activeButton;
    activeButton = buttonID;

    if( activeButton != lastActiveButton )  //If new section is selected
    {
        if( !expanded ) //If the current section is closed
            loadWindow( activeButton ); //Show new section
        else            //If Current section is not closed
            contractBox();  //Close it (This also loads the new Section)
        expandBox();    //Open Section
    }
    else //If current section button was clicked, toggle section
    {
        if( expanded )  //If expanded, close
        {
            contractBox();
            activeButton = -1;
        }
        else            //If not expanded, expand
            expandBox();
    }
}

function loadWindow()
{
    //Make all the boxes invisible, except the one that's the current section
    boxes = $( ".choiceBox" );
    for( var i = 0; i < boxes.length; i++ )
    {
        if( i == activeButton )
            boxes[i].style.display = "block";
        else
            boxes[i].style.display = "none";
    }
}

function expandBox( timeToTake )
{
    if( timeToTake == null )        //If animation time not specified
        timeToTake = animationTime; //Use default animation time value
    expanded = true;    //Indicate the section as expanded
    parentDivHeight = $( "#mainBox" ).height(); //Figure out height of the parent box
    topBarHeight = $( "#topBar" ).height();     //Figure out height of the Top Bar
    $( "#displayBox" ).animate( { "height": parentDivHeight - topBarHeight - 14 }, timeToTake );    //Animate to new dynamic height
}

function contractBox( timeToTake )
{
    if( timeToTake == null )        //If animation time not specified
        timeToTake = animationTime; //Use default animation time value
    expanded = false;   //Indicate the section as contracted
    $( "#displayBox" ).animate( { "height": "0%" }, timeToTake, () =>   //Contract the box
    {
        loadWindow( activeButton ); //Load new section when the animation is finished
    });
}

function updateDisplaySize()
{
    if( expanded )          //If Expanded
        expandBox();        //Update the size to expanded
    else                    //If Contracted
        contractBox();      //Update the size to Contracted
}

function updateDisplaySizeNoAnimation()
{
    if( expanded )          //If Expanded
        expandBox( 0 );     //Update the size to expanded
    else                    //If Contracted
        contractBox( 0 );   //Update the size to Contracted
}