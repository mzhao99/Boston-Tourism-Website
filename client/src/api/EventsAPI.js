import {useState, useEffect} from 'react'
import axios from 'axios'


function EventsAPI() {
    const [events, setEvents] = useState([])
    const [callback, setCallback] = useState(false)
    const [search, setSearch] = useState('')
    const [sort, setSort] = useState('')

    useEffect(() =>{
        const getEvents = async () => {
            const res = await axios.get(`/api/events?${sort}&title[regex]=${search}`)
            setEvents(res.data.events)
        }
        getEvents()
    },[callback, search, sort])
    
    return {
        events: [events, setEvents],
        callback: [callback, setCallback],
        search: [search, setSearch],
        sort: [sort, setSort]
    }
}

export default EventsAPI
