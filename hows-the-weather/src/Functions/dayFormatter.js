const dayFormatter = (timeStamp) => {
    const time = new Date(timeStamp);
    let hours = time.getUTCHours();
    let minutes = time.getUTCMinutes();
    let seconds = time.getUTCSeconds();

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const date = time.getDate();
    const day = days[time.getDay()];
    const month = months[time.getMonth()];
    const year = time.getFullYear();

    let lastDig = date.toString().split('').at(-1);
    lastDig = Number(lastDig);
    let dateJoin = '';
    if (lastDig === 1) {
        dateJoin = 'st';
    } else if (lastDig === 2) {
        dateJoin = 'nd';
    } else if (lastDig === 3) {
        dateJoin = 'rd';
    } else if ((lastDig >= 4 && lastDig <= 9) || lastDig === 0) {
        dateJoin = 'th';
    }

    // const liveTimeEl = document.getElementsByClassName("livetime");
    // const dayEl = document.getElementsByClassName('day');
    // liveTimeEl[0].innerHTML = hours + ":" + minutes + ":" + seconds;
    // dayEl[0].innerHTML = `${day}, ${date}${dateJoin} ${month} ${year}`;

    const formattedTime =  hours + ":" + minutes + ":" + seconds;
    const formattedDate = `${day}, ${date}${dateJoin} ${month} ${year}`;
    const obj = {
        formattedTime,
        formattedDate,
    };
    console.log(obj);
    return obj;
}

export default dayFormatter;