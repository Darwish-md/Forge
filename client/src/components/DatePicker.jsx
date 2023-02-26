import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

const Styles = styled.div`
 .react-datepicker-wrapper,
 .react-datepicker__input-container,
 .react-datepicker__input-container input {
   margin: 0 auto;
   width: 175px;
   height: 50px;
 }

 .react-datepicker__close-icon::before,
 .react-datepicker__close-icon::after {
   background-color: grey;
 }
`;

export default function TableDatePicker({onChangeDate}) {
 const [startDate, setStartDate] = useState(null);

 return (
    <Styles>
   <div style={{ display: "flex" }}>
     <DatePicker
       isClearable
       filterDate={d => {
         return new Date() > d;
       }}
       placeholderText="Select Search Date"
       dateFormat="MMMM yyyy"
       selected={startDate}
       selectsStart
       showMonthYearPicker
       startDate={startDate}
       onChange={date => {
    onChangeDate(date);
       setStartDate(date)
    }}
       renderCustomHeader={({
         date,
         decreaseMonth,
         increaseMonth,
         prevMonthButtonDisabled,
         nextMonthButtonDisabled
       }) => (
         <div
           style={{
             display: "flex",
             justifyContent: "center",
             alignItems: "center"
           }}
         >
           <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
             {"<"}
           </button>
           <div style={{ margin: "0 10px" }}>{`${date.toLocaleString(
             "default",
             { month: "long", year: "numeric" }
           )}`}</div>
           <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
             {">"}
           </button>
         </div>
       )}
     />
   </div>
   </Styles>
 );
}
