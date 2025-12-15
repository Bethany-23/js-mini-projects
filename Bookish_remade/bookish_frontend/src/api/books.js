import axios from "axios";

export const addBook = (date) =>{
    return api.post("/books",data)
}

export const getBook =(data) =>{
    return api.get("/books")
};

export const updateBook = (id, data) =>{
    return api.put(`/books/${id}`, data)
};
export const deleteBook = (id) =>{
    return api.delete(`/books/${id}`)
}