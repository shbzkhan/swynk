import React, { useState } from 'react';
import Wrapper from '../components/common/Wrapper';
import CustomSearchInput from '../components/common/CustomSearchInput';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { ActivityIndicator, FlatList } from 'react-native';
import SearchUserCard from '../components/home/SearchUserCard';
import { useLazyGetSearchedUserQuery } from '../redux/api/userApi';

const SearchScreen = () => {
  const {user} = useSelector((state:RootState)=>state.auth);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [triggerSearch, { data, isFetching }] = useLazyGetSearchedUserQuery();

  const handleSearch = () =>{
    triggerSearch({page, query});
  };

  return (
    <Wrapper className="px-3 pt-5">
        <CustomSearchInput
          value={query}
          handleChangeText={(e: React.SetStateAction<string>)=>setQuery(e)}
          onSubmitEditing={handleSearch}
        />
        {
                      !isFetching ? (
                        <FlatList
                        data={data?.docs ?? []}
                        keyExtractor={(item)=>item._id}
                        contentContainerClassName="pt-3"
                        renderItem={({item})=>(
                          <SearchUserCard item={item} />
                        )}
                        />
                      ) : (
                        <ActivityIndicator/>
                      )
                    }
    </Wrapper>
  );
};

export default SearchScreen;
