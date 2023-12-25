/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import dayFormatter from '../Functions/dayFormatter';

const TimeAndDateComponent = ({ timeStamp }) => {
    const [liveTime, setLiveTime] = useState({
        formattedDate: '',
        formattedTime: '',
    });
    useEffect(() => {
        const intervalId = setInterval(() => {
            timeStamp += 1000;
            setLiveTime(dayFormatter(timeStamp));
        }, 1000)
      return () => {
        clearInterval(intervalId);}
      }, []);

  return (
    <div className='date-time-container ms-4'>
    <div className='date-time-backdrop'></div>
        <div className='date-container'>
            <p className='date-content m-0'>{liveTime.formattedDate}</p>
        </div>
        <div className='time-container'>
            <p className='time-content'>{liveTime.formattedTime}</p>
        </div>
    </div>
  )
}

export default TimeAndDateComponent