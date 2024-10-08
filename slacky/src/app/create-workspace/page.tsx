"use client";

import { Fragment, useState } from "react";
import slugify from "slugify";
import { v4 as uuid } from "uuid";
import { toast } from "sonner";

import { ImageUpload } from "@/components/image-upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Typography } from "@/components/ui/typography";
import { useCreateWorkspaceValues } from "@/hooks/use-create-workspace-values";
import { createWorkspace } from "@/actions/create-workspace";
import { useRouter } from "next/navigation";

export default function CreateWorkspace() {
  const { currStep } = useCreateWorkspaceValues();

  let stepInView = currStep === 1 ? <Step1 /> : <Step2 />;

  return (
    <section className="w-screen h-screen grid place-content-center bg-neutral-800 text-white">
      <div className="p-3 max-w-[550px]">
        <Typography
          text={`step ${currStep} of 2`}
          variants="p"
          className="text-neutral-400"
        />

        {stepInView}
      </div>
    </section>
  );
}

const Step1 = () => {
  const { name, updateValues, setCurrStep } = useCreateWorkspaceValues();

  return (
    <Fragment>
      <Typography
        text="What is the name of your company or team"
        className="my-4"
      />

      <Typography
        text="This will be the name of your Slacky workspace - choose something that your team will recognize."
        className="text-neutral-300"
        variants="p"
      />

      <form className="mt-6">
        <fieldset>
          <Input
            className="bg-neutral-700 text-white border-neutral-600"
            type="text"
            value={name}
            placeholder="Enter your company/team name"
            onChange={(event) => updateValues({ name: event.target.value })}
          />

          <Button
            type="button"
            className="mt-10"
            onClick={() => setCurrStep(2)}
            disabled={!name}
          >
            <Typography text="Next" variants="p" />
          </Button>
        </fieldset>
      </form>
    </Fragment>
  );
};

const Step2 = () => {
  const { setCurrStep, updateImageUrl, imageUrl, name } =
    useCreateWorkspaceValues();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const handleSubmit = async () => {
    setIsSubmitting(false);
    const slug = slugify(name);
    const inviteCode = uuid();

    const error = await createWorkspace({
      name,
      slug,
      inviteCode,
      imageUrl: imageUrl,
    });
    setIsSubmitting(false);

    if (error?.error) {
      console.log("[CREATE_WORKSPACE_EROR]: ", error);
      return toast.error("Couldn't create workspace. Please ry again.");
    }

    toast.success("Workspace created successfully");
    router.push("/");
  };

  return (
    <Fragment>
      <Button
        type="button"
        size="sm"
        variant="link"
        className="text-white"
        onClick={() => setCurrStep(1)}
      >
        <Typography text="Back" variants="p" />
      </Button>

      <form>
        <Typography text="Add workspace avatar" className="my-4" />
        <Typography
          text="This image can be changed later in your workspace settings."
          className="text-neutral-300"
          variants="p"
        />

        <fieldset
          disabled={isSubmitting}
          className="mt-6 flex flex-col items-center space-y-9"
        >
          <ImageUpload />

          <div className="space-x-5">
            <Button
              onClick={() => {
                updateImageUrl("");
                handleSubmit();
              }}
              disabled={isSubmitting}
            >
              <Typography text="Skip for now" variants="p" />
            </Button>

            {imageUrl ? (
              <Button
                type="button"
                onClick={handleSubmit}
                size="sm"
                variant="destructive"
                disabled={isSubmitting}
              >
                <Typography text="Submit" variants="p" />
              </Button>
            ) : (
              <Button
                type="button"
                size="sm"
                className="text-white bg-gray-500"
                disabled={isSubmitting}
              >
                <Typography text="Select an image" variants="p" />
              </Button>
            )}
          </div>
        </fieldset>
      </form>
    </Fragment>
  );
};
