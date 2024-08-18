import { create } from "zustand";

type CreateWorkSpaceValues = {
  name: string;
  imageUrl: string;
  updateImageUrl: (url: string) => void;
  updateValues: (values: Partial<CreateWorkSpaceValues>) => void;
  currStep: number;
  setCurrStep: (step: number) => void;
};

export const useCreateWorkspaceValues = create<CreateWorkSpaceValues>(
  (set) => ({
    name: "",
    currStep: 1,
    imageUrl: "",
    updateValues: (values) => set(values),
    setCurrStep: (step) => set({ currStep: step }),
    updateImageUrl: (url) => set({ imageUrl: url }),
  })
);
