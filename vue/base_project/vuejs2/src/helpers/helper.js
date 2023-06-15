export default {
  newDateFormatted () {
    return this.formatDate(
      new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
    )
  },
  formatDate (date) {
    if (!date) return null
    const [year, month, day] = date.split('-')
    return `${day}/${month}/${year}`
  },
  parseDate (date) {
    if (!date) return null
    const [month, day, year] = date.split('/')
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
  },

  getMonthName (date) {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]
    if (typeof date === 'string') {
      const [year, month, d] = date.split('-')
      return monthNames[parseInt(month) - 1]
    } else {
      return monthNames[date.getMonth()]
    }
  },
  getMonth (value) {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]

    return monthNames[value]
  },
}
