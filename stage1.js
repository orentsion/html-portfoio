

var keyboard = new Audio ("./sounds/keyboard.mp3");
var type = new Audio ("./sounds/type.wav");
var fingerclick = new Audio ("./sounds/fingerclick.mp3");
var camera = new Audio ("./sounds/camera.mp3");
var page = new Audio ("./sounds/page.mp3");
var cashreg = new Audio ("./sounds/cashreg.wav");
var correct = new Audio ("./sounds/correct.wav");
var wrong = new Audio ("./sounds/wrong.wav");
var closedoor = new Audio ("./sounds/closedoor.wav");


var engKeyboardArr = [];
var engCompareKArr = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

var hebKeyboardArr = [];
var hebCompareKArr = ['א','ב','ג','ד','ה','ו','ז','ח','ט','י','כ','ל','מ','נ','ס','ע','פ','צ','ק','ר','ש','ת'];

var subjectArr = ["4301", "4302", "4303", "4304", "4305", "4306", "4307", "4308", "4309", "4310", "4311", "4312"];
var subjectCntr = 0;
var questsInSubject;
var questsLevel;
var subjectQuestsCntr = 0;
var questsIdArr = []; 
var firstTimeFlag = true;

var fileIsOpenFlag = false;
var stageWasStarted = false;


var answerTextToCheck;
var newWord;
var questionWrightAnswer;
var textToDisplayArr = [];
var myLines = [];
var myWords = [];
var parts = [];
var clue1, clue2, clue3;

var curPlayer = 0;
var curLine;
var curLang = 1;   //  hebrew - 1  english - 2
var wrongLetCnt;
var wrightAnswerFlag = false;
var questionPoints;
var pointsArr = [12, 10, 7, 3, 0];
var totalPoints = 0;

var playersProf = [];
var playersPoints = [0,0,0,0];
var playersRevenue = [8,6,4,2];
var playersFinalProfit = [0,0,0,0];

var gameType;
var exposeLevel;
var selary;
var currency;
var questsVar;

var totalRevenue;
var pkidHashumaCorrect;
var yoetsHamasCorrect;

var pkidHashumaPos;
var yoetsHamasPos;


//main() - start

 
clearDisplay();
choosePlayers();
retrieveDataFromStartJSfile();
buildGameStructure();
displayPlayersInfo();


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
 
    if(!fileIsOpenFlag || !stageWasStarted)
      return;
   
   //If the player choose 4 wrong letters or if the player succeeded answering - dont handle any key press
   if(wrongLetCnt >= 4 || questionWrightAnswer === true)
      return;
  
   var curLetter = event.key;
   var wrightAnswer;

   if(curLang === '1')
   { 
      var hebCurLetter = hebKeyTranslate(curLetter);
      var hebAnimateKey = hebAnimateKeyTranslate(curLetter);      

      if(checkHeKeyboard(hebCurLetter))
      { 
         makeAnimation(hebAnimateKey);
         updateHeKeyboard();
         wrightAnswer = checkLetterProces(hebCurLetter);
      }
   }
   else
   { 
     if(checkEnKeyboard(curLetter))
     { 
        makeAnimation(curLetter);
        updateEnKeyboard();
        wrightAnswer = checkLetterProces(curLetter);
     }
   }

   console.log(answerTextToCheck);

   var currentAnsText = getAnsString(newWord, answerTextToCheck);
   displayAnswerText(currentAnsText);
   
   if(wrightAnswer === false)
   {
     if(wrongLetCnt<4)
     	wrongLetCnt++;

     questionPoints = pointsArr[wrongLetCnt];
     document.querySelector("#questPoints").innerHTML = questionPoints;
     handleWrongAns(wrongLetCnt);

     if(wrongLetCnt >= 4)
         setTimeout(function(){redQuestPointsElement();}, 500);
         
         
            
     

   }       

   setTimeout(function(){wrightAnswerProces(currentAnsText);}, 500);   

});







var numberOfKeyButtons = document.querySelectorAll(".btn").length;

for(var i=0; i<numberOfKeyButtons; i++)
{
	
   document.querySelectorAll(".btn")[i].addEventListener("click", function () { 
    
   if(!fileIsOpenFlag || !stageWasStarted)
      return;
   
   //If the player choose 4 wrong letters or if the player succeeded answering - dont handle any key press
   if(wrongLetCnt >= 4 || questionWrightAnswer === true)
      return;

   var curLetter = this.id;

   var wrightAnswer;


   if(curLang === '1')
   { 
      var hebCurLetter = hebKeyTranslateClick(curLetter);
                
      if(checkHeKeyboard(hebCurLetter))
      { 
         makeAnimation(curLetter);
         updateHeKeyboard();
         wrightAnswer = checkLetterProces(hebCurLetter);
      }
   }
   else
   { 
     if(checkEnKeyboard(curLetter))
     { 
        makeAnimation(curLetter);
        updateEnKeyboard();
        wrightAnswer = checkLetterProces(curLetter);
     }
   }

   console.log(answerTextToCheck);

   var currentAnsText = getAnsString(newWord, answerTextToCheck);
   displayAnswerText(currentAnsText);
   
   if(wrightAnswer === false)
   {
     if(wrongLetCnt<4)
     	wrongLetCnt++;

     questionPoints = pointsArr[wrongLetCnt];
     document.querySelector("#questPoints").innerHTML = questionPoints;
     handleWrongAns(wrongLetCnt);

     if(wrongLetCnt >= 4)
         setTimeout(function(){redQuestPointsElement();}, 500);
              
   }       

   setTimeout(function(){wrightAnswerProces(currentAnsText);}, 500);   

	
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



function wrightAnswerProces(currentAnsText)
{
   if(wrightAnswerFlag === true)   //preventing miss adding points and revenue !!!
      return;  
   

   if (checkRightAns(currentAnsText))
     {
        for(var i=0; i<textToDisplayArr.length; i++)
     	{
      	   var currentKey = textToDisplayArr[i];
           currentKey = currentKey + 1; 
           animateLetter(currentKey);
        }
       
       
       playersPoints[curPlayer] = playersPoints[curPlayer] + pointsArr[wrongLetCnt];
       playersRevenue[curPlayer] = playersRevenue[curPlayer] + (pointsArr[wrongLetCnt] * selary);               

       var playerInfo = playersProf[curPlayer] + " " + playersRevenue[curPlayer] + " " + currency;
       idNum = curPlayer + 1;
       var playerId = "#player" + idNum;
       document.querySelector(playerId).innerHTML = playerInfo;   
             
       document.querySelector("#questPoints").innerHTML = 0;
       document.querySelector("#totalPoints").innerHTML = playersPoints[curPlayer];
       document.querySelector("#totalRevenue").innerHTML = playersRevenue[curPlayer] + " " + currency;             

       setTimeout(function(){greenContinueElement();}, 2500);
       questionWrightAnswer = true;      
       wrightAnswerFlag = true;  //preventing miss adding points and revenue !!!

     }
   
}




function checkHeKeyboard(curLetter)
{
   okToPressKeyBtn = false;

   for(var i=0; i<22; i++)
   {
      if(hebKeyboardArr[i] === curLetter)
      {
          hebKeyboardArr[i] = '#';
          okToPressKeyBtn = true;
          return okToPressKeyBtn;
      }

   }

   return okToPressKeyBtn;
}



function checkEnKeyboard(curLetter)
{
   okToPressKeyBtn = false;

   for(var i=0; i<26; i++)
   {
      if(engKeyboardArr[i] === curLetter)
      {
          engKeyboardArr[i] = '#';
          okToPressKeyBtn = true;
          return okToPressKeyBtn;
      }

   }

   return okToPressKeyBtn;
}



function updateHeKeyboard()
{
   
   var hebKeyTranlateArr = ['g','f','e','d','c','b','a','n','m','l','k','j','i','h','u','t','s','r','q','p','o','v'];
  
   for(var i=0; i<22; i++)
   {
      if(hebKeyboardArr[i] === '#')
      {
         var letterId = "#" + hebKeyTranlateArr[i];
         var letterDivId = ".div_" + hebKeyTranlateArr[i];           

         var activeButton = document.querySelector(letterId);
         var activeDivButton = document.querySelector(letterDivId);
         
         activeButton.classList.add("pressedLetter");
         activeDivButton.classList.add("pressedLetterDiv");
      }

   }

}




function updateEnKeyboard()
{   
   for(var i=0; i<26; i++)
   {
      if(engKeyboardArr[i] === '#')
      {
         var letterId = "#" + engCompareKArr[i];
         var letterDivId = ".div_" + engCompareKArr[i];           

         var activeButton = document.querySelector(letterId);
         var activeDivButton = document.querySelector(letterDivId);
         
         activeButton.classList.add("pressedLetter");
         activeDivButton.classList.add("pressedLetterDiv");
      }

   }

}



function resetKeyboard(curLang)
{
   if(curLang === '1')
   {
      var hebrewKeys = ['ז','ו','ה','ד','ג','ב','א','נ','מ','ל','כ','י','ט','ח','ש','ר','ק','צ','פ','ע','ס','ת'];  
      
      for(var i=0; i<22; i++)
      {
         var curElement = document.querySelectorAll(".btn")[i]; 
         curElement.innerHTML = hebrewKeys[i];

         var letterId = "#" + engCompareKArr[i];
         var letterDivId = ".div_" + engCompareKArr[i];           

         var activeButton = document.querySelector(letterId);
         var activeDivButton = document.querySelector(letterDivId);
         
         activeButton.classList.remove("pressedLetter");
         activeDivButton.classList.remove("pressedLetterDiv");        
      }

      for(var i=22; i<26; i++)
      {
         var letterId = "#" + engCompareKArr[i];
         var letterDivId = ".div_" + engCompareKArr[i];           

         var activeButton = document.querySelector(letterId);
         var activeDivButton = document.querySelector(letterDivId);

         activeButton.classList.remove("pressedLetter");
         activeDivButton.classList.remove("pressedLetterDiv");   

         document.querySelectorAll(".btn")[i].hidden = true; 
      }

   }
   else
   {

      for(var i=22; i<26; i++)
      {
         document.querySelectorAll(".btn")[i].hidden = false; 
      }
          
      for(var i=0; i<26; i++)
      {
       
         var curElement = document.querySelectorAll(".btn")[i];
         curElement.innerHTML = curElement.id.toUpperCase();
       
        
         var letterId = "#" + engCompareKArr[i];
         var letterDivId = ".div_" + engCompareKArr[i];           

         var activeButton = document.querySelector(letterId);
         var activeDivButton = document.querySelector(letterDivId);
         
         activeButton.classList.remove("pressedLetter");
         activeDivButton.classList.remove("pressedLetterDiv");        

      }


   }   

}



function nextWord()
{

   if(!fileIsOpenFlag)
      return; 
  
   if(fileIsOpenFlag && firstTimeFlag)
      stageWasStarted = true;
     
   if(questionWrightAnswer === false && wrongLetCnt<4)   //nextWord() operates only if there was a wright answer or 4 wrong letters picked
      return; 
  
   makeAnimation("continue");
   makeSound("page");
   
  
   if(subjectCntr >= 12)
   {   
       setTimeout(function(){secondStage();}, 1000);
       return;
   }
   
   
   if(firstTimeFlag === false)   //Go to the next player
   {
      curPlayer++;
      curPlayer%=4;
   }

   clearOldData();
   
   var newLine = getNewWordBySubject(subjectArr[subjectCntr], questsLevel);
   subjectQuestsCntr++;

   if(subjectQuestsCntr === questsInSubject)
   {
       subjectCntr++;
       subjectQuestsCntr = 0;   
   }


   
   curLine = newLine;      // curLine is global variable of newLine;

   newWord = readItemFromLine(4, newLine);
   
   displayQuestionInformation(newLine);
   
   resetKeyboard(curLang);
   

   if(curLang === '1')
   { 
      var modifiedText = chooseLetters(exposeLevel, newWord);
      updateHeKeyboard();
   }
   else
   {
      var modifiedText = chooseEngLetters(exposeLevel, newWord); 
      updateEnKeyboard();
   }

   
   
   answerTextToCheck = modifiedText;
   console.log(answerTextToCheck);

   answerToDisplay = getAnsString(newWord, modifiedText);
   displayAnswerText(answerToDisplay);
    
}





function clearOldData()
{
   removeGreenLetStyle();
   document.querySelector("#questPoints").classList.remove("wrongRedStyle");
   document.querySelector("#questPointsDiv").classList.remove("wrongRedStyle"); 
   document.querySelector("#continue").classList.remove("buttonGreen");    

   hebKeyboardArr = ['א','ב','ג','ד','ה','ו','ז','ח','ט','י','כ','ל','מ','נ','ס','ע','פ','צ','ק','ר','ש','ת'];
   engKeyboardArr = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

   clue1 = "";
   clue2 = "";
   clue3 = "";   

   // Erase all clues from the last word   
   document.querySelector("#clue1").innerHTML = "";
   document.querySelector("#clue2").innerHTML = "";
   document.querySelector("#clue3").innerHTML = "";

   firstTimeFlag = false;
   questionWrightAnswer = false;
   wrightAnswerFlag = false;
   wrongLetCnt = 0;   //zerroing wrog letter counter

}



function getNewWordBySubject(subject, level)
{
   var counter = 0;

   while(counter++ < 2000)
   {
      
      var variationPar = subjectCntr * subjectQuestsCntr + questsVar;

      var randomNum = Math.floor(Math.random() * myLines.length) + randomizeSumForQuestions() + variationPar;   

      randomNum = randomNum % myLines.length;      

      var newLine = myLines[randomNum];
      
      var curId = readItemFromLine(0, newLine);
      var curSubject = readItemFromLine(2, newLine);
      var curLevel = readItemFromLine(1, newLine);

      if(curSubject === subject && curLevel === level)   
         if(!checkQuestId(curId))
         {
          questsIdArr.push(curId);
          return newLine;
         }
      

    }

   counter = 0;
   
    while(counter++ < 2000)
   {
      
      var variationPar = subjectCntr * subjectQuestsCntr + questsVar;

      var randomNum = Math.floor(Math.random() * myLines.length) + randomizeSumForQuestions() + variationPar;   

      randomNum = randomNum % myLines.length;      

      var newLine = myLines[randomNum];
      
      var curId = readItemFromLine(0, newLine);
      var curSubject = readItemFromLine(2, newLine);
      var curLevel = readItemFromLine(1, newLine);

      if(curSubject === subject && curLevel === "1332")
          if(!checkQuestId(curId))
          {
           questsIdArr.push(curId);
           return newLine;
          }
       

    }


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



function checkQuestId(curId)
{

   for(var i=0; i<questsIdArr.length; i++)
   {
       if(curId === questsIdArr[i])
          return true;
   }

   return false;


}



function displayQuestionInformation(newLine)
{
 
  
   var player1Info = playersProf[0] + " " + playersRevenue[0] + " " + currency;
   var player2Info = playersProf[1] + " " + playersRevenue[1] + " " + currency;
   var player3Info = playersProf[2] + " " + playersRevenue[2] + " " + currency;
   var player4Info = playersProf[3] + " " + playersRevenue[3] + " " + currency;

   document.querySelector("#player1").innerHTML = player1Info;   
   document.querySelector("#player2").innerHTML = player2Info;   
   document.querySelector("#player3").innerHTML = player3Info;   
   document.querySelector("#player4").innerHTML = player4Info; 


   switch(curPlayer)
   {
      case 0:
      playerId = "#player1";
      lastPlayerId = "#player4";
      break;

      case 1:
      playerId = "#player2";
      lastPlayerId = "#player1";
      break;

      case 2:
      playerId = "#player3";
      lastPlayerId = "#player2";
      break;

      case 3:
      playerId = "#player4";
      lastPlayerId = "#player3";
      break;

   }
   
   document.querySelector(playerId).style.backgroundColor = "#708871";
   document.querySelector(lastPlayerId).style.backgroundColor = "#CBE2B5";
   document.querySelector(playerId).style.color = "#fff";    
   document.querySelector(lastPlayerId).style.color = "#000";    
   
   questionPoints = pointsArr[wrongLetCnt];    // Set points for maximum - 12 pt
  
   document.querySelector("#stage").innerHTML = "הפדיון";
   document.querySelector("#continue").innerHTML = "המשך";     
   document.querySelector("#profession").innerHTML = playersProf[curPlayer];   
   document.querySelector("#questPoints").innerHTML = questionPoints;
   document.querySelector("#totalPoints").innerHTML = playersPoints[curPlayer];      
   document.querySelector("#totalRevenue").innerHTML = playersRevenue[curPlayer] + " " + currency;      
  
   var subject = readItemFromLine(2, newLine);
   var group = readItemFromLine(5, newLine);
   var questIdNum = readItemFromLine(0, newLine);

   document.querySelector("#subject").innerHTML = readSubjectName(subject);
   document.querySelector("#group").innerHTML = group;
   document.querySelector("#questIdNum").innerHTML = "ID_" + questIdNum + " T_" + myLines.length;
   
}


function displayPlayersInfo()
{
   
   var player1Info = playersProf[0] + " " + playersRevenue[0] + " " + currency;
   var player2Info = playersProf[1] + " " + playersRevenue[1] + " " + currency;
   var player3Info = playersProf[2] + " " + playersRevenue[2] + " " + currency;
   var player4Info = playersProf[3] + " " + playersRevenue[3] + " " + currency;
   
   document.querySelector("#player1").innerHTML = player1Info;   
   document.querySelector("#player2").innerHTML = player2Info;   
   document.querySelector("#player3").innerHTML = player3Info;   
   document.querySelector("#player4").innerHTML = player4Info; 

   document.querySelector("#stage").innerHTML = "הפדיון"; 

    
}


function displayClue(clueNum)
{
  
   

   switch(clueNum)
   {

       case 1:      
       document.querySelector("#clue1").innerHTML = clue1;
       makeSound("keyboard");
       break;

       case 2: 
       document.querySelector("#clue2").innerHTML = clue2;
       document.querySelector("#clue1").innerHTML = clue1;
       makeSound("keyboard");
       break;

       case 3:       
       document.querySelector("#clue3").innerHTML = clue3;
       document.querySelector("#clue2").innerHTML = clue2;
       document.querySelector("#clue1").innerHTML = clue1;
       makeSound("keyboard");
       break;

   }

}


function handleWrongAns(wrongLetCnt)
{

   var randomNum = Math.floor(Math.random() * 3);

   switch(wrongLetCnt)
   {
      case 1:
      var itemPos = 6 + randomNum;
      clue1 = readItemFromLine(itemPos, curLine);  
      setTimeout(function() {displayClue(1);}, 3000);       
      break;

      case 2:
      var itemPos = 9 + randomNum;
      clue2 = readItemFromLine(itemPos, curLine);       
      setTimeout(function() {displayClue(2);}, 3000);       
      break;

      case 3:
      var itemPos = 12 + randomNum;
      clue3 = readItemFromLine(itemPos, curLine);       
      setTimeout(function() {displayClue(3);}, 3000);       
      break;

   }

}




function readItemFromLine(itemPosition, line)
{

    var items = line.split('&');

    curLang = items[3];     // check if it's hebrew or english

    return items[itemPosition];

}




function displayAnswerText(textToDisplay)
{
   clearDisplay();
   textToDisplayArr = [];
   

   if(textToDisplay.length<=13)
   {
     var start = 13 + Math.floor((13 - textToDisplay.length)/2); 
    			
     for(var i=0; i<textToDisplay.length; i++)
     {
         displayLetter(textToDisplay[i], start + i);
         if(textToDisplay[i] != " ")
            textToDisplayArr.push(start+i);      // to keep the position of all the letters in the answer display
     }
        		     	  	
    } 
    else
    { 
        
       var parts = textToDisplay.split(" ");
       var col = 0;
       var line = 0;
       var start = 0;

       for(var j=0; j<parts.length; j++)
       {
         var wordText = parts[j];    
         var wordLen = wordText.length;
                  
         if(col + wordLen >= 13)
    	 {
    	   			
    	    col = 0;
    				
    	    if(line < 2)
    	       line++;
            
            start  = line * 13 + col;
            console.log(start  + " --> " + wordLen);
            	
    	 }
         else
         {
           start  = line * 13 + col;
           console.log(start  + " --> " + wordLen);
           
         }
         
         for(var i=0; i<wordLen; i++)
         {
            displayLetter(wordText[i], start + i); 
            textToDisplayArr.push(start+i);   // to keep the position of all the letters in the answer display
         }

         col = col + wordLen + 1;
       
       }  

   }      

}


function checkLetterProces(curLetter)
{

   var wrightLetter;   

   if(curLang === "1")
   {
   	if(checkHebLetter(curLetter))
   	{
      	   makeSound("correct");
           wrightLetter = true;
   	}
   	else
   	{
      	   makeSound("wrong");
           wrightLetter = false;
   	}

   }
   else
   {
   	if(checkEngLetter(curLetter))
   	{
      	   makeSound("correct");
           wrightLetter = true;
   	}
   	else
   	{
      	   makeSound("wrong");
           wrightLetter = false;
   	}

   }

   console.log(answerTextToCheck);
   
   return wrightLetter;

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


function removeChangedLetterStyle(currentLetter)
{
   if(curLang === "1")
   {
     var letterId = "hLetter" + currentLetter;
     var letterDivId = "hLetter" + currentLetter + "Div";
   }
   else
   {
     var letterId = "letter" + currentLetter;
     var letterDivId = "letter" + currentLetter + "Div";
   }

   
   var activeLetter = document.querySelector("." + letterId);
   var activeDiv = document.querySelector("." + letterDivId);

   activeLetter.classList.remove("changedLetter");
   activeDiv.classList.remove("changedLetter");
  
}


function animateLetter(currentLetter)
{
   
   
   makeSound("cashreg");
   sleep (20);
   setTimeout(function() {makeSound("type");}, 200);
   sleep (20);
   setTimeout(function() {makeSound("type");}, 600);
   sleep (20);
   
   if(curLang === "1")
   {
     var letterId = "hLetter" + currentLetter;
     var letterDivId = "hLetter" + currentLetter + "Div";
   }
   else
   {
     var letterId = "letter" + currentLetter;
     var letterDivId = "letter" + currentLetter + "Div";
   }

   var activeLetter = document.querySelector("." + letterId);
   var activeDiv = document.querySelector("." + letterDivId);


   activeLetter.classList.add("changedLetter");
   activeDiv.classList.add("changedLetter");
   
 
   //delay 0.2 sec and returning old style
   setTimeout(function() {removeChangedLetterStyle(currentLetter);}, 1000);      
   setTimeout(function() {greenLetter(currentLetter);}, 2000);    

}


function greenLetter(currentLetter)
{
     
   makeSound("cashreg");
   
   if(curLang === "1")
   {
     var letterId = "hLetter" + currentLetter;
     var letterDivId = "hLetter" + currentLetter + "Div";
   }
   else
   {
     var letterId = "letter" + currentLetter;
     var letterDivId = "letter" + currentLetter + "Div";
   }

   var activeLetter = document.querySelector("." + letterId);
   var activeDiv = document.querySelector("." + letterDivId);


   activeLetter.classList.add("changedLetter");
   activeDiv.classList.add("changedLetter");
   
   
}


function removeGreenLetStyle()
{
  
     for(var i=0; i<textToDisplayArr.length; i++)
     {
      	 var currentKey = textToDisplayArr[i];
         currentKey = currentKey + 1; 
         removeChangedLetterStyle(currentKey);
     }

   
}

function redQuestPointsElement()
{
    makeSound("closedoor");
    document.querySelector("#questPoints").classList.add("wrongRedStyle");
    document.querySelector("#questPointsDiv").classList.add("wrongRedStyle"); 

    document.querySelector("#continue").classList.add("buttonGreen");

}


function greenContinueElement()
{
    document.querySelector("#continue").classList.add("buttonGreen");
}





function displayLetter(curLetter, position)
{
  var letterPosition = position + 1;

  if(letterPosition<40)
     if(curLang === "1")
     {
        document.querySelector(".hLetter" + letterPosition).textContent = curLetter;  
     }
     else
     {
        document.querySelector(".letter" + letterPosition).textContent = curLetter;
     }
   
}




function chooseLetters(exposeLevel, textToDisplay)
{
   var lettersInWord = lettersCount(textToDisplay);
   var nonHiddenLet = 0;
   
   switch (exposeLevel)
   {
     case 0:
     nonHiddenLet = 0;
     break;

     case 1:
     nonHiddenLet = 1;
     break;
     
     case 2:
     nonHiddenLet = 1;
     break;
     
     case 3:
     if(lettersInWord <8)
        nonHiddenLet = 1;
     else
	nonHiddenLet = 2;
     break;

     case 4:
     if(lettersInWord <8)
        nonHiddenLet = 1;
     else if(lettersInWord<12)
	nonHiddenLet = 2;
     else
	nonHiddenLet = 3;
     break;

     case 5:
     if(lettersInWord <7)
        nonHiddenLet = 1;
     else if(lettersInWord<10)
        nonHiddenLet = 2;
     else if(lettersInWord<13)
	nonHiddenLet = 3;
     else
	nonHiddenLet = 4;
     break;

     case 6:
     if(lettersInWord <7)
	nonHiddenLet = 1;
     else if(lettersInWord<9)
	nonHiddenLet = 2;
     else if(lettersInWord<12)
	nonHiddenLet = 3;
     else if(lettersInWord<14)
	nonHiddenLet = 4;
     else
	nonHiddenLet = 5;
     break;

     case 7:
     if(lettersInWord <6)
        nonHiddenLet = 1;
     else if(lettersInWord<8)
	nonHiddenLet = 2;
     else if(lettersInWord<10)
	nonHiddenLet = 4;
     else if(lettersInWord<12)
	nonHiddenLet = 5;
     else if(lettersInWord<15)
	nonHiddenLet = 6;
     else
	nonHiddenLet = 7;
     break;


   }

    
    var cnt = 0;
    var failCnt = 0;
    var size = textToDisplay.length;
    var modifiedText = textToDisplay;
    var letterStr = "";

    while(cnt < nonHiddenLet && failCnt<20)
    {
        var letter;
        var regLet;
        var endLet; 
        var letFlag = false;
        var endFlag = false;
        
     
        if(nonHiddenLet == 1 && exposeLevel == 1)
	{
	   letter = textToDisplay[0];
	}
	else
       {
           var randomNum = Math.floor(Math.random() * size);
	   letter = textToDisplay[randomNum];
       }

       
       switch (letter)
       {
	 case '-':
	 case '*':
	 case ' ':
	 case '"':
	 case '\'':
	 case '/':
	 case ',':
	 case '.':
	 case ':':
	 case '!':
	 case '?':
	 case '0':
	 case '1':
	 case '2':
	 case '3':
	 case '4':
	 case '5':
	 case '6':
	 case '7':
	 case '8':
	 case '9':
	 failCnt++;
	 break;
         
         case 'כ':
         case 'ך':
         letFlag = true;
         endFlag = true;
         regLet = 'כ';
         endLet = 'ך';
         break;

         case 'מ':
         case 'ם':
         letFlag = true;
         endFlag = true;
         regLet = 'מ';
         endLet = 'ם';
         break;

         case 'נ':
         case 'ן':
         letFlag = true;
         endFlag = true;
         regLet = 'נ';
         endLet = 'ן';
         break;

         case 'פ':
         case 'ף':
         letFlag = true;
         endFlag = true;
         regLet = 'פ';
         endLet = 'ף';
         break;

         case 'צ':
         case 'ץ':
         letFlag = true;
         endFlag = true;
         regLet = 'צ';
         endLet = 'ץ';
         break;
  
          
	 default:
         regLet = letter;
	 letFlag = true;
	 break;

       }

       if(letFlag)
       {
         
               
        letterStr = letterStr + ", " + letter;  
        
        if(endFlag)
        {
           var modifiedText = modifiedText.replaceAll(regLet, '*');
           modifiedText = modifiedText.replaceAll(endLet, '*');       
        }
        else
        {
           //var modifiedText = modifiedText.replaceAll(letter, '*');  
           var modifiedText = modifiedText.replaceAll(regLet, '*');  
        }
                

        // Handling keyboard        
        var keyboardLen = hebKeyboardArr.length;

	for(var i=0; i<keyboardLen; i++)
	{
	    if(hebKeyboardArr[i]=== regLet)
	    {
	        hebKeyboardArr[i] = '#';
	    }
	}

	cnt++;
       }


   }

   console.log(letterStr);   
   return modifiedText;


}





function chooseEngLetters(exposeLevel, textToDisplay)
{
   var lettersInWord = lettersCount(textToDisplay);
   var nonHiddenLet = 0;
   
   switch (exposeLevel)
   {
     case 0:
     nonHiddenLet = 0;
     break;

     case 1:
     nonHiddenLet = 1;
     break;

     case 2:
     nonHiddenLet = 1;
     break;

     case 3:
     if(lettersInWord <8)
        nonHiddenLet = 1;
     else
	nonHiddenLet = 2;
     break;

     case 4:
     if(lettersInWord <8)
        nonHiddenLet = 1;
     else if(lettersInWord<12)
	nonHiddenLet = 2;
     else
	nonHiddenLet = 3;
     break;

     case 5:
     if(lettersInWord <7)
        nonHiddenLet = 1;
     else if(lettersInWord<10)
        nonHiddenLet = 2;
     else if(lettersInWord<13)
	nonHiddenLet = 3;
     else
	nonHiddenLet = 4;
     break;

     case 6:
     if(lettersInWord <7)
	nonHiddenLet = 1;
     else if(lettersInWord<9)
	nonHiddenLet = 2;
     else if(lettersInWord<12)
	nonHiddenLet = 3;
     else if(lettersInWord<14)
	nonHiddenLet = 4;
     else
	nonHiddenLet = 5;
     break;

     case 7:
     if(lettersInWord <6)
        nonHiddenLet = 1;
     else if(lettersInWord<8)
	nonHiddenLet = 2;
     else if(lettersInWord<10)
	nonHiddenLet = 4;
     else if(lettersInWord<12)
	nonHiddenLet = 5;
     else if(lettersInWord<15)
	nonHiddenLet = 6;
     else
	nonHiddenLet = 7;
     break;


   }

    
    var cnt = 0;
    var failCnt = 0;
    var size = textToDisplay.length;
    var modifiedText = textToDisplay;
    var letterStr = "";

    while(cnt < nonHiddenLet && failCnt<20)
    {
        var letter;
        var letFlag = false;
     
        if(nonHiddenLet == 1 && exposeLevel == 1)
	{
	   letter = textToDisplay[0];
	}
	else
       {
           var randomNum = Math.floor(Math.random() * size);
	   letter = textToDisplay[randomNum];
       }

       
       switch (letter)
       {
	 case '-':
	 case '*':
	 case ' ':
	 case '"':
	 case '\'':
	 case '/':
	 case ',':
	 case '.':
	 case ':':
	 case '!':
	 case '?':
	 case '0':
	 case '1':
	 case '2':
	 case '3':
	 case '4':
	 case '5':
	 case '6':
	 case '7':
	 case '8':
	 case '9':
	 failCnt++;
	 break;


	 default:
	 letFlag = true;
	 break;

       }

       if(letFlag)
       {
        
        
        var smallC = letter.toLowerCase();
        var bigC =  letter.toUpperCase();
        
        letterStr = letterStr + ", " + bigC;  
       
        var modifiedText = modifiedText.replaceAll(smallC, '*');
        modifiedText = modifiedText.replaceAll(bigC, '*');       
                

       

        // Handling keyboard        
        var keyboardLen = engKeyboardArr.length;

	for(var i=0; i<keyboardLen; i++)
	{
	    if(engKeyboardArr[i]=== smallC)
	    {
	        engKeyboardArr[i] = '#';
	    }
	}
       

	cnt++;
       }


   }

   console.log(letterStr);   
   return modifiedText;


}






function getAnsString(textToDisplay, modifiedText)
{
   var modifiedTextToDisplay = textToDisplay;
		
   for(var i=0; i<modifiedText.length; i++)
   {

       var letter = modifiedText[i];
			
       switch (letter)
       {
	
         case '*':                    //   Letter that should displayed to the player
	 break;
					
	 case '-':                   //   Other signs, that are not relevant, should be displayed too
	 case ' ':
         case '"':
	 case '\'':
	 case '/':
	 case ',':
	 case '.':
	 case ':':
	 case '!':
	 case '?':	
	 case '0':
	 case '1':
	 case '2':
	 case '3':
 	 case '4':
	 case '5':
	 case '6':
	 case '7':
	 case '8':
	 case '9':
	 break;
				
	 default:
         modifiedTextToDisplay = modifiedTextToDisplay.replace(letter, '_');   //   Every other letter shoud be hidden - Hidden Letters
	 break;
      }
			
			
   }
		
   console.log(modifiedText);
   return modifiedTextToDisplay;

}



function checkHebLetter(hebLetter)
{
   var flag = false;
   var letFlag = false;
   var regLet;
   var endLet; 
   var modifiedText = answerTextToCheck;   
	
   switch (hebLetter)
       {
	 case '-':
	 case '*':
	 case ' ':
	 case '"':
	 case '\'':
	 case '/':
	 case ',':
	 case '.':
	 case ':':
	 case '!':
	 case '?':
	 case '0':
	 case '1':
	 case '2':
	 case '3':
	 case '4':
	 case '5':
	 case '6':
	 case '7':
	 case '8':
	 case '9':
	 break;
         
         case 'כ':
         case 'ך':
         letFlag = true;
         regLet = 'כ';
         endLet = 'ך';
         break;

         case 'מ':
         case 'ם':
         letFlag = true;
         regLet = 'מ';
         endLet = 'ם';
         break;

         case 'נ':
         case 'ן':
         letFlag = true;
         regLet = 'נ';
         endLet = 'ן';
         break;

         case 'פ':
         case 'ף':
         letFlag = true;
         regLet = 'פ';
         endLet = 'ף';
         break;

         case 'צ':
         case 'ץ':
         letFlag = true;
         regLet = 'צ';
         endLet = 'ץ';
         break;
  
          
	 default:
	 letFlag = true;
         regLet = hebLetter;
         endLet = hebLetter;
	 break;

       }
       
      
      if(letFlag)
      {		
         for(var i=0; i<answerTextToCheck.length;i++)
         {
			
            if(answerTextToCheck[i] === regLet || answerTextToCheck[i] === endLet)
            {
               var modifiedText = modifiedText.replaceAll(regLet, '*');
               modifiedText = modifiedText.replaceAll(endLet, '*');     

	       flag = true;
               break;
            }
			
         }

      }
		
   if(flag === true)
   {
      answerTextToCheck = modifiedText;
      return true;
   }
   else
      return false;
		
}



function checkEngLetter(engLetter)
{
   var flag = false;
   var modifiedText = answerTextToCheck;   
	
   var bigC = engLetter.toUpperCase();
   var smallC = engLetter.toLowerCase();
		
   for(var i=0; i<answerTextToCheck.length;i++)
   {
			
      if(answerTextToCheck[i] === bigC || answerTextToCheck[i] === smallC)
      {
         var modifiedText = modifiedText.replaceAll(smallC, '*');
         modifiedText = modifiedText.replaceAll(bigC, '*');     

	 flag = true;
         break;
      }
			
   }
		
   if(flag === true)
   {
      answerTextToCheck = modifiedText;
      return true;
   }
   else
      return false;
		
}


function checkRightAns(answerToCheck)
{
		
   for(var i=0; i<answerToCheck.length; i++)
   {
       if(answerToCheck[i] === '_')
          return false;
   }
	
   return true;

}




function lettersCount(textToDisplay)
{
   var cnt = 0;
   var size = textToDisplay.length;
		
   for(var i=0; i<size; i++)
   {
      var letter = textToDisplay[i];
			
      switch (letter)
      {
	 case '-':
	 case '*':
	 case ' ':
	 case '"':
	 case '\'':
	 case '/':
	 case ',':
	 case '.':
	 case ':':
	 case '!':
	 case '?':	
	 case '0':
	 case '1':
	 case '2':
	 case '3':
	 case '4':
	 case '5':
	 case '6':
	 case '7':
	 case '8':
	 case '9':
	 break;
		
	 default:
	 cnt++;
	 break;
		
      }
			
   }
		
   return cnt;
}


function clearDisplay()
{
  for(var i=1; i<40; i++)
      document.querySelector(".letter" + i).textContent = "";
}


function hebKeyTranslate(curKey)
{
   var hebKey;

   switch(curKey)
   {
       case 'a':
       hebKey = 'ש';
       break;
       
       case 'b':
       hebKey = 'נ';
       break;
 
       case 'c':
       hebKey = 'ב';
       break;

       case 'd':
       hebKey = 'ג';
       break;

       case 'e':
       hebKey = 'ק';
       break;

       case 'f':
       hebKey = 'כ';
       break;

       case 'g':
       hebKey = 'ע';
       break;

       case 'h':
       hebKey = 'י';
       break;
       
       case 'j':
       hebKey = 'ח';
       break;

       case 'k':
       hebKey = 'ל';
       break;

       case 'm':
       hebKey = 'צ';
       break;

       case 'n':
       hebKey = 'מ';
       break;
 
       case 'p':
       hebKey = 'פ';
       break;
 
       case 'r':
       hebKey = 'ר';
       break;

       case 's':
       hebKey = 'ד';
       break;

       case 't':
       hebKey = 'א';
       break;

       case 'u':
       hebKey = 'ו';
       break;

       case 'v':
       hebKey = 'ה';
       break;

       case 'x':
       hebKey = 'ס';
       break;

       case 'y':
       hebKey = 'ט';
       break;

       case 'z':
       hebKey = 'ז';
       break;

       case ',':
       hebKey = 'ת';
       break;

       default:
       hebKey = '';
       break;       

   }
  
   return hebKey;

}



function hebKeyTranslateClick(curKey)
{
   var hebKey;

   switch(curKey)
   {
       case 'a':
       hebKey = 'ז';
       break;
       
       case 'b':
       hebKey = 'ו';
       break;
 
       case 'c':
       hebKey = 'ה';
       break;

       case 'd':
       hebKey = 'ד';
       break;

       case 'e':
       hebKey = 'ג';
       break;

       case 'f':
       hebKey = 'ב';
       break;

       case 'g':
       hebKey = 'א';
       break;

       case 'h':
       hebKey = 'נ';
       break;

       case 'i':
       hebKey = 'מ';
       break;
       
       case 'j':
       hebKey = 'ל';
       break;

       case 'k':
       hebKey = 'כ';
       break;

       case 'l':
       hebKey = 'י';
       break;

       case 'm':
       hebKey = 'ט';
       break;

       case 'n':
       hebKey = 'ח';
       break;

       case 'o':
       hebKey = 'ש';
       break;
 
       case 'p':
       hebKey = 'ר';
       break;
 
       case 'q':
       hebKey = 'ק';
       break;

       case 'r':
       hebKey = 'צ';
       break;

       case 's':
       hebKey = 'פ';
       break;

       case 't':
       hebKey = 'ע';
       break;

       case 'u':
       hebKey = 'ס';
       break;

       case 'v':
       hebKey = 'ת';
       break;

       default:
       hebKey = '';
       break;       

   }
  
   return hebKey;

}







function hebAnimateKeyTranslate(curKey)
{
   var hebAnimateKey;

   switch(curKey)
   {
       case 'a':
       hebAnimateKey = 'o';
       break;
       
       case 'b':
       hebAnimateKey = 'h';
       break;
 
       case 'c':
       hebAnimateKey = 'f';
       break;

       case 'd':
       hebAnimateKey = 'e';
       break;

       case 'e':
       hebAnimateKey = 'q';
       break;

       case 'f':
       hebAnimateKey = 'k';
       break;

       case 'g':
       hebAnimateKey = 't';
       break;

       case 'h':
       hebAnimateKey = 'l';
       break;

       case 'i':
       hebAnimateKey = 'n';
       break;
       
       case 'j':
       hebAnimateKey = 'n';
       break;

       case 'k':
       hebAnimateKey = 'j';
       break;

       case 'l':
       hebAnimateKey = 'h';
       break;

       case 'm':
       hebAnimateKey = 'r';
       break;

       case 'n':
       hebAnimateKey = 'i';
       break;

       case 'o':
       hebAnimateKey = 'i';
       break;
 
       case 'p':
       hebAnimateKey = 's';
       break;
        
       case 'q':
       hebAnimateKey = 'e';
       break;

       case 'r':
       hebAnimateKey = 'p';
       break;

       case 's':
       hebAnimateKey = 'd';
       break;

       case 't':
       hebAnimateKey = 'g';
       break;

       case 'u':
       hebAnimateKey = 'b';
       break;

       case 'v':
       hebAnimateKey = 'c';
       break;

       case 'x':
       hebAnimateKey = 'u';
       break;

       case 'y':
       hebAnimateKey = 'm';
       break;

       case 'z':
       hebAnimateKey = 'a';
       break;

       case ',':
       hebAnimateKey = 'v';
       break;

       default:
       hebAnimateKey = '';
       break;       

   }
  
   return hebAnimateKey;

}


function readSubjectName(subjectNumString)
{

   var subjectName;
   
   var subjectNum =  parseInt(subjectNumString);

   switch(subjectNum)
   {

       case 4301:
       subjectName = "מדינות תבל"; 
       break;

       case 4302:
       subjectName = "ערי תבל"; 
       break;       

       case 4303:
       subjectName = "במרחבי הגלובוס"; 
       break;

       case 4304:
       subjectName = "עיר וכפר בארץ ישראל"; 
       break;

       case 4305:
       subjectName = "אתרים בארץ ישראל"; 
       break;

       case 4306:
       subjectName = "חי"; 
       break;

       case 4307:
       subjectName = "צומח"; 
       break;

       case 4308:
       subjectName = "דומם"; 
       break;       

       case 4309:
       subjectName = "מקצוע"; 
       break;

       case 4310:
       subjectName = "אישי תבל"; 
       break;

       case 4311:
       subjectName = "מורשת ציונית"; 
       break;

       case 4312:
       subjectName = "גיבור תרבות"; 
       break;


   }

   return subjectName;

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



function secondStage()
{

  var annonce = 'שלב "הפדיון" הסתיים.' + '\n' + '"השלב הבא - "פקיד השומה';
  alert(annonce);

  localStorage.setItem('revenue1', playersRevenue[0]);
  localStorage.setItem('revenue2', playersRevenue[1]);
  localStorage.setItem('revenue3', playersRevenue[2]);
  localStorage.setItem('revenue4', playersRevenue[3]);

  localStorage.setItem('gameType', gameType);
  localStorage.setItem('currency', currency);

  checkPosition(1, playersRevenue);  
  localStorage.setItem('pkidHashuma', playersProf[pkidHashumaPos]);

  window.location.href = 'pkidhashuma.html';


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
  
  localStorage.setItem('gameType', gameType);
  localStorage.setItem('currency', currency);
  localStorage.setItem('selary', selary);
  localStorage.setItem('questsVar', questsVar);   

  window.location.href = 'stage2.html';

  
  window.open("./teabreak.html","_self");         

}







function buildGameStructure()
{
   switch(gameType)
   {   
      case '0':
      questsInSubject = 1;
      questsLevel = "1331";
      break;

      case '1':
      questsInSubject = 1;
      questsLevel = "1332";
      break;

      case '2':
      questsInSubject = 2;
      questsLevel = "1332";
      break;

      case '3':
      questsInSubject = 4;
      questsLevel = "1332";
      break;
      
   
   }

}




function retRandomizeString(type)
{
   var profession = ["סוור","זבנית","חנווני","גלב","נפח","מסגר","נחתום","חרש עץ","חרט","לבלר","קצרנית","פ. קבלה","פ. בנק","פ. עירייה","פ. בכיר","טבח","אופה","כבאי","ש. מקוף","פרדסן","רפתן","לולן","חקלאי","כורם","מאכער","עמיל מכס","כורך","דפס","כרטיסן","מודד","בנאי","טפסן","שרברב","חייט","סנדלר","תופרת","סתת","שרטט","קדר","עגלון","חצרן","סניטר","ספן","רוכל","תגרן","משכונאית"];


   var currency = ['ל"י', 'מיל', 'גרוש', 'ג"מ', 'שקל'];
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



function choosePlayers()
{
     
   playersProf.push(retRandomizeString(1));
   var doubleProfFlg = false;
   var counter = 1;

   while(counter<4)
   {
     doubleProfFlg = false;
     player = retRandomizeString(1);
     
     for(var i=0; i<counter; i++)
     {     
        if(player === playersProf[i])
           doubleProfFlg = true;
     }

     if(!doubleProfFlg)
     {
        playersProf.push(player);
        counter++;
     }

   }


}


function retrieveDataFromStartJSfile()
{

    const player1 = localStorage.getItem('player1');
    const player2 = localStorage.getItem('player2');
    const player3 = localStorage.getItem('player3');
    const player4 = localStorage.getItem('player4');
    
    if(player1.length > 0)
       playersProf[0] = player1;

    if(player2.length > 0)
       playersProf[1] = player2;
    
    if(player3.length > 0)
       playersProf[2] = player3;

    if(player4.length > 0)
       playersProf[3] = player4;

      
    gameType = localStorage.getItem('gameType');
    exposeLevel = localStorage.getItem('exposeLevel') * 1;
    selary = localStorage.getItem('selary');
    currency = localStorage.getItem('currency');
    questsVar = localStorage.getItem('questsVar') * 1;
     

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

   switch(sound)
   {  
      case "keyboard":
      keyboard.play();         
      break;

      case "type":
      type.play();         
      break;

      case "fingerclick":
      fingerclick.play();         
      break;

      case "camera":
      camera.play();         
      break;

      case "page":
      page.play();         
      break;

      case "cashreg":
      cashreg.play();         
      break;

      case "correct":
      correct.play();         
      break;

      case "wrong":
      wrong.play();         
      break;
   
      case "closedoor":
      closedoor.play();         
      break;
  
   }

}


/*
function makeSound(sound)
{  
   if(sound === "keyboard")
 	keyboard.play();         
   
   if(sound === "type")
 	type.play();  

   if(sound === "fingerclick")
 	fingerclick.play();            

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
*/



