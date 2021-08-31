const clientId = "0917ebef49324a5a9dc234ddce014ca8"
// const redirectUri = encodeURIComponent("https://spotify-wc-playlist-manager.web.app/")
const redirectUri = encodeURIComponent("http://localhost:3000/")
const scopes = encodeURIComponent("user-read-private user-read-email playlist-modify-public")

let accessToken

const Spotify = {
    getAccessToken : () => {
        if(accessToken){
            return accessToken
        }

        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/)
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/)
        if(accessTokenMatch && expiresInMatch){
            accessToken = accessTokenMatch[1]
            const expiresIn = Number(expiresInMatch[1])
            window.setTimeout(() => (accessToken = ""), expiresIn * 1000)
            window.history.pushState("Access Token", null,'/create')
            return accessToken
        }else{
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes}&response_type=token`
            window.location = accessUrl
        }
    },
    getUserId: () => {
        const accessToken = Spotify.getAccessToken()
        const headers = { Authorization: `Bearer ${accessToken}` }
        return fetch("https://api.spotify.com/v1/me", { headers: headers })
        .then(response => response.json())
        .then(jsonResponse => {            
            if (jsonResponse) {
                const { id, display_name, email, external_urls, images } = jsonResponse
                const profile = {
                    user_id: id,
                    email: email,
                    name: display_name,
                    image: images[0].url,
                    url: external_urls.spotify
                }
                return profile
            }
        })
    },
    search : (term) => {
        const accessToken = Spotify.getAccessToken()
        const headers = {Authorization: `Bearer ${accessToken}`}
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {headers: headers})
        .then(response => { return response.json() })
        .then(jsonResponse => {
            if (!jsonResponse.tracks) {
                return []
            }
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                image: track.album.images[1].url,
                uri: track.uri
            }))
        })
    },
    savePlaylist: (name, trackUris) => {
        if(!name || !trackUris.length){
            return 
        }
        const accessToken = Spotify.getAccessToken()
        const headers = {Authorization: `Bearer ${accessToken}`}
        let userId

        return fetch("https://api.spotify.com/v1/me", {headers: headers})
        .then(response => response.json())
        .then(jsonResponse => {
            userId = jsonResponse.id
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                headers: headers,
                method: "POST",
                body: JSON.stringify({name: name})
            })
            .then(response => response.json())
            .then(jsonResponse => {
                const playlistId = jsonResponse.id 
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
                    headers: headers,
                    method: "POST",
                    body: JSON.stringify({uris: trackUris})
                })
            })
        })
    }
}


export default Spotify


