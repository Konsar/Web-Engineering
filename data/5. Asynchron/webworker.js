function isPrime(number){
    for(let i = 2; i < number; i++){
        if(number % i == 0) return false;
    }
    return true;
}

self.addEventListener("message", function(e){
    console.log("Worker started");
    console.log(e.data);
    for(let i = 2; i < e.data; i++){
        if(isPrime(i)){
            self.postMessage(i);
        }
    }
    console.log("Worker finished");
    self.postMessage(-1);
})
