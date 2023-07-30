export const editTimeFormat = (minutes) => {
  const lengthInHours = Math.floor(minutes / 60);
  const lengthInMinutes = minutes % 60;

  return lengthInHours ? `${lengthInHours}ч ${lengthInMinutes}м` : `${lengthInMinutes}м`;
};