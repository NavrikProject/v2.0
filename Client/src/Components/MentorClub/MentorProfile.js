import React, { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import moment from "moment";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import { InlineWidget } from "react-calendly";
import { useSelector } from "react-redux";

const locales = {
  "en-IN": require("date-fns/locale/en-IN"),
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const MentorProfile = () => {
  const [events, setEvents] = useState("");

  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    try {
      const getAllMentorDetailsAvailability = async () => {
        const res = await axios.post(`/mentor/profile/get/bookings`, {
          mentorEmail: user?.email,
        });
        setEvents(res.data);
      };
      getAllMentorDetailsAvailability();
    } catch (error) {
      console.log(error.message);
    }
  }, [user]);

  return (
    <div>
      <Calendar
        defaultDate={new Date()}
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, width: 700, margin: "50px" }}
        step={60}
      />
    </div>
  );
};

export default MentorProfile;
