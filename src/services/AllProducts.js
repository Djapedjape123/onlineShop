import axios from "axios";

class AllProducts {
    static getAllProducts = () => axios.get('/products');
    static getSingleProduct = (id) => axios.get(`/products/${id}`)
}

export default AllProducts;