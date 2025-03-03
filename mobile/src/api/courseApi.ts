import axiosClient from './apiJWT';
 

class CourseAPI {
  HandleEvent = async (
    url:string,
    data?:any,
    method?: 'get' | 'post' | 'put' | 'delete',


  ) => {
    return await axiosClient(`/api/v1/course${url}`, {
        method: method ?? 'get',
        data,
      });
  }
}
const  courseApi = new CourseAPI();
export default courseApi;