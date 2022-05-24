import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


export default function Search({ route, navigation }) {

    const { repo } = route.params;
    const [repoList, setRepoList] = useState(repo);

    const handleSearch = (value) => {
        if (!value.length) return setRepoList(repo);

        const filteredData = repoList.filter((item) => {
            return item.name.toLowerCase().includes(value.toLowerCase())
        });

        if (filteredData.length) {
            setRepoList(filteredData);
        } else {
            setRepoList(repo);
        };

        console.log(value);
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#0D1117', paddingHorizontal: 14, paddingTop: 10 }}>
            <View style={{ width: '100%', flexDirection: 'row', marginBottom: 20, alignItems: 'center' }}>
                <Ionicons name="arrow-back-outline" size={28} color='#c9d1d9' onPress={() => navigation.goBack()} />
                <TextInput placeholder='Search for repository' placeholderTextColor='#c9d1d9' style={{ width: '90%', height: 40, marginLeft: 9, paddingLeft: 10, color: '#c9d1d9', backgroundColor: '#161b22', borderRadius: 8, fontWeight: 'bold' }} onChangeText={handleSearch} />
            </View>
            <ScrollView>
                {repoList.map((list, index) => {
                    return (
                        <View key={index} style={{ padding: 10 }}>
                            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between' }} onPress={() => navigation.navigate('RepoDetails', { repoName: list.name })}>
                                <Text style={{ color: '#c9d1d9', fontWeight: 'bold', fontSize: 16 }}>{list.name}</Text>
                                <Ionicons name="arrow-forward" size={24} color="#c9d1d9" />
                            </TouchableOpacity>
                        </View>
                    )
                })}
            </ScrollView>
        </View>
    )
}