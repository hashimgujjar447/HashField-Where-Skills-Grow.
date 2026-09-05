"use client";

import React, { FC, useState } from "react";
import Heading from "./utils/Heading";

interface Props {
  title?: string;
}

const Page: FC<Props> = (props) => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Heading
        title="ELearn - Simple Page"
        description="This is a simple page"
        keywords="react, typescript"
      />
      <h1>Simple Page</h1>
    </div>
  );
};

export default Page;
