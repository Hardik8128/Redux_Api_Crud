import axios from "axios"
import { Get } from "../types/Type"

export const getData = () => {
    return (dispatch) =>
        axios.get('https://student-api.mycodelibraries.com/api/user/get').then((res) => {
            dispatch({ type: Get, data: res.data.data })
        })
}

export const addData = (formData) => {
    return (dispatch) =>
        axios.post('https://student-api.mycodelibraries.com/api/user/add', formData).then((res) => {
            dispatch(getData());
        })
}

export const editData = (formData) => {
    return (dispatch) =>
        axios.post('https://student-api.mycodelibraries.com/api/user/update', formData).then((res) => {
            dispatch(getData())
        })
}

export const deleteData = (id) => {
    return (dispatch) =>
        axios.delete(`https://student-api.mycodelibraries.com/api/user/delete?id=${id}`).then((res) =>{
            dispatch(getData());
})
}
