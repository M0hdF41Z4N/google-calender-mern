import {google} from "googleapis";
import Token from '../models/Token.js';
import Event from '../models/Event.js';
import {CLIENT_ID, CLIENT_SECRET} from "../config/constants.js";
import {errorHandler} from "../utils/errorHandler.js";

export const createEvent = async (req, res) => {
    const { userId, eventName, startDateTime, endDateTime } = req.body;

    try {
        const tokenData = await Token.findOne({ userId });

        if (!tokenData) return res.status(404).send('No token found');

        const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET);
        oauth2Client.setCredentials({ access_token: tokenData.accessToken });

        const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

        const event = {
            summary: eventName,
            start: { dateTime: startDateTime },
            end: { dateTime: endDateTime },
        };
        
        // insert to the google calendara
        const data = await calendar.events.insert({
            calendarId: 'primary',
            resource: event,
        });

        // Save the event details to the database
        await Event.create({
            userId,
            eventName,
            startDateTime,
            endDateTime
        });


        return res.status(200).send('Event created successfully');
    } catch (error) {
        errorHandler(res, error, 'Unable to save event. Please try again.', 500);
    }
};

export const getEvents = async (req, res) => {
    try {
        const {userId} = req.params;
        // const eventsData = await Event.find({ userId: req.params.userId });
        const tokenData = await Token.findOne({ userId });

        if (!tokenData) 
            {
                return res.status(404).send('No token found');
            }

        const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET);
        oauth2Client.setCredentials({ access_token: tokenData.accessToken });

        const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

        const resp = await calendar.events.list({
            calendarId: 'primary',
          })
        const eventsData = resp.data.items;
        return res.status(200).json(eventsData);
    } catch (error) {
        errorHandler(res, error, 'Unable to fetch events. Please try again.', 500);
    }
};
