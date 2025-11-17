import { View, Text } from 'react-native';
import React from 'react';
import Wrapper from '../components/common/Wrapper';
import CustomHeader from '../components/common/CustomHeader';
import CustomSearchInput from '../components/common/CustomSearchInput';

const RequestScreen = () => {
  return (
    <Wrapper>
        <CustomHeader title="Add Friends"/>
        <View className="px-3 mt-3">
            <CustomSearchInput/>
        </View>
    </Wrapper>
  );
};

export default RequestScreen;
