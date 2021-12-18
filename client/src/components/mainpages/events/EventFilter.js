import React, {useContext, useState} from 'react'
import {GlobalState} from '../../../GlobalState'
import { BiSearch } from 'react-icons/bi'

function EventFilter() {
    const state = useContext(GlobalState)
    const [sort, setSort] = state.eventsAPI.sort
    const [search, setSearch] = state.eventsAPI.search
    const [inputValue, setInputValue] = useState("")

    const handleSubmit = e => {
        if(e) e.preventDefault();
        const input = e.target.children[0].children[1].value.toLowerCase();
        setSearch(input);
    }

    const changeInput = (e) => {
        setInputValue(e.target.value);
    }

    return (
        <div className="event-filter-menu">
            <div className="event-filter-content">
                <h1>Events &amp; activities </h1>
                <p>Explore the most popular events in Boston</p>
                <form className="searchbar-wrapper" onSubmit={handleSubmit}>
                    <label className="searchbar-box">
                        <BiSearch style={{ color: "black", fontSize:"1.5em"}}/>
                        <input type="text" value={inputValue} placeholder="What activity you want to join?"
                        onChange={changeInput}/>
                    </label>
                    <button className="search-btn" value="Search">Search</button>
                </form>
            

                <div className="filter-sort">
                        <span>Sort By: </span>
                        <div className="custom-select">
                            <select value={sort} onChange={e => setSort(e.target.value)} >
                                <option value=''>Newest</option>
                                <option value='sort=dateFrom'>Oldest</option>
                                <option value='sort=-price'>Price High to Low</option>
                                <option value='sort=price'>Price Low to High</option>
                            </select>
                            <span className="custom-arrow"></span>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default EventFilter
