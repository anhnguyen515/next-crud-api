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
  const [post, setPost] = React.useState(null);
  return <div>{postcode}</div>;
}
