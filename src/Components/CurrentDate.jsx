import React from "react";

export default function CurrentDate(date) {
  console.log(date.date);
  const event = date.date;

  const options = { year: "numeric", month: "long", day: "numeric" };

  const currentDate = event.toLocaleDateString(undefined, options);

  return (
    <div>
      <p>{currentDate}</p>
    </div>
  );
}
