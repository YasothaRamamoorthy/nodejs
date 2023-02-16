let add=(num1,num2)=>{
    console.log(num1+num2);
};
let sub=(num1,num2)=>{
    console.log(num1-num2);
};
let mul=(num1,num2)=>{
    console.log(num1*num2);
};
let div=(num1,num2)=>{
    console.log(num1/num2);
};

        let operation=process.argv[2];
        let num1=parseInt(process.argv[3]);
        let num2 = parseInt(process.argv[4]);



function init()
{
  switch(operation)
  {
    case '+': add(num1,num2);
              break;
    case '-': sub(num1,num2);
              break;
    case '*':mul(num1,num2);
              break;
    case '/':div(num1,num2);
              break;
  }
}

init();
