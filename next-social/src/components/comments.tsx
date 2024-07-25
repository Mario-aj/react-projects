import Image from "next/image";

type Props = {};
export const Comments = ({}: Props) => {
  return (
    <section className="">
      <div className="flex items-center gap-4">
        <Image
          src="https://images.pexels.com/photos/256381/pexels-photo-256381.jpeg?auto=compress&cs=tinysrgb&w=400"
          alt=""
          width={32}
          height={32}
          className="w-8 h-8 rounded-full"
        />

        <div className="flex-1 flex items-center justify-between bg-slate-100 rounded-xl text-sm px-6 py-2 w-full">
          <input
            type="text"
            placeholder="Write a comment..."
            className="flex-1 bg-transparent outline-none"
          />

          <Image
            alt=""
            width={16}
            height={16}
            src="/emoji.png"
            className="cursor-pointer"
          />
        </div>
      </div>

      <div className="">
        <div className="flex gap-4 justify-between mt-6">
          <Image
            src="https://images.pexels.com/photos/256381/pexels-photo-256381.jpeg?auto=compress&cs=tinysrgb&w=400"
            alt=""
            width={40}
            height={40}
            className="w-10 h-10 rounded-full"
          />

          <div className="flex flex-col gap-2 flex-1">
            <span className="font-medium">Bernice Spencer</span>

            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque
              provident officia ut praesentium repudiandae voluptatem iusto
              velit, obcaecati, quasi beatae laudantium commodi aliquam. Rerum
              impedit dignissimos ex animi eum dolorem!
            </p>

            <div className="flex items-center gap-8 text-xs text-gray-500 mt-2">
              <div className="flex items-center gap-4">
                <Image
                  src="/like.png"
                  alt=""
                  width={12}
                  height={12}
                  className="w-3 h-3 rounded-full"
                />

                <span className="text-gray-300">|</span>
                <span className="text-gray-500">123 Likes</span>
              </div>

              <div>Reply</div>
            </div>
          </div>

          <Image
            alt=""
            width={16}
            height={16}
            src="/more.png"
            className="cursor-pointer w-4 h-4"
          />
        </div>
      </div>
    </section>
  );
};
