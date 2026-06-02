import { createFileRoute, Link } from "@tanstack/react-router";
import heroAsset from "@/assets/todo-hero.jpg";
import {
  CheckCircle2,
  ListChecks,
  Sparkles,
  Zap,
  ShieldCheck,
  ArrowRight,
  Flag,
  ArrowDownWideNarrow,
  Smartphone,
  Star,
  Clock,
  Layers,
  Plus,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tarefas+ — Organize seu dia com leveza" },
      { name: "description", content: "Tarefas+ é o app de to-do bonito e moderno para você adicionar, priorizar e concluir tarefas sem complicação." },
      { property: "og:title", content: "Tarefas+ — Organize seu dia com leveza" },
      { property: "og:description", content: "App de tarefas bonito e moderno com prioridades e ordenação automática. Foque no que importa." },
      { property: "og:image", content: heroAsset },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Landing,
});

const FEATURES = [
  { icon: Flag, title: "Prioridades inteligentes", desc: "Classifique cada tarefa como Alta, Média ou Baixa e veja o que realmente importa em primeiro lugar." },
  { icon: ArrowDownWideNarrow, title: "Ordenação automática", desc: "A lista se reorganiza sozinha por prioridade. Sem arrastar, sem reorganizar manualmente." },
  { icon: Zap, title: "Rápido como pensar", desc: "Adicione tarefas com um clique. Marque como feito com outro. Simples assim." },
  { icon: Sparkles, title: "Design bonito", desc: "Tipografia cuidada, espaçamentos generosos e uma paleta moderna em azul." },
  { icon: ShieldCheck, title: "100% seu", desc: "Seus dados ficam no seu navegador. Nada de servidores, nada de espionagem." },
  { icon: Smartphone, title: "Funciona em tudo", desc: "Layout responsivo e leve, perfeito no celular, tablet ou desktop." },
];

const STEPS = [
  { n: "01", title: "Escreva a tarefa", desc: "Digite o que precisa ser feito e pressione adicionar. Leva segundos." },
  { n: "02", title: "Defina a prioridade", desc: "Marque como Alta, Média ou Baixa — ou ajuste depois com um clique." },
  { n: "03", title: "Deixe o foco fluir", desc: "A lista organiza tudo por prioridade. Você só executa, de cima pra baixo." },
];

const STATS = [
  { value: "3", label: "Níveis de prioridade" },
  { value: "0s", label: "Tempo de cadastro" },
  { value: "100%", label: "Dados no seu dispositivo" },
  { value: "∞", label: "Tarefas, de graça" },
];

const TESTIMONIALS = [
  { name: "Marina A.", role: "Designer", text: "Finalmente um to-do que não me faz perder tempo organizando. A ordenação por prioridade é viciante." },
  { name: "Rafael S.", role: "Desenvolvedor", text: "Rápido, bonito e sem login. Abro e já estou produzindo. Virou minha primeira aba do dia." },
  { name: "Camila T.", role: "Empreendedora", text: "Uso para a rotina da empresa inteira. Ver as tarefas de alta prioridade no topo mudou meu foco." },
];

const FAQ = [
  { q: "Preciso criar uma conta?", a: "Não. O Tarefas+ funciona direto no navegador, sem cadastro e sem senha." },
  { q: "Onde meus dados ficam salvos?", a: "Tudo é salvo localmente no seu próprio dispositivo. Nada é enviado para servidores." },
  { q: "Como funciona a prioridade?", a: "Cada tarefa pode ser Alta, Média ou Baixa. A lista se ordena automaticamente, mostrando o mais importante primeiro." },
  { q: "É grátis mesmo?", a: "Sim, 100% grátis e sem limites de tarefas." },
];

function Landing() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-secondary/40 to-background">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/70 backdrop-blur-xl">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2 text-lg font-bold">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-[var(--shadow-soft)]">
              <ListChecks className="h-5 w-5" />
            </div>
            Tarefas+
          </div>
          <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
            <a href="#features" className="transition hover:text-foreground">Recursos</a>
            <a href="#how" className="transition hover:text-foreground">Como funciona</a>
            <a href="#faq" className="transition hover:text-foreground">FAQ</a>
          </nav>
          <Link
            to="/app"
            className="rounded-full bg-primary px-5 py-2.5 font-medium text-primary-foreground shadow-[var(--shadow-soft)] transition hover:opacity-90"
          >
            Abrir app
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* blobs decorativos */}
        <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 top-40 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />

        <div className="container mx-auto grid items-center gap-12 px-6 pb-24 pt-16 lg:grid-cols-2">
          <div className="relative">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-sm font-medium text-secondary-foreground">
              <Sparkles className="h-4 w-4 text-primary" />
              Novo · Agora com prioridades
            </div>
            <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight text-foreground md:text-6xl">
              Organize seu dia com{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                prioridade
              </span>{" "}
              e clareza.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Tarefas+ é o app to-do bonito e moderno que organiza tudo por
              importância automaticamente. Defina Alta, Média ou Baixa e foque no
              que realmente importa, hoje.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/app"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-semibold text-primary-foreground shadow-[var(--shadow-elegant)] transition hover:opacity-90"
              >
                Começar agora — é grátis
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
              <a
                href="#features"
                className="rounded-full border border-border bg-card px-7 py-3.5 font-semibold transition hover:bg-secondary"
              >
                Ver recursos
              </a>
            </div>
            <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" /> Sem cadastro
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" /> Salvo no dispositivo
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-tr from-primary/20 to-accent/20 blur-2xl" />
            <img
              src={heroAsset}
              alt="Ilustração de um app de gerenciamento de tarefas com prioridades"
              className="relative w-full rounded-[2rem] shadow-[var(--shadow-elegant)]"
              loading="eager"
            />
            {/* Card flutuante de prioridade */}
            <div className="absolute -left-4 top-8 hidden rounded-2xl border border-border/60 bg-card/90 px-4 py-3 shadow-[var(--shadow-soft)] backdrop-blur-xl sm:block">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                Prioridade Alta
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">Sempre no topo</p>
            </div>
            <div className="absolute -bottom-4 right-2 hidden rounded-2xl border border-border/60 bg-card/90 px-4 py-3 shadow-[var(--shadow-soft)] backdrop-blur-xl sm:block">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                Tudo organizado
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">Automaticamente</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="border-y border-border/40 bg-card/40 backdrop-blur">
        <div className="container mx-auto grid grid-cols-2 gap-8 px-6 py-12 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="bg-gradient-to-r from-primary to-accent bg-clip-text text-4xl font-extrabold text-transparent">
                {s.value}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="container mx-auto px-6 py-24">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-sm font-medium text-secondary-foreground">
            <Layers className="h-4 w-4 text-primary" />
            Recursos
          </div>
          <h2 className="text-4xl font-bold tracking-tight">
            Tudo que você precisa. Nada que atrapalhe.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Uma experiência minimalista, rápida e desenhada para o seu foco.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="group rounded-2xl border border-border bg-card p-7 transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-[var(--shadow-elegant)]"
            >
              <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground transition group-hover:scale-110">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">{title}</h3>
              <p className="text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="border-y border-border/40 bg-secondary/30">
        <div className="container mx-auto px-6 py-24">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <h2 className="text-4xl font-bold tracking-tight">
              Comece em três passos
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Do zero ao foco total em menos de um minuto.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {STEPS.map((s) => (
              <div
                key={s.n}
                className="relative rounded-2xl border border-border bg-card p-8"
              >
                <div className="mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-5xl font-extrabold text-transparent">
                  {s.n}
                </div>
                <h3 className="mb-2 text-xl font-semibold">{s.title}</h3>
                <p className="text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-6 py-24">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight">
            Quem usa, recomenda
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Pessoas reais focando no que importa todos os dias.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="flex flex-col rounded-2xl border border-border bg-card p-7"
            >
              <div className="mb-4 flex gap-1 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="flex-1 text-foreground">“{t.text}”</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-primary to-accent font-semibold text-primary-foreground">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-border/40 bg-secondary/30">
        <div className="container mx-auto max-w-3xl px-6 py-24">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold tracking-tight">Perguntas frequentes</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Tudo que você precisa saber antes de começar.
            </p>
          </div>
          <div className="space-y-4">
            {FAQ.map((item) => (
              <details
                key={item.q}
                className="group rounded-2xl border border-border bg-card p-6 transition open:shadow-[var(--shadow-soft)]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between font-semibold">
                  {item.q}
                  <span className="ml-4 text-primary transition group-open:rotate-45">
                    <Plus className="h-5 w-5" />
                  </span>
                </summary>
                <p className="mt-3 text-muted-foreground">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-6 py-24">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-accent p-12 text-center text-primary-foreground shadow-[var(--shadow-elegant)] md:p-16">
          <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
          <div className="relative">
            <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium">
              <Clock className="h-4 w-4" />
              Leva menos de 10 segundos
            </div>
            <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
              Pronto para terminar sua lista hoje?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg opacity-90">
              Adicione sua primeira tarefa, defina a prioridade e deixe o foco fluir.
            </p>
            <Link
              to="/app"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-background px-8 py-4 font-semibold text-foreground transition hover:opacity-90"
            >
              Abrir Tarefas+ <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40">
        <div className="container mx-auto px-6 py-12">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2 text-lg font-bold">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground">
                <ListChecks className="h-5 w-5" />
              </div>
              Tarefas+
            </div>
            <nav className="flex gap-8 text-sm font-medium text-muted-foreground">
              <a href="#features" className="transition hover:text-foreground">Recursos</a>
              <a href="#how" className="transition hover:text-foreground">Como funciona</a>
              <a href="#faq" className="transition hover:text-foreground">FAQ</a>
            </nav>
          </div>
          <div className="mt-8 border-t border-border/40 pt-6 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Tarefas+. Feito com foco.
          </div>
        </div>
      </footer>
    </main>
  );
}
