export function getFormatDate(miliseconds) {
    let date=new Date(miliseconds)
    let format = (num) => ('00' + num).slice(-2)
    return format(date.getHours()) + ':' + format(date.getMinutes()) + ':' + format(date.getSeconds())
}