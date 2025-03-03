export interface InstructorProps {
  id: number;
  image: string;
  name: string;
}

const InstructorData: InstructorProps[] = [
  {
    id: 1,
    image:
      "https://cdn.domestika.org/c_fill,f_auto,pg_1,w_480,ar_16:9/v1707316913/course-covers/000/005/029/5029-original.jpg?1707316913",
    name: "Alisa Alex",
  },
  {
    id: 2,
    image:
      "https://cdn.domestika.org/c_fill,dpr_auto,f_auto,h_674,pg_1,t_base_params,w_1200/v1660805427/course-covers/000/001/057/1057-original.jpg?1660805427",
    name: "Nguyen Hoang Hoa",
  },
];
export default InstructorData;
