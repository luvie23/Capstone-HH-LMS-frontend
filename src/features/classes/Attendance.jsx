import React, { useState } from 'react'
import Papa from 'papaparse'

export default function Attendance(props) {


    const changeHandler = (event) => {
        Papa.parse(event.target.files[0], {
            header: true,
            skipEmptyLines: true,
            complete: function (results) {
                const listData = results.data;
                processAttendance(listData);
            },
        });
    };

    const processAttendance = async (listData) => {
        try {
            let res = await fetch("http://localhost:8080/groups/1/attendance", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    list: listData,
                    meeting_id: props.meetingId
                }),
            });
            let resJson = await res.json();
            if (res.status === 200){

            } else {
                alert('error')
            }
        } catch (err) {
          console.log(err);
        }
      };

  return (
    <div className='flex flex-col mt-5'>
        <p className='text-red-500'>Upload attendance:</p>
        <input
        type="file"
        name="file"
        accept=".csv"
        onChange={changeHandler}
        className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"'
        />
        <p className='mt-1 text-sm text-gray-500 dark:text-gray-300'>CSV file with the emails of users present during the meeting</p>
    </div>
  )
}
