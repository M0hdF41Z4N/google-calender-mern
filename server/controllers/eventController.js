import { google } from 'googleapis';
import Token from '../models/Token.js';
import Event from '../models/Event.js';

export const createEvent = async (req, res) => {
    const { userId, eventName, startDateTime, endDateTime } = req.body;

    try {
        const tokenData = await Token.findOne({ userId });

        if (!tokenData) return res.status(404).send('No token found');

        const oauth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET);
        oauth2Client.setCredentials({ access_token: tokenData.accessToken });

        const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

        const event = {
            summary: eventName,
            start: { dateTime: startDateTime },
            end: { dateTime: endDateTime },
        };

        await calendar.events.insert({
            calendarId: 'primary',
            resource: event,
        });

        res.status(200).send('Event created successfully');
    } catch (error) {
        res.status(500).send('Error creating event');
    }
};

export const getEvents = async (req, res) => {
    try {
        const eventsData = await Event.find({ userId: req.params.userId });
        res.status(200).json(eventsData);
    } catch (error) {
        res.status(500).send('Error fetching events');
    }
};
