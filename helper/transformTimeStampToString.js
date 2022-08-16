const transformTimeStampToString = function (seconds) {
  const time = new Date().getTime() / 1000 - seconds

  const minutes = Math.ceil(time / 60)

  if (minutes < 60)
    return {
      value: minutes,
      type: 'minute',
    }

  const hours = Math.ceil(minutes / 60)
  if (hours < 24)
    return {
      value: hours,
      type: 'hour',
    }

  const days = Math.ceil(hours / 24)
  if (days < 30)
    return {
      value: days,
      type: 'day',
    }

  const months = Math.ceil(days / 30)
  if (months < 12)
    return {
      value: months,
      type: 'month',
    }

  return {
    value: Math.ceil(months / 12),
    type: 'year',
  }
}

export default transformTimeStampToString
