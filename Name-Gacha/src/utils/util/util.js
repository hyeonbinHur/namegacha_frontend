function checkPendingStatus(array) {
    for (let item of array) {
        if (item === 'pending') {
            return true;
        }
    }
    return false;
}

export { checkPendingStatus };
