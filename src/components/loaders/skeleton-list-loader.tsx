import React from 'react';
import { View, Text } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export interface SkeletonListLoaderProps {
    repetitions?: number
}

const SkeletonListLoader = ({
    repetitions = 10
}: SkeletonListLoaderProps) => {
    return (
        <>
            {Array.from({ length: repetitions }, (_, index) => (
                <View key={index} style={{ flex: 1, padding: 15 }}>
                    <SkeletonPlaceholder borderRadius={4}>
                        <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
                            <SkeletonPlaceholder.Item width={60} height={60} borderRadius={50} />
                            <SkeletonPlaceholder.Item marginLeft={20}>
                                <SkeletonPlaceholder.Item width={250} height={20} />
                                <SkeletonPlaceholder.Item marginTop={6} width={100} height={20} />
                            </SkeletonPlaceholder.Item>
                        </SkeletonPlaceholder.Item>
                    </SkeletonPlaceholder>
                </View>
            ))}
        </>
    );
};

export default SkeletonListLoader;
