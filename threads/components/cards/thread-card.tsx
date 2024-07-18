import Image from "next/image";
import Link from "next/link";

interface Props {
  id: string;
  currentUserId: string;
  parentId: string;
  content: string;
  author: {
    name: string;
    image: string;
    id: string;
  };
  community: {
    id: string;
    name: string;
    image: string;
  } | null;
  createdAt: string;
  comments: Array<{
    author: { image: string };
  }>;
  isComment?: boolean;
}

export const ThreadCard = ({
  id,
  parentId,
  currentUserId,
  content,
  comments,
  community,
  author,
  createdAt,
  isComment = false,
}: Props) => {
  return (
    <article className="flex w-full flex-col rounded-xl bg-dark-2 p-7">
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-grow gap-4">
          <div className="flex flex-col items-center">
            <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
              <Image
                src={author.image}
                alt="Profile image"
                fill
                className="rounded-full cursor-pointer"
              />
            </Link>

            <div className="thread-card_bar" />
          </div>

          <div className="flex w-full flex-col">
            <Link className="w-fit" href={`/profile/${author.id}`}>
              <h4 className="cursor-pointer text-base-semibold text-light-1">
                {author.name}
              </h4>
            </Link>

            <p className="mt-2 text-small-regular text-light-1">{content}</p>

            <div className="mt-5 flex flex-col gap-3">
              <div className="flex gap-3.5">
                <Image
                  width={24}
                  alt="heart"
                  height={24}
                  src="/assets/heart-gray.svg"
                  className="cursor-pointer object-contain"
                />

                <Link href={`/thread/${id}`}>
                  <Image
                    width={24}
                    alt="reply"
                    height={24}
                    src="/assets/reply.svg"
                    className="cursor-pointer object-contain"
                  />
                </Link>

                <Image
                  width={24}
                  alt="repost"
                  height={24}
                  src="/assets/repost.svg"
                  className="cursor-pointer object-contain"
                />

                <Image
                  width={24}
                  alt="share"
                  height={24}
                  src="/assets/share.svg"
                  className="cursor-pointer object-contain"
                />
              </div>

              {isComment && comments.length && (
                <Link href={`/thread/${parentId}`}>
                  <p className="mt-1 text-subtle-medium text-gray-1">
                    {comments.length} replaies
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
