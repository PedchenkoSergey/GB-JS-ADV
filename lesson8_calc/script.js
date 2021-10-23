const sum = (x, y) => {
    if ((x == undefined) || (y == undefined) || (typeof(x) !== 'number') || (typeof(y) !== 'number')) {
        return null
    }
    return x + y
}

const sub = (x, y) => {
    if ((x == undefined) || (y == undefined) || (typeof(x) !== 'number') || (typeof(y) !== 'number')) {
        return null
    }
    return x - y
}

const multiple = (x, y) => {
    if ((x == undefined) || (y == undefined) || (typeof(x) !== 'number') || (typeof(y) !== 'number')) {
        return null
    }
    return x * y
}

const division = (x, y) => {
    if ((x == undefined) || (y == undefined) || (typeof(x) !== 'number') || (typeof(y) !== 'number')) {
        return null
    }
    return x / y
}


module.exports = {
    sum: sum,
    sub: sub,
    multiple: multiple,
    division: division
}