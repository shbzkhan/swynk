import React, { useState } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import CustomHeader from '../components/common/CustomHeader';
import CustomSearchInput from '../components/common/CustomSearchInput';
import Wrapper from '../components/common/Wrapper';
import UserRequestCard from '../components/UserRequestCard';
import { useGetUserRequestsQuery } from '../redux/api/requestApi';

const RequestScreen = () => {
  const [query, setQuery] = useState('');
  const {data, isLoading} = useGetUserRequestsQuery();

  return (
    <Wrapper>
        <CustomHeader title="Add Friends"/>
        <View className="px-3 mt-3">
            <CustomSearchInput
            value={query}
            handleChangeText={(e: React.SetStateAction<string>)=>setQuery(e)}
            />
            {
              !isLoading ? (
                <FlatList
                data={data}
                keyExtractor={(item)=>item._id}
                renderItem={({item})=>(
                  <UserRequestCard item={item} />
                )}
                />
              ) : (
                <ActivityIndicator/>
              )
            }
        </View>
    </Wrapper>
  );
};

export default RequestScreen;
