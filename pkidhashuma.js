
var totalRevenue;
var numOfShortQuests;
var pkidHashuma;
var currency;


//main
//pkidHashumaProf

retrievePlayersInfo();
updateInfo();

//main - end

window.addEventListener('load', function() {
  window.scrollTo(0, 0);
});


function continueGame()
{

    var yoetsHamasFlag = false;    

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
    pkidHashuma = localStorage.getItem('pkidHashuma');    

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

    document.querySelector("#pkidHashumaProf").innerHTML = "בעל הפדיון המירבי (" + pkidHashuma + ") מונה למשרת פקיד השומה.";
    
    var revenueLine = "סך הפדיון של כל הנישומים: " + totalRevenue + " " + currency + "</br>";
    var maxShumaLine = "שומה מירבית לגבייה: " + totalRevenue / 2 + " " + currency + "</br>";
    var totalQuestsLine = "סך השאלות שיוצגו לפקיד השומה: " + numOfShortQuests + "</br>";
    var shumaForQuestLine = "שומה שולית לשאלה: " + totalRevenue / 2 / numOfShortQuests + " " + currency + "</br>";
    var comment = "לתשומת לבכם - ניתן להשיב גם 1 או 2" + "</br>";
    

    var taxIncomeLine = revenueLine + maxShumaLine + totalQuestsLine + shumaForQuestLine + comment;
   
    document.querySelector("#taxIncomeInfo").innerHTML = taxIncomeLine;
    

}

