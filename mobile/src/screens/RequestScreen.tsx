import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import React from 'react';
import Wrapper from '../components/common/Wrapper';
import CustomHeader from '../components/common/CustomHeader';
import CustomSearchInput from '../components/common/CustomSearchInput';
import { useGetUserRequestsQuery } from '../redux/api/requestApi';
import UserRequestCard from '../components/UserRequestCard';

const RequestScreen = () => {
  const {data, isLoading} = useGetUserRequestsQuery();
  console.log("request data",data);

  return (
    <Wrapper>
        <CustomHeader title="Add Friends"/>
        <View className="px-3 mt-3">
            <CustomSearchInput/>
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
