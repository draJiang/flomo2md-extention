export type userInfoType = {
    verified: boolean
};

export interface memoType {
    id: string,
    name: string,
    index: string,
    time: string,
    time2: string,
    content: string,
    files: (string | null)[]
}