import {
  useSuspenseQuery,
  useQuery,
  useQueryClient,
  useMutation,
} from "@tanstack/react-query";

import axios from "axios";

//fetch member my id
export const useFetchMembersDetail = (id) => {
  const { data } = useSuspenseQuery({
    queryKey: ["members", id],
    queryFn: async () => {
      return await axios.get(`http://localhost:4001/members/${id}`);
    },
    staleTime: 1000 * 60 * 5,
  });
  return { memberDetails: data };
};
//fetch single member
export const useFetchMember = () => {
  const { data } = useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      return await axios.get("http://localhost:4001/members");
    },
    staleTime: 1000 * 60 * 5,
  });
  return { member: data };
};

//edit member profile
export const useEditMember = (id) => {
  const queryClient = useQueryClient();
  const { mutateAsync: editMember } = useMutation({
    mutationFn: (updatedMember) =>
      axios.put(`http://localhost:4001/members/${id}`, updatedMember, {
        headers: { "Content-Type": "application/json" },
      }),
    onMutate: async (updatedMember) => {
      await queryClient.cancelQueries(["members", id]);
      await queryClient.cancelQueries(["members"]);

      const prevMemberData = queryClient.getQueryData(["members", id]);
      const prevMembersData = queryClient.getQueryData(["members"]);

      if (prevMemberData) {
        queryClient.setQueryData(["members", id], {
          ...prevMemberData,
          ...updatedMember,
        });
      }

      if (prevMembersData) {
        if (prevMembersData.data && Array.isArray(prevMembersData.data)) {
          queryClient.setQueryData(["members"], {
            ...prevMembersData,
            data: prevMembersData.data.map((member) =>
              member.id === id ? { ...member, ...updatedMember } : member
            ),
          });
        } else if (Array.isArray(prevMembersData)) {
          queryClient.setQueryData(
            ["members"],
            prevMembersData.map((member) =>
              member.id === id ? { ...member, ...updatedMember } : member
            )
          );
        }
      }

      return { prevMemberData, prevMembersData };
    },

    onError: (_error, _vars, context) => {
      if (context?.prevMemberData) {
        queryClient.setQueryData(["members", id], context.prevMemberData);
      }
      if (context?.prevMembersData) {
        queryClient.setQueryData(["members"], context.prevMembersData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(["members", id]);
      queryClient.invalidateQueries(["members"]);
    },
  });

  return { editMember };
};

//fetch posts
export const useFetchPosts = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      return await axios.get("http://localhost:4001/posts");
    },
    staleTime: 1000 * 60 * 10,
  });

  return { posts: data };
};
