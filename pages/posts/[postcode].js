import React from "react";

export async function getServerSideProps(context) {
  const { postcode } = context.query;

  return {
    props: {
      postcode,
    },
  };
}

export default function PostDetail({ postcode }) {
  return <div>{postcode}</div>;
}
