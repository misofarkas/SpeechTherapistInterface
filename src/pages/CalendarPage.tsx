import { useState } from "react";
import { Box } from "@chakra-ui/react"
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

function CalendarPage() {
  const [value, onChange] = useState(new Date());

  return (
    <div>
      <Box>
        <Calendar onChange={onChange} value={value} />
      </Box>
    </div>
  );
}

export default CalendarPage;
