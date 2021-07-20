import faunadb, { query as q } from 'faunadb'
import dotenv from 'dotenv'

dotenv.config()
const client = new faunadb.Client({ secret: "fnAEOiNRmlACC2g3K9YLdtRCRIzt7Je5Sy3EqaES" })
export const createUser = async (user_id, email, name, image, url) => {
    let data
    try {
        data = await client.query(
            q.Create(
                q.Collection('users'),
                {
                    data: {user_id, email, name, image, url}
                }
            )
        )
        if (data.name === 'BadRequest') return
    } catch (error) {
        return
    }
    const user = data.data
    user.id = data.ref.value.id
    return user
}

export const getUser = async (user_id) => {
    try {
        const user = await client.query(
            q.Get(
                q.Match(q.Index('user_by_user_id'), user_id)
            )
        )
        return user.data
    }
    catch (error) {
        return
    }
}