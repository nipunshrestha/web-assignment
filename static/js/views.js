export { recentObservationView ,singleObservationView, userlist , singleUserView, generate_form,header_name,create_div ,home_page,form_errors};

function apply_template(targetid, templateid, data) {

    let target = document.getElementById(targetid);

    let template = Handlebars.compile(
                        document.getElementById(templateid).textContent
                    )
    target.innerHTML = template(data);
}

function singleUserView(targetid, user) {

    apply_template(targetid,"single-users-template", user);
}

function recentObservationView(targetid, observations) {

    apply_template(targetid, "recent-observation-list-template", {'observations': observations});

}
function singleObservationView(targetid, observation) {

    apply_template(targetid,"single-observation-template", observation);
}
function userlist(targetid, user) {

    apply_template(targetid,"users-list-template", {'users':user});
}

function header_name(targetid,name){
    document.getElementById(targetid).innerHTML = name;
}

function create_div(div_id, append_id, userobservationlist){
    document.getElementById("singleuseravatar").style.width = "300px";
    var singleobservl = document.createElement("div");
    singleobservl.id=div_id;
    document.getElementById(append_id).appendChild(singleobservl);
    recentObservationView("list_observation",userobservationlist);
    document.getElementById("header_observation").innerHTML = "List of Observations";
}



function generate_form(targetid){// display the form 

    let content = "<form id= 'observationform' >" ;
    
    content += "<h3>Tree Observation</h3>";

    content += "<div id='form-participant'>";
    content += "<label for='participant-input'>Participant </label>"; 
    content += "<input type='text' name='participant' id='participant-input' > </div>"; 

    content += "<div id='form-location'>"; 
    content += "<label for='location-input'>Location </label>"; 
    content += "<input type='text' name='location' id='location-input'> </div>"; 

    content += "<div id='form-temperature'>"; 
    content += "<label for='temperature-input'>Temperature </label>"; 
    content += "<input type='text' name='temperature' id='temperature-input'> </div>"; 

    content += "<div id='form-weather'>"; 
    content += "<label for='weather-input'>Weather </label>"; 
    content += "<select name='weather' id='weatherSelect'><option>fine</option><option>sunny</option><option>rainy</option><option>stormy</option></select></div> "; 
    
    content += "<div id='form-input'>"; 
    content += "<label for='wind-input'>Wind </label>"; 
    content += "<select name='wind'id='windSelect'><option>none</option><option>light</option><option>medium</option><option>strong</option></select></div> "; 
    
    content += "<h3>About Your Tree </h3>";
    
    content += "<div id='form-height'>"; 
    content += "<label for='height-input'>Tree Height </label>"; 
    content += "<input type='text' name='height' id='height-input'> </div> "; 
    
    content += "<div id='form-girth'>"; 
    content += "<label for='girth-input'>Tree Girth At Base </label>"; 
    content += "<input type='text' name='girth' id='girth-input'> </div> "; 
    
    content += "<div id='form-input'>"; 
    content += "<label for='LSize-input'>Leaf Size </label>"; 
    content += "<select name='leaf_size' id='lsizeSelect'><option>small</option><option>medium</option><option>large</option></select> </div>"; 
    
    content += "<div id='form-input'>"; 
    content += "<label for='LShape-input'>Leaf Shape </label>"; 
    content += "<select name='leaf_shape' id='lshapeSelect'><option>rounded</option><option>pointy</option><option>divided</option></select></div> "; 
    
    content += "<div id='form-input'>"; 
    content += "<label for='BColor-input'>Bark Colour </label>"; 
    content += "<select name='bark_colour' id='bcolorSelect'><option>grey</option><option>brown</option><option>silver</option><option>red</option></select></div> "; 
    
    content += "<div id='form-input'>"; 
    content += "<label for='BTexture-input'>Bark Texture </label>"; 
    content += "<select name='bark_texture' id='btextureSelect'><option>smooth</option><option>spotty</option><option>furry</option><option>crinkles</option><option>peeling</option></select></div> "; 
    
    content += "<div id='form-submit'>";  
    content += "<input type='submit' value='Register' id='for_submit'> </div> </form>";

    document.getElementById(targetid).innerHTML = content;
}

function home_page(){
    let content1= " <h2 >Understanding Our Trees</h2> <p>Although you may think that most Australian trees are Eucalypts, in fact there are a wide variety of species native to this continent. The goal of this project is to help understand the diversity of the population of trees and their distribution across Australia. Citizen Scientists can help by recording observations of trees via the website. </p>";
    content1+= "<h2>What is Citizen Science?</h2>";
    content1+= "<p>Citizen science involves public participation and collaboration in scientific research with the aim to increase scientific knowledge. It’s a great way to harness community skills and passion to fuel the capacity of science to answer our questions about the world and how it works. Have a look at our <a href='https://citizenscience.org.au/10-principles-of-citizen-science/'>10 Principles of Citizen Science</a> to find out more.</p> <p>To be involved in citizen science you don’t need a science degree. Citizen scientists work with scientists or the scientific framework to achieve scientific goals.</p> <p class='attribution'>Text from <a href='https://citizenscience.org.au/who-we-are/'>citizenscience.org.au</a></p>" ;
    document.getElementById("target").innerHTML = content1;
    var citizenimg = document.createElement("img");
    citizenimg.src = "/static/images/pic.png"
    citizenimg.id = "citizenpic"
    document.getElementById("target").appendChild(citizenimg);
}

function form_errors(error){
    var newContent = document.createTextNode(error); 
    document.getElementById("target").appendChild(newContent);
    alert(error);
}