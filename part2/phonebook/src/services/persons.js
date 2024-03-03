import axios from 'axios'

const baseUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (newData) => {
    const request = axios.post(baseUrl, newData)
    return request.then(response => response.data)
}

const update = (id, newData) => {
    const request = axios.put(`${baseUrl}/${id}`, newData)
    return request.then(response => response.data)
}

const deletePerson = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

export default { getAll, create, update, deletePerson }