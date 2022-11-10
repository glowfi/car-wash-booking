export const createError = (st, ms) => {
    const err = new Error();
    err.status = st;
    err.message = ms;
    return err;
};
