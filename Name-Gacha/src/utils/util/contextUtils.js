const isContextVerity = (contextTarget, name, id) => {
    if (contextTarget.name === name && contextTarget.id === id) {
        return true;
    } else return false;
};

const checkIsRename = (showContext, isRename) => {
    if (showContext && isRename) {
        return true;
    } else return false;
};

const isContextOpen = (isContext, isContextOpen) => {
    if (isContext && isContextOpen) {
        return true;
    } else return false;
};

const checkIsAdd = (isContext, isAddRedux) => {
    if (isContext && isAddRedux) {
        return true;
    } else return false;
};

export { isContextVerity, checkIsRename, isContextOpen, checkIsAdd };
