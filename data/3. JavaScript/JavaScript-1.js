// Aufgabe 3.1.1
function identity_function(argmuent) {
    return function(){
        return argmuent;
    };
}

document.getElementById("ausgabe3.1.1").innerHTML = identity_function("Hello World!")();

// Aufgabe 3.1.2
function addf(x){
    return function(y){
        return x+y;
    };
}

document.getElementById("ausgabe3.1.2").innerHTML = addf(10)(20);

// Aufgabe 3.1.3
function add(x,y){
    return x+y;
}

function mul(x,y){
    return x*y;
}

function applyf(func){
    return function(x){
        return function(y){
            return func(x,y);
        };
    };
}

document.getElementById("ausgabe3.1.3.1").innerHTML = applyf(add)(10)(20);
document.getElementById("ausgabe3.1.3.2").innerHTML = applyf(mul)(10)(20);

// Aufgabe 3.1.4
function curry(func, attr){
    return function(y){
        return func(attr, y);
    };
}

document.getElementById("ausgabe3.1.4.1").innerHTML = curry(add, 3)(4);
document.getElementById("ausgabe3.1.4.2").innerHTML = curry(mul, 5)(6);

// Aufgabe 3.1.5
function inc(x){
    return addf(x)(1);
}

document.getElementById("ausgabe3.1.5").innerHTML = inc(5);

// Aufgabe 3.1.6
function add(x,y){
    return x+y;
}

function methodize(func){
    return function(y){
        return func(this, y);
    };
}

Number.prototype.add = methodize(add);
document.getElementById("ausgabe3.1.6").innerHTML = (3).add(5);

// Aufgabe 3.1.7
function demethodize(func){
    return function(x, y){
        return func.call(x, y);
    };
}

document.getElementById("ausgabe3.1.7").innerHTML = demethodize(Number.prototype.add)(5,6);

// Aufgabe 3.1.8
function twice(func){
    return function(x){
        return func(x,x);
    };
}

var double = twice(add);
var square = twice(mul);

document.getElementById("ausgabe3.1.8.1").innerHTML = double(11);
document.getElementById("ausgabe3.1.8.2").innerHTML = square(11);

// Aufgabe 3.1.9
function composeu(func1, func2){
    return function(x){
        return func2(func1(x));
    }
}

document.getElementById("ausgabe3.1.9").innerHTML = composeu(double, square)(3);

// Aufgabe 3.1.10
function composeb(func1, func2){
    return function(x, y, z){
        return func2(func1(x,y),z);
    }
}

document.getElementById("ausgabe3.1.10").innerHTML = composeb(add, mul)(2, 3, 5);

// Aufgabe 3.1.11
function once(func){
    var error = false;
    return function(x, y){
        if(error){
            throw "Already called once!";
        }else{
            error = true;
            return func(x,y);
        }
    }
}

var add_once = once(add);
document.getElementById("ausgabe3.1.11.1").innerHTML = add_once(3,4);
var output;
try{
    output = add_once(3,4)
}catch(e){
    output = e;
}
document.getElementById("ausgabe3.1.11.2").innerHTML = output;

// Aufgabe 3.1.12
function counterf(x){
    return{
        inc:function(){
            x = x+1;
            return x; 
        },
        dec:function(){
            x = x-1;
            return x;
        }
    }
}

var counter = counterf(10);
document.getElementById("ausgabe3.1.12.1").innerHTML = counter.inc();
document.getElementById("ausgabe3.1.12.2").innerHTML = counter.dec();

// Aufgabe 3.1.13
function revocable(func){
    var error = false;
    return{
        invoke:function(){
            if(error){
                throw "Fehlerabbruch!";
            }else{
                return func.apply(this, arguments);
            }
        },
        revoke:function(){
            error = true;
        }
    }
}

// Alternativ mit wirklichem zurück nehmen:

function revocable(func){
    return{
        invoke:function(){
            return func.apply(this, arguments);
        },
        revoke:function(){
            func = null;
        }
    }
}

var temp = revocable(add);
document.getElementById("ausgabe3.1.13.1").innerHTML = temp.invoke(7,10);
temp.revoke();
var output;
try{
    output = temp.invoke(7,10);
}catch(e){
    output = e;
}
document.getElementById("ausgabe3.1.13.2").innerHTML = output;

// Aufgabe 3.1.14
function vector(){
    arr = [];

    return{
        append:function(x){
            arr.push(x);
        },
        store:function(x, y){
            arr[x] = y;
        },
        get:function(x){
            return arr[x];
        }
    }
}

my_vector = vector();
my_vector.append(7);
my_vector.store(1,8);
document.getElementById("ausgabe3.1.14.1").innerHTML = my_vector.get(0);
document.getElementById("ausgabe3.1.14.2").innerHTML = my_vector.get(1);
