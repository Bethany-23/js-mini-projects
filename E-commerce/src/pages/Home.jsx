import { useState, useEffect } from "react";

import {ItemCard} from "../components/ItemCard.jsx"

function Home (){

    const [Loading, setLoading] = useState(false)
    const [products, setProducts] = useState([])

    useEffect(() =>{
        const getProducts = async()=>{
            setLoading(true);
            const result = fetchItems(item)
            setProducts(result);
            setLoading(false)

        };
        getProducts();
    })
    return(
        <>
        <h1> Hello</h1>
        {loading ? (<p>fetching Items</p>): ({products.map((product)=>(<ItemCard key= {product.id} item = {product}/>))})}
        </>
    )
}

export default Home;