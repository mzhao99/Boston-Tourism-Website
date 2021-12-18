import React, {useContext, useState} from 'react'
import {GlobalState} from '../../../GlobalState'
import EventItem from './EventItem'
import NotFound from '../utils/not_found/NotFound'
import Loading from '../utils/loading/Loading'
import axios from 'axios'
import EventFilter from './EventFilter'

function Events() {
    const state = useContext(GlobalState)
    const [events, setEvents] = state.eventsAPI.events
    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token
    const [callback, setCallback] = state.eventsAPI.callback
    const [loading, setLoading] = useState(false)
    const [isAllCheck, setIsAllCheck] = useState(false)
    const [disabled, setDisabled] = useState(true)

    const handleCheck = (id) =>{
        let atLeastOneChecked = false;
        events.forEach(event => {
            if(event._id === id) {
                event.checked = !event.checked
            }
            if (event.checked===true){
                atLeastOneChecked = true;
            }
        })
        setDisabled(!atLeastOneChecked)
        setEvents([...events])
    }

    const deleteEvent = async(id, public_id) => {
            try {
                setLoading(true)
                const destroyImg = axios.post('/api/destroy', {public_id},{
                    headers: {Authorization: token}
                })
                const deleteEvent = axios.delete(`/api/events/${id}`, {
                    headers: {Authorization: token}
                })

                await destroyImg
                await deleteEvent
                setCallback(!callback)
                setLoading(false)
            } catch (err) {
                alert(err.response.data.msg)
            }
    }

    const checkAll = () =>{
        events.forEach(event => {
            event.checked = !isAllCheck
        })
        setEvents([...events])
        setIsAllCheck(!isAllCheck)
        setDisabled(isAllCheck)
    }

    const deleteAll = () =>{
        if(window.confirm("Do you want to delete products?")){
            events.forEach(event => {
                if(event.checked) deleteEvent(event._id, event.images.public_id)
            })
        }
    }

    if(loading) return <div><Loading /></div>
    return (
        <>
        <EventFilter />
        {
            isAdmin && 
            <div className="delete-all">
                <span>Select all</span>
                <input type="checkbox" checked={isAllCheck} onChange={checkAll} />
                <button disabled={disabled} onClick={deleteAll}>Delete</button>
            </div>
        }

        <div className="events">
            {
                events.map(event => {
                    return <EventItem key={event._id} event={event}
                    isAdmin={isAdmin} deleteEvent={deleteEvent} handleCheck={handleCheck} />
                })
            } 
        </div>

        {events.length === 0 && <NotFound />}
        </>
    )
}

export default Events
