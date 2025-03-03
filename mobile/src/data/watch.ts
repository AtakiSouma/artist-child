export interface WatchProps {
  id: string;
  name: string;
  description: string;
  automatic: boolean;
  image: string;
  brand: "Rolex" | "Omega" | "IWC" | "Seiko" | "Smart";
  like: boolean;
  feedbacks: feedBackData[];
  type: "gold" | "platinum" | "silver";
  price: number;
  isPopular: boolean;
}
export interface WatchBrand {}
export interface feedBackData {
  id: string;
  title: string;
  like: boolean;
  rate: number;
  timeComment: Date;
  image: string;
  name: string;
}
const WatchData: WatchProps[] = [
  {
    id: "1",
    name: "Rolex Cosmograph Daytona",
    description:
      "This model features an ice-blue dial with snailed counters, gold applique hour markers and hands with a Chromalight display, a highly-legible luminescent material. The central sweep seconds hand allows an accurate reading of 1/8 second, while the two counters on the dial display the lapsed time in hours and minutes. Drivers can accurately map out their track times and tactics without fail.",
    brand: "Rolex",
    automatic: true,
    type: "platinum",
    price: 2000,
    isPopular: true,
    feedbacks: [
      {
        id: "1",
        name: "Himeko",
        image:
          "https://static.wikia.nocookie.net/houkai-star-rail/images/5/56/Profile_Picture_March_7th_-_Welcome.png/revision/latest?cb=20230607060445",
        title: "Great watch! This is the best watch forever ",
        like: true,
        rate: 5,
        timeComment: new Date("2010-04-16T15:27:15.032Z"),
      },
      {
        id: "2",
        name: "March 7",
        image:
          "https://static.wikia.nocookie.net/houkai-star-rail/images/2/2d/Profile_Picture_Himeko_-_Welcome.png/revision/latest?cb=20230506135313",
        title: "Great watch! But this watch is so expensive for me to buy",
        like: true,
        rate: 4,
        timeComment: new Date("2024-01-16T15:27:15.032Z"),
      },
      {
        id: "3",
        name: "Mitsuha",
        image:
          "https://i.pinimg.com/736x/51/22/40/512240630643df5ae0a4e2d240974c9f.jpg",
        title: "Great watch! But this watch is so expensive for me to buy",
        like: true,
        rate: 3,
        timeComment: new Date("2023-06-16T15:27:15.032Z"),
      },
      {
        id: "4",
        name: "Nakano NiNo",
        image:
          "https://i.pinimg.com/736x/d5/17/d2/d517d2c8c9439d78cc063f4cb2204fec.jpg",
        title: "Great watch! But this watch is so expensive for me to buy",
        like: true,
        rate: 2,
        timeComment: new Date("2022-05-16T15:27:15.032Z"),
      },
      {
        id: "5",
        name: "Furina",
        image:
          "https://upload-os-bbs.hoyolab.com/upload/2023/09/24/90370867/868077085a9a66e98fd5a185f1ce9b4a_6524259466686913217.png?x-oss-process=image%2Fresize%2Cs_1000%2Fauto-orient%2C0%2Finterlace%2C1%2Fformat%2Cwebp%2Fquality%2Cq_80",
        title: "Great watch! Neubviltee buy it for me please nownwonwonw",
        like: true,
        rate: 5,
        timeComment: new Date("2024-02-16T15:27:15.032Z"),
      },
      {
        id: "6",
        name: "ALKalala",
        image:
          "https://static.wikia.nocookie.net/houkai-star-rail/images/5/56/Profile_Picture_March_7th_-_Welcome.png/revision/latest?cb=20230607060445",
        title: "Great watch! This is the best watch forever ",
        like: true,
        rate: 5,
        timeComment: new Date("2010-04-16T15:27:15.032Z"),
      },
    ],
    image:
      "https://rolex.dafc.com.vn/wp-content/uploads/watch-assets-front-facing/landscape_assets/m126506-0001_modelpage_front_facing_landscape.png",
    like: true,
  },
  {
    id: "2",
    name: "Rolex GMT-MASTER II",
    description:
      "This model features a black dial and a two-colour Cerachrom bezel insert in grey and black ceramic. In addition to conventional hour, minute and seconds hands, the GMT-Master II features an arrow-tipped hand, which circles the dial once every 24 hours, as well as a bidirectional rotatable 24-hour graduated bezel. ",
    brand: "Rolex",
    automatic: false,
    type: "platinum",
    price: 1700,
    feedbacks: [
      {
        id: "2",
        name: "Kafka",
        image: "https://avatarfiles.alphacoders.com/371/371396.png",
        title: "Great watch!",
        like: true,
        rate: 5,
        timeComment: new Date(),
      },
    ],
    image:
      "https://rolex.dafc.com.vn/wp-content/uploads/2023/05/m126713grnr-0001_collection_upright_landscape.png",
    like: true,
    isPopular: false,
  },
  {
    id: "3",
    name: " Apple Watch Ultra 2 GPS",
    description:
      "Apple Watch Ultra 2 GPS + Cellular 49mm with Titanium rim and Ocean strap is Apple's smartwatch that attracted a lot of attention from the media and technology lovers at the Wonderlust event in 2023. The watch has a trendy appearance. The upper is both extremely sporty and unique, and the internal features also have improvements that promise to satisfy users' expectations.",
    brand: "Omega",
    automatic: false,
    type: "platinum",
    price: 2600,
    feedbacks: [
      {
        id: "1",
        name: "FireFly",
        image:
          "https://upload-os-bbs.hoyolab.com/upload/2024/02/09/333240398/e2239ba995408f7fa73d26ea9d516f6e_4737337138680234961.jpg?x-oss-process=image%2Fresize%2Cs_1000%2Fauto-orient%2C0%2Finterlace%2C1%2Fformat%2Cwebp%2Fquality%2Cq_80",
        title: "Great watch!",
        like: true,
        rate: 5,
        timeComment: new Date(),
      },
    ],
    image:
      "https://cdn.tgdd.vn/Products/Images/7077/314710/apple-watch-ultra-lte-49mm-vien-titanium-day-ocean-xanh-duong-1.jpg",
    like: true,
    isPopular: false,
  },

  {
    id: "4",
    name: "Apple Watch SE (2022) GPS",
    description:
      "Apple Watch Ultra 2 GPS + Cellular 49mm with Titanium rim and Ocean strap is Apple's smartwatch that attracted a lot of attention from the media and technology lovers at the Wonderlust event in 2023. The watch has a trendy appearance. The upper is both extremely sporty and unique, and the internal features also have improvements that promise to satisfy users' expectations.",
    brand: "Smart",
    automatic: true,
    type: "gold",
    price: 20000,
    feedbacks: [
      {
        id: "1",
        name: "FireFly",
        image:
          "https://upload-os-bbs.hoyolab.com/upload/2024/02/09/333240398/e2239ba995408f7fa73d26ea9d516f6e_4737337138680234961.jpg?x-oss-process=image%2Fresize%2Cs_1000%2Fauto-orient%2C0%2Finterlace%2C1%2Fformat%2Cwebp%2Fquality%2Cq_80",
        title: "Great watch!",
        like: true,
        rate: 5,
        timeComment: new Date(),
      },
    ],
    image:
      "https://cdn.viettelstore.vn/Images/Product/ProductImage/35380746.jpeg",
    like: true,
    isPopular: false,
  },

  {
    id: "5",
    name: "Watch IWC Pilot's IW377717 Edition",
    description:
      "Apple Watch Ultra 2 GPS + Cellular 49mm with Titanium rim and Ocean strap is Apple's smartwatch that attracted a lot of attention from the media and technology lovers at the Wonderlust event in 2023. The watch has a trendy appearance. The upper is both extremely sporty and unique, and the internal features also have improvements that promise to satisfy users' expectations.",
    brand: "Smart",
    automatic: true,
    type: "silver",
    price: 25000,
    feedbacks: [
      {
        id: "1",
        name: "FireFly",
        image:
          "https://upload-os-bbs.hoyolab.com/upload/2024/02/09/333240398/e2239ba995408f7fa73d26ea9d516f6e_4737337138680234961.jpg?x-oss-process=image%2Fresize%2Cs_1000%2Fauto-orient%2C0%2Finterlace%2C1%2Fformat%2Cwebp%2Fquality%2Cq_80",
        title: "Great watch!",
        like: true,
        rate: 5,
        timeComment: new Date(),
      },
    ],
    image:
      "https://cdn.luxshopping.vn/Thumnails/Uploads/News/iwc-pilot-s-iw377717-edition-watch-43mm.png_980_980.webp",
    like: true,
    isPopular: false,
  },

  {
    id: "7",
    name: "King Seiko 233md Edition",
    description:
      "King Seiko is a mechanical watch brand that beautifully designed and finished mechanical watches with high accuracy. 49mm with Titanium rim and Ocean strap is Apple's smartwatch that attracted a lot of attention from the media and technology lovers at the Wonderlust event in 2023. The watch has a trendy appearance. The upper is both extremely sporty and unique, and the internal features also have improvements that promise to satisfy users' expectations.",
    brand: "Smart",
    automatic: true,
    type: "silver",
    price: 25000,
    feedbacks: [
      {
        id: "1",
        name: "FireFly",
        image:
          "https://upload-os-bbs.hoyolab.com/upload/2024/02/09/333240398/e2239ba995408f7fa73d26ea9d516f6e_4737337138680234961.jpg?x-oss-process=image%2Fresize%2Cs_1000%2Fauto-orient%2C0%2Finterlace%2C1%2Fformat%2Cwebp%2Fquality%2Cq_80",
        title: "Great watch!",
        like: true,
        rate: 5,
        timeComment: new Date(),
      },
    ],
    image:
      "https://cdn.luxshopping.vn/Thumnails/Uploads/News/seiko-king-seiko-watch-37mm1.png_980_980.webp",
    like: true,
    isPopular: false,
  },
  {
    id: "8",
    name: "Omega De Ville Prestige 424",
    description:
      "King Seiko is a mechanical watch brand that beautifully designed and finished mechanical watches with high accuracy. 49mm with Titanium rim and Ocean strap is Apple's smartwatch that attracted a lot of attention from the media and technology lovers at the Wonderlust event in 2023. The watch has a trendy appearance. The upper is both extremely sporty and unique, and the internal features also have improvements that promise to satisfy users' expectations.",
    brand: "Omega",
    automatic: true,
    type: "gold",
    price: 35000,
    feedbacks: [
      {
        id: "1",
        name: "FireFly",
        image:
          "https://upload-os-bbs.hoyolab.com/upload/2024/02/09/333240398/e2239ba995408f7fa73d26ea9d516f6e_4737337138680234961.jpg?x-oss-process=image%2Fresize%2Cs_1000%2Fauto-orient%2C0%2Finterlace%2C1%2Fformat%2Cwebp%2Fquality%2Cq_80",
        title: "Great watch!",
        like: true,
        rate: 5,
        timeComment: new Date(),
      },
    ],
    image:
      "https://monochrome-watches.com/wp-content/uploads/2020/05/Omega-Speedmaster-38mm-Co-Axial-Chronograph-Full-Gold-2020.jpg",
    like: true,
    isPopular: true,
  },
];

export const calculateAverageRate = (feedbacks: feedBackData[]): number => {
  if (feedbacks.length === 0) return 0;

  const totalRate = feedbacks.reduce((accumulator, currentFeedback) => {
    return accumulator + currentFeedback.rate;
  }, 0);

  return totalRate / feedbacks.length;
};

export default WatchData;
