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
  const events = [];

  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    try {
      const getAllMentorDetailsAvailability = async () => {
        const res = await axios.get(`/mentor/get/booking`, {
          email: user?.email,
        });
        console.log(res.data);
      };
      getAllMentorDetailsAvailability();
    } catch (error) {
      console.log(error.message);
    }
  }, [user]);

  // example for today's labels and invalids
  // disable the list of custom dates
  function isWorkDay(available, date) {
    const weekDay = new Date(date).getDay();
    if (available === "weekends") {
      return (
        weekDay !== 1 &&
        weekDay !== 2 &&
        weekDay !== 3 &&
        weekDay !== 4 &&
        weekDay !== 5
      );
    } else if (available === "weekdays") {
      return weekDay !== 0 && weekDay !== 6;
    } else if (available === "saturday") {
      return weekDay !== 6;
    } else if (available === "sunday") {
      return weekDay !== 0;
    }
  }
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
        filterDate={(date) => isWorkDay(date)}
      />

      {/* <DatePicker
        controls={["calendar", "timegrid"]}
        min="2022-06-15T00:00"
        max="2022-12-15T00:00"
        minTime="08:00"
        maxTime="19:59"
        stepMinute={60}
        labels={myLabels}
        invalid={myInvalid}
      /> */}
    </div>
  );
};

export default MentorProfile;
