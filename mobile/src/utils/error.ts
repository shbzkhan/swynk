import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { ToastShow } from './toast';

const ErrorShow = (err: any, toastId?: string)=>{
    const error = err as FetchBaseQueryError;
        const errorMsg = error.data as { message: string };
        if(toastId){
            ToastShow(errorMsg.message, toastId, 'danger');
        }else{
            ToastShow(errorMsg.message, null, 'danger');
        }

};

export { ErrorShow };
