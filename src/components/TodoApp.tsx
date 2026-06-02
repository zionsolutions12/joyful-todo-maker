import { useEffect, useRef, useState } from "react";
import { Check, Plus, Trash2, ListTodo, Sparkles } from "lucide-react";

type Todo = {
  id: string;
  text: string;
  done: boolean;
};

type Filter = "all" | "active" | "completed";

const STORAGE_KEY = "lovable.todos.v1";

export function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [hydrated, setHydrated] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setTodos(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos, hydrated]);

  const addTodo = () => {
    const text = input.trim();
    if (!text) return;
    setTodos((prev) => [
      { id: crypto.randomUUID(), text, done: false },
      ...prev,
    ]);
    setInput("");
    inputRef.current?.focus();
  };

  const toggle = (id: string) =>
    setTodos((p) => p.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  const remove = (id: string) =>
    setTodos((p) => p.filter((t) => t.id !== id));
  const clearCompleted = () => setTodos((p) => p.filter((t) => !t.done));

  const filtered = todos.filter((t) =>
    filter === "all" ? true : filter === "active" ? !t.done : t.done,
  );
  const remaining = todos.filter((t) => !t.done).length;

  return (
    <div
      className="min-h-screen w-full px-4 py-12 sm:py-20"
      style={{ background: "var(--gradient-bg), var(--background)" }}
    >
      <div className="mx-auto w-full max-w-xl">
        <header className="mb-8 text-center">
          <div
            className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl text-primary-foreground shadow-[var(--shadow-elegant)]"
            style={{ background: "var(--gradient-primary)" }}
          >
            <ListTodo className="h-7 w-7" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Suas tarefas
          </h1>
          <p className="mt-2 flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5" />
            Organize seu dia com leveza
          </p>
        </header>

        <div
          className="rounded-3xl border border-border/60 bg-card/80 p-3 backdrop-blur-xl"
          style={{ boxShadow: "var(--shadow-soft)" }}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addTodo();
            }}
            className="flex items-center gap-2"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="O que precisa ser feito?"
              className="flex-1 rounded-2xl bg-transparent px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Adicionar tarefa"
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-primary-foreground transition-transform hover:scale-105 active:scale-95"
              style={{
                background: "var(--gradient-primary)",
                boxShadow: "var(--shadow-elegant)",
              }}
            >
              <Plus className="h-5 w-5" />
            </button>
          </form>
        </div>

        <div className="mt-6 flex items-center justify-between px-1 text-sm">
          <span className="text-muted-foreground">
            {remaining} {remaining === 1 ? "tarefa restante" : "tarefas restantes"}
          </span>
          <div className="flex gap-1 rounded-full border border-border/60 bg-card/60 p-1 backdrop-blur">
            {(["all", "active", "completed"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  filter === f
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {f === "all" ? "Todas" : f === "active" ? "Ativas" : "Feitas"}
              </button>
            ))}
          </div>
        </div>

        <ul className="mt-4 space-y-2">
          {filtered.length === 0 && (
            <li className="rounded-2xl border border-dashed border-border bg-card/40 px-4 py-10 text-center text-sm text-muted-foreground">
              {todos.length === 0
                ? "Nenhuma tarefa ainda. Adicione a primeira ✨"
                : "Nada por aqui neste filtro."}
            </li>
          )}
          {filtered.map((t) => (
            <li
              key={t.id}
              className="group flex items-center gap-3 rounded-2xl border border-border/60 bg-card/80 px-3 py-3 backdrop-blur-xl transition-all hover:border-primary/40"
              style={{ boxShadow: "var(--shadow-soft)" }}
            >
              <button
                onClick={() => toggle(t.id)}
                aria-label="Marcar como concluída"
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                  t.done
                    ? "border-transparent text-primary-foreground"
                    : "border-border hover:border-primary"
                }`}
                style={t.done ? { background: "var(--gradient-primary)" } : undefined}
              >
                {t.done && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
              </button>
              <span
                className={`flex-1 text-[15px] transition-all ${
                  t.done
                    ? "text-muted-foreground line-through"
                    : "text-foreground"
                }`}
              >
                {t.text}
              </span>
              <button
                onClick={() => remove(t.id)}
                aria-label="Remover tarefa"
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground opacity-0 transition-all hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>

        {todos.some((t) => t.done) && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={clearCompleted}
              className="rounded-full px-4 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-destructive"
            >
              Limpar concluídas
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
