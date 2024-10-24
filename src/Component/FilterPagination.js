import axios from "axios";

export const FilterPagination = async ({
  create_new_arr = false,
  state,
  data,
  page,
  counteRoute,
  data_to_send ={},
}) => {
  let obj;

  if (!state == null && !create_new_arr) {
    obj = { ...state, results: [...state.results, ...data], page: page };
  } else {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/blog" + counteRoute,
        data_to_send
      );
      if (data.count) {
        obj = { results: data.count, page: 1};
      }
    } catch (error) {
      console.log(error);
    }
  }
    
    return obj
    
};
