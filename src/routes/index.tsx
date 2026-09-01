import { createFileRoute } from "@tanstack/react-router";
import { Context7Widget } from "@/components/context7-widget";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <Context7Widget />;
}
