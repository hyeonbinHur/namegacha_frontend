const checkIdValidation = (username) => {
    if (username.length >= 5) {
        return true;
    } else {
        return false;
    }
};

const checkPasswordValidation = (password) => {
    if (password.length >= 7) {
        return true;
    } else {
        return false;
    }
};

const checkIsPasswordMatch = (password, passwordCheck) => {
    if (password === passwordCheck) {
        return true;
    } else {
        return false;
    }
};

export { checkIdValidation, checkIsPasswordMatch, checkPasswordValidation };
