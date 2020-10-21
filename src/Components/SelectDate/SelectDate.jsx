import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

export default function SelectDate() {
  const [selectedDate, setselectedDate] = useState(new Date());
  return (
    <DatePicker
      selected={selectedDate}
      onChange={(selectedDate) => setselectedDate(selectedDate)}
    />
  );
}
