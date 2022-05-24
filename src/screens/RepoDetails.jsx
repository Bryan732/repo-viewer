import React, { useEffect, useState } from 'react';
import { View, Text, Linking, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getRepo } from '../redux/actions/user';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { COLORS } from '../constants/styles';

export default function RepoDetails({ route, navigation }) {

    const { repoName } = route.params;
    const dispatch = useDispatch();
    const repo = useSelector(state => state.repo.repo);
    const lang = useSelector(state => state.repo.language);
    const loading = useSelector(state => state.repo.loading);
    const [langList, setLangList] = useState([]);
    const [langSum, setLangSum] = useState(0);

    useEffect(() => {
        dispatch(getRepo(repoName));
    }, [dispatch]);

    useEffect(() => {
        if (lang?.data) {
            setLangList(Object.entries(lang.data));
        };
    }, [lang]);

    useEffect(() => {
        if (langList.length !== 0) {
            setLangSum(langList.map((lang) => lang[1]).reduce((a, b) => a + b));
        }
    }, [langList]);

    return (
        <View style={{ flex: 1, backgroundColor: '#0D1117', paddingHorizontal: 14, paddingTop: 10 }}>
            <View style={{ width: '100%' }}>
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                    <Ionicons name="arrow-back-outline" size={28} color='#c9d1d9' onPress={() => navigation.goBack()} style={{ alignSelf: 'center', flex: 1 }} />
                    <Text style={{ color: '#c9d1d9', fontSize: 24, fontWeight: 'bold', alignSelf: 'center' }}>Info</Text>
                    <Text style={{ flex: 1 }}></Text>
                </View>
                {loading ? (
                    <Text style={{ color: '#c9d1d9', textAlign: 'center', marginTop: 20, fontSize: 20 }}>Loading...</Text>
                ) : (
                    <View style={{ marginTop: 30 }}>
                        <Text style={{ color: '#fff', marginBottom: 30, fontSize: 20, fontWeight: 'bold' }}>{repoName}</Text>
                        <Text style={{ color: '#c9d1d9', fontSize: 18, fontWeight: 'bold' }}>About</Text>
                        <Text style={{ color: '#c9d1d9', marginTop: 5 }}>{repo?.data?.description}</Text>
                        <View style={{ flexDirection: 'row', marginTop: 20 }}>
                            <Entypo name="link" size={16} color="#58a6ff" style={{ alignSelf: 'center', marginTop: 3, marginRight: 5 }} />
                            <Text style={{ color: '#58a6ff', fontWeight: 'bold' }} onPress={() => Linking.openURL(repo?.data?.html_url)}>{repo?.data?.html_url.replace('https://', '')}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 25, justifyContent: 'space-around' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <AntDesign name="staro" size={18} color="#c9d1d9" style={{ alignSelf: 'center' }} />
                                <Text style={{ color: '#fff', fontWeight: 'bold' }}>&nbsp;{repo?.data?.stargazers_count}</Text>
                                <Text style={{ color: '#c9d1d9' }}>&nbsp;stars</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <AntDesign name="fork" size={16} color="#c9d1d9" style={{ alignSelf: 'center' }} />
                                <Text style={{ color: '#fff', fontWeight: 'bold' }}>&nbsp;{repo?.data?.forks}</Text>
                                <Text style={{ color: '#c9d1d9' }}>&nbsp;forks</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <AntDesign name="eyeo" size={18} color="#c9d1d9" style={{ alignSelf: 'center' }} />
                                <Text style={{ color: '#fff', fontWeight: 'bold' }}>&nbsp;{repo?.data?.watchers_count}</Text>
                                <Text style={{ color: '#c9d1d9' }}>&nbsp;watchers</Text>
                            </View>
                        </View>
                        <View style={{ marginTop: 40 }}>
                            <Text style={{ color: '#c9d1d9', marginBottom: 5, fontSize: 18, fontWeight: 'bold' }}>Languages</Text>
                            {langList?.map((lang, index) => {
                                return (
                                    <View key={index} style={{ flexDirection: 'row', marginBottom: 5 }}>
                                        <FontAwesome name="circle" size={12} color={COLORS[lang[0]]} style={{ alignSelf: 'center' }} />
                                        <Text style={{ color: '#c9d1d9', marginRight: 10, width: '35%', fontSize: 16 }}>&nbsp;{lang[0]}</Text>
                                        <Text style={{ color: '#c9d1d9', marginRight: 10, width: '30%', fontSize: 16 }}>{lang[1]}</Text>
                                        <Text style={{ color: '#c9d1d9', width: '30%', fontSize: 16 }}>{Math.round(lang[1] / langSum * 100, 2)} %</Text>
                                    </View>
                                )
                            })}
                        </View>
                    </View>
                )}
            </View>
        </View >
    )
}