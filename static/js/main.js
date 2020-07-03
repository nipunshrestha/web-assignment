
import * as views from './views.js';
import {Model} from './model.js';
import {split_hash} from './util.js';



window.addEventListener("modelUpdated", function(e) {
    
    var hash = split_hash(window.location.hash);
    let userlistleader = Model.get_user_leaderboard(10);
    let allusers = Model.get_users();
    let allobservations = Model.get_observations();
    let recentobservation = Model.get_recent_observations(10);

     if(hash.path=="observations" && hash.id == null){ //update page for displaying all the list of observation
        views.recentObservationView("target", allobservations); 
        views.recentObservationView("current", recentobservation);
        views.userlist("userlist",userlistleader); 
        views.header_name("header_observation", "Observation List" )
        
    }

    else if(hash.path=="observations"){//update page for displaying single observation

        let singleobeservation = Model.get_observation(hash.id);
        views.singleObservationView("target", singleobeservation);    
        views.userlist("userlist",userlistleader); 
        views.recentObservationView("current", recentobservation);
           
    }

    else if(hash.path=="users" && hash.id == null){ //update page for displaying all the list of users
        views.userlist("target",allusers);
        views.userlist("userlist",userlistleader);
        views.header_name("header_user", "User List" )
        views.recentObservationView("current", recentobservation);
        views.userlist("userlist",userlistleader);
      
    }

    else if(hash.path=="users"){ //update page for displaying single user
        let usersingle = Model.get_user(hash.id);
        let userobservationlist = Model.get_user_observations(hash.id);
        views.singleUserView("target",usersingle);
        views.create_div("list_observation","target",userobservationlist);
        views.recentObservationView("current", recentobservation);
        views.userlist("userlist",userlistleader);
    }

    else if(hash.path == "submit"){ //update page for displaying submit page
    
        views.generate_form("target");
        let validform = document.getElementById("observationform");
        validform.onsubmit= observation_form_handler;
        views.recentObservationView("current", recentobservation);
        views.userlist("userlist",userlistleader);
       
    }

    else  { //update page for displaying the main page
        
        views.home_page();
        views.recentObservationView("current", recentobservation);
        views.userlist("userlist",userlistleader);
       
    }

});


function observation_form_handler(){ // excute when the registration button is pressed
    let formdata = new FormData(this);
    Model.add_observation(formdata); //add the form data to the api
    return false;

}




window.addEventListener("observationAdded", function(e) {
    // console.log(e.detail.errors);
 if(e.detail.status == "success"){// upadate the page to the user when the form is submitted 
    location.replace("/#!/users/"+e.detail.observation.participant);
 }
 if(e.detail.status=="failed"){
   views.form_errors(e.detail.errors);
 }
});




function redraw() { 
    // update the page
    
    document.getElementById("logo").onclick = function(){
        location.replace("/");
    }
    Model.update_users();
    Model.update_observations();
}




window.onload = function() {
    redraw();
};

window.onhashchange= redraw;
