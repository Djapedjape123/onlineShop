import axios from "axios";

class AllProducts {
    static getAllProducts = (limit) => axios.get(`/products?limit=${limit}&skip=70`);
    static getSingleProduct = (id) => axios.get(`/products/${id}`)
    static getAllProductsByCategort = (category) => axios.get(`/products/category/${category}`)
    static getSearchProduct = (search) => axios.get(`/products/search?q=${search}`)
}

export default AllProducts;
