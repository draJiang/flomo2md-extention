export type userInfoType = {
    verified: boolean
};

export interface memoType {
    id: string,
    time: string,
    time2: string,
    content: string,
    files: (string | null)[]
}