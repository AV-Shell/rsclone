function checkCase(num: any): number {
  if (num.toString().slice(-1) === '1' && num.toString().slice(-2) !== '11') {
    return 0;
  }
  if (
    num.toString().slice(-1) > 1 &&
    num.toString().slice(-1) < 5 &&
    !['12', '13', '14'].includes(num.toString().slice(-2))
  ) {
    return 1;
  }
  return 2;
}
function transformDate(dateArr: any) {
  const arr: any = [];

  if (dateArr.length > 0) {
    dateArr.forEach((e: any) => {
      const date = new Date(e.date);
      let day: any = date.getDate();
      if (day.toString().length < 2) {
        day = `0${day}`;
      }
      let month: any = date.getMonth() + 1;
      if (month.toString().length < 2) {
        month = `0${month}`;
      }
      const newDate = `${day}/${month}`;
      arr.push(newDate);
    });
  }

  return arr;
}
function transformValue(dateArr: any) {
  const arr: any = [];
  if (dateArr.length > 0) {
    dateArr.forEach((e: any) => {
      arr.push(e.value);
    });
  }

  return arr;
}
function transformValueAll(dateArr: any) {
  const arr: any = [];
  let startValue: number = 0;
  if (dateArr.length > 0) {
    dateArr.forEach((e: any) => {
      const difValue: number =
        e.value - startValue < 0 ? 0 : e.value - startValue;
      arr.push(difValue);
      startValue = e.value;
    });
  }

  return arr;
}

function CreatePieChart(ctx: any, canvas: any, dataPieCart: any, labelsPieCart: any) {
  let lastend = 0;
  let myTotal = 0;
  const myColor = ['#F64E60', '#1BC5BD'];
  const off = 10;
  const w = (canvas.width - off) / 2;
  const h = (canvas.height - off) / 2;
  for (let i = 0; i < dataPieCart.length; i++) {
    myTotal += dataPieCart[i];
  }
  for (let i = 0; i < dataPieCart.length; i++) {
    ctx.fillStyle = myColor[i];
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(w, h);
    const len = (dataPieCart[i] / myTotal) * 2 * Math.PI;
    const r = h - off / 2;
    ctx.arc(w, h, r, lastend, lastend + len, false);
    ctx.lineTo(w, h);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const mid = lastend + len / 2;
    ctx.fillText(
      labelsPieCart[i],
      w + Math.cos(mid) * (r / 2),
      h + Math.sin(mid) * (r / 2),
    );
    lastend += Math.PI * 2 * (dataPieCart[i] / myTotal);
  }
}
function switchUserLvl(num: number) {
  switch (num) {
    case 0:
      return 'A0';

    case 1:
      return 'A1';

    case 2:
      return 'A2';

    case 3:
      return 'B1';

    case 4:
      return 'B2';

    case 5:
      return 'C1';

    default:
      return null;
  }
}
function switchRang(num: number) {
  switch (true) {
    case num < 100:
      return '00';
    case num < 220:
      return '01';
    case num < 364:
      return '02';
    case num < 537:
      return '03';
    case num < 744:
      return '04';
    case num < 993:
      return '05';
    case num < 1292:
      return '06';
    case num < 1650:
      return '07';
    case num < 2080:
      return '08';
    case num < 2596:
      return '09';
    case num < 3215:
      return '10';
    case num < 3958:
      return '11';
    case num < 4850:
      return '12';
    case num < 5920:
      return '13';
    case num < 7204:
      return '14';

    default:
      return null;
  }
}
export {
  checkCase,
  transformDate,
  transformValue,
  transformValueAll,
  CreatePieChart,
  switchUserLvl,
  switchRang,
};
