import React, {useContext, useState} from 'react'
import {GlobalState} from '../../../GlobalState'
import { BiSearch } from 'react-icons/bi'

function Filters() {
    const state = useContext(GlobalState)
    const [categories] = state.categoriesAPI.categories
    const [category, setCategory] = state.productsAPI.category
    const [sort, setSort] = state.productsAPI.sort
    const [search, setSearch] = state.productsAPI.search
    const [inputValue, setInputValue] = useState("")

    const handleCategory = e => {
        setCategory(e.target.value)
        setSearch('')
    }

    const changeInput = (e) => {
        setInputValue(e.target.value);
    }

    const handleSubmit = e => {
        if(e) e.preventDefault();
        const input = e.target.children[0].children[1].value.toLowerCase();
        setSearch(input);
    }

    return (
        <div className="product-filter-menu">
            <div className="product-filter-content">
                <h1>Tour packages &amp; tickets </h1>
                <p>Explore the best museums, parks and more must-sees</p>

                <form className="searchbar-wrapper" onSubmit={handleSubmit}>
                    <label className="searchbar-box">
                        <BiSearch style={{ color: "black", fontSize:"1.5em"}}/>
                        <input type="text" value={inputValue} placeholder="What do you want to explore?"
                        onChange={changeInput}/>
                    </label>
                    <button className="search-btn" value="Search">Search</button>
                </form>
                
                <div className="filter-row">
                
                <div className="filter-category">
                    <span>Category: </span>
                    <div className="custom-select">
                        <select name="category" value={category} onChange={handleCategory} >
                            <option value=''>All</option>
                            {
                                categories.map(category => (
                                    <option value={"category=" + category._id} key={category._id}>
                                        {category.name}
                                    </option>
                                ))
                            }
                        </select>
                        <span className="custom-arrow"></span>
                    </div>
                </div>

                <div className="filter-sort">
                    <span>Sort By: </span>
                    <div className="custom-select">
                        <select value={sort} onChange={e => setSort(e.target.value)} >
                            <option value=''>Newest</option>
                            <option value='sort=oldest'>Oldest</option>
                            <option value='sort=-sold'>Best Sellers</option>
                            <option value='sort=-price'>Price High to Low</option>
                            <option value='sort=price'>Price Low to High</option>
                        </select>
                        <span className="custom-arrow"></span>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Filters
