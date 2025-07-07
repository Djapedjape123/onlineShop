import axios from "axios";

class CategoryProducts {
    static getAllCategory = () => axios.get('/products/category-list')
}

export default CategoryProducts