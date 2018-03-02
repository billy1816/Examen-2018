var formElement=null;
var numeroSecreto=null;
var nombreSecreto=null;
var respuestaSelect=null;
var respuestasCheckbox = [];
var respuestasCheckbox1 = [];
var respuestasCheckbox2 = [];
var respuestasMultiple = [];
var nota = 0;  //nota de la prueba sobre 3 puntos (hay 3 preguntas)

//**************************************************************************************************** 
//Después de cargar la página (onload) se definen los eventos sobre los elementos entre otras acciones.
window.onload = function(){ 

 //CORREGIR al apretar el botón
 formElement=document.getElementById('myform');
 formElement.onsubmit=function(){
   inicializar();
   if (comprobar()){
    corregirNumber();
    corregirSelect();
    corregirCheckbox();
    corregirCheckbox1();
    corregirNombre();
    corregirCheckbox2();
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
}
//****************************************************************************************************
//implementación de la corrección

function corregirNumber(){
  //Vosotros debéis comparar el texto escrito con el texto que hay en el xml
  //en este ejemplo hace una comparación de números enteros
  var s=formElement.elements[0].value;     
  if (s==numeroSecreto) {
   darRespuestaHtml("Pregunta 1: Exacte!");
   nota +=1;
  }
  else {
    if (s>numeroSecreto) darRespuestaHtml("Pregunta 1: T'has passat");
    else darRespuestaHtml("Pregunta 1: T'has quedat curt");
  }
}


function corregirSelect(){
  //Compara el índice seleccionado con el valor del íncide que hay en el xml (<answer>2</answer>)
  //para implementarlo con type radio, usar value para enumerar las opciones <input type='radio' value='1'>...
  //luego comparar ese value con el value guardado en answer
  var sel = formElement.elements[1];  
  if (sel.selectedIndex-1==respuestaSelect) { //-1 porque hemos puesto una opción por defecto en el select que ocupa la posición 0
   darRespuestaHtml("Pregunta 2: Correcte");
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
     darRespuestaHtml("P3: "+i+" Correcte");    
    } else {
     nota -=1.0/respuestasCheckbox.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("P3: "+i+" Incorrecte");
    }   
   } 
  }
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
     darRespuestaHtml("P4: "+i+" Correcte");    
    } else {
     nota -=1.0/respuestasCheckbox1.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("P4: "+i+" Incorrecte");
    }   
   } 
  }
}
function corregirNombre(){
  //Vosotros debéis comparar el texto escrito con el texto que hay en el xml
  //en este ejemplo hace una comparación de números enteros
  var s= xmlDoc.getElementById("text").getElementsByTagName("input")[0].innerHTML;
  if (s==nombreSecreto) {
   darRespuestaHtml("Pregunta 1: Exacte!");
   nota +=1;
  }
  else {
    darRespuestaHtml("Pregunta 1: T'has quedat curt");
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
     darRespuestaHtml("P6: "+i+" Correcte");    
    } else {
     nota -=1.0/respuestasCheckbox2.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("P6: "+i+" Incorrecte");
    }   
   } 
  }
}

//****************************************************************************************************
// poner los datos recibios en el HTML
function ponerDatosInputHtml(t){
 document.getElementById("tituloInput").innerHTML = t;
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
//****************************************************************************************************
//Gestionar la presentación de las respuestas
function darRespuestaHtml(r){
 var p = document.createElement("p");
 var node = document.createTextNode(r);
 p.appendChild(node);
 document.getElementById('resultadosDiv').appendChild(p);
}

function presentarNota(){
   darRespuestaHtml("Nota: "+nota+" puntos sobre 6");
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
   for (i = 0; i < f.color.length; i++) {  //"color" es el nombre asignado a todos los checkbox
      if (f.color[i].checked) checked=true;
   }
 for (i = 0; i < f.color1.length; i++) {  //"color" es el nombre asignado a todos los checkbox
      if (f.color1[i].checked) checked1=true;
   }
  for (i = 0; i < f.color2.length; i++) {  //"color" es el nombre asignado a todos los checkbox
      if (f.color2[i].checked) checked2=true;
   }

 
   
    if (f.elements[4].value=="") {
    f.elements[4].focus();
    alert("Escriu un nom");
    return false;
   } else if (f.elements[1].selectedIndex==0) {
    f.elements[1].focus();
    alert("Selecciona una opció");
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
    } else  return true;
}
