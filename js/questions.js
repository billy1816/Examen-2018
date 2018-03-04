var formElement=null;
var numeroSecreto=null;
var numeroSecreto1=null;
var nombreSecreto=null;
var respuestaSelect=null;
var respuestaSelect1=null;
var respuestaSelect2=null;
var respuestasCheckbox = [];
var respuestasCheckbox1 = [];
var respuestasCheckbox2 = [];
var respuestasCheckbox3 = [];
var nota = 0;  //nota de la prueba sobre 3 puntos (hay 3 preguntas)

//**************************************************************************************************** 
//Después de cargar la página (onload) se definen los eventos sobre los elementos entre otras acciones.

 //CORREGIR al apretar el botón
 formElement=document.getElementById('myform');
 formElement.onsubmit=function(){
   inicializar();
   if (comprobar()){
    mostrar=document.getElementById("resultadosDiv").style.display = "inline-block";
    corregirNumber();
    corregirSelect();
    corregirCheckbox();
    corregirCheckbox1();
    corregirNombre();
    corregirCheckbox2();
    corregirSelect1();
    corregirNumber1();
    corregirCheckbox3();
    corregirSelect2();
    presentarNota();
   }
   return false;
 }

 //LEER XML de xml/preguntas.xml
 var xhttp = new XMLHttpRequest();
 xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
   gestionarXml(this);
   
  }
 };
 xhttp.open("GET", "xml/preguntas.xml", true);
 xhttp.send();
}
window.onload = function(){ 
     document.getElementById("menu").onclick = function(){
    document.getElementById("myform").style.display = "block";
    document.getElementById("instruccions").style.display = "none";
};


//****************************************************************************************************
// Recuperamos los datos del fichero XML xml/preguntas.xml
// xmlDOC es el documento leido XML. 
function gestionarXml(dadesXml){
 var xmlDoc = dadesXml.responseXML; //Parse XML to xmlDoc
 
 //NUMBER
 //Recuperamos el título y la respuesta correcta de Input, guardamos el número secreto
 var tituloInput=xmlDoc.getElementsByTagName("title")[0].innerHTML;
 ponerDatosInputHtml(tituloInput);
 numeroSecreto=parseInt(xmlDoc.getElementsByTagName("answer")[0].innerHTML);
 
 //SELECT
 //Recuperamos el título y las opciones, guardamos la respuesta correcta
 var tituloSelect=xmlDoc.getElementsByTagName("title")[1].innerHTML;
 var opcionesSelect = [];
 var nopt = xmlDoc.getElementById("examen_002").getElementsByTagName('option').length;
  for (i = 0; i < nopt; i++) { 
    opcionesSelect[i] = xmlDoc.getElementById("examen_002").getElementsByTagName('option')[i].innerHTML;
 }
 ponerDatosSelectHtml(tituloSelect,opcionesSelect);
 respuestaSelect=parseInt(xmlDoc.getElementsByTagName("answer")[1].innerHTML);

 //CHECKBOX
 //Recuperamos el título y las opciones, guardamos las respuestas correctas
 var tituloCheckbox = xmlDoc.getElementsByTagName("title")[2].innerHTML;
 var opcionesCheckbox = [];
 var nopt = xmlDoc.getElementById("examen_003").getElementsByTagName('option').length;
 for (i = 0; i < nopt; i++) { 
    opcionesCheckbox[i]=xmlDoc.getElementById("examen_003").getElementsByTagName('option')[i].innerHTML;
 }  
 ponerDatosCheckboxHtml(tituloCheckbox,opcionesCheckbox);
 var nres = xmlDoc.getElementById("examen_003").getElementsByTagName('answer').length;
 for (i = 0; i < nres; i++) { 
  respuestasCheckbox[i]=xmlDoc.getElementById("examen_003").getElementsByTagName("answer")[i].innerHTML;
 }
  //CHECKBOX1
 //Recuperamos el título y las opciones, guardamos las respuestas correctas
 var tituloCheckbox1 = xmlDoc.getElementsByTagName("title")[3].innerHTML;
 var opcionesCheckbox1 = [];
 var nopt = xmlDoc.getElementById("examen_004").getElementsByTagName('option').length;
 for (i = 0; i < nopt; i++) { 
    opcionesCheckbox1[i]=xmlDoc.getElementById("examen_004").getElementsByTagName('option')[i].innerHTML;
 }  
 ponerDatosCheckboxHtml1(tituloCheckbox1,opcionesCheckbox1);
 var nres = xmlDoc.getElementById("examen_004").getElementsByTagName('answer').length;
 for (i = 0; i < nres; i++) { 
  respuestasCheckbox1[i]=xmlDoc.getElementById("examen_004").getElementsByTagName("answer")[i].innerHTML;
 }
  //Nom
 var tituloInput1=xmlDoc.getElementsByTagName("title")[4].innerHTML;
 ponerDatosInputHtml1(tituloInput1);
 nombreSecreto=xmlDoc.getElementsByTagName("answer")[6].innerHTML;

 //CHECKBOX2
 //Recuperamos el título y las opciones, guardamos las respuestas correctas
 var tituloCheckbox2 = xmlDoc.getElementsByTagName("title")[5].innerHTML;
 var opcionesCheckbox2 = [];
 var nopt = xmlDoc.getElementById("examen_006").getElementsByTagName('option').length;
 for (i = 0; i < nopt; i++) { 
    opcionesCheckbox2[i]=xmlDoc.getElementById("examen_006").getElementsByTagName('option')[i].innerHTML;
 }  
 ponerDatosCheckboxHtml2(tituloCheckbox2,opcionesCheckbox2);
 var nres = xmlDoc.getElementById("examen_006").getElementsByTagName('answer').length;
 for (i = 0; i < nres; i++) { 
  respuestasCheckbox2[i]=xmlDoc.getElementById("examen_006").getElementsByTagName("answer")[i].innerHTML;
 }

//SELECT1
 //Recuperamos el título y las opciones, guardamos la respuesta correcta
 var tituloSelect1 = xmlDoc.getElementsByTagName("title")[6].innerHTML;
 var opcionesSelect1 = [];
 var nopt = xmlDoc.getElementById("examen_007").getElementsByTagName('option').length;
  for (i = 0; i < nopt; i++) { 
    opcionesSelect1[i] = xmlDoc.getElementById("examen_007").getElementsByTagName('option')[i].innerHTML;
 }
 ponerDatosSelectHtml1(tituloSelect1,opcionesSelect1);
 respuestaSelect1=parseInt(xmlDoc.getElementsByTagName("answer")[9].innerHTML);

 //NUMBER
 //Recuperamos el título y la respuesta correcta de Input, guardamos el número secreto
 var tituloInput2=xmlDoc.getElementsByTagName("title")[7].innerHTML;
 ponerDatosInputHtml2(tituloInput2);
 numeroSecreto1=parseInt(xmlDoc.getElementsByTagName("answer")[10].innerHTML);

 //CHECKBOX3
 //Recuperamos el título y las opciones, guardamos las respuestas correctas
 var tituloCheckbox3 = xmlDoc.getElementsByTagName("title")[8].innerHTML;
 var opcionesCheckbox3 = [];
 var nopt = xmlDoc.getElementById("examen_009").getElementsByTagName('option').length;
 for (i = 0; i < nopt; i++) { 
    opcionesCheckbox3[i]=xmlDoc.getElementById("examen_009").getElementsByTagName('option')[i].innerHTML;
 }  
 ponerDatosCheckboxHtml3(tituloCheckbox3,opcionesCheckbox3);
 var nres = xmlDoc.getElementById("examen_009").getElementsByTagName('answer').length;
 for (i = 0; i < nres; i++) { 
  respuestasCheckbox3[i]=xmlDoc.getElementById("examen_009").getElementsByTagName("answer")[i].innerHTML;
 }
 //SELECT1
 //Recuperamos el título y las opciones, guardamos la respuesta correcta
 var tituloSelect2 = xmlDoc.getElementsByTagName("title")[9].innerHTML;
 var opcionesSelect2 = [];
 var nopt = xmlDoc.getElementById("examen_010").getElementsByTagName('option').length;
  for (i = 0; i < nopt; i++) { 
    opcionesSelect2[i] = xmlDoc.getElementById("examen_010").getElementsByTagName('option')[i].innerHTML;
 }
 ponerDatosSelectHtml2(tituloSelect2,opcionesSelect2);
 respuestaSelect2=parseInt(xmlDoc.getElementsByTagName("answer")[12].innerHTML);

}
//****************************************************************************************************
//implementación de la corrección

function corregirNumber(){
  //Vosotros debéis comparar el texto escrito con el texto que hay en el xml
  //en este ejemplo hace una comparación de números enteros
  var s=formElement.elements[0].value;     
  if (s==numeroSecreto) {
   darRespuestaHtml("Pregunta 1: Correcte!");
      darRespuestaHtml("El Bitcoin va arribar a 20.000$ el 16 de desembre de 2017");
   nota +=1;
  }
  else {
    if (s>numeroSecreto) darRespuestaHtml("Pregunta 1: T'has passat");
    else darRespuestaHtml("Pregunta 1: T'has quedat curt");
  }
}
function corregirNumber1(){
  //Vosotros debéis comparar el texto escrito con el texto que hay en el xml
  //en este ejemplo hace una comparación de números enteros
  var s=formElement.elements[16].value;     
  if (s==numeroSecreto1) {
   darRespuestaHtml("Pregunta 8: Correcte!");
      darRespuestaHtml("Les dues pizzes a dia d'avui tendrien un preu aproximat de 92.100.000€");
   nota +=1;
  }
  else {
    if (s>numeroSecreto1) darRespuestaHtml("Pregunta 8: T'has passat");
    else darRespuestaHtml("Pregunta 8: T'has quedat curt");
  }
}

function corregirSelect(){
  //Compara el índice seleccionado con el valor del íncide que hay en el xml (<answer>2</answer>)
  //para implementarlo con type radio, usar value para enumerar las opciones <input type='radio' value='1'>...
  //luego comparar ese value con el value guardado en answer
  var sel = formElement.elements[1];  
  if (sel.selectedIndex-1==respuestaSelect) { //-1 porque hemos puesto una opción por defecto en el select que ocupa la posición 0
   darRespuestaHtml("Pregunta 2: Correcte!");
      darRespuestaHtml("La unitat més petita duu el nom del seu creador, Satoshi");
   nota +=1;
  }
  else darRespuestaHtml("Pregunta 2: Incorrecte");
}

//Si necesitáis ayuda para hacer un corregirRadio() decirlo, lo ideal es que a podáis construirla modificando corregirCheckbox
function corregirCheckbox(){
  //Para cada opción mira si está checkeada, si está checkeada mira si es correcta y lo guarda en un array escorrecta[]
  var f=formElement;
  var escorrecta = [];
  for (i = 0; i < f.color.length; i++) {  //"color" es el nombre asignado a todos los checkbox
   if (f.color[i].checked) {
    escorrecta[i]=false;     
    for (j = 0; j < respuestasCheckbox.length; j++) {
     if (i==respuestasCheckbox[j]) escorrecta[i]=true;
    }
    //si es correcta sumamos y ponemos mensaje, si no es correcta restamos y ponemos mensaje.
    if (escorrecta[i]) {
     nota +=1.0/respuestasCheckbox.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("Pregunta 3: opció "+i+" Correcte!");
     } else {
     nota -=1.0/respuestasCheckbox.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("Pregunta 3: opció "+i+" Incorrecte");
    } 
   } 
  } darRespuestaHtml("El bitcoin no es 100% anònim ni gratuït, per això existeixen altres monedes!")  
}
//Si necesitáis ayuda para hacer un corregirRadio() decirlo, lo ideal es que a podáis construirla modificando corregirCheckbox
function corregirCheckbox1(){
  //Para cada opción mira si está checkeada, si está checkeada mira si es correcta y lo guarda en un array escorrecta[]
  var f=formElement;
  var escorrecta1 = [];
  for (i = 0; i < f.color1.length; i++) {  //"color" es el nombre asignado a todos los checkbox
   if (f.color1[i].checked) {
    escorrecta1[i]=false;     
    for (j = 0; j < respuestasCheckbox1.length; j++) {
     if (i==respuestasCheckbox1[j]) escorrecta1[i]=true;
    }
    //si es correcta sumamos y ponemos mensaje, si no es correcta restamos y ponemos mensaje.
    if (escorrecta1[i]) {
     nota +=1.0/respuestasCheckbox1.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("Pregunta 4: opció "+i+" Correcte!");     
    } else {
     nota -=1.0/respuestasCheckbox1.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("Pregunta 4: opció "+i+" Incorrecte");
    }   
   } 
  } darRespuestaHtml("Tant Monero com Zcash són més irrastrejables que el Bitcoin, cosa que els dona valor");
}
function corregirNombre(){
  //Vosotros debéis comparar el texto escrito con el texto que hay en el xml
  //en este ejemplo hace una comparación de números enteros
  var s1= formElement.elements[10].value; 
  if (s1==nombreSecreto) {
   darRespuestaHtml("Pregunta 5: Correcte!")
      darRespuestaHtml("Amb aquest nick es presentava el creador del bitcoin, el qual mai s'ha resolt qui era realment i va desapareixer 2011");
   nota +=1;
  }
  else {
    darRespuestaHtml("Pregunta 5: Incorrecte");
  }
}
function corregirCheckbox2(){
  //Para cada opción mira si está checkeada, si está checkeada mira si es correcta y lo guarda en un array escorrecta[]
  var f=formElement;
  var escorrecta2 = [];
  for (i = 0; i < f.color2.length; i++) {  //"color" es el nombre asignado a todos los checkbox
   if (f.color2[i].checked) {
    escorrecta2[i]=false;     
    for (j = 0; j < respuestasCheckbox2.length; j++) {
     if (i==respuestasCheckbox2[j]) escorrecta2[i]=true;
    }
    //si es correcta sumamos y ponemos mensaje, si no es correcta restamos y ponemos mensaje.
    if (escorrecta2[i]) {
     nota +=1.0/respuestasCheckbox2.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("Pregunta 6: opció "+i+" Correcte!");     
    } else {
     nota -=1.0/respuestasCheckbox2.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("Pregunta 6: opció "+i+" Incorrecte");
    }   
   } 
  } darRespuestaHtml("Així és, alguns països han tengut més afinitat amb les criptomonedes que altres");
}
function corregirSelect1(){
  //Compara el índice seleccionado con el valor del íncide que hay en el xml (<answer>2</answer>)
  //para implementarlo con type radio, usar value para enumerar las opciones <input type='radio' value='1'>...
  //luego comparar ese value con el value guardado en answer
  var sel1 = formElement.elements[15];  
  if (sel1.selectedIndex-1==respuestaSelect1) { //-1 porque hemos puesto una opción por defecto en el select que ocupa la posición 0
   darRespuestaHtml("Pregunta 7: Correcte!");
      darRespuestaHtml("Aquest algoritme va ser creat per la NASA a 2001 i posteriorment adoptat per el Bitcoin");
   nota +=1;
  }
  else darRespuestaHtml("Pregunta 7: Incorrecte");
}
function corregirCheckbox3(){
  //Para cada opción mira si está checkeada, si está checkeada mira si es correcta y lo guarda en un array escorrecta[]
  var f=formElement;
  var escorrecta3 = [];
  for (i = 0; i < f.color3.length; i++) {  //"color" es el nombre asignado a todos los checkbox
   if (f.color3[i].checked) {
    escorrecta3[i]=false;     
    for (j = 0; j < respuestasCheckbox3.length; j++) {
     if (i==respuestasCheckbox3[j]) escorrecta3[i]=true;
    }
    //si es correcta sumamos y ponemos mensaje, si no es correcta restamos y ponemos mensaje.
    if (escorrecta3[i]) {
     nota +=1.0/respuestasCheckbox3.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("Pregunta 9: Correcte!");
        darRespuestaHtml("A 2008 es va llançar el primer article per Satoshi Nakamoto, per després un any més tard presentar el programari Bitcoin");    
    } else {
     nota -=1.0/respuestasCheckbox3.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("Pregunta 9: Incorrecte");
    }   
   } 
  }
}
function corregirSelect2(){
  //Compara el índice seleccionado con el valor del íncide que hay en el xml (<answer>2</answer>)
  //para implementarlo con type radio, usar value para enumerar las opciones <input type='radio' value='1'>...
  //luego comparar ese value con el value guardado en answer
  var sel2 = formElement.elements[21];  
  if (sel2.selectedIndex-1==respuestaSelect2) { //-1 porque hemos puesto una opción por defecto en el select que ocupa la posición 0
   darRespuestaHtml("Pregunta 10: Correcte!");
      darRespuestaHtml("La decisió de mantenir un límit tan petit ha estat controversial i ha provocat l'aparició d'altres monedes com Bitcoin Cash amb uns blocs més grans");
   nota +=1;
  }
  else darRespuestaHtml("Pregunta 10: Incorrecte");
}
//****************************************************************************************************
// poner los datos recibios en el HTML
function ponerDatosInputHtml(t){
 document.getElementById("tituloInput").innerHTML = t;
}
function ponerDatosInputHtml2(t){
 document.getElementById("tituloInput2").innerHTML = t;
}
function ponerDatosInputHtml1(t){
 document.getElementById("tituloInput1").innerHTML = t;
}
function ponerDatosSelectHtml(t,opt){
  document.getElementById("tituloSelect").innerHTML=t;
  var select = document.getElementsByTagName("select")[0];
  for (i = 0; i < opt.length; i++) { 
    var option = document.createElement("option");
    option.text = opt[i];
    option.value=i+1;
    select.options.add(option);
 }  
}
function ponerDatosSelectHtml1(t,opt){
  document.getElementById("tituloSelect1").innerHTML=t;
  var select1 = document.getElementsByTagName("select")[1];
  for (i = 0; i < opt.length; i++) { 
    var option = document.createElement("option");
    option.text = opt[i];
    option.value=i+1;
    select1.options.add(option);
 }  
}
function ponerDatosCheckboxHtml(t,opt){
 var checkboxContainer=document.getElementById('checkboxDiv');
 document.getElementById('tituloCheckbox').innerHTML = t;
 for (i = 0; i < opt.length; i++) { 
    var input = document.createElement("input");
    var label = document.createElement("label");
    label.innerHTML=opt[i];
    label.setAttribute("for", "color_"+i);
    input.type="checkbox";
    input.name="color";
    input.id="color_"+i;;    
    checkboxContainer.appendChild(input);
    checkboxContainer.appendChild(label);
    checkboxContainer.appendChild(document.createElement("br"));
 }  
}

function ponerDatosCheckboxHtml1(t,opt){
 var checkboxContainer1=document.getElementById('checkboxDiv1');
 document.getElementById('tituloCheckbox1').innerHTML = t;
 for (i = 0; i < opt.length; i++) { 
    var input = document.createElement("input");
    var label = document.createElement("label");
    label.innerHTML=opt[i];
    label.setAttribute("for", "color1_"+i);
    input.type="checkbox";
    input.name="color1";
    input.id="color1_"+i;;    
    checkboxContainer1.appendChild(input);
    checkboxContainer1.appendChild(label);
    checkboxContainer1.appendChild(document.createElement("br"));
 }  
}
 function ponerDatosCheckboxHtml2(t,opt){
 var checkboxContainer2=document.getElementById('checkboxDiv2');
 document.getElementById('tituloCheckbox2').innerHTML = t;
 for (i = 0; i < opt.length; i++) { 
    var input = document.createElement("input");
    var label = document.createElement("label");
    label.innerHTML=opt[i];
    label.setAttribute("for", "color2_"+i);
    input.type="checkbox";
    input.name="color2";
    input.id="color2_"+i;;    
    checkboxContainer2.appendChild(input);
    checkboxContainer2.appendChild(label);
    checkboxContainer2.appendChild(document.createElement("br"));
 }  
}
function ponerDatosCheckboxHtml3(t,opt){
 var checkboxContainer3=document.getElementById('checkboxDiv3');
 document.getElementById('tituloCheckbox3').innerHTML = t;
 for (i = 0; i < opt.length; i++) { 
    var input = document.createElement("input");
    var label = document.createElement("label");
    label.innerHTML=opt[i];
    label.setAttribute("for", "color3_"+i);
    input.type="checkbox";
    input.name="color3";
    input.id="color3_"+i;;    
    checkboxContainer3.appendChild(input);
    checkboxContainer3.appendChild(label);
    checkboxContainer3.appendChild(document.createElement("br"));
 }  
}
function ponerDatosSelectHtml2(t,opt){
  document.getElementById("tituloSelect2").innerHTML=t;
  var select2 = document.getElementsByTagName("select")[2];
  for (i = 0; i < opt.length; i++) { 
    var option = document.createElement("option");
    option.text = opt[i];
    option.value=i+1;
    select2.options.add(option);
 }  
}
//****************************************************************************************************
//Gestionar la presentación de las respuestas
function darRespuestaHtml(r){
 var p = document.createElement("p");
 var node = document.createTextNode(r);
 p.appendChild(node);
 document.getElementById('resultadosDiv').appendChild(p);
}

function presentarNota(){
   darRespuestaHtml("Nota: "+nota+" punts sobre 10");
}

function inicializar(){
   document.getElementById('resultadosDiv').innerHTML = "";
   nota=0.0;
}

//Comprobar que se han introducido datos en el formulario
function comprobar(){
   var f=formElement;
   var checked=false;
   var checked1=false;
   var checked2=false;
   var checked3=false;
   for (i = 0; i < f.color.length; i++) {  //"color" es el nombre asignado a todos los checkbox
      if (f.color[i].checked) checked=true;
   }
 for (i = 0; i < f.color1.length; i++) {  //"color" es el nombre asignado a todos los checkbox
      if (f.color1[i].checked) checked1=true;
   }
  for (i = 0; i < f.color2.length; i++) {  //"color" es el nombre asignado a todos los checkbox
      if (f.color2[i].checked) checked2=true;
   }
   for (i = 0; i < f.color3.length; i++) {  //"color" es el nombre asignado a todos los checkbox
      if (f.color3[i].checked) checked3=true;
   }
 
   
    if (f.elements[4].value=="") {
    f.elements[4].focus();
    alert("Escriu un nom");
    return false;
   } else if (f.elements[1].selectedIndex==0) {
    f.elements[1].focus();
    alert("Selecciona una opció");
    return false;
   } else if (f.elements[15].selectedIndex==0) {
    f.elements[1].focus();
    alert("Selecciona una opció (2)");
    return false; 
    } else if (f.elements[21].selectedIndex==0) {
    f.elements[1].focus();
    alert("Selecciona una opció (3)");
    return false; 
   } if (!checked) {    
    document.getElementsByTagName("h3")[2].focus();
    alert("Selecciona una opció del checkbox");
    return false;
    } if (!checked1) {    
    document.getElementsByTagName("h3")[3].focus();
    alert("Selecciona una opció del checkbox(2)");
    return false;
    } if (!checked2) {    
    document.getElementsByTagName("h3")[5].focus();
    alert("Selecciona una opció del checkbox(3)");
    return false;
    } if (!checked3) {
    document.getElementsByTagName("h3")[8].focus();
    alert("Selecciona una opció del checkbox(4)");
    return false;
    } else  return true;
}
