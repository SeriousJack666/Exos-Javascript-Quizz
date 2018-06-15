
var tab_reponse=[]; ///tab utulisé pendant la session par theme choisi


var theme_index=0;
var theme_url="";


var question="";
var question_url="";



var reponse_1="";
var reponse_2="";
var reponse_3="";
var reponse_4="";
// var bonne_reponse_json="";
var bonne_reponse_json_div="#";



var reponse_choisie="";
var nb_theme=1;
var nb_question=1;
var nb_question_temp=0;



var bt_presedent=document.getElementsByTagName('button')[0];
var bt_suivant=document.getElementsByTagName('button')[1];
var span=document.getElementsByTagName('span')[0];


var div1=document.getElementById("reponse_1");
var div2=document.getElementById("reponse_2");
var div3=document.getElementById("reponse_3");
var div4=document.getElementById("reponse_4");

bt_presedent.addEventListener("click",presedent);
bt_suivant.addEventListener("click",suivant);


div1.addEventListener("click",selection_utilisateur,false);
div2.addEventListener("click",selection_utilisateur,false);
div3.addEventListener("click",selection_utilisateur,false);
div4.addEventListener("click",selection_utilisateur,false);
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////


var req = new XMLHttpRequest();

req.open('GET', 'assets/js/questions_reponses.json', false);
req.onreadystatechange = maFonction;
req.send(null);



function maFonction () {

    if (req.readyState == 4) {
        var questions_reponses = JSON.parse(req.responseText);

//console.log(questions_reponses);

question_url=questions_reponses.themes[0].questions[nb_question-1].question_url;
document.body.style.backgroundImage="url("+question_url+")";
// question_url=

question=questions_reponses.themes[0].questions[nb_question-1].question;
reponse_choisie=questions_reponses.themes[0].questions[nb_question-1].bonneReponse;
bonne_reponse_json_div=questions_reponses.themes[0].questions[nb_question-1].id;

reponse_1=questions_reponses.themes[0].questions[nb_question-1].possibleAnswers[0];
reponse_2=questions_reponses.themes[0].questions[nb_question-1].possibleAnswers[1];
reponse_3=questions_reponses.themes[0].questions[nb_question-1].possibleAnswers[2];
reponse_4=questions_reponses.themes[0].questions[nb_question-1].possibleAnswers[3];

    }
    else {
        console.log("Status de la réponse: %d (%s)", req.status, req.statusText);
    }
}

 maFonction();


 ////////////////////////////////////////////////////////////
 ////////////////////////////////////////////////////////////

setInterval(gestion_question,200);

function gestion_question()
{
//console.log(reponse_choisie);
///////////////////////////////////////////////////////////////////////
if(nb_question!=nb_question_temp)
      {
      maFonction();

      if (tab_reponse[nb_question-1]===undefined)
      {document.getElementsByTagName("button")[1].style.display="none";}

      else {document.getElementsByTagName("button")[1].style.display="";
            document.getElementsByTagName("button")[1].className="animation_suivant";

          }
      }

///////////////////////////////////////////////////////////////////////

nb_question_temp=nb_question;
analyse_deja_faite();
span.innerHTML=nb_question+" : "+question;


document.getElementById('reponse_1').innerHTML="<p>"+reponse_1+"</p>";
document.getElementById('reponse_2').innerHTML="<p>"+reponse_2+"</p>";
document.getElementById('reponse_3').innerHTML="<p>"+reponse_3+"</p>";
document.getElementById('reponse_4').innerHTML="<p>"+reponse_4+"</p>";

}

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
function presedent()

{
if(nb_question==1){return;}
nb_question--;
}


function suivant()

{
if(nb_question==10){return;}
nb_question++;
}


////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////




function selection_utilisateur(event)  ///declencher au clic div (ecouteur)

{
//console.log(event);
  // alert(event.currentTarget.id);
  if (tab_reponse[nb_question-1]===undefined)
    {
      tab_reponse.push(event.currentTarget.id);
    setTimeout(function(){ nb_question++; },2000);
    }


//console.log(tab_reponse);
}

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////

function analyse_deja_faite()
{
if(tab_reponse[nb_question-1]==bonne_reponse_json_div)
      {
        document.getElementById('reponse_1').className = "";
        document.getElementById('reponse_2').className = "";
        document.getElementById('reponse_3').className = "";
        document.getElementById('reponse_4').className = "";


        document.getElementById(tab_reponse[nb_question-1]).className = "bonne_reponse";

      }


else if((tab_reponse[nb_question-1]!=bonne_reponse_json_div)&&(tab_reponse[nb_question-1]!=undefined))
      {
        document.getElementById('reponse_1').className = "";
        document.getElementById('reponse_2').className = "";
        document.getElementById('reponse_3').className = "";
        document.getElementById('reponse_4').className = "";

        document.getElementById(tab_reponse[nb_question-1]).className = "mauvaise_reponse";
      }

else {
       document.getElementById('reponse_1').className = "";
       document.getElementById('reponse_2').className = "";
       document.getElementById('reponse_3').className = "";
       document.getElementById('reponse_4').className = "";  }

}
