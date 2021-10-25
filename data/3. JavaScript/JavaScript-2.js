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
        if(innervalue == undefined){
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
        if(innervalue == undefined){
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
    return m(m1.value + m2.value, "(" + m1.source + "+" + m2.source + ")")
}

document.getElementById("ausgabe3.2.7").innerHTML = JSON.stringify(addm(m(3), m(4)));

// Aufgabe 3.2.8


document.getElementById("ausgabe3.2.8").innerHTML = "";

// Aufgabe 3.2.9


document.getElementById("ausgabe3.2.9").innerHTML = "";

// Aufgabe 3.2.10


document.getElementById("ausgabe3.2.10").innerHTML = "";

// Aufgabe 3.2.11


document.getElementById("ausgabe3.2.11").innerHTML = "";

// Aufgabe 3.2.12


document.getElementById("ausgabe3.2.12").innerHTML = "";

// Aufgabe 3.2.13


document.getElementById("ausgabe3.2.13").innerHTML = "";

// Aufgabe 3.2.14


document.getElementById("ausgabe3.2.14").innerHTML = "";

// Aufgabe 3.2.15


document.getElementById("ausgabe3.2.15").innerHTML = "";

// Aufgabe 3.2.16


document.getElementById("ausgabe3.2.16").innerHTML = "";