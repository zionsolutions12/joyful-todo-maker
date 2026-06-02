import { useEffect, useMemo, useRef, useState } from "react";
import { Check, Plus, Trash2, ListTodo, Sparkles, Flag } from "lucide-react";

type Priority = "high" | "medium" | "low";

type Todo = {
  id: string;
  text: string;
  done: boolean;
  priority: Priority;
};

type Filter = "all" | "active" | "completed";

const STORAGE_KEY = "lovable.todos.v1";

const PRIORITY_CONFIG: Record<
  Priority,
  { label: string; order: number; dot: string; badge: string; ring: string }
> = {
  high: {
    label: "Alta",
    order: 0,
    dot: "bg-red-500",
    badge: "bg-red-500/10 text-red-600 border-red-500/20",
    ring: "ring-red-500/30",
  },
  medium: {
    label: "Média",
    order: 1,
    dot: "bg-amber-500",
    badge: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    ring: "ring-amber-500/30",
  },
  low: {
    label: "Baixa",
    order: 2,
    dot: "bg-emerald-500",
    badge: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    ring: "ring-emerald-500/30",
  },
};

const PRIORITY_ORDER: Priority[] = ["high", "medium", "low"];

// Garante que tarefas salvas antes da feature de prioridade ganhem um valor padrão.
function normalizeTodo(raw: Partial<Todo>): Todo {
  return {
    id: raw.id ?? crypto.randomUUID(),
    text: raw.text ?? "",
    done: Boolean(raw.done),
    priority:
      raw.priority && raw.priority in PRIORITY_CONFIG ? raw.priority : "medium",
  };
}

export function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [newPriority, setNewPriority] = useState<Priority>("medium");
  const [filter, setFilter] = useState<Filter>("all");
  const [hydrated, setHydrated] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setTodos(parsed.map(normalizeTodo));
      }
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
      { id: crypto.randomUUID(), text, done: false, priority: newPriority },
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

  // Clicar no badge cicla a prioridade da tarefa: Alta → Média → Baixa → Alta.
  const cyclePriority = (id: string) =>
    setTodos((p) =>
      p.map((t) => {
        if (t.id !== id) return t;
        const next =
          PRIORITY_ORDER[
            (PRIORITY_ORDER.indexOf(t.priority) + 1) % PRIORITY_ORDER.length
          ];
        return { ...t, priority: next };
      }),
    );

  // Ordena automaticamente: primeiro por prioridade (Alta → Baixa),
  // depois mantém tarefas ativas acima das concluídas.
  const sorted = useMemo(() => {
    const visible = todos.filter((t) =>
      filter === "all" ? true : filter === "active" ? !t.done : t.done,
    );
    return [...visible].sort((a, b) => {
      if (a.done !== b.done) return a.done ? 1 : -1;
      return PRIORITY_CONFIG[a.priority].order - PRIORITY_CONFIG[b.priority].order;
    });
  }, [todos, filter]);

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
            Organize seu dia por prioridade
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

          {/* Seletor de prioridade para a nova tarefa */}
          <div className="mt-2 flex items-center gap-2 border-t border-border/50 px-2 pt-3">
            <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <Flag className="h-3.5 w-3.5" />
              Prioridade
            </span>
            <div className="flex gap-1.5">
              {PRIORITY_ORDER.map((p) => {
                const cfg = PRIORITY_CONFIG[p];
                const active = newPriority === p;
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setNewPriority(p)}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-all ${
                      active
                        ? `${cfg.badge} ring-2 ${cfg.ring}`
                        : "border-border/60 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span className={`h-2 w-2 rounded-full ${cfg.dot}`} />
                    {cfg.label}
                  </button>
                );
              })}
            </div>
          </div>
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
          {sorted.length === 0 && (
            <li className="rounded-2xl border border-dashed border-border bg-card/40 px-4 py-10 text-center text-sm text-muted-foreground">
              {todos.length === 0
                ? "Nenhuma tarefa ainda. Adicione a primeira ✨"
                : "Nada por aqui neste filtro."}
            </li>
          )}
          {sorted.map((t) => {
            const cfg = PRIORITY_CONFIG[t.priority];
            return (
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
                  onClick={() => cyclePriority(t.id)}
                  title="Clique para mudar a prioridade"
                  aria-label={`Prioridade ${cfg.label}. Clique para alterar.`}
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition-all hover:scale-105 active:scale-95 ${cfg.badge}`}
                >
                  <span className={`h-2 w-2 rounded-full ${cfg.dot}`} />
                  {cfg.label}
                </button>
                <button
                  onClick={() => remove(t.id)}
                  aria-label="Remover tarefa"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground opacity-0 transition-all hover:bg-destructive/10 hover:text-destructive group-hover:opacity-100"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </li>
            );
          })}
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
