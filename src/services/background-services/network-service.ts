import { NetInfoStateType, useNetInfo } from '@react-native-community/netinfo';
import { useEffect } from 'react';
import PushNotification from 'react-native-push-notification';

export const useNetworkStatus = () => {
    const netInfo = useNetInfo();
    useEffect(() => {
        if (netInfo.type !== NetInfoStateType.unknown && netInfo.isConnected) {
            // Send notification
            PushNotification.localNotification({
                channelId: 'my-channel', // The ID of the notification channel
                title: 'Internet Access',
                message: 'You have internet access now!',
            });
        }
    }, [netInfo.isConnected, netInfo.type]);
};

PushNotification.createChannel(
    {
        channelId: 'my-channel',
        channelName: 'My Channel',
    },
    created => console.log(`createChannel returned '${created}'`)
);

PushNotification.configure({
    onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
    },
});