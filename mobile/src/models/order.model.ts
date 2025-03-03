export interface OrderData {
    _id: string;
    courseId: {
        name: string;
        thumbnail: {
            public_id: string;
            url: string;
        };
        _id: string;
        price: number;
    };
    userId: string;
    note: string;
    payment_info: {
        Visa_Card: string;
        MM_YY: string;
        CVC: string;
        Country: string;
        ZipCode: string;
    };
    finished_At: string;
    status: string;
    isBan: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
