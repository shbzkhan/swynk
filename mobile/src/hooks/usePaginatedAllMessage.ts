import { useEffect, useState } from "react";
import { useGetMesssagesQuery } from "../redux/api/messageApi";

interface UsePaginatedMessagesProps {
  conversationId?: string;
  initialPage?: number;
}
export const usePaginatedAllMessage = ({conversationId, initialPage = 1}:UsePaginatedMessagesProps) =>{
    const [page, setPage] = useState(initialPage);
    const [allMessage, setAllMessage] = useState([]);
    const {data, isLoading, isFetching} = useGetMesssagesQuery({conversationId});

useEffect(() => {
    if (page === 1) {
      setAllMessage(data?.docs);
    } else {
      const combinedMessage =
        page === 1 ? data?.docs : [...allMessage, ...data?.docs];
      const uniqueMessage = Array.from(
        new Map(
          combinedMessage?.map(message => [message._id, message]),
        ).values(),
      );
      setAllMessage(uniqueMessage);
    }
  }, [data, page]);

  useEffect(()=>{

  },[]);

  const handleLoadMore = () => {
    if (!isFetching && data?.hasNextPage) {
      setPage(prev => prev + 1);
    }
  };

  return {
    allMessage,
    setAllMessage,
    isLoading,
    isFetching,
    page,
    handleLoadMore,
    // total: data?.totalDocs,
  };
};
