"use client";
import { ADD_NOVEL } from "@/graphql/mutations";
import { GET_NOVELS } from "@/graphql/queries";
import { INovel } from "@/typings";
import { useMutation, useQuery } from "@apollo/client";
import React, { FormEvent, useState } from "react";

export const Novels = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const { data, loading, error } = useQuery(GET_NOVELS);
  const [addNovel] = useMutation(ADD_NOVEL);

  const novels: INovel[] = data?.novels;

  if (loading) {
    return (
      <p className="text-white flex items-center justify-content">Loading...</p>
    );
  }

  if (error) {
    return (
      <p className="text-white flex items-center justify-content">
        Something Went Wrong
      </p>
    );
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (image === "" || title === "") return alert("Enter fields");
    addNovel({
      variables: {
        title,
        image,
      },
      refetchQueries: [{ query: GET_NOVELS }],
    });

    setTitle("");
    setImage("");
  };

  return (
    <div className="mx-10">
      <div className="mx-5">
        <form onSubmit={handleSubmit} className="flex my-5 space-x-3">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            className="bg-transparent border text-white p2 rounded-lg"
          />
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Enter image url"
            className="bg-transparent border text-white p2 rounded-lg"
          />
          <button className="bg-yellow-500 hover:bg-yellow-600 p-2 rounded-lg">
            Add Novel
          </button>
        </form>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {novels.map((novel) => (
          <p key={novel.id}>{novel.title}</p>
        ))}
      </div>
    </div>
  );
};
