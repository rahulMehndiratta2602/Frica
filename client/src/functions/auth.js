const axios = require("axios")

export const createOrUpdateUser = async (authToken) => {
    return await axios.post(`${process.env.REACT_APP_API}/users/createOrUpdateUser`, {}, {
        headers: {
            authToken
        }
    })
}

export const getCurrentUser = async (authToken) => {
    // console.log("getCurrentUser----->", authToken)
    return await axios.post(`${process.env.REACT_APP_API}/users/getMe`, {}, {
        headers: {
            authToken
        }
    })
}
export const currentAdmin = async (authToken) => {
    return await axios.post(`${process.env.REACT_APP_API}/users/isAdmin`, {}, { headers: { authToken } })
}