"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";

/**
 * Drop-in replacement for next/image that hides itself if the file is missing
 * (404). This lets us reference `/images/hero.jpg` etc. in the layout before
 * the user has actually added the file, without breaking the page.
 */
export default function SafeImage(props: ImageProps) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return <Image {...props} onError={() => setFailed(true)} />;
}
