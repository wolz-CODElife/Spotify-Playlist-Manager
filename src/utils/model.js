import faunadb, { query as q } from 'faunadb'
import dotenv from 'dotenv'

dotenv.config()
const client = new faunadb.Client({ secret: "fnAEOiNRmlACC2g3K9YLdtRCRIzt7Je5Sy3EqaES" })

export const createUser = async ({user_id, email, name, image, url}) => {
    try {
        const user = await client.query(
            q.Create(
                q.Collection('users'),
                {
                    data: {user_id, email, name, image, url}
                }
            )
        )
        localStorage.setItem('user', JSON.stringify(user.data))
        return user.data
    } catch (error) {
        return
    }
}

export const getUser = async (user_id) => {
    try {
        const user = await client.query(
            q.Get(
              q.Match(q.Index('user_by_user_id'), user_id)
            )
          )
        localStorage.setItem('user', JSON.stringify(user.data))
        return user.data
    }
    catch (error) {
        return
    }
}

export const savePlaylist = async (user_id, name, tracks) => {
    if(!name || !tracks.length){
        return 
    }
    try {
        const playlists = await client.query(
            q.Create(
                q.Collection('playlists'),
                {
                    data: {user_id, name, tracks}
                }
            )
        )
        return playlists.data
    } catch (error) {
        return
    }
}

export const getPlaylists = async (user_id) => {
    let playlistList = []
    try {
        const playlists = await client.query(
            q.Paginate(
              q.Match(q.Index('playlist_for_user'), user_id)
            )
        )
        for (let playlistID of playlists.data) {
            let playlist = await getPlaylist(playlistID.value.id)
            playlistList.push(playlist)
        }
        return playlistList
    } catch (error) {
        return
    }
}

export const getPlaylist = async (id) => {
    try {
        
        const playlist = await client.query(
            q.Get(q.Ref(q.Collection('playlists'), id))
        )
        playlist.data.id = playlist.ref.value.id
        return playlist.data
    } catch (error) {
        return
    }
}
  
export const deletePlaylist = async (id) => {
    try {   
        const playlist = await client.query(
            q.Delete(
                q.Ref(q.Collection('playlists'), id)
            )
        )
        playlist.data.id = playlist.ref.value.id
        return playlist.data
    } catch (error) {
        return
    }
  }