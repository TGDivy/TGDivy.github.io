import config from "@config/config.json";
import taxonomyFilter from "@lib/utils/taxonomyFilter";
import { humanize } from "@lib/utils/textConverter";
import React, { useEffect, useState } from "react";
import { BiCategoryAlt } from "react-icons/bi";
import { FaHashtag } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
const { summary_length } = config.settings;

export type SearchItem = {
  slug: string;
  data: any;
  content: any;
};

interface Props {
  searchList: SearchItem[];
  tagList: string[];
  tagCounts: Record<string, number>;
  type: "tags" | "categories";
}

interface CardProps {
  title?: string;
  description?: string;
  imageUrl?: string;
  href?: string;
  border?: boolean;
  titleTransition?: string;
  imageTransition?: string;
}

const Card = ({ title, description, imageUrl, href }: CardProps) => {
  return (
    <div
      className={`relative flex flex-col w-full rounded-xl bg-white text-gray-700 transition-all duration-500 ease-in-out group h-full`}
    >
      {imageUrl && (
        <a
          href={href}
          className="block hover:text-primary relative mx-4 mt-4 overflow-hidden text-white shadow-lg rounded-xl bg-blue-gray-500 bg-clip-border shadow-blue-gray-500/40 h-[230px] min-h-[230px] max-h-[230px]"
        >
          <img
            className="group-hover:scale-[1.03] transition duration-300 min-h-[230px]"
            width={445}
            height={330}
            src={imageUrl}
            alt={title}
          />
        </a>
      )}
      <div className="p-6 h-full flex flex-col">
        {title && (
          <div className="flex items-center justify-between mb-3">
            <h5 className="block font-sans text-xl antialiased font-medium leading-snug tracking-normal text-blue-gray-900">
              <a
                href={href}
                className="block hover:text-primary transition duration-300"
              >
                {humanize(title)}
              </a>
            </h5>
            <slot name="extra" />
          </div>
        )}
        {description && (
          <p className="block font-sans text-base antialiased font-light leading-relaxed text-gray-700 flex-1">
            <a
              href={href}
              className="block hover:text-primary transition duration-300"
            >
              {description}
            </a>
          </p>
        )}
        <slot />
      </div>
    </div>
  );
};

const Tag = ({
  tag,
  count,
  onClick,
  category,
}: {
  tag: string;
  count?: number;
  onClick?: (tag: string) => void;
  category?: boolean;
}) => {
  const Icon = category ? BiCategoryAlt : FaHashtag;
  return (
    <li className="inline-block">
      {onClick ? (
        <button
          onClick={() => (onClick ? onClick(tag) : undefined)}
          className={
            "flex transition-all ease-in-out items-center group rounded-lg shadow-md px-4 py-2 bg-slate-200 text-dark font-semibold hover:bg-primary hover:text-white hover:-my-1 hover:py-3"
          }
        >
          <Icon
            className={"mr-1 text-primary transition group-hover:text-white"}
          />
          <>{humanize(tag || "")}</>
          {count && (
            <div className="ml-2 text-white group-hover:text-primary group-hover:bg-white transition rounded-full bg-primary px-1 text-xs">
              {count}
            </div>
          )}
        </button>
      ) : (
        <div
          className={
            "flex transition-all ease-in-out items-center rounded-lg shadow-md px-4 py-2 bg-slate-200 text-dark font-semibold"
          }
        >
          <FaHashtag className={"mr-1 text-primary transition"} />
          <>{humanize(tag || "")}</>
          {count && (
            <div className="ml-2 text-white transition rounded-full bg-primary px-1 text-xs">
              {count}
            </div>
          )}
        </div>
      )}
    </li>
  );
};

export default function SearchBar({
  searchList,
  tagList,
  tagCounts,
  type,
}: Props) {
  const searchUrl = new URLSearchParams(window.location.search);
  const [tag, setTag] = useState<string | undefined>(
    searchUrl.get("q") || undefined,
  );

  const searchResults: SearchItem[] = taxonomyFilter(searchList, type, tag);

  const onTagClick = (tag?: string) => {
    setTag(tag);
    if (!tag) {
      window.history.pushState({}, "", `${window.location.pathname}`);
      return;
    }
    // set query param
    const searchUrl = new URLSearchParams(window.location.search);
    searchUrl.set("q", tag);
    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?${searchUrl}`,
    );
  };

  // listen to history change and update state
  useEffect(() => {
    window.addEventListener("popstate", () => {
      const searchUrl = new URLSearchParams(window.location.search);
      const tag = searchUrl.get("q");
      setTag(tag || undefined);
    });
  }, []);

  return (
    <div className="container mb-4 px-4">
      <ul className="space-x-3 space-y-3 transition-all duration-500">
        {tag ? (
          <></>
        ) : (
          tagList.map((name) => (
            <Tag
              tag={name}
              count={tagCounts[name]}
              onClick={onTagClick}
              key={name}
              category={type === "categories"}
            />
          ))
        )}
      </ul>

      {tag && (
        <div className="my-6 text-center font-semibold flex items-center justify-center gap-2">
          Found {searchResults?.length}
          {searchResults?.length && searchResults?.length === 1
            ? " result"
            : " results"}{" "}
          for
          <Tag tag={tag} />
          <button
            onClick={() => onTagClick(undefined)}
            className="group shadow-md transition px-1 py-1  bg-primary font-semibold hover:bg-white rounded-lg"
          >
            <IoCloseOutline
              className="group-hover:text-primary
            transition text-xl text-white"
            />
          </button>
        </div>
      )}

      <div className={`grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-2`}>
        {searchResults.map((item) => (
          <div
            className="col-md-4 mb-4 max-w-full h-min overflow-hidden"
            key={item.slug}
          >
            <Card
              title={item.data.title}
              description={item.data.description}
              imageUrl={item.data.image}
              href={`/${item.slug}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
