export interface CourseInfo {
    public_id: string;
    url: string;
    price:number;
}

export interface UserInfo {
    _id: string;
    name: string;
}

export interface OrderData {
    id: string;
    status: string;
    payment_info: string;
    course: {
        thumbnail: CourseInfo;
        _id: string;
        name: string;
    };
    user: UserInfo;
    createdAt: string;
}
