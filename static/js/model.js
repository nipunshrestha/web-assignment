export {Model};

/* 
 * Model class to support the Citizen Science application
 * this class provides an interface to the web API and a local
 * store of data that the application can refer to.
 * The API generates two different events:
 *   "modelChanged" event when new data has been retrieved from the API
 *   "observationAdded" event when a request to add a new observation returns
*/

const Model = {

    observations_url: '/api/observations', 
    users_url:  '/api/users',   
    
    // this will hold the data stored in the model
    data: {
        observations: [],
        users: []
    },

    // update_users - retrieve the latest list of users 
    //    from the server API
    // when the request is resolved, creates a "modelUpdated" event 
    // with the model as the event detail
    update_users: function() {
        fetch(this.users_url)
        .then(
            function(response) {
                return response.json();
            }
        )
        .then(
            (data) => {
                this.data.users = data;
                let event = new CustomEvent("modelUpdated",{detail:this});
                window.dispatchEvent(event);
            }
        );
    },

    // update_observations - retrieve the latest list of observations
    //   from the server API
    // when the request is resolved, creates a "modelUpdated" event 
    // with the model as the event detail
    update_observations: function() {
        fetch(this.observations_url)
        .then(
            function(response) {
                return response.json();
            }
        )
        .then(
            (data) => {
                this.data.observations = data;
                let event = new CustomEvent("modelUpdated",{detail:this});
                window.dispatchEvent(event);
            }
        );
    },

    // get_observations - return an array of observation objects
    get_observations: function() {
        return this.data.observations;
    },

    // get_observation - return a single observation given its id
    get_observation: function(observationid) {
        let observationget = this.get_observations();
       
        for(let i=0; i < observationget.length ; i++){
            
            if(observationget[i].id== observationid){
                
                return observationget[i];
            }
        }
        return null;
    },
 
    set_observations: function(observations) {
        this.data.observations = observations;
    },

    // add_observation - add a new observation by submitting a request
    //   to the server API
    //   formdata is a FormData object containing all fields in the observation object
    // when the request is resolved, creates an "observationAdded" event
    //  with the response from the server as the detail
    add_observation: function(formdata) {
        fetch(this.observations_url, {
            method : "POST",
            body: formdata
        })
        .then((response) => {
                return response.json();
        })

        .then((formdata) => {

                let event = new CustomEvent("observationAdded",{detail:formdata});
                window.dispatchEvent(event);
            }
        );
        
    },

    // get_user_observations - return just the observations for
    //   one user as an array
    get_user_observations: function(userid) {
        let observationget = this.get_observations();

        function compare( a, b){
            if(a.timestamp < b.timestamp){
                return 1;
        // a should come after b in the sorted order
            }else if(a.timestamp > b.timestamp){
                return -1;
        // and and b are the same
            }else{
                return 0;
        }
        }
        let userobserve =[] ;
        for(let i=0; i < observationget.length ; i++){
            if(observationget[i].participant == userid){
                userobserve.push(observationget[i]);
            }
        }
        
        userobserve.sort(compare);

        return userobserve;
    },

    // get_recent_observations - return the N most recent
    //  observations, ordered by timestamp, most recent first
    get_recent_observations: function(N) {
        let observationget = this.get_observations();
        let recentobserve = [];

        for(let i = 0 ; i < observationget.length; i++){
            var startTime = new Date(observationget[i].timestamp);
            startTime =   new Date( startTime.getTime() + ( startTime.getTimezoneOffset() * 60000 ) );
            observationget[i].timestamp = startTime;
            recentobserve[i]=observationget[i];
        }
        
        function compare( a, b){
            if(a.timestamp < b.timestamp){
                return 1;
        // a should come after b in the sorted order
            }else if(a.timestamp > b.timestamp){
                return -1;
        // and and b are the same
            }else{
                return 0;
        }
        }

        let mostrecent =[];
        recentobserve.sort(compare);
        
        for( let i = 0 ; i < N ; i++){

            mostrecent[i]=recentobserve[i];
        //    console.log(mostrecent[i].timestamp.toDateString());
        }
        
        return mostrecent;
    },

    /* 
    * Users
    */
    // get_users - return the array of users
    get_users: function() {
       
        return this.data.users;
    },

    // set_users - set the array of users
    set_users: function(users) {
        this.data.users = users;
    },
    
    // get_user - return the details of a single user given 
    //    the user id
    get_user: function(userid) {
        let userget = this.get_users() ;
    
        
        for(let i=0 ; i < userget.length ; i++){
            if(userget[i].id == userid){
                return userget[i];
            }
            
        }
        return null;
    },

    get_user_leaderboard: function(N){
        let userlist = this.get_users();
        let oberservationlist = this.get_observations();
        let leaderboard=[];
       
        for( let i = 0 ; i < userlist.length ; i++){
            let count=0;
            for(let j = 0 ; j < oberservationlist.length; j++){
                if(userlist[i].id == oberservationlist[j].participant){
                    count++;
                }
            }
            leaderboard.push([(userlist[i].id) , count]);
        }
        function compare( a, b){
            if(a[1] < b[1]){
                return 1;
        // a should come after b in the sorted order
            }else if(a[1] > b[1]){
                return -1;
        // and and b are the same
            }else{
                return 0;
         }
        }

        leaderboard.sort(compare);
   
        let leaderboardtopN =[];

        for(let k = 0; k < N ; k++){
            
           let getuserid = this.get_user(leaderboard[k][0]);
           leaderboardtopN.push(getuserid);
        }

        return leaderboardtopN;
       

    }

};
