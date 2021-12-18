import React, {useContext, useState} from 'react'
import {GlobalState} from '../../../GlobalState'
import ProductItem from '../utils/productItem/ProductItem'
import Loading from '../utils/loading/Loading'
import NotFound from '../utils/not_found/NotFound'
import axios from 'axios'
import Filters from './Filters'
import LoadMore from './LoadMore'


function Products() {
    const state = useContext(GlobalState)
    const [products, setProducts] = state.productsAPI.products
    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token
    const [callback, setCallback] = state.productsAPI.callback
    const [loading, setLoading] = useState(false)
    const [isAllCheck, setIsAllCheck] = useState(false)
    const [disabled, setDisabled] = useState(true);

    const handleCheck = (id) =>{
        let atLeastOneChecked = false;
        products.forEach(product => {
            if(product._id === id) {
                product.checked = !product.checked
            }
            if (product.checked===true){
                atLeastOneChecked = true;
            }
        })
        setDisabled(!atLeastOneChecked)
        setProducts([...products])
    }

    const deleteProduct = async(id, public_id) => {
            try {
                setLoading(true)
                const destroyImg = axios.post('/api/destroy', {public_id},{
                    headers: {Authorization: token}
                })
                const deleteProduct = axios.delete(`/api/products/${id}`, {
                    headers: {Authorization: token}
                })

                await destroyImg
                await deleteProduct
                setCallback(!callback)
                setLoading(false)
            } catch (err) {
                alert(err.response.data.msg)
            }
    }

    const checkAll = () =>{
        products.forEach(product => {
            product.checked = !isAllCheck
        })
        setProducts([...products])
        setIsAllCheck(!isAllCheck)
        setDisabled(isAllCheck)
    }

    const deleteAll = () =>{
        if(window.confirm("Do you want to delete products?")){
            products.forEach(product => {
                if(product.checked) deleteProduct(product._id, product.images.public_id)
            })
        }
    }

    if(loading) return <div><Loading /></div>
    return (
        <>
        <Filters />
        
        {
            isAdmin && 
            <div className="delete-all">
                <span>Select all</span>
                <input type="checkbox" checked={isAllCheck} onChange={checkAll} />
                <button disabled={disabled} onClick={deleteAll}>Delete</button>
            </div>
        }

        <div className="products">
            {
                products.map(product => {
                    return <ProductItem key={product._id} product={product}
                    isAdmin={isAdmin} deleteProduct={deleteProduct} handleCheck={handleCheck} />
                })
            } 
        </div>

        <LoadMore />
        {products.length === 0 && <NotFound />}
        </>
    )
}

export default Products
