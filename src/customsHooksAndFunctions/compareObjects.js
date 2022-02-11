function compareObjects(previousAction, action) {
    function compare(pA, a) {
        let result = [];
        if (Array.isArray(a)) {
            for (let element = 0; element < a.length; element++) {
                if (typeof a[element] === 'object' || Array.isArray(a[element])) {
                    result.push(compare(pA[element], a[element]));
                } else {
                    if (pA[element] !== a[element]) {
                        result.push(true);
                        return result;
                    } else result.push(false);
                }
            }
        } else for (let property in a) {
            if (typeof a[property] === 'object' || Array.isArray(a[property])) {
                result.push(compare(pA[property], a[property]));
            } else {
                if (pA[property] !== a[property]) {
                    result.push(true);
                    return result;
                } else result.push(false);
            }
        }
        result = result.flat(Infinity);
        return result;
    }

    for (let i of compare(previousAction, action)) {
        if (i === true) return true
    }
    return false;
}
compareObjects