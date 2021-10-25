// Aufgabe 3.2.1
function feedback(message){
    return message;
}

function pubsub(){
    subscriptions = [];

    return{
        subscribe:function(subscriber){
            subscriptions.push(subscriber);
        },
        publish:function(publication){
            out = "";
            for(i = 0; i < subscriptions.length; i++){
                out += subscriptions[i](publication);
            }
            return out;
        },
        get:function(x){
            return subscriptions[x];
        }
    }
}

my_pubsub = pubsub();
my_pubsub.subscribe(feedback);
document.getElementById("ausgabe3.2.1").innerHTML = my_pubsub.publish("It works!");

// Aufgabe 3.2.2
function gensymf(symbol){
    counter = 0;

    return function(){
        return symbol + counter++;
    }
}

gensym = gensymf('G');
document.getElementById("ausgabe3.2.2").innerHTML = gensym() + "<br>" + gensym() + "<br>" + gensym() + "<br>" + gensym();

// Aufgabe 3.2.3
function fibonaccif(value1, value2){
    v1 = value1;
    v2 = value2;

    return function(){
        temp = v1;
        v1 = v2;
        v2 += temp;
        return temp;
    }
}

fib = fibonaccif(0,1);
document.getElementById("ausgabe3.2.3").innerHTML = fib() + "<br>" + fib() + "<br>" + fib() + "<br>" + fib() + "<br>" + fib() + "<br>" + fib();

// Aufgabe 3.2.4
function addg(value){
    sum = value;

    return function inner(innervalue){
        if(typeof innervalue == "undefined"){
            return sum;
        } else {
            sum += innervalue;
            return inner; //Zurückgeben zum Durchreichen
        }
    }
}

document.getElementById("ausgabe3.2.4").innerHTML = addg(3)(4)(5)() + "<br>" + addg(1)(2)(4)(8)();

// Aufgabe 3.2.5
function add(x,y){
    return x+y;
}

function applyg(func){
    values = [];

    return function inner(innervalue){
        if(typeof innervalue == "undefined"){
            if(values.length == 0) throw "No values given!";
            result = values[0];
            for(i = 1; i < values.length; i++){
                result = func(result, values[i])
            }
            return result;
        } else {
            values.push(innervalue);
            return inner;
        }
    }
}

document.getElementById("ausgabe3.2.5").innerHTML = applyg(add)(3)(4)(5)() + "<br>" + applyg(add)(1)(2)(4)(8)();

// Aufgabe 3.2.6
function m(val, src=val.toString()){
    return {value:val, source:src};
}

document.getElementById("ausgabe3.2.6").innerHTML = JSON.stringify(m(1)) + "<br>" + JSON.stringify(m(Math.PI, "pi"));

// Aufgabe 3.2.7
function addm(m1, m2){
    return m(m1.value + m2.value, "(" + m1.source + "+" + m2.source + ")");
}

document.getElementById("ausgabe3.2.7").innerHTML = JSON.stringify(addm(m(3), m(4)));

// Aufgabe 3.2.8
function binarymf(func, symbol){
    return function(m1, m2){
        return m(func(m1.value, m2.value), "(" + m1.source + symbol + m2.source + ")");
    }
}

addm = binarymf(add, "+");
document.getElementById("ausgabe3.2.8").innerHTML = JSON.stringify(addm(m(3), m(4)));

// Aufgabe 3.2.9
function binarymf(func, symbol){
    return function(m1, m2){
        if(typeof m1 == "number") m1 = m(m1);
        if(typeof m2 == "number") m2 = m(m2);
        return m(func(m1.value, m2.value), "(" + m1.source + symbol + m2.source + ")");
    }
}

document.getElementById("ausgabe3.2.9").innerHTML = JSON.stringify(addm(3, 4));

// Aufgabe 3.2.10
function square(x){
    return x*x;
}

function unarymf(func, symbol){
    return function(m1){
        if(typeof m1 == "number") m1 = m(m1);
        return m(func(m1.value), "(" + symbol + " " + m1.value + ")");
    }
}

squarem = unarymf(square, "square");
document.getElementById("ausgabe3.2.10").innerHTML = JSON.stringify(squarem(4));

// Aufgabe 3.2.11
function hyp(a, b){
    return Math.sqrt(a*a + b*b);
}

document.getElementById("ausgabe3.2.11").innerHTML = hyp(3, 4);

// Aufgabe 3.2.12
function add(x, y){
    return x+y;
}

function mul(x, y){
    return x*y;
}

function exp(arr){
    if(typeof arr == "number") return arr;
    else if(arr.length == 2){ //Unary functions -> 2 Parameters
        return arr[0](exp(arr[1]));
    } else if (arr.length == 3){ //Binary function -> 3 Parameters
        return arr[0](exp(arr[1]), exp(arr[2]));
    }
}

hypa = [ Math.sqrt, [ add, [mul, 3, 3], [mul, 4, 4] ] ];
//hypa = [ square, [square, 2] ];
document.getElementById("ausgabe3.2.12").innerHTML = exp(hypa);

// Aufgabe 3.2.13
function store(value){
    variable = value;
}

var variable;
store(5);
document.getElementById("ausgabe3.2.13").innerHTML = variable === 5;

// Aufgabe 3.2.14
function identityf(argmuent) { //Is like identity_function from 3.1.1
    return function(){
        return argmuent;
    };
}

function quatre(operatorf, operandf1, operandf2, resultf){
    resultf(operatorf(operandf1(), operandf2()));
}

quatre( add, identityf(3), identityf(4), store );
document.getElementById("ausgabe3.2.14").innerHTML = variable === 7;

// Aufgabe 3.2.15
function unaryc(func){
    return function(value, resultf){
        resultf(func(value));
    }
}

sqrtc = unaryc(Math.sqrt);
sqrtc(81, store);
document.getElementById("ausgabe3.2.15").innerHTML = variable === 9;

// Aufgabe 3.2.16
function binaryc(func){
    return function(value1, value2, resultf){
        resultf(func(value1, value2));
    }
}

addc = binaryc(add);
addc(4, 5, store);
document.getElementById("ausgabe3.2.16.1").innerHTML = variable === 9;
mulc = binaryc(mul);
mulc(2, 3, store);
document.getElementById("ausgabe3.2.16.2").innerHTML = variable === 6;
