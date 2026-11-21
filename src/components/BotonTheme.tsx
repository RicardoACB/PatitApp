"use client";

import { IoMoon } from "react-icons/io5";
import { IoIosSunny } from "react-icons/io";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export default function BotonTheme() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mount, setMount] = useState(false);

  const themeMessage =
    resolvedTheme === "dark" ? "Activar modo claro" : "Activar modo oscuro";

  useEffect(() => {
    // eslint-disable-next-line
    setMount(true);
  }, []);

  if (!mount)
    return (
      <button
        className="order-2 md:order-3 size-10 bg-foreground rounded-full flex shadow-md"
        aria-hidden="true"
        disabled
      />
    );
  return (
    <button
      aria-label={themeMessage}
      className="order-2 md:order-3 size-10 bg-foreground rounded-full flex shadow-md cursor-pointer transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ring"
      onClick={() => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
      }}
    >
      {resolvedTheme === "dark" ? (
        <IoIosSunny
          className="text-2xl text-background m-auto"
          aria-hidden="true"
        />
      ) : (
        <IoMoon className="text-background m-auto" aria-hidden="true" />
      )}
    </button>
  );
}
