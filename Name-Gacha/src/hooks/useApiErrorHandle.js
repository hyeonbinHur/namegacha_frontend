import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setError } from '../store/errorSlice';

const useApiErrorHandler = () => {
    const dispatch = useDispatch();
    const apiErrorhandler = useCallback(
        (error) => {
            console.log(error);
            console.log('Hello error');
            const serviceCode = error.response.data.code;
            const hpptMessage = error.response.message;
            dispatch(setError({ message: hpptMessage, code: serviceCode }));
        },
        [dispatch]
    );

    return { apiErrorhandler };
};

export default useApiErrorHandler;
