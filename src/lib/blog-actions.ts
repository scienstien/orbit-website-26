"use server";

export async function likePost(_postId: string) {
  // const user = await requireSession({ mode: "throw" });
  // TODO: create or toggle a like using user.id and postId.
}

export async function createComment(_postId: string, _content: string) {
  // const user = await requireSession({ mode: "throw" });
  // TODO: create a comment using user.id, postId, and content.
}

export async function createNewPost() {
  // const user = await requireWriter({ mode: "throw" });
  // TODO: create a draft post with authorId = user.id.
}

export async function updatePost(_postId: string) {
  // const user = await requireSession({ mode: "throw" });
  // const post = await db.post.findUnique(...)
  // if (!post || !canUpdatePost(user, post)) throw new Error("Unauthorized");
  // TODO: update the post.
}

export async function deletePost(_postId: string) {
  // const user = await requireWriter({ mode: "throw" });
  // const post = await db.post.findUnique(...)
  // if (!post || !canDeletePost(user, post)) throw new Error("Unauthorized");
  // TODO: delete the post.
}
