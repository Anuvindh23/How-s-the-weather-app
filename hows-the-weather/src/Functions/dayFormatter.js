const dayFormatter = (timeStamp) => {

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const d = new Date(timeStamp);
    const date = d.getDate();
    const day = days[d.getDay()];
    const month = months[d.getMonth()];
    const year = d.getFullYear();

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

    const formattedTime = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
    const formattedDate = `${day}, ${date}${dateJoin} ${month} ${year}`;
    return { formattedDate, formattedTime };
}

export default dayFormatter;