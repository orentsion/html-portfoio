

var gameType;
var exposeLevel;
var selary;
var currency;
var questsVar;
var playersInput = [];

var gameTypeText = ["הדגמה - קל וקצר", "תרגול קצר", "תרגול ארוך", "טורניר - מלא"];

var gameStructure = ["פדיון - 12 ש' קלות, פ.השומה - 10ש', י.המס - 10ש'", "פדיון - 12 שאלות, פ.השומה - 20 ש', י.המס - 20 ש'", "פדיון - 24 שאלות, פ.השומה - 40 ש', י.המס - 40 ש'", "פדיון - 48 שאלות, פ.השומה - 40 ש', י.המס - 40 ש'"];

var exposeLevelText = ["ללא חשיפה", "אות ראשונה (ארץ עיר הפוך)", "אות אקראית", "דרגה 3", "דרגה 4", "דרגה 5", "דרגה 6", "דרגה 7"];
var selaryText = ["נקודה = 3", "נקודה = 5", "נקודה = 7", "נקודה = 10"];

var comment = "הערה: על המקלדת להיות במצב אנגלית - אותיות קטנות";

//main

currency = retRandomizeString(2);
handleChange();

//main


window.addEventListener('load', function() {
  window.scrollTo(0, 0);
});


function startGame()
{


  localStorage.setItem('gameType', gameType); 
  localStorage.setItem('exposeLevel', exposeLevel); 
  localStorage.setItem('selary', selary); 
  localStorage.setItem('currency', currency);  
  localStorage.setItem('questsVar', questsVar);  
 
  localStorage.setItem('player1', playersInput[0]);
  localStorage.setItem('player2', playersInput[1]);
  localStorage.setItem('player3', playersInput[2]);
  localStorage.setItem('player4', playersInput[3]);

  

  window.location.href = 'stage1.html';

  
  window.open("./stage1.html","_self"); 


}



function handleChange()
{
   
   var selectedElement = document.getElementById("gameTypeSel");
   gameType = selectedElement.value;
   console.log("Your game: " + gameType);

   selectedElement = document.getElementById("exposeLevelSel");
   exposeLevel = selectedElement.value;
   console.log("Your expose: " + exposeLevel);

   selectedElement = document.getElementById("selarySel");
   selary = selectedElement.value;
   console.log("Your selary: " + selary);

   selectedElement = document.getElementById("questsVar");
   questsVar = selectedElement.value;

   if(questsVar.length > 3)
      questsVar = 0;

   if(questsVar * 1 < 0)
      questsVar = 0;

   console.log("You QuestsVar: " + questsVar);

   selectedElement = document.getElementById("player1");
   playersInput[0] = selectedElement.value;
   console.log("player A: " + player1);
 
   selectedElement = document.getElementById("player2");
   playersInput[1] = selectedElement.value;
   console.log("player B: " + player2);

   selectedElement = document.getElementById("player3");
   playersInput[2] = selectedElement.value;
   console.log("player C: " + player3);

   selectedElement = document.getElementById("player4");
   playersInput[3] = selectedElement.value;
   console.log("player D: " + player4);

   if(playersInput[0]==="Oren" && playersInput[1]==="Tsion")
      comment = getCopyrightsComment(questsVar);


  var typeOfGame = "סוג המשחק: " + gameTypeText[gameType] + "</br>" + "מבנה: " + gameStructure[gameType] + "</br>";

  var gameParameters = "דרגת החשיפה: " + exposeLevelText[exposeLevel] + "</br>" + "שכר עבור נקודה: " + selary + " " + currency + "</br>" + "משתנה גיוון שאלות: " + questsVar + "</br>";
  
  var players = "הנישומים (משלחי יד): " + playersInput[0] + ", " + playersInput[1] + ", " + playersInput[2] + ", " + playersInput[3] + "</br>";

  document.querySelector("#gameInformation").innerHTML = typeOfGame + gameParameters + players + comment;

}



function retRandomizeString(type)
{
   var profession = ["סוור","זבנית","חנווני","גלב","נפח","מסגר","חרש מתכת","חרש עץ","חרט","לבלר","קצרנית","פקיד קבלה","פקיד בנק","פקיד עירייה","פקיד בכיר","טבח","נחתום","כבאי","שוטר מקוף","פרדסן","רפתן","לולן","חקלאי","כורם","מאכער","עמיל מכס","כורך","דפס","כרטיסן","מודד","בנאי","טפסן","שרברב","חייט","סנדלר","תופרת","סתת","שרטט","קדר","עגלון","חצרן","סניטר","ספן","רוכל","תגרן","משכונאית"];

   var currency = ['ל"י', 'מיל', 'גרוש', 'ג"מ', 'שקל','זוזים','בישליק','לא"י'];   

   //var currency = ['ל"י', 'מיל', 'גרוש', 'ג"מ', 'שקל'];
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



function getCopyrightsComment(questsVar)
{
   var comment;

   switch(questsVar)
   {
      
      case "240":
      comment = "כל הזכויות שמורות לאורן ציאון ©";
      break;

      case "243":
      comment = "מספר זהות: 024052433 ©";
      break;

      case "433":
      comment = "ת.ד. 244, ד.נ. חפר 3887000";
      break;

      case "524":
      comment = "orentsion@gmail.com";
      break;

      default:
      comment = "כל הזכויות שמורות לבינהטון ©";
      break;

   }

  return comment;

}
