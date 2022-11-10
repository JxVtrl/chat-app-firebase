const formatTime = (time: number) =>
  time.toString().length === 1 ? `0${time}` : time;

export function Timestamp(time: string) {
  return `
      ${formatTime(new Date(time).getHours())}:${formatTime(
    new Date(time).getMinutes()
  )}
    `;
}
