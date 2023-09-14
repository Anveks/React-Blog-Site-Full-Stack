
export function getCurrentDateTime() {
  const currentDate = new Date();
  const yyyy = currentDate.getFullYear();
  const mm = String(currentDate.getMonth() + 1).padStart(2, '0');
  const dd = String(currentDate.getDate()).padStart(2, '0');
  const hh = String(currentDate.getHours()).padStart(2, '0');
  const min = String(currentDate.getMinutes()).padStart(2, '0');
  const ss = String(currentDate.getSeconds()).padStart(2, '0');
  const sss = String(currentDate.getMilliseconds()).padStart(3, '0');
  const offsetMinutes = currentDate.getTimezoneOffset();
  const offsetSign = offsetMinutes >= 0 ? '-' : '+';
  const offsetHours = String(Math.abs(Math.floor(offsetMinutes / 60))).padStart(2, '0');
  const offsetMinutesAbs = String(Math.abs(offsetMinutes % 60)).padStart(2, '0');

  return `${yyyy}-${mm}-${dd}T${hh}:${min}:${ss}.${sss}${offsetSign}${offsetHours}:${offsetMinutesAbs}`;
}
