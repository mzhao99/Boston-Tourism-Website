import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'

function EventBtnRender({event, deleteEvent}) {
    const state = useContext(GlobalState)
    const [isAdmin] = state.userAPI.isAdmin

    
    return (
        <div className="row_btn">
            {
                isAdmin ? 
                <>
                    <Link id="delete-btn" to="#!" 
                    onClick={() =>deleteEvent(event._id, event.images.public_id)}>
                        Delete
                    </Link>
                    <Link id="edit-btn" to={`/edit_event/${event._id}`}>
                        Edit
                    </Link>
                </>
                : <>
                    <Link id="event-view-btn" to={`/eventdetail/${event._id}`}>
                        View
                    </Link>
                </>
            }
                
        </div>
    )
}

export default EventBtnRender
