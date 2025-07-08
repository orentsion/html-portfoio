
var totalRevenue;
var numOfShortQuests;
var yoetsHamas;
var currency;

//main

retrievePlayersInfo();
updateInfo();

//main - end


window.addEventListener('load', function() {
  window.scrollTo(0, 0);
});


function continueGame()
{
    var yoetsHamasFlag = true;    

    localStorage.setItem('yoetsHamasFlag', yoetsHamasFlag);   

    window.location.href = 'stage2.html';

    window.open("./stage2.html","_self"); 

}


function retrievePlayersInfo()
{

    const revenue1 = localStorage.getItem('revenue1') * 1;
    const revenue2 = localStorage.getItem('revenue2') * 1;
    const revenue3 = localStorage.getItem('revenue3') * 1;
    const revenue4 = localStorage.getItem('revenue4') * 1;
    
    const gameType = localStorage.getItem('gameType');
    currency = localStorage.getItem('currency');
    yoetsHamas = localStorage.getItem('yoetsHamas');    

    totalRevenue = revenue1 + revenue2 + revenue3 + revenue4 ;

    switch(gameType)
    {
        case '0':
        numOfShortQuests = 10;
        break;

        case '1':
        numOfShortQuests = 20;
        break;

        case '2':
        numOfShortQuests = 40;
        break;

        case '3':
        numOfShortQuests = 40;
        break;

    }


}


function updateInfo()
{

    document.querySelector("#yoetsHamasProf").innerHTML = "בעל הפדיון השני בגובהו (" + yoetsHamas + ") מונה למשרת יועץ המס.";
    
    var revenueLine = "סך הפדיון של כל הנישומים: " + totalRevenue + " " + currency + "</br>";
    var maxHechzerLine = "זיכוי מס מירבי: " + totalRevenue / 4 + " " + currency + "</br>";
    var totalQuestsLine = "סך השאלות שיוצגו ליועץ המס: " + numOfShortQuests + "</br>";
    var hechzerForQuestLine = "זיכוי מס שולי לשאלה: " + totalRevenue / 4 / numOfShortQuests + " " + currency + "</br>";
    var comment = "לתשומת לבכם - ניתן להשיב גם 1 או 2" + "</br>";

    var taxRefundLine = revenueLine + maxHechzerLine + totalQuestsLine + hechzerForQuestLine + comment;
   
    document.querySelector("#taxRefundInfo").innerHTML = taxRefundLine;
    

}

