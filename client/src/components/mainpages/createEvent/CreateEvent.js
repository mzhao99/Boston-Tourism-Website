import React, {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import {GlobalState} from '../../../GlobalState'
import Loading from '../utils/loading/Loading'
import {useHistory, useParams} from 'react-router-dom'
import moment from 'moment'


const initialState = {
    event_id: '',
    title: '',
    dateFrom:'',
    dateTo: '',
    timeFrom:'',
    timeTo:'',
    location: '',
    price: 0,
    description: 'Brief description of your event',
    content: 'Details of your event',
    officialWebsite: '',
    _id: ''
}

function CreateEvent() {
    const state = useContext(GlobalState)
    const [event, setEvent] = useState(initialState)
    const [images, setImages] = useState(false)
    const [loading, setLoading] = useState(false)


    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token

    const history = useHistory()
    const param = useParams()

    const [events] = state.eventsAPI.events
    const [onEdit, setOnEdit] = useState(false)
    const [callback, setCallback] = state.eventsAPI.callback

    useEffect(() => {
        if(param.id){
            setOnEdit(true)
            events.forEach(event => {
                if(event._id === param.id) {
                    setEvent(event)
                    setImages(event.images)
                }
            })
        }else{
            setOnEdit(false)
            setEvent(initialState)
            setImages(false)
        }
    }, [param.id, events])

    const handleUpload = async e =>{
        e.preventDefault()
        try {
            if(!isAdmin) return alert("You're not an admin")
            const file = e.target.files[0]
            
            if(!file) return alert("File not exist.")

            if(file.size > 1024 * 1024) // 1mb
                return alert("Size too large!")

            if(file.type !== 'image/jpeg' && file.type !== 'image/png') // 1mb
                return alert("File format is incorrect.")

            let formData = new FormData()
            formData.append('file', file)

            setLoading(true)
            const res = await axios.post('/api/upload', formData, {
                headers: {'content-type': 'multipart/form-data', Authorization: token}
            })
            setLoading(false)
            setImages(res.data)

        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleDestroy = async () => {
        try {
            if(!isAdmin) return alert("You're not an admin")
            setLoading(true)
            await axios.post('/api/destroy', {public_id: images.public_id}, {
                headers: {Authorization: token}
            })
            setLoading(false)
            setImages(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleChangeInput = e =>{
        const {name, value} = e.target
    
        if (e.target.type === 'date'){
            let DateValue = new Date(value);
            DateValue.setDate(DateValue.getDate()+1);
            console.log(DateValue);
            DateValue = moment(DateValue).format('YYYY-MM-DD');
            console.log(DateValue);
            setEvent({...event, [name]:DateValue})
        }
        else {
            setEvent({...event, [name]:value})
        }
        
    }

    const handleSubmit = async e =>{
        e.preventDefault()
        try {
            if(!isAdmin) return alert("You're not an admin")
            if(!images) return alert("No Image Upload")

            if(onEdit){
                await axios.put(`/api/events/${event._id}`, {...event, images}, {
                    headers: {Authorization: token}
                })
            }else{
                await axios.post('/api/events', {...event, images}, {
                    headers: {Authorization: token}
                })
            }
            setCallback(!callback)
            history.push("/")
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const styleUpload = {
        display: images ? "block" : "none"
    }
    return (
        <div className="create_event">
            <div className="upload">
                <input type="file" name="file" id="file_up" onChange={handleUpload}/>
                {
                    loading ? <div id="file_img"><Loading /></div>

                    :<div id="file_img" style={styleUpload}>
                        <img src={images ? images.url : ''} alt=""/>
                        <span onClick={handleDestroy}>X</span>
                    </div>
                }
                
            </div>

            <form onSubmit={handleSubmit}>
                <div className="row">
                    <label htmlFor="event_id">Event ID</label>
                    <input type="text" name="event_id" id="event_id" required
                    value={event.event_id} onChange={handleChangeInput} disabled={onEdit} />
                </div>

                <div className="row">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" required
                    value={event.title} onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="dateFrom">Date From</label>
                    <input type="date" name="dateFrom" id="dateFrom" required
                    value={event.dateFrom} onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="dateTo">Date To</label>
                    <input type="date" name="dateTo" id="dateTo"
                    value={event.dateTo} onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="timeFrom">Time From</label>
                    <input type="time" name="timeFrom" id="timeFrom" required
                    value={event.timeFrom} onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="timeTo">Time To</label>
                    <input type="time" name="timeTo" id="timeTo" required
                    value={event.timeTo} onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="location">Location</label>
                    <input type="text" name="location" id="location" required
                    value={event.location} onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="price">Price</label>
                    <input type="number" name="price" id="price" required
                    value={event.price} onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="description">Description</label>
                    <textarea type="text" name="description" id="description" required
                    value={event.description} rows="5" onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="content">Content</label>
                    <textarea type="text" name="content" id="content" required
                    value={event.content} rows="7" onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="officialWebsite">Official Website</label>
                    <input type="text" name="officialWebsite" id="officialWebsite" required
                    value={event.officialWebsite} onChange={handleChangeInput} />
                </div>

                <button type="submit">{onEdit? "Update" : "Create"}</button>
            </form>
        </div>
    )
}

export default CreateEvent
