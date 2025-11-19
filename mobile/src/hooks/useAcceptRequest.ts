import { useAcceptRequestMutation } from '../redux/api/requestApi';
import { ErrorShow } from '../utils/error';
import { ToastShow } from '../utils/toast';

export const useAcceptRequest = () => {
    const [acceptRequest, {isLoading:acceptRequestLoading}] = useAcceptRequestMutation();
  const handleAcceptRequest = async(requestId : string) => {
            try {
                const acceptedRequest = await acceptRequest({requestId}).unwrap();
                console.log(acceptedRequest);
                ToastShow(acceptedRequest.message);
            } catch (err) {
                ErrorShow(err);
            }
    };
      return {
        handleAcceptRequest,
        acceptRequestLoading,
      };
};

