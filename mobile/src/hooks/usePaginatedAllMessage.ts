import { useEffect, useState } from "react";
import { useGetMesssagesQuery } from "../redux/api/messageApi";
import { RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setMessage } from "../redux/slice/messageSlice";

interface UsePaginatedMessagesProps {
  conversationId?: string;
  initialPage?: number;
}
export const usePaginatedAllMessage = ({conversationId, initialPage = 1}:UsePaginatedMessagesProps) =>{
  const dispatch = useDispatch();
    const [page, setPage] = useState(initialPage);
    const {data, isLoading, isFetching} = useGetMesssagesQuery({conversationId});

useEffect(() => {
    if (page === 1) {
      dispatch(setMessage(data?.docs));
    } else {
      const combinedMessage =
        page === 1 ? data?.docs : [...allMessage, ...data?.docs];
      const uniqueMessage = Array.from(
        new Map(
          combinedMessage?.map(message => [message._id, message]),
        ).values(),
      );
      dispatch(setMessage(uniqueMessage));
    }
  }, [data, page]);

  // useEffect(()=>{

  // },[]);

  const handleLoadMore = () => {
    if (!isFetching && data?.hasNextPage) {
      setPage(prev => prev + 1);
    }
  };

  return {

    isLoading,
    isFetching,
    page,
    handleLoadMore,
    // total: data?.totalDocs,
  };
};
