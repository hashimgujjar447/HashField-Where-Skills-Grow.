"use client";

import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/app/redux/features/layout/layoutApi";
import React, { FC, useEffect, useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import toast from "react-hot-toast";

type Props = {};

const EditHero: FC<Props> = () => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [isImageChanged, setIsImageChanged] = useState(false);

  const { data, isLoading, isError } = useGetHeroDataQuery("banner", {
    refetchOnMountOrArgChange: true,
  });

  const [editLayout, { isLoading: isEditing }] = useEditLayoutMutation();

  useEffect(() => {
    if (data?.layout?.banner) {
      setImage(data.layout.banner.image?.url || "");
      setTitle(data.layout.banner.title || "");
      setSubtitle(data.layout.banner.subtitle || "");
      setIsImageChanged(false);
    }
  }, [data]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      const base64 = reader.result as string;

      setImage(base64);
      setIsImageChanged(true);
    };

    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    const payload = {
      type: "banner",
      title,
      subtitle,
      image: image,
    };

    await editLayout(payload).unwrap();

    toast.success("Hero changes are ready to update!");
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[500px] w-full items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" />
      </div>
    );
  }

  if (isError || !data?.layout?.banner) {
    return (
      <div className="flex min-h-[400px] w-full items-center justify-center">
        <div className="rounded-xl border border-red-200 bg-red-50 px-6 py-4 text-sm font-medium text-red-600 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400">
          Failed to load hero data.
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Edit Hero
        </h1>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Customize the hero section of your website.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-[#101a30]">
        <div className="border-b border-slate-200 px-6 py-5 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Hero Content
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Update your homepage hero image and text.
          </p>
        </div>

        <div className="space-y-6 p-6">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">
              Hero Image
            </label>

            <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-[#0b1428]">
              <div className="relative flex min-h-[280px] w-full items-center justify-center overflow-hidden">
                {image ? (
                  <img
                    src={image}
                    alt="Hero"
                    className="max-h-[500px] w-full object-contain"
                  />
                ) : (
                  <div className="flex h-[280px] w-full items-center justify-center text-sm text-slate-400">
                    No hero image
                  </div>
                )}

                <label
                  htmlFor="banner"
                  className="absolute bottom-4 right-4 z-20 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg transition hover:bg-indigo-700"
                >
                  <AiOutlineCamera size={20} />
                </label>

                <input
                  type="file"
                  name="banner"
                  id="banner"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            </div>

            <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
              Upload a new image to replace the current hero image.
            </p>
          </div>

          <div>
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300"
            >
              Hero Title
            </label>

            <textarea
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              rows={3}
              placeholder="Enter hero title..."
              className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-base font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-[#0b1428] dark:text-white dark:placeholder:text-slate-500"
            />
          </div>

          <div>
            <label
              htmlFor="subtitle"
              className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300"
            >
              Hero Subtitle
            </label>

            <textarea
              id="subtitle"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              rows={4}
              placeholder="Enter hero subtitle..."
              className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-[#0b1428] dark:text-white dark:placeholder:text-slate-500"
            />
          </div>

          <div className="flex justify-end border-t border-slate-200 pt-5 dark:border-slate-700">
            <button
              type="button"
              onClick={handleSave}
              className="min-h-[40px] rounded-lg bg-indigo-600 px-8 text-sm font-semibold text-white transition hover:bg-indigo-700 active:scale-[0.98]"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditHero;
