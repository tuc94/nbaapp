import React from "react";

export default function CurrentDate() {
    const event = new Date();

const options = { year: 'numeric', month: 'long', day: 'numeric' };

const currentDate = event.toLocaleDateString(undefined, options);

    return(
        <div>
           <p>{currentDate}</p>
        </div>
    )
}