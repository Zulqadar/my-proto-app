import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";

import { CreateRequestEntity, priorityAsKeyValueList as PriorityList, requestApproversAsKeyValueList as ApproversList } from "../../models/view-models";
import { useAppSelector } from "../../hooks";
import { selectUser } from "../../store/features/user/user-slice";

export interface CreateRequestScreenProps {
    navigation?: any
}

export const CreateRequestScreen = ({ navigation }: CreateRequestScreenProps) => {
    const userDetails = useAppSelector(selectUser);
    const [showDropDown, setShowDropDown] = useState(false);
    const [showApproversDropdown, setShowApproversDropdown] = useState(false);
    const [formData, setFormData] = useState<CreateRequestEntity>({
        body: '',
        priority: 'Low',
        title: '',
        userId: userDetails.userId || '',
        approversUserId: ''
    });

    const handleSubmit = () => {
        // Handle form submission here
        console.log('form: ', formData)
    };

    return (
        <View style={styles.container}>
            <TextInput
                mode="outlined"
                label={'Title'}
                value={formData.title}
                onChangeText={(text) => { setFormData(prevState => ({ ...prevState, title: text })) }}
            />

            <View style={styles.spacerStyle} />

            <DropDown
                label={"Priority"}
                mode={"outlined"}
                visible={showDropDown}
                showDropDown={() => setShowDropDown(true)}
                onDismiss={() => setShowDropDown(false)}
                value={formData.priority}
                setValue={(text) => { setFormData(prevState => ({ ...prevState, priority: text })) }}
                list={PriorityList}
            />

            <View style={styles.spacerStyle} />

            <DropDown
                label={"Approvers"}
                mode={"outlined"}
                visible={showApproversDropdown}
                showDropDown={() => setShowApproversDropdown(true)}
                onDismiss={() => setShowApproversDropdown(false)}
                value={formData.approversUserId}
                setValue={(text) => { setFormData(prevState => ({ ...prevState, approversUserId: text })) }}
                list={ApproversList}
                multiSelect
            />

            <View style={styles.spacerStyle} />

            <TextInput
                mode="outlined"
                label={'Request Body'}
                value={formData.body}
                multiline={true}
                numberOfLines={15}
                onChangeText={(text) => { setFormData(prevState => ({ ...prevState, body: text })) }}
            />

            <View style={styles.spacerStyle} />

            <View style={styles.buttonContainer}>
                <Button mode="contained" onPress={handleSubmit}>
                    Submit
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 24,
        justifyContent: 'space-between'
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    spacerStyle: {
        marginBottom: 15,
    },
    buttonContainer: {
        marginTop: '20%',
    },
})