import { createFileRoute } from "@tanstack/react-router";
import { TodoApp } from "@/components/TodoApp";

export const Route = createFileRoute("/app")({
  head: () => ({
    meta: [
      { title: "Minhas Tarefas — Tarefas+" },
      { name: "description", content: "Adicione, conclua e remova tarefas em uma lista to-do bonita e moderna." },
    ],
    links: [{ rel: "canonical", href: "/app" }],
  }),
  component: TodoApp,
});
