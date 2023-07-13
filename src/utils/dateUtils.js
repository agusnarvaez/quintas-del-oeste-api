import moment from 'moment'

//const providedDate = '2023-07-13T01:25:51.816-04:00';
const checkDateOfPayment = (providedDate) => {
  const currentDate = new Date()
  const isTodayOrYesterday = moment(providedDate).isSame(currentDate, 'day') || moment(providedDate).isSame(currentDate, 'day') - 1;
  if (isTodayOrYesterday) {
    // La fecha es hoy o ayer
    // Calcula la diferencia en minutos entre las dos fechas
  const diffMinutes = moment(currentDate).diff(moment(providedDate), 'minutes')
    // Han pasado como máximo 5 minutos desde la fecha proporcionada
    return (diffMinutes <= 10)? true:false

  } else {
    //* La fecha no es hoy ni ayer
    return false
  }
}
//* Exporto las funciones
export {checkDateOfPayment}
