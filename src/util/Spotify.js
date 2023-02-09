

const Client_ID = "5183130253f64e02ad6c36420f78e672";
const redirect_URI = "https://jammmingbranel.surge.sh"/*"http://localhost:3000/"*/;

let accessToken = "";

const Spotify ={

    getAccessToken(){

        if (accessToken){
            //window.alert("holu" + accessToken.substring(13))
            return accessToken
        }if (window.location.href.match(/access_token=([^&]*)/) && window.location.href.match(/expires_in=([^&]*)/)) {
            accessToken = window.location.href.match(/access_token=([^&]*)/)[0].substring(13);
            let expiresIn = window.location.href.match(/expires_in=([^&]*)/)[0].substring(11);
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            //window.alert("este" + accessToken)
        }else{
            //window.alert("hoolu?")
            window.location = (`https://accounts.spotify.com/authorize?client_id=${Client_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect_URI}`);
            //window.alert("hoolu ya?")
            this.getAccessToken();
        }
    },
    async search (term) {
        this.getAccessToken();
        const wordQuery = term;
        const dataMuseUrl = `https://api.spotify.com/v1/search?`;
        const queryParams = `type=track&q=`
        const endpoint = `${dataMuseUrl}${queryParams}${wordQuery}`;
        console.log(endpoint)
        try {
            const response = await fetch(endpoint, { headers: {Authorization: `Bearer ${accessToken}`}});
            //console.log(response)
            if(response.ok){
                //console.log("hoklu1")
                const jsonResponse = await response.json();
                //console.log(jsonResponse);
                return jsonResponse;
            }else{
                console.log("error")
                
            }
        }catch (error) {
            //console.log("hoklu2")
            console.log(error);
            
        }
        //console.log("hoklu3")
        },

    async savePlaylist(name, uriarray){
        let accessTokenin = accessToken;
        let headersOb = {Authorization: `Bearer ${accessTokenin}`};
        let userId= "";
        let playId="";
        try{
            const userIdReq = await fetch("https://api.spotify.com/v1/me", { headers: headersOb});
            if(userIdReq.ok){
                //console.log("hoklu1")
                const jsonRes = await userIdReq.json();
                //console.log(jsonResponse);
                userId = jsonRes.id;
                try{

                    const plistReq = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, { 
                        method: 'POST',
                        headers: headersOb,
                        body: JSON.stringify({
                            name: `${name}`,
                            description: `Description ${name}`,
                            public: true
                        })   
                    });
                    if (plistReq.ok){
                        const jsonplist = await plistReq.json();
                        playId = jsonplist.id;
                        try{
                            const saveplistreq = fetch(`https://api.spotify.com/v1/playlists/${playId}/tracks?uris=${uriarray}`,{
                                method: 'POST',
                                headers: headersOb
                            });
                            if (saveplistreq.ok){
                                const jsonslist = await saveplistreq.json();
                                playId = jsonslist["snapshot_id"];
                            }
                        }catch(erno){
                            console.log(erno)
                        }
                    }
                }catch(err){
                    console.log(err)
                }
            }else{
                console.log("error")
            }
        }catch(error){
            console.log(error);
        }
        

        }
          
    }
//console.log(Spotify.getAccessToken())
//Spotify.search("dua lipa").then(data => console.log(data.tracks))

export {Spotify};