export type Priority = 'High' | 'Medium' | 'Low';
export const priorityAsKeyValueList: { label: Priority, value: Priority }[] = [
    { label: 'High', value: 'High' },
    { label: 'Medium', value: 'Medium' },
    { label: 'Low', value: 'Low' }
];

export const requestApproversAsKeyValueList: { label: string, value: string }[] = [
    { label: 'Adnan', value: '1001' },
    { label: 'Shariq', value: '1002' },
    { label: 'Zulqadar', value: '1003' },
];

export interface CreateRequestEntity {
    title: string
    body: string
    userId: string
    priority: Priority
    approversUserId?: string
}

export interface RequestEntityResponse {
    id: number
    title: string
    body: string
    userId: string
}