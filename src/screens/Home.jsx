import React, { useEffect, useState } from 'react';
import { View, Text, StatusBar, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../redux/actions/user';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

export default function Home() {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);
    const error = useSelector(state => state.user.error);
    const loading = useSelector(state => state.user.loading);
    const [currentNum, setCurrentNum] = useState(10);
    const [loadmore, setLoadmore] = useState(false);

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);


    const loadMoreResults = () => {
        if (currentNum < user?.data?.length) {
            setLoadmore(true);
        }

        setTimeout(() => {
            setCurrentNum(currentNum + 5);
            setLoadmore(false);
        }, 2000);
    };

    const renderFooter = () => {
        if (!loadmore) {
            return <View style={{ padding: 15, margin: 20 }}></View>
        } else {
            return (
                <View style={{ padding: 15, marginBottom: 60 }}>
                    {loadmore && <Text style={{ color: '#fff', fontSize: 16, marginTop: -20, textAlign: 'center' }}>Loading...</Text>}
                </View>
            )
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#0D1117' }}>
            <StatusBar
                barStyle='light-content'
                backgroundColor='#0D1117'
                translucent={false}
            />
            {error ? (
                <>
                    <Text>{error}</Text>
                </>
            ) : (
                <>
                    <View style={{ padding: 20 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                            <Text style={{ color: '#c9d1d9', fontSize: 26, fontWeight: 'bold' }}>React Native Community</Text>
                            <AntDesign style={{ alignSelf: 'center' }} name="search1" size={26} color="#c9d1d9" onPress={() => navigation.navigate('Search', { repo: user.data })} />
                        </View>
                        {loading ? (
                            <>
                                <Text style={{ textAlign: 'center', color: '#c9d1d9' }}>Loading...</Text>
                            </>
                        ) : (
                            <View>
                                <FlatList
                                    contentContainerStyle={{ marginBottom: 1000 }}
                                    ListFooterComponent={renderFooter}
                                    scrollEventThrottle={250}
                                    onEndReached={loadMoreResults}
                                    onEndReachedThreshold={0.5}
                                    showsVerticalScrollIndicator={false}
                                    data={user?.data?.slice(0, currentNum)}
                                    keyExtractor={(item) => item.id}
                                    renderItem={({ item, index }) => {
                                        return (
                                            <TouchableOpacity onPress={() => navigation.navigate('RepoDetails', { repoName: item.name })} key={index}>
                                                <Text style={{ color: '#58a6ff', marginTop: 10, fontSize: 20 }}>{item.name}</Text>
                                                <Text style={{ color: '#c9d1d9', fontSize: 16, paddingBottom: 14 }}>{item.description}</Text>
                                            </TouchableOpacity>
                                        )
                                    }}
                                />
                            </View>
                        )}
                    </View>
                </>
            )}
        </SafeAreaView>
    )
}