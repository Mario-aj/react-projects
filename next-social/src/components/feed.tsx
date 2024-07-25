import { Post } from "./post";

type Props = {};
export const Feed = ({}: Props) => {
  return (
    <section className="p-4 bg-white shadow-md rounded-lg flex flex-col gap-12">
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </section>
  );
};
