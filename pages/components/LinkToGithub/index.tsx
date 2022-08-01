import React from "react";
import Image from "next/image";

const LinkToGithub = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: 12,
        right: 12,
        textDecoration: "underline",
        cursor: "pointer",
      }}
    >
      Github
      {/* <Image
        src="/github.svg"
        alt=""
        width={24}
        height={24}
        style={{ cursor: "pointer" }}
      /> */}
    </div>
  );
};

export default LinkToGithub;
