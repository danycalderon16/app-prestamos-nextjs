export function generateID(): number {
  let date = new Date();
  const year = date.getFullYear().toString();
  let month = (date.getMonth() + 1).toString();
  month = Number(month) < 10 ? `0${month}` : month;
  let day = date.getDate().toString();
  day = Number(day) < 10 ? `0${day}` : day;
  const random = Math.ceil(Math.random() * 9);
  return Number(year + month + day + random);
}

export function transformDate(date: Date): string {
  return `${date.getDate()} de ${MONTHS[date.getMonth()]} del ${date.getFullYear()}`
}

const MONTHS:{ [key: number]: string }  = {
  0: "Enero",
  1: "Febrero",
  2: "Marzo",
  3: "Abril",
  4: "Mayo",
  5: "Junio",
  6: "Julio",
  7: "Agosto",
  8: "Septiembre",
  9: "Octubre",
  10: "Noviembre",
  11: "Diciembre",
};
