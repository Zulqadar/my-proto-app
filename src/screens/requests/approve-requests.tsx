import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { List, Button, Divider } from "react-native-paper";

export interface ApproveRequestScreenProps {
    navigation?: any
}

const data = [
    { id: '1', title: 'Item 1', description: 'Description 1' },
    { id: '2', title: 'Item 2', description: 'Description 2' },
    { id: '3', title: 'Item 3', description: 'Description 3' },
];

export const ApproveRequestScreen = ({ navigation }: ApproveRequestScreenProps) => {

    return (
        <View style={styles.container}>
            <List.AccordionGroup>
                {data.map((item) => (
                    <>
                        <List.Accordion
                            right={(props) => <List.Icon {...props} icon={"folder"} />}
                            title={item.title}
                            description={item.description}
                            id={item.id}
                        >
                            <View style={styles.buttonContainer}>
                                <Button style={styles.approveButton} mode="outlined">Approve</Button>
                                <Button style={styles.rejectButton} mode="outlined">Reject</Button>
                            </View>
                        </List.Accordion>
                        <Divider />
                    </>
                ))}
            </List.AccordionGroup>
            <List.Item
                title="First Item"
                description="Item description"
                left={props => <List.Icon {...props} icon="folder" />}
            />
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    approveButton: {
        width: '45%',
        // backgroundColor: 'green',
        // color: '#fff'
    },
    rejectButton: {
        width: '45%',
        // backgroundColor: 'red',
        // color: '#fff'
    }
})