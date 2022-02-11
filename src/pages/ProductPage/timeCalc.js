export const timeCalc = (createdAt) => {
    let formattedTime;
    let date = new Date(+createdAt);
    let year = date.getFullYear();
    let month = "0" + (date.getMonth()+1);
    let day = "0" + date.getDate();
    let hours = "0" + date.getHours();
    let minutes = "0" + date.getMinutes();
    let seconds = "0" + date.getSeconds();
    formattedTime = day.substr(-2) + '.' + month.substr(-2) + '.' + year +
        ' ' + hours.substr(-2) + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return formattedTime;
}
