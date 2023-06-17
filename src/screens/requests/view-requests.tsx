import { FlatList, StyleSheet, View } from "react-native";
import { ActivityIndicator, Divider, List, Text } from "react-native-paper";
import { requestService } from "../../services/http-services";
import { useEffect, useState } from "react";
import { RequestEntityResponse } from "../../models/view-models";
import React from "react";
import { SkeletonListLoader } from "../../components/loaders";

export interface ViewRequestScreenProps {
    navigation?: any
}

export const ViewRequestScreen = ({ navigation }: ViewRequestScreenProps) => {
    const [data, setData] = useState<RequestEntityResponse[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        // Call the `get` method to retrieve data from the API endpoint
        requestService.get().then((response) => {
            setData(response);
            setIsLoading(false);
        });
    }, []);

    const renderItem = ({ item }: { item: RequestEntityResponse }) => (
        <React.Fragment key={item.id}>
            <List.Item
                title={item.title}
                description={item.body}
                left={props => <List.Icon {...props} icon="folder" />}
                onPress={() => console.log('Pressed')}
            />
            <Divider />
        </React.Fragment>
    );

    return (
        <View style={{ flex: 1 }}>
            {isLoading && <SkeletonListLoader repetitions={10} />}
            {!isLoading && (
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    
})