import React from 'react'
import EventBtnRender from './EventBtnRender'

function EventItem({event, isAdmin, deleteEvent, handleCheck}) {

    const dateFrom = new Date(event.dateFrom)
    dateFrom.setDate(dateFrom.getDate()+1)
    let dateTo=""
    try {
        dateTo = new Date(event.dateTo)
        dateTo.setDate(dateTo.getDate()+1)
    }catch{
        console.log("no dateTo")
    }

    return (
        <div className="event_card">
            {
                isAdmin && <input type="checkbox" checked={event.checked}
                onChange={() => handleCheck(event._id)} />
            }
            <img src={event.images.url} alt="" />

            <div className="event_box">
                <p className="event-title" title={event.title}>{event.title}</p>
                <p className="event-date"> {dateFrom.toLocaleDateString()}
                    {/* if there is dateTo, then display*/}
                    {dateTo && <span> - {dateTo.toLocaleDateString()}</span>}
                </p>
                <p className="event-price">{event.price==0? "Free": "$"+event.price}</p>
                <p className="event-desc">{event.description}</p>
            </div>

            
            <EventBtnRender event={event} deleteEvent={deleteEvent} />
        </div>
    )
}

export default EventItem
