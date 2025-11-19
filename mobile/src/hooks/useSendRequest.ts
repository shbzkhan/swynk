import { useSendRequestMutation } from '../redux/api/requestApi';
import { ErrorShow } from '../utils/error';
import { ToastShow } from '../utils/toast';

export const useSendRequest = () => {
    const [sendRequest, {isLoading:sendRequestLoading}] = useSendRequestMutation();
  const handleSendRequest = async(receiverId : string) => {
              try {
                  const sendedRequest = await sendRequest({receiverId}).unwrap();
                  console.log(sendedRequest);
                  ToastShow(sendedRequest.message);
              } catch (err) {
                  ErrorShow(err);
              }
      };
      return {
        handleSendRequest,
        sendRequestLoading,
      };
};

