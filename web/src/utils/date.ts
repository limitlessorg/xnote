import dayjs from 'dayjs'

/**
 * 日期时间转中文时间格式
 * @param dateTime 时间
 * @returns 中文时间格式
 */
export const convertToDateTimeStr = (dateTime: Date | string) => {
  let timeStr = undefined
  if (dateTime) {
    const minutes = dayjs().diff(dateTime, 'minutes')
    const days = dayjs().diff(dateTime, 'days')
    const year = dayjs().diff(dateTime, 'years')
    if (minutes < 3) {
      timeStr = '刚刚'
    } else if (minutes < 60) {
      timeStr = `${minutes}分钟前`
    } else if (days == 0) {
      const startDayOfMsgTime = dayjs(dateTime).startOf('day').format()
      const startDayOfNow = dayjs().startOf('day').format()
      if (startDayOfMsgTime == startDayOfNow) {
        timeStr = dayjs(dateTime).format('HH:mm')
      } else {
        timeStr = `昨天 ${dayjs(dateTime).format('HH:mm')}`
      }
    } else if (days == 1) {
      timeStr = `昨天 ${dayjs(dateTime).format('HH:mm')}`
    } else if (days == 2) {
      timeStr = `前天 ${dayjs(dateTime).format('HH:mm')}`
    } else if (year == 0) {
      timeStr = dayjs(dateTime).format('M月D日:HH:mm')
    } else {
      timeStr = dayjs(dateTime).format('yy年M月D日:HH:mm')
    }
  }
  return timeStr
}
