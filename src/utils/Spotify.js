const clientId = "YOUR-SPOTIFY-CLIENT-ID"
const redirectUri = encodeURIComponent("http://localhost:3000")
const scopes = encodeURIComponent("user-read-private user-read-email playlist-modify-public")

let accessToken

const Spotify = {
    getAccessToken : () => {
        if(localStorage.getItem('accessToken')){
            return JSON.parse(localStorage.getItem('accessToken'))
        }
        accessToken = window.location.hash
        .substring(1)
        .split('&')
        .reduce((initial, item) => {
            let parts = item.split('=')
            initial[parts[0]] = decodeURIComponent(parts[1])
            return initial
        }, {}).access_token
        if (accessToken) {            
            localStorage.setItem('accessToken', JSON.stringify(accessToken))
            return accessToken
        }
        else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes}&response_type=token`
            window.location = accessUrl
        }
    },
    getUserId: () => {
        accessToken = Spotify.getAccessToken()
        if (accessToken) {
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
        }
    },
    search : (term) => {
        accessToken = Spotify.getAccessToken()
        if (accessToken) {
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
        }
    }
}


export default Spotify


