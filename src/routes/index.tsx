import { createFileRoute, Link } from "@tanstack/react-router";
import heroAsset from "@/assets/todo-hero.png.asset.json";
import { CheckCircle2, ListChecks, Sparkles, Zap, ShieldCheck, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tarefas+ — Organize seu dia com leveza" },
      { name: "description", content: "Tarefas+ é o app de to-do bonito e moderno para você adicionar, concluir e remover tarefas sem complicação." },
      { property: "og:title", content: "Tarefas+ — Organize seu dia com leveza" },
      { property: "og:description", content: "App de tarefas bonito e moderno. Foque no que importa." },
      { property: "og:image", content: heroAsset.url },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Landing,
});

function Landing() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-secondary/40 to-background">
      {/* Nav */}
      <header className="container mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-lg">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent grid place-items-center text-primary-foreground shadow-[var(--shadow-soft)]">
            <ListChecks className="w-5 h-5" />
          </div>
          Tarefas+
        </div>
        <Link
          to="/app"
          className="px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition shadow-[var(--shadow-soft)]"
        >
          Abrir app
        </Link>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-6 pt-10 pb-24 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            Novo · Versão 1.0
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.05] text-foreground">
            Organize seu dia com <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">leveza</span> e clareza.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl">
            Tarefas+ é o app to-do bonito e moderno para você adicionar, concluir e remover tarefas sem fricção. Foque no que importa, hoje.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/app"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition shadow-[var(--shadow-elegant)]"
            >
              Começar agora — é grátis
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </Link>
            <a href="#features" className="px-7 py-3.5 rounded-full bg-card border border-border font-semibold hover:bg-secondary transition">
              Ver recursos
            </a>
          </div>
          <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Sem cadastro</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Salvo no dispositivo</div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-6 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-[2rem] blur-2xl" />
          <img
            src={heroAsset.url}
            alt="Ilustração de pessoa marcando tarefas concluídas em uma prancheta"
            className="relative w-full rounded-[2rem] shadow-[var(--shadow-elegant)]"
            loading="eager"
          />
        </div>
      </section>

      {/* Features */}
      <section id="features" className="container mx-auto px-6 py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-4xl font-bold tracking-tight">Tudo que você precisa. Nada que atrapalhe.</h2>
          <p className="mt-4 text-muted-foreground text-lg">Uma experiência minimalista, rápida e desenhada para o seu foco.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Zap, title: "Rápido como pensar", desc: "Adicione tarefas com um clique. Marque como feito com outro. Simples assim." },
            { icon: Sparkles, title: "Design bonito", desc: "Tipografia cuidada, espaçamentos generosos e paleta moderna em azul." },
            { icon: ShieldCheck, title: "100% seu", desc: "Seus dados ficam no seu navegador. Nada de servidores, nada de espionagem." },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="p-7 rounded-2xl bg-card border border-border hover:shadow-[var(--shadow-soft)] transition">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent grid place-items-center text-primary-foreground mb-5">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-6 py-20">
        <div className="rounded-3xl bg-gradient-to-br from-primary to-accent p-12 md:p-16 text-center text-primary-foreground shadow-[var(--shadow-elegant)]">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Pronto para terminar sua lista hoje?</h2>
          <p className="mt-4 text-lg opacity-90 max-w-xl mx-auto">Em menos de 10 segundos você adiciona sua primeira tarefa.</p>
          <Link
            to="/app"
            className="inline-flex items-center gap-2 mt-8 px-8 py-4 rounded-full bg-background text-foreground font-semibold hover:opacity-90 transition"
          >
            Abrir Tarefas+ <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <footer className="container mx-auto px-6 py-10 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Tarefas+. Feito com foco.
      </footer>
    </main>
  );
}
