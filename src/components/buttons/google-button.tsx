import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

interface Props {
    onPress: () => void
}

export const GoogleLoginButton: FC<Props> = ({
    onPress
}) => {
    return (
        <Button
            style={styles.button}
            icon="google"
            mode="contained"
            onPress={onPress}>
            Log in with Google
        </Button>
    );
};

const styles = StyleSheet.create({
    button: {
        marginHorizontal: 0,
        marginTop: 20,
        width: '80%',
        backgroundColor: '#db4437',
    },
});

export default GoogleLoginButton;
