"use client";

import React from "react";
import {
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  GripVertical,
  Link as LinkIcon,
  Video,
  BookOpen,
} from "lucide-react";

export interface ContentLink {
  title: string;
  url: string;
}

export interface Lecture {
  title: string;
  description: string;
  videoUrl: string;
  videoLength: string;
  videoPlayer: string;
  links: ContentLink[];
  suggestions: string;
  collapsed: boolean;
  questions?: any[];
}

export interface Section {
  sectionTitle: string;
  lectures: Lecture[];
  collapsed: boolean;
}

type Props = {
  sections: Section[];
  setSections: (data: Section[]) => void;
  active: number;
  setActive: (v: number) => void;
  handleSubmit: () => void;
};

export const defaultLecture = (): Lecture => ({
  title: "",
  description: "",
  videoUrl: "",
  videoLength: "",
  videoPlayer: "default",
  links: [{ title: "", url: "" }],
  suggestions: "",
  collapsed: false,
});

export const defaultSection = (): Section => ({
  sectionTitle: "Untitled Section",
  lectures: [defaultLecture()],
  collapsed: false,
});

const inp =
  "w-full rounded-xl border border-slate-200 dark:border-slate-700 " +
  "bg-white dark:bg-[#0f1a30] text-slate-900 dark:text-white " +
  "placeholder-slate-400 dark:placeholder-slate-500 " +
  "px-4 py-2.5 text-sm outline-none " +
  "focus:border-indigo-500 dark:focus:border-indigo-400 " +
  "focus:ring-2 focus:ring-indigo-500/20 transition";

const CourseContent: React.FC<Props> = ({
  sections,
  setSections,
  active,
  setActive,
  handleSubmit,
}) => {
  const toggleSection = (si: number) => {
    const copy = [...sections];

    copy[si] = {
      ...copy[si],
      collapsed: !copy[si].collapsed,
    };

    setSections(copy);
  };

  const updateSectionTitle = (si: number, val: string) => {
    const copy = [...sections];

    copy[si] = {
      ...copy[si],
      sectionTitle: val,
    };

    setSections(copy);
  };

  const addSection = () => {
    setSections([...sections, defaultSection()]);
  };

  const removeSection = (si: number) => {
    if (sections.length === 1) return;

    setSections(sections.filter((_, i) => i !== si));
  };

  const toggleLecture = (si: number, li: number) => {
    const copy = [...sections];

    copy[si].lectures[li] = {
      ...copy[si].lectures[li],
      collapsed: !copy[si].lectures[li].collapsed,
    };

    setSections(copy);
  };

  const updateLecture = (
    si: number,
    li: number,
    field: keyof Lecture,
    val: any,
  ) => {
    const copy = [...sections];

    copy[si].lectures[li] = {
      ...copy[si].lectures[li],
      [field]: val,
    };

    setSections(copy);
  };

  const addLecture = (si: number) => {
    const copy = [...sections];

    copy[si].lectures = [...(copy[si].lectures || []), defaultLecture()];

    setSections(copy);
  };

  const removeLecture = (si: number, li: number) => {
    if (sections[si].lectures.length === 1) return;

    const copy = [...sections];

    copy[si].lectures = copy[si].lectures.filter((_, i) => i !== li);

    setSections(copy);
  };

  const addLink = (si: number, li: number) => {
    const copy = [...sections];

    const currentLinks = copy[si].lectures[li].links || [];

    copy[si].lectures[li].links = [
      ...currentLinks,
      {
        title: "",
        url: "",
      },
    ];

    setSections(copy);
  };

  const updateLink = (
    si: number,
    li: number,
    lki: number,
    field: keyof ContentLink,
    val: string,
  ) => {
    const copy = [...sections];

    const links = copy[si].lectures[li].links || [];

    links[lki] = {
      ...links[lki],
      [field]: val,
    };

    copy[si].lectures[li].links = links;

    setSections(copy);
  };

  const removeLink = (si: number, li: number, lki: number) => {
    const copy = [...sections];

    const links = copy[si].lectures[li].links || [];

    copy[si].lectures[li].links = links.filter((_, i) => i !== lki);

    if (copy[si].lectures[li].links.length === 0) {
      copy[si].lectures[li].links = [
        {
          title: "",
          url: "",
        },
      ];
    }

    setSections(copy);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit();
    setActive(active + 1);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSave} className="space-y-4">
        {sections.map((section, si) => (
          <div
            key={si}
            className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#131e36]"
          >
            <div className="flex items-center gap-2 sm:gap-3 bg-white dark:bg-[#1b2447] px-3 sm:px-4 py-3 border-b border-slate-100 dark:border-slate-700">
              <GripVertical
                size={17}
                className="shrink-0 text-slate-300 dark:text-slate-600 cursor-grab"
              />

              <div className="flex items-center gap-2 flex-1 min-w-0">
                <BookOpen size={16} className="shrink-0 text-indigo-500" />

                <input
                  value={section.sectionTitle}
                  onChange={(e) => updateSectionTitle(si, e.target.value)}
                  className="flex-1 min-w-0 rounded-lg border border-transparent bg-transparent px-2 py-1 text-sm font-bold text-slate-800 dark:text-white outline-none hover:border-slate-200 dark:hover:border-slate-600 focus:border-indigo-400 dark:focus:border-indigo-500 transition"
                  placeholder="Section Title"
                />

                <span className="shrink-0 rounded-full bg-indigo-100 dark:bg-indigo-900/40 px-2 py-0.5 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
                  {section.lectures?.length || 0}{" "}
                  {section.lectures?.length === 1 ? "lecture" : "lectures"}
                </span>
              </div>

              <div className="flex items-center gap-1 ml-1 shrink-0">
                <button
                  type="button"
                  onClick={() => removeSection(si)}
                  disabled={sections.length === 1}
                  className="rounded-lg p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition disabled:opacity-30"
                  title="Remove section"
                >
                  <Trash2 size={15} />
                </button>

                <button
                  type="button"
                  onClick={() => toggleSection(si)}
                  className="rounded-lg p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 transition"
                >
                  {section.collapsed ? (
                    <ChevronDown size={18} />
                  ) : (
                    <ChevronUp size={18} />
                  )}
                </button>
              </div>
            </div>

            {!section.collapsed && (
              <div className="p-3 sm:p-4 space-y-3">
                {(section.lectures || []).map((lecture, li) => {
                  const links = Array.isArray(lecture.links)
                    ? lecture.links
                    : [];

                  return (
                    <div
                      key={li}
                      className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-[#1a2540]"
                    >
                      <div className="flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-2.5 border-b border-slate-100 dark:border-slate-700">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-100 dark:bg-violet-900/40 text-[11px] font-bold text-violet-600 dark:text-violet-400">
                          {li + 1}
                        </div>

                        <input
                          value={lecture.title || ""}
                          onChange={(e) =>
                            updateLecture(si, li, "title", e.target.value)
                          }
                          placeholder="Lecture title…"
                          className="flex-1 min-w-0 bg-transparent text-sm font-semibold text-slate-800 dark:text-white outline-none placeholder-slate-400 dark:placeholder-slate-500"
                          required
                        />

                        <div className="flex items-center gap-1 ml-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => removeLecture(si, li)}
                            disabled={section.lectures.length === 1}
                            className="rounded-lg p-1.5 text-slate-300 dark:text-slate-600 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition disabled:opacity-30"
                            title="Remove lecture"
                          >
                            <Trash2 size={13} />
                          </button>

                          <button
                            type="button"
                            onClick={() => toggleLecture(si, li)}
                            className="rounded-lg p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 transition"
                          >
                            {lecture.collapsed ? (
                              <ChevronDown size={16} />
                            ) : (
                              <ChevronUp size={16} />
                            )}
                          </button>
                        </div>
                      </div>

                      {!lecture.collapsed && (
                        <div className="space-y-4 p-3 sm:p-4">
                          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <div>
                              <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                Video URL *
                              </label>

                              <div className="relative">
                                <Video
                                  size={13}
                                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                  value={lecture.videoUrl || ""}
                                  onChange={(e) =>
                                    updateLecture(
                                      si,
                                      li,
                                      "videoUrl",
                                      e.target.value,
                                    )
                                  }
                                  placeholder="https://vimeo.com/..."
                                  className={inp + " pl-8"}
                                  required
                                />
                              </div>
                            </div>

                            <div>
                              <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                Duration (minutes) *
                              </label>

                              <input
                                type="number"
                                min="0"
                                value={lecture.videoLength || ""}
                                onChange={(e) =>
                                  updateLecture(
                                    si,
                                    li,
                                    "videoLength",
                                    e.target.value,
                                  )
                                }
                                placeholder="15"
                                className={inp}
                                required
                              />
                            </div>
                          </div>

                          <div>
                            <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                              Description
                            </label>

                            <textarea
                              value={lecture.description || ""}
                              onChange={(e) =>
                                updateLecture(
                                  si,
                                  li,
                                  "description",
                                  e.target.value,
                                )
                              }
                              rows={2}
                              placeholder="What will students learn in this lecture?"
                              className={inp + " resize-none"}
                            />
                          </div>

                          <div>
                            <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                              Resource Links
                            </label>

                            <div className="space-y-2">
                              {links.length > 0 ? (
                                links.map((link, lki) => (
                                  <div
                                    key={lki}
                                    className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2"
                                  >
                                    <div className="relative w-full sm:w-36 shrink-0">
                                      <LinkIcon
                                        size={12}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                      />

                                      <input
                                        value={link?.title || ""}
                                        onChange={(e) =>
                                          updateLink(
                                            si,
                                            li,
                                            lki,
                                            "title",
                                            e.target.value,
                                          )
                                        }
                                        placeholder="Label"
                                        className={inp + " pl-8"}
                                      />
                                    </div>

                                    <div className="flex items-center gap-2 flex-1">
                                      <input
                                        value={link?.url || ""}
                                        onChange={(e) =>
                                          updateLink(
                                            si,
                                            li,
                                            lki,
                                            "url",
                                            e.target.value,
                                          )
                                        }
                                        placeholder="https://..."
                                        className={inp + " flex-1"}
                                      />

                                      {links.length > 1 && (
                                        <button
                                          type="button"
                                          onClick={() =>
                                            removeLink(si, li, lki)
                                          }
                                          className="shrink-0 rounded-xl border border-red-200 dark:border-red-800 p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                                        >
                                          <Trash2 size={13} />
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <div className="rounded-xl border border-dashed border-slate-200 dark:border-slate-700 px-4 py-3 text-xs text-slate-400">
                                  No resource links added.
                                </div>
                              )}

                              <button
                                type="button"
                                onClick={() => addLink(si, li)}
                                className="flex items-center gap-1.5 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
                              >
                                <Plus size={13} />
                                Add link
                              </button>
                            </div>
                          </div>

                          <div>
                            <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                              Suggestions / Notes
                            </label>

                            <input
                              value={lecture.suggestions || ""}
                              onChange={(e) =>
                                updateLecture(
                                  si,
                                  li,
                                  "suggestions",
                                  e.target.value,
                                )
                              }
                              placeholder="Any tips for students watching this lecture…"
                              className={inp}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}

                <button
                  type="button"
                  onClick={() => addLecture(si)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-violet-300 dark:border-violet-700 py-2.5 text-sm font-medium text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/20 transition"
                >
                  <Plus size={16} />
                  Add Lecture to &quot;
                  {section.sectionTitle}&quot;
                </button>
              </div>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={addSection}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-indigo-300 dark:border-indigo-700 py-3.5 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition"
        >
          <Plus size={18} />
          Add New Section
        </button>

        <div className="flex items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={() => setActive(Math.max(0, active - 1))}
            className="rounded-xl border border-slate-200 dark:border-slate-700 px-6 sm:px-8 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            ← Prev
          </button>

          <button
            type="submit"
            className="rounded-xl bg-indigo-600 px-6 sm:px-8 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors"
          >
            Next →
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseContent;
