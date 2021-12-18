import React, {useContext, useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'


function DetailEvent() {
    const params = useParams()
    const state = useContext(GlobalState)
    const [events] = state.eventsAPI.events
    const [detailEvent, setDetailEvent] = useState([])

    useEffect(() =>{
        if(params.id){

            events.forEach(event => {
                if(event._id === params.id) setDetailEvent(event)
            })
        }
    },[params.id, events])

    if(detailEvent.length === 0) return null;

    return (
        <>
            <div className="detail">
                <img src={detailEvent.images.url} alt="" />
                <div className="box-detail">
                    <div className="row">
                        <h2>{detailEvent.title}</h2>
                        <h6>#id: {detailEvent.event_id}</h6>
                    </div>
                    <span>$ {detailEvent.price}</span>
                    <p><span>Date:</span> {new Date(detailEvent.dateFrom).toLocaleDateString()}
                        {/* if dateTo exists, then display*/}
                        {detailEvent.dateTo && <span> - {new Date(detailEvent.dateTo).toLocaleDateString()}</span>}
                    </p>
                    <p><span>Time:</span> {detailEvent.timeFrom} - {detailEvent.timeTo}</p>
                    <p><span>Location:</span> {detailEvent.location}</p>
                    <p>{detailEvent.description}</p>
                    <p>{detailEvent.content}</p>
                    <div>
                        <a href={detailEvent.officialWebsite}><i className="bi bi-arrow-right-circle-fill"></i>Website</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DetailEvent
