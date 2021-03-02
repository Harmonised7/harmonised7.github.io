const buttonNames = [ "#newsButton", "#coursesButton", "#libraryButton", "#contactUsButton" ];
const boxNames = [ "#newsBox", "#coursesBox", "#libraryBox", "#contactUsBox" ];
const animationTime = 500;
var activeButton = 0;
var lastActiveButton = 0;
var expanded = true;

window.onresize = updateDisplaySizeNoAnimation;

function registerEvents()
{
    $( buttonNames[0] ).click( () => { handleButtonClick( 0 ); });
    $( buttonNames[1] ).click( () => { handleButtonClick( 1 ); });
    $( buttonNames[2] ).click( () => { handleButtonClick( 2 ); });
    $( buttonNames[3] ).click( () => { handleButtonClick( 3 ); });
    updateDisplaySizeNoAnimation();
}

function handleButtonClick( buttonID )
{
    lastActiveButton = activeButton;
    activeButton = buttonID;

    if( activeButton != lastActiveButton )
    {
        if( !expanded )
            loadWindow( activeButton );
        else
            contractBox();
        expandBox();
    }
    else if( expanded )
    {
        contractBox();
        activeButton = -1;
    }
    else
        expandBox();
}

function loadWindow()
{
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
    if( timeToTake == null )
        timeToTake = animationTime;
    expanded = true;
    parentDivHeight = $( "#mainBox" ).height();
    topBarHeight = $( "#topBar" ).height();
    $( "#displayBox" ).animate( { "height": parentDivHeight - topBarHeight - 14 }, timeToTake );
}

function contractBox( timeToTake )
{
    if( timeToTake == null )
        timeToTake = animationTime;
    expanded = false;
    $( "#displayBox" ).animate( { "height": "0%" }, timeToTake, () =>
    {
        loadWindow( activeButton );
    });
}

function updateDisplaySize()
{
    if( expanded )
        expandBox();
    else
        contractBox();
}

function updateDisplaySizeNoAnimation()
{
    if( expanded )
        expandBox( 0 );
    else
        contractBox( 0 );
}