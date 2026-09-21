"use client";

import {
  useEditCategoriesMutation,
  useGetCategoriesDataQuery,
} from "@/app/redux/features/layout/layoutApi";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Plus, Trash2, Save, Pencil, FolderOpen } from "lucide-react";

type Category = {
  _id?: string;
  title: string;
};

type Props = {};

const EditCategory = (props: Props) => {
  const { data, isLoading, isError } = useGetCategoriesDataQuery("categories", {
    refetchOnMountOrArgChange: true,
  });

  const [editCategories, { isLoading: isEditing }] =
    useEditCategoriesMutation();

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (data?.layout?.categories) {
      setCategories(
        data.layout.categories.map((category: Category) => ({
          _id: category._id,
          title: category.title || "",
        })),
      );
    }
  }, [data]);

  const updateCategory = (index: number, value: string) => {
    const updatedCategories = [...categories];

    updatedCategories[index] = {
      ...updatedCategories[index],
      title: value,
    };

    setCategories(updatedCategories);
  };

  const addCategory = () => {
    setCategories([
      ...categories,
      {
        title: "",
      },
    ]);
  };

  const removeCategory = (index: number) => {
    setCategories(categories.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    const hasEmptyCategory = categories.some(
      (category) => !category.title.trim(),
    );

    if (hasEmptyCategory) {
      toast.error("Please fill in all category names.");
      return;
    }

    try {
      const payload = {
        type: "categories",
        categories: categories.map((category) => ({
          ...(category._id && {
            _id: category._id,
          }),
          title: category.title.trim(),
        })),
      };

      await editCategories(payload).unwrap();

      toast.success("Categories updated successfully!");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update categories");
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] w-full items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600 dark:border-slate-700 dark:border-t-indigo-400" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[400px] w-full items-center justify-center">
        <div className="rounded-xl border border-red-200 bg-red-50 px-6 py-4 text-sm font-medium text-red-600 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400">
          Failed to load categories.
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Edit Categories
          </h1>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Manage the course categories available on your platform.
          </p>
        </div>

        <button
          type="button"
          onClick={addCategory}
          className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          <Plus size={18} />
          Add Category
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-[#101a30]">
        <div className="border-b border-slate-200 px-5 py-4 dark:border-slate-700">
          <div className="flex items-center gap-2">
            <FolderOpen size={18} className="text-indigo-500" />

            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              Course Categories
            </h2>

            <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-semibold text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400">
              {categories.length}
            </span>
          </div>
        </div>

        <div className="space-y-3 p-5">
          {categories.length === 0 ? (
            <div className="flex min-h-[220px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 text-center dark:border-slate-700">
              <FolderOpen
                size={40}
                className="mb-3 text-slate-300 dark:text-slate-600"
              />

              <h3 className="text-base font-semibold text-slate-700 dark:text-slate-300">
                No categories yet
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                Add your first course category.
              </p>

              <button
                type="button"
                onClick={addCategory}
                className="mt-4 flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
              >
                <Plus size={16} />
                Add Category
              </button>
            </div>
          ) : (
            categories.map((category, index) => (
              <div
                key={category._id || `new-category-${index}`}
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-[#0b1428]"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-sm font-bold text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400">
                  {index + 1}
                </div>

                <div className="relative flex-1">
                  <Pencil
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    value={category.title}
                    onChange={(e) => updateCategory(index, e.target.value)}
                    placeholder="Category name"
                    className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-4 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-[#101a30] dark:text-white dark:placeholder:text-slate-500"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => removeCategory(index)}
                  className="shrink-0 rounded-lg p-2.5 text-slate-400 transition hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20"
                  title="Delete category"
                >
                  <Trash2 size={17} />
                </button>
              </div>
            ))
          )}
        </div>

        {categories.length > 0 && (
          <div className="flex justify-end border-t border-slate-200 px-5 py-4 dark:border-slate-700">
            <button
              type="button"
              onClick={handleSave}
              disabled={isEditing}
              className="flex min-w-[150px] items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isEditing ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={17} />
                  Save Categories
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditCategory;
