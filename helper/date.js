const formatDate = function (
  timestamp,
  hour = null,
  minute = null,
  second = null,
  day = null,
  date = null,
  month = null,
  year = null
) {
  let formatStringDate = ''

  if (hour) {
    formatStringDate += timestamp.getHours()
  }

  if (minute) {
    if (formatStringDate) {
      formatStringDate += ` : ${formatTime(timestamp.getMinutes())}`
    } else {
      formatStringDate += formatTime(timestamp.getMinutes())
    }
  }

  if (second) {
    if (formatStringDate) {
      formatStringDate += ` : ${formatTime(timestamp.getSeconds())}`
    } else {
      formatStringDate += formatTime(timestamp.getSeconds())
    }
  }

  if (day) {
    if (formatStringDate) {
      formatStringDate += ` ${convertDay(timestamp.getDay())}`
    } else {
      formatStringDate += convertDay(timestamp.getDay())
    }
  }

  if (date) {
    if (formatStringDate) {
      formatStringDate += ` ${formatTime(timestamp.getDate())}`
    } else {
      formatStringDate += `${formatTime(timestamp.getDate())}`
    }
  }

  if (month) {
    if (!formatStringDate) {
      formatStringDate += `${formatTime(timestamp.getMonth())}`
    } else if (!date) {
      formatStringDate += ` ${formatTime(timestamp.getMonth())}`
    } else {
      formatStringDate += `/${formatTime(timestamp.getMonth())}`
    }
  }

  if (year) {
    if (!formatStringDate) {
      formatStringDate += `${formatTime(timestamp.getFullYear())}`
    } else if (!month) {
      formatStringDate += ` ${formatTime(timestamp.getFullYear())}`
    } else {
      formatStringDate += `/${formatTime(timestamp.getFullYear())}`
    }
  }

  return formatStringDate
}

const formatTime = function (time) {
  return time > 10 ? time : `0${time}`
}

const convertDay = function (day) {
  const days = [null, 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']

  return days[day]
}

const formatDateForMessage = function (timestamp) {
  const diff = Math.abs(new Date().getTime() / 1000 - timestamp.seconds)
  const diffHour = diff / 60 / 60
  const dateMessage = new Date(timestamp.seconds * 1000)

  if (diffHour < 24) {
    return formatDate(dateMessage, true, true, false)
  } else {
    return formatDate(dateMessage, false, false, false, true, true, true, true)
  }
}

const calcDurationVideoCall = function (timeStart, timeEnd) {
  const diffSeconds = timeEnd.seconds - timeStart.seconds

  const hours = (diffSeconds / 60 / 60).toFixed(0)
  const minute = ((diffSeconds / 60) % 60).toFixed(0)
  const seconds = (diffSeconds % 60).toFixed(0)

  return `${formatTime(hours)} : ${formatTime(minute)} : ${formatTime(seconds)}`
}

export { formatDate, formatDateForMessage, calcDurationVideoCall }
