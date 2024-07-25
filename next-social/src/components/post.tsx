import Image from "next/image";
import { Comments } from "./comments";

type Props = {};
export const Post = ({}: Props) => {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src="https://images.pexels.com/photos/26441311/pexels-photo-26441311/free-photo-of-seagull.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load"
            alt=""
            width={40}
            height={40}
            className="w-10 h-10 rounded-full"
          />

          <span className="font-medium">Jack McBride</span>
        </div>

        <Image src="/more.png" alt="more icon" width={16} height={16} />
      </div>

      <div className="flex flex-col gap-4">
        <div className="w-full min-h-96 relative">
          <Image
            src="https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
            fill
            className="object-cover rounded-md"
          />
        </div>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
          quaerat, quasi numquam repellendus, eos ducimus odit iusto rem
          blanditiis distinctio sit explicabo? Quis ex assumenda eos accusantium
          quod enim saepe.
        </p>
      </div>

      <div className="flex items-center justify-between text-sm my-5">
        <div className="flex gap-8">
          <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl">
            <Image
              src="/like.png"
              alt="like icon"
              width={16}
              height={16}
              className="cursor-pointer"
            />

            <span className="text-gray-300">|</span>

            <span className="text-gra-500">
              123<span className="hidden md:inline">Likes</span>
            </span>
          </div>

          <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl">
            <Image
              src="/comment.png"
              alt="comment icon"
              width={16}
              height={16}
              className="cursor-pointer"
            />

            <span className="text-gray-300">|</span>

            <span className="text-gra-500">
              123<span className="hidden md:inline">Comments</span>
            </span>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl">
            <Image
              src="/share.png"
              alt="share icon"
              width={16}
              height={16}
              className="cursor-pointer"
            />

            <span className="text-gray-300">|</span>

            <span className="text-gra-500">
              123<span className="hidden md:inline">Shares</span>
            </span>
          </div>
        </div>
      </div>

      <Comments />
    </section>
  );
};
