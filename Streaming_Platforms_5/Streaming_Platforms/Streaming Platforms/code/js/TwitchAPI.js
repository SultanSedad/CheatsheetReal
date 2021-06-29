function GetGames(){
    const req = new XMLHttpRequest();
        req.responseType = 'json';
        req.open('GET', 'https://api.twitch.tv/helix/games/top');
        req.setRequestHeader('Client-ID', '3opp48nn628xj098cukjx37sbidlq4');
    req.setRequestHeader('Authorization', 'Bearer ' + GetToken());
        req.onload = () => {  var data = req.response;
            
    
            


            var element = document.getElementById('searchresults');
   element.innerHTML = '';

   var newData = JSON.parse(JSON.stringify(data));

   for(var i = 0;i < 20;i++)
   {
     var result = document.querySelector('#s_result').cloneNode(true);
     var text = newData.data[i].box_art_url.replace("{width}x{height}" , "180x240");

     result.querySelector('#s_cover').src = text;
     result.querySelector('#s_title').innerHTML = newData.data[i].name;
     if(i == 0)
    {
        result.querySelector('#s_description').innerHTML = "<h4>" + "♕ Rank: #" + (i + 1) + "</h4>";
    }
    else
    {
        result.querySelector('#s_description').innerHTML = "<h4>" + "Rank: #" + (i + 1) + "</h4>";
    }
     result.querySelector('#s_id').innerHTML = "Game ID: " + newData.data[i].id;

     element.appendChild(result);
   }
     }
    
     req.send();
    
    }

    function GetClips(){
        const req = new XMLHttpRequest();
            req.open('GET', 'https://api.twitch.tv/helix/games/top');
            req.setRequestHeader('Client-ID', '3opp48nn628xj098cukjx37sbidlq4');
        req.setRequestHeader('Authorization', 'Bearer ' + GetToken());
            req.onload = () => {  var data = req.responseText;
                
                var newData = JSON.parse(data);
                
                var element = document.getElementById('searchresults3');
                element.innerHTML = '';

                for(var x = 0; x < 5; x++)
                {
                    var clips = GetClipsProfi(newData.data[x].id);  

                    var node = document.createElement("h2");

                    node.innerHTML = GetGameName(newData.data[x].id);

                    node.style.margin = "2em";

                    node.style.color = "#92e7fc";

                    element.appendChild(node);

                    for(var i = 0; i < 5; i++)
                    {
                        var result = document.querySelector('#s_result').cloneNode(true);

                        console.log(clips.data[i].embed_url);

                        result.querySelector('#s_cover').src = clips.data[i].thumbnail_url;
                        result.querySelector('#s_title').innerHTML = clips.data[i].title;
                        result.querySelector('#s_description').innerHTML =  "<h4>"+ 'Streamer: ' + clips.data[i].broadcaster_name + '</br>' + 'Viewed: ' + clips.data[i].view_count + '</br>' + '<a href="'+clips.data[i].url+'">Link</a>' + "</h4>";
                        result.querySelector('#s_id').innerHTML = "Clip ID: " + clips.data[i].id;

                        element.appendChild(result);
                    }
                }
         }
        
         req.send();
        
        }


    
        function GetClipsProfi(id){
    
            const req = new XMLHttpRequest();
            req.open('GET', 'https://api.twitch.tv/helix/clips?game_id=' + id + "&first=5", false);
            req.setRequestHeader('Client-ID', '3opp48nn628xj098cukjx37sbidlq4');
        req.setRequestHeader('Authorization', 'Bearer ' + GetToken());
        
        req.send();
        var data = JSON.parse(req.responseText);
        

        return data;
            
        }

        function GetGameName(id){
    
            const req = new XMLHttpRequest();
            req.open('GET', 'https://api.twitch.tv/helix/games?id=' + id, false);
            req.setRequestHeader('Client-ID', '3opp48nn628xj098cukjx37sbidlq4');
        req.setRequestHeader('Authorization', 'Bearer ' + GetToken());
        
        req.send();
        var data = JSON.parse(req.responseText);
        

        return data.data[0].name;
            
        }
    



    
    function GetMostWatchedStreamer(){
    const req = new XMLHttpRequest();
        req.responseType = 'json';
        req.open('GET', 'https://api.twitch.tv/helix/streams');
        req.setRequestHeader('Client-ID', '3opp48nn628xj098cukjx37sbidlq4');
    req.setRequestHeader('Authorization', 'Bearer ' + GetToken());
        req.onload = () => {  var data = req.response;
            
    
            var element = document.getElementById('searchresults2');
   element.innerHTML = '';
    
            var newData = JSON.parse(JSON.stringify(data));
    
            /* user_name , game_name , user_id , user_login , viewer_count */
    
            for(var x = 0; x < newData.data.length; x++)
            {
                var result = document.querySelector('#s_result').cloneNode(true);

                result.querySelector('#s_cover').src = GetProfileInfo(newData.data[x].user_login);
                result.querySelector('#s_title').innerHTML = newData.data[x].user_name;
               if(x == 0)
                {
                    result.querySelector('#s_description').innerHTML = "<h4>"+ "♕ Rank: #" + (x + 1) + "</br>" + "Viewer: " + newData.data[x].viewer_count + "</br>" + "Game: " + newData.data[x].game_name + "</br>" + "Language: " + newData.data[x].language + "</br>" + "Follower: " + GetFollower(newData.data[x].user_id) + "</h4>";
                }
                else
                {
                    result.querySelector('#s_description').innerHTML =  "<h4>"+ "Rank: #" + (x + 1) + "</br>" + "Viewer: " + newData.data[x].viewer_count + "</br>" + "Game: " + newData.data[x].game_name + "</br>" + "Language: " + newData.data[x].language + "</br>" + "Follower: " + GetFollower(newData.data[x].user_id) + "</h4>";
                }
                result.querySelector('#s_id').innerHTML = "Streamer ID: " + newData.data[x].user_id;

                element.appendChild(result);
    
            }
    
     }
    
     req.send();
    
    }
    
    function GetFollower(id){
        const req = new XMLHttpRequest();
        req.open('GET', 'https://api.twitch.tv/helix/users/follows' + "?to_id="+ id , false);
        req.setRequestHeader('Client-ID', '3opp48nn628xj098cukjx37sbidlq4');
    req.setRequestHeader('Authorization', 'Bearer ' + GetToken());
    
    
     req.send();
     var data = JSON.parse(req.responseText);
    
     return data.total;
    }
    
    function GetProfileInfo(id){
    
        const req = new XMLHttpRequest();
        req.open('GET', 'https://api.twitch.tv/helix/users?login=' + id , false);
        req.setRequestHeader('Client-ID', '3opp48nn628xj098cukjx37sbidlq4');
    req.setRequestHeader('Authorization', 'Bearer ' + GetToken());
    
    req.send();
    var data = JSON.parse(req.responseText);
    
    return data.data[0].profile_image_url;
        
    }


    function GetToken(){
    
        var oReq = new XMLHttpRequest();
        oReq.open("POST",'https://id.twitch.tv/oauth2/token?client_id=3opp48nn628xj098cukjx37sbidlq4&client_secret=jg57u1pk6sghlx52hvrsaq7vox2y4n&grant_type=client_credentials', false);
        oReq.send();
        var token = JSON.parse(oReq.response);
        return token.access_token;
    }