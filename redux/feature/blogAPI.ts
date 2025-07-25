import baseApi from "../api/baseAPI";

const blogAPI = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getBlogs: build.query<any, any>({
      query: () => ({
        url: `/blog/all-blogs`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        method: "GET",
      }),
    }),

    getBlogById: build.query<any, string>({
      query: (id) => ({
        url: `/blog/get-details/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        method: "GET",
      }),
    }),

    createBlog: build.mutation<any, any>({
      query: (data) => ({
        url: `/blog/create-blog`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        method: "POST",
        body: data,
      }),
    }),

    updateBlog: build.mutation<any, { data: any; id: string }>({
      query: ({ data, id }) => ({
        url: `/blog/update-blog/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        method: "PUT",
        body: data,
      }),
    }),

    deleteBlog: build.mutation<any, string>({
      query: (id) => ({
        url: `/blog/delete-blog/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useGetBlogByIdQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogAPI;
export default blogAPI;
