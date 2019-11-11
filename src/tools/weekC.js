let dt = new Date();
let y = dt.getFullYear();
let m = (dt.getMonth() + 1).toString().padStart(2, "0");
let d = dt.getDate().toString().padStart(2, "0");

function isLeap(year) {
  if((year%4==0 && year%100!=0) || year%400==0){
      return true;
  }
  else{
      return false; 
  }
}


let monthDay = [31,0,31,30,31,30,31,31,30,31,30,31];

function whatDay(year=y, month=m, day=1) {
  var sum = 0;
  sum += (year-1)*365+Math.floor((year-1)/4)-Math.floor((year-1)/100)+Math.floor((year-1)/400)+day;
  for(var i=0; i<month-1; i++){
      sum += monthDay[i];
  }
  if(month > 2){
      if(isLeap(year)){ 
          sum += 29; 
      }
      else{
          sum += 28; 
      }
  }
  return sum%7;      //余数为0代表那天是周日，为1代表是周一，以此类推
}



// 闰年二月数组
let runArr=[]
for(let i = 0 ;i<29 ;i++){
  runArr.push(i+1)
}
// 非闰年二月数组
let unRunArr=[]
for(let i = 0 ;i<28 ;i++){
  unRunArr.push(i+1)
}

// 小月数组
let smallArr=[]
for(let i = 0 ;i<30 ;i++){
  smallArr.push(i+1)
}
// 大月数组
let bigArr=[]
for(let i = 0 ;i<31 ;i++){
  bigArr.push(i+1)
}


 function renderArr(year=y,month=m,day=whatDay(y,m,d=1)){
  let arr = [] // 前补
  let newArr = []
  // let shiftArr = [] // 后补
  // 根据不匹配日期空格
  for(let i = 0 ;i<day ;i++){
    arr.push('')
  }

  if(month==2){
    if(isLeap(year)){
      newArr = arr.concat(runArr)
      if(newArr.length !== 35){
        for(let i = 0 ;35-newArr.length ;i++){
          newArr.push('')
        }
      }
      return newArr
  }
  else{
    newArr = arr.concat(unRunArr)
    if(newArr.length !== 35){
      for(let i = 0 ;35-newArr.length ;i++){
        newArr.push('')
      }
    }
    return newArr
  }
  }else{
    if(monthDay[month-1]==30 && arr.length<6){
      newArr = arr.concat(smallArr)
      if(newArr.length !== 35){
        for(let i = 0 ;35-newArr.length ;i++){
          newArr.push('')
        }
      }
      return newArr
    }
    if(monthDay[month-1]==30 && arr.length>=6){
      newArr = arr.concat(smallArr)
      if(newArr.length !== 40){
        for(let i = 0 ;40-newArr.length ;i++){
          newArr.push('')
        }
      }
      return newArr
    }
    if(monthDay[month-1]==31 && arr.length<5){
      newArr = arr.concat(bigArr)
      if(newArr.length !== 35){
        for(let i = 0 ;35-newArr.length ;i++){
          newArr.push('')
        }
      }
      return newArr
    }
    if(monthDay[month-1]==31 && arr.length>=5){
      newArr = arr.concat(bigArr)
      if(newArr.length !== 40){
        for(let i = 0 ;40-newArr.length ;i++){
          newArr.push('')
        }
      }
      return newArr
    }
  }
}

// let result = renderArr(y,m,whatDay(y,m,d))

export {
  renderArr,
  whatDay
}








