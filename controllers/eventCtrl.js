const Events = require('../models/eventModel')

// filter by search

class APIfeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }

    filtering(){
       const queryObj = {...this.queryString} //queryString = req.query

       const excludedFields = ['sort']
       excludedFields.forEach(el => delete(queryObj[el]))
       
       let queryStr = JSON.stringify(queryObj)
       queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)

    //    gte = greater than or equal
    //    lte = lesser than or equal
    //    lt = lesser than
    //    gt = greater than
       this.query.find(JSON.parse(queryStr))
         
       return this;
    }

    sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
        }else{
            this.query = this.query.sort('-dateFrom')
        }

        return this;
    }
}

const eventCtrl = {
    getEvents: async(req, res) =>{
        try {
            const features = new APIfeatures(Events.find(), req.query).filtering().sorting()

            const events = await features.query

            res.json({
                status: 'success',
                events: events
            })
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createEvent: async(req, res) =>{
        try {
            const {event_id, title, dateFrom, dateTo, timeFrom, timeTo, location, price, description, content, images, officialWebsite} = req.body;
            if(!images) return res.status(400).json({msg: "No image upload"})

            const event = await Events.findOne({event_id})
            if(event)
                return res.status(400).json({msg: "This event already exists."})

            const newEvent = new Events({
                event_id, title: title.toLowerCase(), dateFrom, dateTo, timeFrom, timeTo, location, price, description, content, images, officialWebsite
            })

            await newEvent.save()
            res.json({msg: "Created a event"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteEvent: async(req, res) =>{
        try {
            await Events.findByIdAndDelete(req.params.id)
            res.json({msg: "Deleted a Event"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateEvent: async(req, res) =>{
        try {
            const {title, dateFrom, dateTo, timeFrom, timeTo, location, price, description, content, images, officialWebsite} = req.body;
            if(!images) return res.status(400).json({msg: "No image upload"})

            await Events.findOneAndUpdate({_id: req.params.id}, {
                title: title.toLowerCase(), dateFrom, dateTo, timeFrom, timeTo, location, price, description, content, images, officialWebsite
            })

            res.json({msg: "Updated a Event"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}


module.exports = eventCtrl