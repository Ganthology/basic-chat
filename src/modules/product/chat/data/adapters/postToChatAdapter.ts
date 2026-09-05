export const postToChatAdapter = {
  toCreatePost(input: { userId: string; body: string }): {
    userId: number;
    title: string;
    body: string;
  } {
    const title = input.body.trim().slice(0, 80);
    return {
      userId: Number(input.userId),
      title: title.length > 0 ? title : "Message",
      body: input.body,
    };
  },
};
