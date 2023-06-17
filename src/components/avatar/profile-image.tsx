import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Avatar, Headline } from 'react-native-paper';

interface Props {
    uri: string
    size?: number
    name?: string
    styles?: any
}

export const ProfileImage = ({
    uri,
    size = 150,
    name,
    styles
}: Props) => (
    <>
        <Avatar.Image
            size={size}
            source={{ uri: uri }}
            style={styles}
        />
        {name && (<Headline style={{ ...avatarStyles.username }}>{name}</Headline>)}
    </>
);

const avatarStyles = StyleSheet.create({
    username: {
        marginLeft: 10,
        fontSize: 20,
        fontWeight: 'bold'
    }
});

export default ProfileImage;
