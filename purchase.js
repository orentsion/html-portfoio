

var schoolName;
var street;
var streetNum;
var city;
var contactMane;
var telNum;




//main



//main


window.addEventListener('load', function() {
  window.scrollTo(0, 0);
});


/*
document.getElementById("userForm").addEventListener("submit", function(event) {
      event.preventDefault(); // Prevent form submission

      // Get user input
      const name = document.getElementById("name").value;
      const address = document.getElementById("address").value;
      const phone = document.getElementById("phone").value;

      // Create text content
      const content = `User Information:\n\nName: ${name}\nAddress: ${address}\nPhone: ${phone}`;

      // Create a Blob from the content
      const blob = new Blob([content], { type: "text/plain" });

      // Create a link to download the Blob
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "user_info.txt";
      link.click(); // Trigger the download
    });

*/




function startPayment()
{
   
   schoolName = document.getElementById("schoolName").value;
   console.log("שם בית הספר: " + schoolName);

   street = document.getElementById("street").value;
   console.log("רחוב: " + street);
 
   streetNum = document.getElementById("streetNum").value;
   console.log("מס' בית: " + streetNum);

   city = document.getElementById("city").value;
   console.log("יישוב: " + city);


   contactMan = document.getElementById("contactMan").value;
   console.log("איש קשר: " + contactMan);

   telNum = document.getElementById("telNum").value;
   console.log("טלפון נייד: " + telNum);

   const content = `פרטי רכישה:\n\בית ספר: ${schoolName}\n\רחוב: ${street}\n\מס' בית: ${streetNum}\n\יישוב: ${city}\n\איש קשר: ${contactMan}\n\סלולרי: ${telNum}`;


     // Create a Blob from the content
      const blob = new Blob([content], { type: "text/plain" });

      // Create a link to download the Blob
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "purchase_info.txt";
      link.click(); // Trigger the download
   


}

