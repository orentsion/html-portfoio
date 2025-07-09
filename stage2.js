//alert('this is "stage 2" java script file');

var keyboard = new Audio ("./sounds/keyboard.mp3");
var type = new Audio ("./sounds/type.wav");
var page = new Audio ("./sounds/page.mp3");
var cashreg = new Audio ("./sounds/cashreg.wav");
var correct = new Audio ("./sounds/correct.wav");
var wrong = new Audio ("./sounds/wrong.wav");
var closedoor = new Audio ("./sounds/closedoor.wav");


var CORRECT_GREEN = "#4F6F52";
var WRONG_RED = "#B06161";
var MEDAL_GOLD = "#FCDC94";
var MEDAL_SILVER = "#E3E1D9";
var MEDAL_BRONZE = "#DBA39A";

var shortQuestsIdArr = []; 
var shortQuestCounter = 0;
var correctShortQuestCounter = 0;
var shortQuestWrightAns = 0;

var playersProf = [];
var playersPoints = [0,0,0,0];
var playersRevenue = [0,0,0,0];
var playersAfterIT = [0,0,0,0];
var playersNetProfit = [0,0,0,0];

var gameType;
var selary;
var currency;
var questsVar;
var numOfShortQuest;

var fileIsOpenFlag = false;
var stageWasStarted = false;
var newWord;
var myLines = [];
var myWords = [];
var parts = [];


var curLine;
var totalPoints = 0;
var keyWasPressed = false;

var pkidHashumaPos;
var yoetsHamasPos;
var goldMedal;
var silverMedal;
var bronzeMedal;
var whiteMedal;

var yoetsHamasFlag = false;
var gameIsOverFlag = false;


//main() - start


var YHFlg = localStorage.getItem('yoetsHamasFlag');

if(YHFlg === "false")
{
   yoetsHamasFlag = false;
}
else
{
   yoetsHamasFlag = true;
}  


if(yoetsHamasFlag === false)
{

   retrieveDataFromIndexJSfile();
   buildGameStructure();
   checkPosition(1, playersRevenue);
   displayQuestionInformation(1);

}
else
{
   retrieveDataFromStage2JSfile();
   buildGameStructure();
   checkPosition(1, playersRevenue);
   displayQuestionInformation(2);
   startYoetsHamasStage();
}

console.log(playersProf[pkidHashumaPos]);
console.log(playersProf[yoetsHamasPos]);

fetchData();

//main() - end


window.addEventListener('load', function() {
  window.scrollTo(0, 0);
});



document.getElementById('fileInput').addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const fileContent = e.target.result;
      
      // Process the file content as needed

      myLines = fileContent.split(/\r\n|\n/);
      fileIsOpenFlag = true;  


    };


    reader.readAsText(file);
  }

});



document.addEventListener("keydown", function(event) {
     
   var playerAnswer;
   
   if(!fileIsOpenFlag || !stageWasStarted)
      return;

   if(shortQuestCounter > 40 || keyWasPressed)
      return;

   makeSound("keyboard");

   var curLetter = event.key;

   switch(curLetter)
   {
      case 't':
      case 'a':
      case '1':
      playerAnswer = 1;
      makeAnimation("btnA");
      keyWasPressed = true;   
      break;      
      
      case 'c':
      case 'b':
      case '2':
      playerAnswer = 2;
      makeAnimation("btnB");
      keyWasPressed = true;   
      break;      
      
      default:
      return;
   }
   

   if(playerAnswer === shortQuestWrightAns)
      setTimeout(function(){correctShortAnswer(curLetter);}, 1000);   
   else
      setTimeout(function(){wrongShortAnswer(curLetter);}, 1000);   
      

});




var numberOfKeyButtons = document.querySelectorAll(".shortAnsBtn").length;

for(var i=0; i<numberOfKeyButtons; i++)
{
	
   document.querySelectorAll(".shortAnsBtn")[i].addEventListener("click", function () { 
   
   if(!fileIsOpenFlag || !stageWasStarted)
      return; 
  
   if(shortQuestCounter > 40 || keyWasPressed)
      return;
   
   makeSound("keyboard");

   var curLetter = this.id;

   switch(curLetter)
   {
      case 'btnA':
      playerAnswer = 1;
      makeAnimation("btnA");
      keyWasPressed = true;   
      break;      
      
      case 'btnB':
      playerAnswer = 2;
      makeAnimation("btnB");
      keyWasPressed = true;   
      break;      
      
      default:
      return;
   }
   

   if(playerAnswer === shortQuestWrightAns)
      setTimeout(function(){correctShortAnswer(curLetter);}, 1000);   
   else
      setTimeout(function(){wrongShortAnswer(curLetter);}, 1000);  


	
   });


}




function fetchData()
{
    
    
    fetch('./assets/Pkid_Hashuma.txt')
       .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
    }
    return response.text();
  })
  .then(data => {

      //document.getElementById('output').textContent = data;
      const fileContent = data;
      myLines = fileContent.split(/\r\n|\n/);
      fileIsOpenFlag = true;  


  })
  .catch(error => {
    console.error('Error loading the text file:', error);
  });

      
    

}






function readRandomLineFromfile()
{

   var counter = 0;

   while(counter++ < 1000)
   {
    
    var variationPar = shortQuestCounter + counter + questsVar;
  
    var randomNum = Math.floor(Math.random() * myLines.length) + randomizeSumForQuestions() + variationPar;  

    randomNum = randomNum % myLines.length;    

    var newLine = myLines[randomNum];

    var curId = readItemFromLine(0, newLine);

    if(!checkQuestId(curId))
         {
          shortQuestsIdArr.push(curId);
          return newLine;
         }    
 
   }

}


function readItemFromLine(itemPosition, line)
{

    var items = line.split('&');

    return items[itemPosition];

}


function readItemFromShortQuest(itemPosition, line)
{

    var items = line.split('#');

    return items[itemPosition];

}


function checkQuestId(curId)
{

   for(var i=0; i<shortQuestsIdArr.length; i++)
   {
       if(curId === shortQuestsIdArr[i])
          return true;
   }

   return false;


}




function removePressedStyle(currentKey)
{
   var activeButton = document.querySelector("#" + currentKey);
   activeButton.classList.remove("pressed");   
}


function makeAnimation(currentKey)
{
   var activeButton = document.querySelector("#" + currentKey);
   activeButton.classList.add("pressed");
   
   //delay 0.2 sec and returning old style
   setTimeout(function() {removePressedStyle(currentKey);}, 100);      

}




function displayNewShortQuestion()
{

   if(!fileIsOpenFlag)
      return; 

   if(gameIsOverFlag === true)
   {
      startNewGame();
      return;
   }

   if(fileIsOpenFlag && shortQuestCounter === 0)
      stageWasStarted = true;

   shortQuestCounter++;   //short questions counter

   keyWasPressed=false;
  
   if(shortQuestCounter === 1)
   {
      document.querySelector("#continue").innerHTML = "המשך";
      document.querySelector("#continue").disabled = true;

   }
      

   if(shortQuestCounter > numOfShortQuest && yoetsHamasFlag === false)
   {

     thirdStage();  
     document.querySelector("#continue").disabled = false;
     return;
   
   }

   if(shortQuestCounter > numOfShortQuest && yoetsHamasFlag === true)
   {
     var annonce = 'שלב "יועץ המס" הסתיים.' + '\n' + 'תם המשחק. מקווים שנהניתם.';
     alert(annonce);
     
     setTimeout(function () {finalResults();}, 2000);
     
     document.querySelector("#continue").disabled = false;
     return;

   }

   makeAnimation("continue");
   makeSound("page");
   
   if(yoetsHamasFlag === false)
   {
      if(shortQuestCounter === 1)
         displayQuestionInformation(1); 
      else
         displayQuestionInformation(2); 
   }
   else
   {
         displayQuestionInformation(3);
   }

   var randomNumber = Math.floor(Math.random() * 100) + 1;
   var random1or2 = randomNumber%2 + 1;

   var newLine = readRandomLineFromfile();

   var questIdNum = readItemFromLine(0, newLine);
   //document.querySelector("#questIdNum").innerHTML = questIdNum;
   document.querySelector("#questIdNum").innerHTML = "ID_" + questIdNum + " T_" + myLines.length;

   newShortQuest = readItemFromLine(16, newLine);

   regularColorWrightAns();
   
   
   document.querySelector(".announceDiv").style.backgroundColor = "#F3F0D7";
   document.querySelector("#announceStrype").innerHTML = "";
   
   var shortQuestion = readItemFromShortQuest(0, newShortQuest);
   document.querySelector("#shortQuestion").innerHTML = shortQuestion;

   var shortAnswer1 = readItemFromShortQuest(1, newShortQuest);
   var shortAnswer2 = readItemFromShortQuest(2, newShortQuest);
     
   
    
   switch(random1or2)
   {
     case 1:
     document.querySelector("#shortAns1").innerHTML = shortAnswer1;
     document.querySelector("#shortAns2").innerHTML = shortAnswer2;
     break;

     case 2:
     document.querySelector("#shortAns1").innerHTML = shortAnswer2;
     document.querySelector("#shortAns2").innerHTML = shortAnswer1;
     break;

   }
  
   
   shortQuestWrightAns = random1or2;


}








function correctShortAnswer()
{
   makeSound("cashreg");
    
   correctShortQuestCounter++;
   updatePlayersProfit(correctShortQuestCounter);
   success = Math.floor(correctShortQuestCounter / shortQuestCounter * 100) + '%';

   document.querySelector(".announceDiv").style.backgroundColor = CORRECT_GREEN;      //GREEN background color - correct answer
   document.querySelector("#announceStrype").innerHTML = "נכון !";

   document.querySelector("#questions").innerHTML = shortQuestCounter;
   document.querySelector("#correct").innerHTML = correctShortQuestCounter;
   document.querySelector("#success").innerHTML = success;
    
   greenColorWrightAns();
      
   setTimeout(function(){displayNewShortQuestion();}, 2000);
   
}


function wrongShortAnswer()
{
   makeSound("wrong");
   
   updatePlayersProfit(correctShortQuestCounter);   
   success = Math.floor(correctShortQuestCounter / shortQuestCounter * 100) + '%';
   
   document.querySelector(".announceDiv").style.backgroundColor = WRONG_RED;      //RED background color - wrong answer
   document.querySelector("#announceStrype").innerHTML = "לא נכון !";

   document.querySelector("#questions").innerHTML = shortQuestCounter;
   document.querySelector("#correct").innerHTML = correctShortQuestCounter;
   document.querySelector("#success").innerHTML = success;
   
   greenColorWrightAns();

   setTimeout(function(){displayNewShortQuestion();}, 2000);
   
}


function updatePlayersProfit(correct)
{


   var totalRevenue = playersRevenue[0] + playersRevenue[1] + playersRevenue[2] + playersRevenue[3];
   
   if (totalRevenue < 1)  //if total revenue is very low or zero
      return;
   
   if(yoetsHamasFlag === false)
   {
      var shumaPerCorrectAns = (totalRevenue * 0.5) / numOfShortQuest ;
      var totalShuma = correct * shumaPerCorrectAns;

      if(totalShuma<10)
         var totalShumaDisplay = Math.floor(totalShuma * 100) / 100 ;
      else
         var totalShumaDisplay = Math.round(totalShuma);

      document.querySelector("#incomeTax").innerHTML = totalShumaDisplay + " " + currency;

   }
   else
   {
      var HechzerPerCorrectAns = (totalRevenue * 0.5) / (2 * numOfShortQuest) ;
      var totalHechzer = correct * HechzerPerCorrectAns;

      if(totalShuma<10)
         var totalHechzerDisplay = Math.floor(totalHechzer * 100) / 100 ;
      else
         var totalHechzerDisplay = Math.round(totalHechzer);

      document.querySelector("#incomeTax").innerHTML = totalHechzerDisplay + " " + currency;
  
   }
    
   

   

   if(yoetsHamasFlag === false)
   {

      for (var i=0; i<4; i++)
      {
         if(i === pkidHashumaPos)
         {
            var incomeTax = totalShuma * playersRevenue[i] / totalRevenue;
            playersAfterIT[i] = Math.round (playersRevenue[i] - incomeTax + totalShuma);
         }
         else
         {
            var incomeTax = totalShuma * playersRevenue[i] / totalRevenue;
            playersAfterIT[i] = Math.round (playersRevenue[i] - incomeTax);
         }

      } 

      var player1Info = playersProf[0] + " " + playersAfterIT[0] + " " + currency;
      var player2Info = playersProf[1] + " " + playersAfterIT[1] + " " + currency;
      var player3Info = playersProf[2] + " " + playersAfterIT[2] + " " + currency;
      var player4Info = playersProf[3] + " " + playersAfterIT[3] + " " + currency;
   }
   else
   {

      for (var i=0; i<4; i++)
      {
         if(i === pkidHashumaPos)
         {
            var hechzerMas = totalHechzer * playersRevenue[i] / totalRevenue;
            playersNetProfit[i] = Math.round (playersAfterIT[i] - totalHechzer + hechzerMas);
         }
         else
         {
            var hechzerMas = totalHechzer * playersRevenue[i] / totalRevenue;
            playersNetProfit[i] = Math.round (playersAfterIT[i] + hechzerMas);
         }

      }       

      var player1Info = playersProf[0] + " " + playersNetProfit[0] + " " + currency;
      var player2Info = playersProf[1] + " " + playersNetProfit[1] + " " + currency;
      var player3Info = playersProf[2] + " " + playersNetProfit[2] + " " + currency;
      var player4Info = playersProf[3] + " " + playersNetProfit[3] + " " + currency;
   }
   

   document.querySelector("#player1").innerHTML = player1Info;   
   document.querySelector("#player2").innerHTML = player2Info;   
   document.querySelector("#player3").innerHTML = player3Info;   
   document.querySelector("#player4").innerHTML = player4Info;    

}


function displayQuestionInformation(stage)
{

   if(stage === 1)
   {
      var player1Info = playersProf[0] + " " + playersRevenue[0] + " " + currency;
      var player2Info = playersProf[1] + " " + playersRevenue[1] + " " + currency;
      var player3Info = playersProf[2] + " " + playersRevenue[2] + " " + currency;
      var player4Info = playersProf[3] + " " + playersRevenue[3] + " " + currency;
   }
   else if(stage === 2)
   {
      var player1Info = playersProf[0] + " " + playersAfterIT[0] + " " + currency;
      var player2Info = playersProf[1] + " " + playersAfterIT[1] + " " + currency;
      var player3Info = playersProf[2] + " " + playersAfterIT[2] + " " + currency;
      var player4Info = playersProf[3] + " " + playersAfterIT[3] + " " + currency;
   }
   else if(stage === 3)
   {
      var player1Info = playersProf[0] + " " + playersNetProfit[0] + " " + currency;
      var player2Info = playersProf[1] + " " + playersNetProfit[1] + " " + currency;
      var player3Info = playersProf[2] + " " + playersNetProfit[2] + " " + currency;
      var player4Info = playersProf[3] + " " + playersNetProfit[3] + " " + currency;
   }

   document.querySelector("#player1").innerHTML = player1Info;   
   document.querySelector("#player2").innerHTML = player2Info;   
   document.querySelector("#player3").innerHTML = player3Info;   
   document.querySelector("#player4").innerHTML = player4Info; 
   
   if(stage === 1 || stage === 2)
   {
      document.querySelector("#stage").innerHTML = "פקיד השומה"; 
      document.querySelector("#profession").innerHTML = playersProf[pkidHashumaPos];

      var id = pkidHashumaPos + 1;
      var playerId = "#player" + id; 
      document.querySelector(playerId).style.backgroundColor = MEDAL_GOLD;      //GOLD background color - PKID HASHUMA

   }
   else if(stage === 3)
   {
      document.querySelector("#stage").innerHTML = "יועץ המס"; 
      document.querySelector("#profession").innerHTML = playersProf[yoetsHamasPos];
      document.querySelector("#reduction").innerHTML = "זיכוי מס"; 

      var id = yoetsHamasPos + 1;
      var playerId = "#player" + id;
      document.querySelector(playerId).style.backgroundColor = MEDAL_SILVER;      //SILVER background color - YOETS HAMAS
      
   }
    
}





function startYoetsHamasStage()
{
   //yoetsHamasFlag = true;
   shortQuestCounter = 0;
   correctShortQuestCounter = 0;
   
   playersNetProfit = [playersAfterIT[0], playersAfterIT[1], playersAfterIT[2], playersAfterIT[3]];

   document.querySelector("#announceStrype").innerHTML = "";
   document.querySelector("#questions").innerHTML = "";
   document.querySelector("#correct").innerHTML = "";
   document.querySelector("#success").innerHTML = "";
   document.querySelector("#incomeTax").innerHTML = "";

   document.querySelector("#shortQuestion").innerHTML = "";
   document.querySelector("#shortAns1").innerHTML = "";
   document.querySelector("#shortAns2").innerHTML = "";

   document.querySelector(".announceDiv").style.backgroundColor = "#F3F0D7";

   document.querySelector("#shortAnsDiv1").style.backgroundColor = "#FCF8E8";
   document.querySelector("#shortAns1").style.color = "#000";

   document.querySelector("#shortAnsDiv2").style.backgroundColor = "#FCF8E8";
   document.querySelector("#shortAns2").style.color = "#000";

   displayQuestionInformation(3);


}


function finalResults()
{

    makeSound("closedoor");

    checkPosition(2, playersNetProfit);
    
    var id = goldMedal + 1;
    var playerId = "#player" + id; 
    document.querySelector(playerId).style.backgroundColor = MEDAL_GOLD;      //GOLD background color - Gold Medal    
    
    var id = silverMedal + 1;
    var playerId = "#player" + id; 
    document.querySelector(playerId).style.backgroundColor = MEDAL_SILVER;      //SILVER background color - Silver Medal
    
    var id = bronzeMedal + 1;
    var playerId = "#player" + id; 
    document.querySelector(playerId).style.backgroundColor = MEDAL_BRONZE;      //BRONZE background color - Bronze Medal
    
    var id = whiteMedal + 1;
    var playerId = "#player" + id; 
    document.querySelector(playerId).style.backgroundColor = "#fff";      //WHITE background color - Last but not least

    document.querySelector("#stage").innerHTML = "פודיום";
    document.querySelector("#profession").innerHTML = ""; 
    document.querySelector("#continue").innerHTML = "התחל משחק"; 

    gameIsOverFlag = true;
   
}



function greenColorWrightAns()
{
  switch (shortQuestWrightAns)
  {
    case 1:
    document.querySelector("#shortAnsDiv1").style.backgroundColor = CORRECT_GREEN;
    document.querySelector("#shortAns1").style.color = "#fff";
    break;


    case 2:
    document.querySelector("#shortAnsDiv2").style.backgroundColor = CORRECT_GREEN;
    document.querySelector("#shortAns2").style.color = "#fff";
    break;

  }

}


function regularColorWrightAns()
{
  switch (shortQuestWrightAns)
  {
    case 1:
    document.querySelector("#shortAnsDiv1").style.backgroundColor = "#FCF8E8";
    document.querySelector("#shortAns1").style.color = "#000";
    break;


    case 2:
    document.querySelector("#shortAnsDiv2").style.backgroundColor = "#FCF8E8";
    document.querySelector("#shortAns2").style.color = "#000";
    break;

  }

}



function retRandomizeString(type)
{
   var profession = ["נגר", "סנדלר", "חייט","תופרת","רואה חשבון","חשב שכר","פקיד בנק","פקיד ממשלה","טייס","דיילת","איש צבא קבע","נהג אוטובוס","פקיד עירייה","שליח","שוער מלון","פקיד קבלה","זבנית","חנווני","סוור","חדרנית","טייח","קוסמטיקאית","רפתן","חקלאי","לולן"];
   var currency = ['ל"י', 'מיל', 'גרוש', 'אגורות', 'ג"מ', 'פרוטות', 'שילינג'];
   var randomString;
  
   switch (type)
   {
     case 1:  //proffession
     var randomNum = Math.floor(Math.random() * profession.length);
     randomString = profession[randomNum];
     break;

     case 2:  //currency
     var randomNum = Math.floor(Math.random() * currency.length);
     randomString = currency[randomNum];
     break; 
     
     default: 
     var randomNum = Math.floor(Math.random() * currency.length);
     randomString = "randomNum: " + randomNum;
     break; 
    

   }

   return randomString;

}


function randomizeSumForQuestions()
{
  var randomizeSum = 0;
  
  for(var i=0; i<5; i++)
     randomizeSum = randomizeSum + gimatricValue(retRandomizeString(1));
 

  return randomizeSum;

}


function gimatricValue(checkedWord)
{
   var gimatricValue = 0;

   for(var i=0; i<checkedWord.length; i++)
   {  
     switch(checkedWord[i])
     {
        case 'א':
        gimatricValue+=1;
        break;        
        
        case 'ב':
        gimatricValue+=2;
        break;
        
        case 'ג':
        gimatricValue+=3;
        break;        

        case 'ד':
        gimatricValue+=4;
        break;        
 
        case 'ה':
        gimatricValue+=5;
        break;        

        case 'ו':
        gimatricValue+=6;
        break;        

        case 'ז':
        gimatricValue+=7;
        break;        

        case 'ח':
        gimatricValue+=8;
        break;        

        case 'ט':
        gimatricValue+=9;
        break;        

        case 'י':
        gimatricValue+=10;
        break;                

        case 'כ':
        case 'ך':
        gimatricValue+=20;
        break;        

        case 'ל':
        gimatricValue+=30;
        break;        
        
        case 'מ':
        case 'ם':
        gimatricValue+=40;
        break;
        
        case 'נ':
        case 'ן':
        gimatricValue+=50;
        break;        

        case 'ס':
        gimatricValue+=60;
        break;        
 
        case 'ע':
        gimatricValue+=70;
        break;        

        case 'פ':
        case 'ף':
        gimatricValue+=80;
        break;        

        case 'צ':
        case 'ץ':
        gimatricValue+=90;
        break;        

        case 'ק':
        gimatricValue+=100;
        break;        

        case 'ר':
        gimatricValue+=200;
        break;        

        case 'ש':
        gimatricValue+=300;
        break;                

        case 'ת':
        gimatricValue+=400;
        break;        


     }
    
   }
  
   return gimatricValue;
}


function checkPosition(type, playersRevArr)
{
   var exitFlag = false;
   var playersPos = [0,1,2,3];
   var playersRev  = [playersRevArr[0], playersRevArr[1], playersRevArr[2], playersRevArr[3]] ;
   
   console.log(playersPos[0],playersPos[1],playersPos[2],playersPos[3]);      
 
   for(var i=0; i<4; i++)
   {
      for(var j=3; j>0; j--)
      {
         if(playersRev[j]>playersRev[j-1])
         {
            var temp = playersPos[j-1];
            playersPos[j-1] = playersPos[j];
            playersPos[j] = temp;
            
            var temp1 = playersRev[j-1];
            playersRev[j-1] = playersRev[j];
            playersRev[j] = temp1;

            console.log(playersPos[0],playersPos[1],playersPos[2],playersPos[3]); 
        
         }
      } 
   }
   

   if(type === 1)
   {   
   	pkidHashumaPos = playersPos[0];
   	yoetsHamasPos = playersPos[1];
   }
   
   if(type === 2)
   {
        goldMedal = playersPos[0];
   	silverMedal = playersPos[1];
   	bronzeMedal= playersPos[2];
        whiteMedal= playersPos[3];
   }
 
}


function buildGameStructure()
{
   switch(gameType)
   {   
      case '0':
      numOfShortQuest = 10;
      break;

      case '1':
      numOfShortQuest = 20;
      break;

      case '2':
      numOfShortQuest = 40;
      break;

      case '3':
      numOfShortQuest = 40;
      break;
      
   
   }

}


function retrieveDataFromIndexJSfile()
{

    const player1 = localStorage.getItem('player1');
    const player2 = localStorage.getItem('player2');
    const player3 = localStorage.getItem('player3');
    const player4 = localStorage.getItem('player4');

    playersProf.push(player1);
    playersProf.push(player2);
    playersProf.push(player3);
    playersProf.push(player4);

    playersPoints[0] = localStorage.getItem('points1');
    playersPoints[1] = localStorage.getItem('points2');
    playersPoints[2] = localStorage.getItem('points3');
    playersPoints[3] = localStorage.getItem('points4');

    gameType = localStorage.getItem('gameType');
    selary = localStorage.getItem('selary');
    currency = localStorage.getItem('currency'); 
    questsVar = localStorage.getItem('questsVar'); 
    
    playersRevenue[0] = 8 + selary * playersPoints[0];
    playersRevenue[1] = 6 + selary * playersPoints[1];
    playersRevenue[2] = 4 + selary * playersPoints[2];
    playersRevenue[3] = 2 + selary * playersPoints[3];
    

}


function retrieveDataFromStage2JSfile()
{
    const player1 = localStorage.getItem('player1');
    const player2 = localStorage.getItem('player2');
    const player3 = localStorage.getItem('player3');
    const player4 = localStorage.getItem('player4');

    playersProf.push(player1);
    playersProf.push(player2);
    playersProf.push(player3);
    playersProf.push(player4);

    gameType = localStorage.getItem('gameType');
    currency = localStorage.getItem('currency'); 
    questsVar = localStorage.getItem('questsVar');
    var textArr = localStorage.getItem('shortQuestsIdArr');

    covertTextToArray(shortQuestsIdArr, textArr);
        
    playersRevenue[0] = localStorage.getItem('revenue1') * 1;
    playersRevenue[1] = localStorage.getItem('revenue2') * 1;
    playersRevenue[2] = localStorage.getItem('revenue3') * 1;
    playersRevenue[3] = localStorage.getItem('revenue4') * 1;

    playersAfterIT[0] = localStorage.getItem('afterIT1') * 1;
    playersAfterIT[1] = localStorage.getItem('afterIT2') * 1;
    playersAfterIT[2] = localStorage.getItem('afterIT3') * 1;
    playersAfterIT[3] = localStorage.getItem('afterIT4') * 1;

}


function covertTextToArray(shortQuestsIdArr, textArr)
{

   var items = textArr.split(',');
   
   for(var i=0; i<items.length; i++)
        shortQuestsIdArr.push(items[i]);        
 

}




function thirdStage()
{

  var annonce = 'שלב "פקיד השומה" הסתיים.' + '\n' + 'השלב הבא - "יועץ המס"';
  alert(annonce);


  localStorage.setItem('revenue1', playersRevenue[0]);
  localStorage.setItem('revenue2', playersRevenue[1]);
  localStorage.setItem('revenue3', playersRevenue[2]);
  localStorage.setItem('revenue4', playersRevenue[3]);

  localStorage.setItem('gameType', gameType);
  localStorage.setItem('currency', currency);

  checkPosition(1, playersRevenue);  
  localStorage.setItem('yoetsHamas', playersProf[yoetsHamasPos]);

  window.location.href = 'yoetshamas.html';

  
  localStorage.setItem('player1', playersProf[0]);
  localStorage.setItem('player2', playersProf[1]);
  localStorage.setItem('player3', playersProf[2]);
  localStorage.setItem('player4', playersProf[3]);

  localStorage.setItem('points1', playersPoints[0]);
  localStorage.setItem('points2', playersPoints[1]);
  localStorage.setItem('points3', playersPoints[2]);
  localStorage.setItem('points4', playersPoints[3]);

  localStorage.setItem('revenue1', playersRevenue[0]);
  localStorage.setItem('revenue2', playersRevenue[1]);
  localStorage.setItem('revenue3', playersRevenue[2]);
  localStorage.setItem('revenue4', playersRevenue[3]);
  
  localStorage.setItem('afterIT1', playersAfterIT[0]);
  localStorage.setItem('afterIT2', playersAfterIT[1]);
  localStorage.setItem('afterIT3', playersAfterIT[2]);
  localStorage.setItem('afterIT4', playersAfterIT[3]);

  
  localStorage.setItem('gameType', gameType);
  localStorage.setItem('currency', currency);
  localStorage.setItem('questsVar', questsVar);
  localStorage.setItem('shortQuestsIdArr', shortQuestsIdArr);
  
  window.location.href = 'stage2.html';

  
  window.open("./yoetshamas.html","_self");         

}




function startNewGame()
{
  
   window.open("./start.html","_self");

}


function sleep(milliseconds)
{
  const date = Date.now();
  let currentDate = null;
  
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
    
}


function makeSound(sound)
{  
   if(sound === "keyboard")
 	keyboard.play();         
   
   if(sound === "type")
 	type.play();         

   if(sound === "page")
 	page.play(); 

   if(sound === "cashreg")
 	cashreg.play();         
   
   if(sound === "correct")
 	correct.play();

   if(sound === "wrong")
 	wrong.play();

   if(sound === "closedoor")
 	closedoor.play();

}




