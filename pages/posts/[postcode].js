import { useRouter } from "next/router";
import React from "react";

export default function PostDetail() {
  const router = useRouter();
  const { postcode } = router.query;
  return <div>{postcode}</div>;
}
