import { createFileRoute } from "@tanstack/react-router";
import { TodoApp } from "@/components/TodoApp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tarefas — Lista moderna e bonita" },
      { name: "description", content: "Adicione, conclua e remova tarefas em uma lista to-do bonita e moderna." },
      { property: "og:title", content: "Tarefas — Lista moderna e bonita" },
      { property: "og:description", content: "Adicione, conclua e remova tarefas em uma lista to-do bonita e moderna." },
    ],
  }),
  component: TodoApp,
});
