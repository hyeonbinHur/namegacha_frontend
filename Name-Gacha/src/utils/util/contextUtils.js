const isContextVerity = (contextTarget, name, id) => {
    if (contextTarget.name == name && contextTarget.id == id) {
        return true;
    } else return false;
};

const checkIsRename = (showContext, isRename) => {
    if (showContext && isRename) {
        return true;
    } else return false;
};

export { isContextVerity, checkIsRename };
