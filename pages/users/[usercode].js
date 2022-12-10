import { useRouter } from "next/router";
import React from "react";

export default function UserDetail() {
  const router = useRouter();
  const { usercode } = router.query;
  return <div>{usercode}</div>;
}
