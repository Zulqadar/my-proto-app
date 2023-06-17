import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

interface Props {
    onPress: () => void
}

export const FacebookLoginButton: FC<Props> = ({
    onPress
}) => {
    return (
        <Button
            style={styles.button}
            icon="facebook"
            mode="contained"
            onPress={onPress}>
            Log in with Facebook
        </Button>
    );
};

const styles = StyleSheet.create({
    button: {
        marginHorizontal: 0,
        marginTop: 20,
        width: '80%',
        backgroundColor: '#3b5998',
    },
});

export default FacebookLoginButton;
