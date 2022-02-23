function sum (a, b, c) {
    let val1 = a
    let val2 = b
    let val3 = c
    if (!val1 || !val2 || !val3) {
        const callSum = (a1, b1)=> {
            if (!val2) {
                val2 = a1
                val3 = b1
            }else {
                val3 = a1
            }
            if (val1 && val2 && val3){
                return val1 + val2 + val3
            }
            if (!val3){
                return callSum
            }
        }
        return callSum
    }
    return val1 + val2 + val3;
}
