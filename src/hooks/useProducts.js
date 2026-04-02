import { useState, useEffect } from "react";

const useProducts = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchProducts = async() => {
            try{
                const response = await fetch('/products.json')
                const data = await response.json()
                setProducts(Array.isArray(data)? data : [])
            }catch(err){
                setError('Failed to fetch errors')
            }finally{
                setLoading(false)
            }
        }
        fetchProducts();
    },[])

    return {products, loading, error}
}

export default useProducts;