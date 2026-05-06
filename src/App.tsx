import React, { useMemo, useState } from "react";

// Octalumen Landing Page
// Marca: Octa = oito pilares | Lumen = luz / clareza
// Essência: iluminar os pilares que fazem um negócio ser visto, entendido e escolhido.

const WHATSAPP_NUMBER = "5516981264770";
const INSTAGRAM_URL = "https://instagram.com/octalumen";
const BUSINESS_EMAIL = "contato@octalumen.com.br";
const CITY_STATE = "Brasil";
const LAUNCH_SPOTS = 10;
const LOGO_SRC = "/logo-octalumen.png"; // Salve a logo principal em public/logo-octalumen.png

const WHATSAPP_MESSAGES = {
  hero: "Olá, Octalumen! Quero iluminar o valor do meu negócio com uma página profissional.",
  header: "Olá, Octalumen! Quero criar uma presença profissional para gerar mais confiança e contatos.",
  diagnostic: "Olá, Octalumen! Quero receber uma indicação de plano para melhorar a presença digital do meu negócio.",
  launch: "Olá, Octalumen! Quero garantir a oferta de lançamento do Plano Profissional.",
  final: "Olá, Octalumen! Quero começar minha página profissional.",
};

const iconPaths: Record<string, string> = {
  arrowRight: "M5 12h14M13 5l7 7-7 7",
  check: "M20 6 9 17l-5-5",
  message: "M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z",
  phone: "M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm4 17h.01",
  chart: "M4 19V5m0 14h16M8 17v-6m5 6V7m5 10v-9",
  zap: "M13 2 4 14h7l-1 8 10-13h-7l0-7Z",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Zm-3-10 2 2 4-5",
  clock: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Zm0-15v6l4 2",
  star: "M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21 7 14.2 2 9.3l6.9-1L12 2Z",
  instagram: "M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm5 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm6-1h.01",
  globe: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Zm0 0c2.2-2.7 3.3-6 3.3-10S14.2 4.7 12 2m0 20c-2.2-2.7-3.3-6-3.3-10S9.8 4.7 12 2M2 12h20",
  file: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm0 0v6h6M8 13h8M8 17h6",
  lock: "M7 11V8a5 5 0 0 1 10 0v3M6 11h12v10H6V11Zm6 4v2",
  light: "M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1M12 8a4 4 0 0 0-2 7.5V17h4v-1.5A4 4 0 0 0 12 8Z",
};

type IconProps = { name: string; className?: string; filled?: boolean };
type Plan = { name: string; setup: string; monthly: string; description: string; features: string[]; cta: string; promo?: string; highlighted?: boolean };
type SectionTitleProps = { eyebrow?: string; title: string; subtitle?: string };
type BadgeProps = { children: React.ReactNode; dark?: boolean };
type PrimaryButtonProps = { href: string; children: React.ReactNode; className?: string };
type LogoProps = { footer?: boolean };

const plans: Plan[] = [
  {
    name: "Essencial",
    setup: "R$ 797",
    monthly: "R$ 147/mês",
    description: "Para negócios que querem sair do improviso e ter uma presença clara e profissional.",
    features: ["Página profissional de 1 seção completa", "Botão direto para WhatsApp", "Formulário de contato", "Mapa e localização", "Serviços e diferenciais", "Hospedagem e SSL", "1 alteração simples por mês"],
    cta: "Quero clareza no digital",
  },
  {
    name: "Profissional",
    setup: "R$ 1.497",
    monthly: "R$ 297/mês",
    promo: "Lançamento: R$ 997 + R$ 197/mês",
    description: "O plano mais indicado para mostrar valor, gerar confiança e receber contatos reais.",
    features: ["Tudo do Essencial", "Copy persuasiva com essência da marca", "FAQ personalizada", "Google Analytics", "Pixel da Meta", "SEO local básico", "Relatório mensal", "Até 3 alterações por mês", "Garantia de ajuste inicial"],
    highlighted: true,
    cta: "Quero iluminar meu negócio",
  },
  {
    name: "Performance",
    setup: "R$ 2.497",
    monthly: "R$ 497/mês",
    description: "Para empresas que querem usar a página com anúncios, medição e otimização mensal.",
    features: ["Tudo do Profissional", "Página extra para campanha", "Integração com agenda", "Revisão mensal da página", "Relatório de conversões", "Suporte prioritário", "Até 2 textos de anúncios por mês"],
    cta: "Quero performance",
  },
];

const benefits = [
  { icon: "light", title: "Clareza para ser visto", text: "Seu cliente entende rapidamente quem você é, o que oferece e por que deve confiar no seu negócio." },
  { icon: "shield", title: "Estrutura para ser escolhido", text: "Organizamos sua presença com uma página profissional, objetiva e pensada para gerar segurança." },
  { icon: "star", title: "Valor percebido", text: "Mostramos seus serviços, diferenciais e provas de confiança de uma forma mais forte e convincente." },
  { icon: "message", title: "Contato com confiança", text: "Guiamos o visitante até o WhatsApp com chamadas claras, botões estratégicos e menos atrito." },
];

const deliverables = ["Chamada principal persuasiva", "Botão fixo de WhatsApp", "Formulário de orçamento", "Lista de serviços", "Galeria de fotos", "Mapa/localização", "Perguntas frequentes", "Versão mobile otimizada", "Pixel e Analytics no plano Pro", "Suporte e manutenção mensal"];
const niches = ["Clínicas de estética", "Salões de beleza", "Oficinas", "Pet shops", "Encanadores", "Eletricistas", "Restaurantes", "Personal trainers", "Serviços de limpeza", "Reformas e construção", "Fotógrafos", "Consultórios"];
const pillars = [
  { title: "Octa", text: "vem do sentido de oito e representa os pilares que sustentam uma presença profissional: clareza, confiança, valor, direção, contato, estrutura, visibilidade e conversão." },
  { title: "Lumen", text: "significa luz, clareza e percepção de valor: aquilo que faz o cliente enxergar seu negócio com mais segurança." },
  { title: "Octalumen", text: "a luz sobre os pilares do seu negócio, para que ele seja visto, entendido, valorizado e escolhido." },
];
const demoModels = [
  { title: "Clínica estética", text: "Página que apresenta procedimentos, benefícios, fotos, localização e agendamento pelo WhatsApp.", tag: "Confiança" },
  { title: "Oficina mecânica", text: "Estrutura clara com serviços, diferenciais, horário, localização e pedido de orçamento.", tag: "Clareza" },
  { title: "Pet shop", text: "Presença organizada com banho e tosa, pacotes, fotos, dúvidas frequentes e contato rápido.", tag: "Contato" },
];
const processSteps = [
  { title: "Diagnóstico", text: "Entendemos seu negócio, público e principal objetivo de contato.", icon: "message" },
  { title: "Direção", text: "Definimos a mensagem que vai transmitir clareza, valor e confiança.", icon: "light" },
  { title: "Estrutura", text: "Organizamos serviços, fotos, diferenciais, botões, FAQ e localização.", icon: "file" },
  { title: "Criação", text: "Construímos a página com visual profissional e foco em conversão.", icon: "zap" },
  { title: "Publicação", text: "Você revisa, ajustamos se necessário e colocamos sua presença no ar.", icon: "globe" },
];
const trustItems = [
  { icon: "light", title: "Clareza", text: "Nada de presença confusa. Cada seção tem função: explicar, gerar confiança e levar ao contato." },
  { icon: "shield", title: "Confiança", text: "A página mostra valor real sem promessas exageradas ou comunicação genérica." },
  { icon: "file", title: "Entrega clara", text: "Você sabe exatamente o que será criado antes de iniciar o projeto." },
  { icon: "clock", title: "Prazo definido", text: "A entrega acontece após o envio completo das informações do negócio." },
];
const faqs: Array<[string, string]> = [
  ["O que significa Octalumen?", "Octa vem do sentido de oito e representa os pilares de uma presença profissional. Lumen significa luz e clareza. A Octalumen cria páginas que iluminam o valor do seu negócio para que o cliente entenda, confie e entre em contato."],
  ["Em quanto tempo minha página fica pronta?", "A entrega normalmente acontece entre 3 e 7 dias úteis após o envio completo das informações, fotos, logo e pagamento da implantação."],
  ["Eu preciso saber mexer no site?", "Não. A Octalumen cria, publica e mantém a estrutura. Você só precisa enviar as informações do seu negócio e divulgar o link."],
  ["Preciso já ter domínio?", "Não. Podemos publicar inicialmente em um endereço temporário e depois conectar um domínio próprio. A compra do domínio pode ser feita à parte."],
  ["A mensalidade inclui o quê?", "Inclui hospedagem, manutenção básica, suporte conforme o plano, pequenas alterações e acompanhamento mensal. Anúncios pagos não estão inclusos na mensalidade."],
  ["Vocês garantem vendas?", "Não prometemos vendas garantidas. Entregamos uma estrutura profissional para melhorar sua apresentação, transmitir confiança e facilitar contatos reais."],
];

export function createWhatsappLink(phoneNumber: string | number | null | undefined, message = "") {
  const cleanNumber = String(phoneNumber || "").replace(/\D/g, "");
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

function whatsappLink(message: string) {
  return createWhatsappLink(WHATSAPP_NUMBER, message);
}

export const octalumenTests = [
  { name: "remove caracteres não numéricos do telefone", passed: createWhatsappLink("+55 (16) 99999-9999", "Olá").startsWith("https://wa.me/5516999999999") },
  { name: "codifica mensagem com espaços e acentos", passed: createWhatsappLink("5516999999999", "Olá, quero meu site").includes("Ol%C3%A1%2C%20quero%20meu%20site") },
  { name: "mantém link válido com mensagem vazia", passed: createWhatsappLink("5516999999999", "") === "https://wa.me/5516999999999?text=" },
  { name: "não quebra com telefone vazio", passed: createWhatsappLink("", "teste") === "https://wa.me/?text=teste" },
  { name: "mensagem hero contém Octalumen", passed: WHATSAPP_MESSAGES.hero.includes("Octalumen") },
  { name: "todos os planos possuem CTA", passed: plans.every((plan) => Boolean(plan.cta)) },
  { name: "plano recomendado existe", passed: plans.some((plan) => plan.highlighted) },
  { name: "logo possui caminho público", passed: LOGO_SRC.startsWith("/") && LOGO_SRC.endsWith(".png") },
];

function Icon({ name, className = "h-5 w-5", filled = false }: IconProps) {
  return <svg viewBox="0 0 24 24" className={className} fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={iconPaths[name] || iconPaths.check} /></svg>;
}
function SectionTitle({ eyebrow, title, subtitle }: SectionTitleProps) {
  return <div className="mx-auto mb-10 max-w-3xl text-center">{eyebrow && <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#16B3A3]">{eyebrow}</p>}<h2 className="text-3xl font-bold tracking-tight text-[#0F2D3A] md:text-4xl">{title}</h2>{subtitle && <p className="mt-4 text-base leading-7 text-slate-600 md:text-lg">{subtitle}</p>}</div>;
}
function Badge({ children, dark = false }: BadgeProps) {
  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold shadow-sm ${dark ? "bg-white/10 text-white ring-1 ring-white/15" : "border border-[#EAF2F5] bg-white/80 text-[#0F2D3A]"}`}>{children}</span>;
}
function PrimaryButton({ href, children, className = "" }: PrimaryButtonProps) {
  return <a href={href} className={`inline-flex items-center justify-center gap-2 rounded-2xl bg-[#16B3A3] px-6 py-4 text-base font-black text-white shadow-lg shadow-teal-500/20 transition hover:-translate-y-0.5 hover:bg-[#119789] ${className}`}>{children}<Icon name="message" className="h-5 w-5" /></a>;
}
function Logo({ footer = false }: LogoProps) {
  const [logoError, setLogoError] = useState(false);
  if (logoError) return <div className="flex items-center gap-3"><div className="flex h-18 w-18 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0F2D3A] via-[#16B3A3] to-[#F4C95D] text-lg font-black text-white shadow-sm">O</div><div><p className={`${footer ? "text-xl" : "text-lg"} font-black tracking-tight text-[#0F2D3A]`}>Octalumen</p><p className="-mt-1 text-xs font-medium text-slate-500">Clareza • Estrutura • Confiança</p></div></div>;
  return <img src={LOGO_SRC} alt="Octalumen" className={footer ? "h-20 w-auto object-contain" : "h-20 w-auto object-contain sm:h-24"} loading={footer ? "lazy" : "eager"} onError={() => setLogoError(true)} />;
}
function Header() {
  return <header className="sticky top-0 z-50 border-b border-[#EAF2F5] bg-white shadow-sm"><div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8"><a href="#top" className="flex items-center" aria-label="Ir para o início da página"><Logo /></a><nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex" aria-label="Navegação principal"><a href="#essencia" className="hover:text-[#0F2D3A]">Essência</a><a href="#entregaveis" className="hover:text-[#0F2D3A]">O que inclui</a><a href="#planos" className="hover:text-[#0F2D3A]">Planos</a><a href="#faq" className="hover:text-[#0F2D3A]">FAQ</a></nav><a href={whatsappLink(WHATSAPP_MESSAGES.header)} className="hidden items-center gap-2 rounded-full bg-[#0F2D3A] px-4 py-2 text-sm font-semibold text-white sm:inline-flex" aria-label="Falar com a Octalumen no WhatsApp">Falar no WhatsApp <Icon name="message" className="h-4 w-4" /></a></div></header>;
}
function HeroPreview() {
  return (
    <div className="relative rounded-[2rem] border border-[#EAF2F5] bg-white p-4 shadow-2xl shadow-slate-200/80">
      <div className="absolute -right-3 -top-3 z-10 rounded-full bg-[#F4C95D] px-4 py-2 text-xs font-black uppercase tracking-widest text-[#0F2D3A] shadow-lg">
        Exemplo visual
      </div>

      <div className="rounded-[1.5rem] bg-[#0F2D3A] p-5 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-300">Presença profissional</p>
            <h3 className="mt-1 text-2xl font-black">Clínica Bella Estética</h3>
          </div>
          <Icon name="light" className="h-7 w-7 text-[#F4C95D]" />
        </div>

        <div className="mt-6 rounded-2xl bg-white p-5 text-[#0F2D3A]">
          <p className="text-xs font-bold uppercase tracking-widest text-[#16B3A3]">
            Clareza para confiar
          </p>
          <h4 className="mt-2 text-2xl font-black">
            Tratamentos estéticos apresentados com valor e segurança
          </h4>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Serviços, fotos, diferenciais, localização e contato em uma estrutura clara para o cliente chamar com confiança.
          </p>
          <a
            href={whatsappLink("Olá, Octalumen! Quero ver esse exemplo de página.")}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#16B3A3] px-4 py-3 font-bold text-white"
          >
            Chamar no WhatsApp
            <Icon name="message" className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          {["Serviços", "Valor", "Confiança", "Contato"].map((item) => (
            <div
              key={item}
              className="rounded-2xl bg-white/10 p-4 text-sm font-semibold text-slate-200"
            >
              <Icon name="check" className="mb-2 h-4 w-4 text-[#F4C95D]" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function OctalumenLandingPage() {
  const [segment, setSegment] = useState("");
  const [goal, setGoal] = useState("WhatsApp");
  const diagnosticMessage = useMemo(() => {
    const segmentText = segment ? `Meu segmento é ${segment}.` : "Quero melhorar a presença digital do meu negócio.";
    return `Olá, Octalumen! ${segmentText} Meu objetivo principal é receber contatos por ${goal}. Quero saber qual plano é ideal para mim.`;
  }, [segment, goal]);

  return <main className="min-h-screen bg-[#F8FAFC] pb-20 text-slate-800 md:pb-0"><Header />
    <section id="top" className="relative overflow-hidden px-4 py-14 sm:px-6 md:py-24 lg:px-8"><div className="absolute left-1/2 top-0 -z-10 h-[620px] w-[1020px] -translate-x-1/2 rounded-full bg-gradient-to-br from-[#EAF2F5] via-white to-teal-100 blur-3xl" /><div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]"><div><div className="mb-6 flex flex-wrap gap-2"><Badge>Octa = oito pilares</Badge><Badge>Lumen = luz e clareza</Badge><Badge>Presença que gera confiança</Badge></div><h1 className="max-w-4xl text-4xl font-black tracking-tight text-[#0F2D3A] sm:text-5xl md:text-6xl">Ilumine o valor do seu negócio com uma presença profissional.</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">A Octalumen cria páginas profissionais que mostram seu valor com clareza, transmitem confiança e transformam visitas em contatos reais pelo WhatsApp.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><PrimaryButton href={whatsappLink(WHATSAPP_MESSAGES.hero)}>Quero atrair mais contatos</PrimaryButton><a href="#essencia" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#EAF2F5] bg-white px-6 py-4 text-base font-bold text-[#0F2D3A] shadow-sm">Conhecer a essência <Icon name="arrowRight" className="h-5 w-5" /></a></div><div className="mt-8 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">{[["Clareza", "para ser visto"], ["Estrutura", "para ser escolhido"], ["Confiança", "desde o 1º clique"], ["Contato", "sem atrito"]].map(([number, label]) => <div key={label} className="rounded-2xl border border-[#EAF2F5] bg-white/85 p-4 shadow-sm"><p className="text-2xl font-black text-[#0F2D3A]">{number}</p><p className="text-sm text-slate-500">{label}</p></div>)}</div></div><HeroPreview /></div></section>

    <section id="essencia" className="px-4 py-14 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl rounded-[2rem] bg-[#0F2D3A] p-8 text-white md:p-12"><div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center"><div><p className="text-sm font-bold uppercase tracking-[0.2em] text-[#F4C95D]">Por que Octalumen?</p><h2 className="mt-3 text-3xl font-black md:text-4xl">A luz sobre os pilares que fazem seu negócio ser escolhido.</h2><p className="mt-4 leading-8 text-slate-200">Acreditamos que bons negócios merecem ser vistos com clareza. Octa vem do sentido de oito e representa os pilares de uma presença profissional. Lumen significa luz e clareza. A Octalumen nasceu para iluminar esses pilares, mostrar o valor do seu negócio e criar confiança para o cliente entrar em contato.</p></div><div className="grid gap-4 md:grid-cols-3">{pillars.map((item) => <div key={item.title} className="rounded-2xl bg-white/10 p-5"><Icon name={item.title === "Lumen" ? "light" : item.title === "Octa" ? "file" : "shield"} className="mb-4 h-6 w-6 text-[#F4C95D]" /><h3 className="text-xl font-black">{item.title}</h3><p className="mt-3 text-sm leading-6 text-slate-200">{item.text}</p></div>)}</div></div></div></section>

    <section className="px-4 py-12 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl rounded-[2rem] border border-[#EAF2F5] bg-white p-8 shadow-sm md:p-12"><div className="grid gap-10 md:grid-cols-2 md:items-center"><div><p className="text-sm font-bold uppercase tracking-[0.2em] text-[#16B3A3]">O problema</p><h2 className="mt-3 text-3xl font-black text-[#0F2D3A] md:text-4xl">Seu negócio pode ser bom, mas se ele não transmite clareza, o cliente não confia.</h2></div><p className="text-lg leading-8 text-slate-600">Quando a presença digital é confusa, incompleta ou improvisada, o cliente hesita. Ele não entende bem o serviço, não encontra informações importantes e muitas vezes desiste antes de entrar em contato.</p></div></div></section>

    <section id="entregaveis" className="px-4 py-16 sm:px-6 lg:px-8"><SectionTitle eyebrow="O que sua página terá" title="Uma estrutura clara para o cliente entender, confiar e chamar" subtitle="Cada bloco da página é pensado para mostrar valor, reduzir dúvidas e guiar o visitante até o contato." /><div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center"><div className="rounded-[2rem] border border-[#EAF2F5] bg-white p-6 shadow-sm"><div className="rounded-[1.5rem] bg-gradient-to-br from-[#0F2D3A] to-[#123E4C] p-6 text-white"><p className="text-sm font-bold uppercase tracking-[0.2em] text-[#F4C95D]">Da visita ao contato</p><h3 className="mt-3 text-3xl font-black">Clareza para ser visto. Estrutura para ser escolhido.</h3><p className="mt-4 leading-8 text-slate-200">Criamos uma presença que pode ser usada no Instagram, tráfego pago, Google Meu Negócio, cartão digital e indicações.</p><div className="mt-6 flex flex-wrap gap-2"><Badge dark>Link na bio</Badge><Badge dark>Meta Ads</Badge><Badge dark>Google Meu Negócio</Badge></div></div></div><div className="grid gap-3 sm:grid-cols-2">{deliverables.map((item) => <div key={item} className="flex items-center gap-3 rounded-2xl border border-[#EAF2F5] bg-white p-4 shadow-sm"><div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-50 text-[#16B3A3]"><Icon name="check" className="h-4 w-4" /></div><p className="font-semibold text-[#0F2D3A]">{item}</p></div>)}</div></div></section>

    <section id="beneficios" className="px-4 py-16 sm:px-6 lg:px-8"><SectionTitle eyebrow="Benefícios" title="Mais do que uma página bonita: presença, valor e confiança" subtitle="A Octalumen cria uma estrutura profissional para seu cliente enxergar seu valor e se sentir seguro para entrar em contato." /><div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 lg:grid-cols-4">{benefits.map((benefit) => <div key={benefit.title} className="rounded-[1.5rem] border border-[#EAF2F5] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"><div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF2F5] text-[#16B3A3]"><Icon name={benefit.icon} className="h-6 w-6" /></div><h3 className="text-xl font-black text-[#0F2D3A]">{benefit.title}</h3><p className="mt-3 leading-7 text-slate-600">{benefit.text}</p></div>)}</div></section>

    <section className="px-4 py-10 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl rounded-[2rem] border border-[#EAF2F5] bg-white p-8 shadow-sm"><div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="text-sm font-bold uppercase tracking-[0.2em] text-[#16B3A3]">Para quem é</p><h2 className="mt-2 text-3xl font-black text-[#0F2D3A]">Ideal para negócios que precisam transmitir confiança rápido</h2></div><a href={whatsappLink("Olá! Quero saber se a Octalumen funciona para o meu segmento.")} className="inline-flex items-center gap-2 font-bold text-[#16B3A3] hover:text-[#119789]">Consultar meu segmento <Icon name="arrowRight" className="h-4 w-4" /></a></div><div className="flex flex-wrap gap-3">{niches.map((niche) => <span key={niche} className="rounded-full bg-[#EAF2F5] px-4 py-2 text-sm font-semibold text-[#0F2D3A]">{niche}</span>)}</div></div></section>

    <section id="modelos" className="px-4 py-16 sm:px-6 lg:px-8"><SectionTitle eyebrow="Modelos demonstrativos" title="Veja como uma presença clara muda a percepção do cliente" subtitle="Os modelos abaixo são exemplos. Não usamos depoimentos falsos nem prometemos resultados irreais." /><div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">{demoModels.map((model) => <div key={model.title} className="rounded-[2rem] border border-[#EAF2F5] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"><div className="mb-5 inline-flex rounded-full bg-teal-50 px-3 py-1 text-xs font-black uppercase tracking-widest text-[#16B3A3]">{model.tag}</div><div className="mb-5 rounded-2xl bg-[#0F2D3A] p-5 text-white"><div className="mb-4 flex gap-1 text-[#F4C95D]">{[1, 2, 3, 4, 5].map((star) => <Icon key={star} name="star" className="h-4 w-4" filled />)}</div><h3 className="text-2xl font-black">{model.title}</h3><p className="mt-3 text-sm leading-6 text-slate-200">{model.text}</p></div><a href={whatsappLink(`Olá, Octalumen! Quero ver um exemplo de página para ${model.title}.`)} className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-[#EAF2F5] px-5 py-3 font-black text-[#0F2D3A] transition hover:bg-[#F8FAFC]">Solicitar exemplo <Icon name="arrowRight" className="h-4 w-4" /></a></div>)}</div></section>

    <section id="como-funciona" className="px-4 py-16 sm:px-6 lg:px-8"><SectionTitle eyebrow="Como funciona" title="Do diagnóstico à publicação com clareza e direção" subtitle="Antes de criar, entendemos seu negócio. Depois, transformamos isso em uma presença profissional feita para gerar confiança." /><div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-5">{processSteps.map((step, index) => <div key={step.title} className="relative rounded-[1.5rem] border border-[#EAF2F5] bg-white p-6 shadow-sm"><div className="mb-5 flex items-center justify-between"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0F2D3A] text-white"><Icon name={step.icon} className="h-6 w-6" /></div><span className="text-4xl font-black text-[#EAF2F5]">0{index + 1}</span></div><h3 className="text-xl font-black text-[#0F2D3A]">{step.title}</h3><p className="mt-3 leading-7 text-slate-600">{step.text}</p></div>)}</div></section>

    <section className="px-4 py-16 sm:px-6 lg:px-8"><div className="mx-auto grid max-w-7xl gap-8 rounded-[2rem] bg-gradient-to-br from-[#16B3A3] to-[#0F2D3A] p-8 text-white md:grid-cols-[1fr_0.9fr] md:p-12"><div><p className="text-sm font-bold uppercase tracking-[0.2em] text-[#F4C95D]">Diagnóstico gratuito</p><h2 className="mt-3 text-3xl font-black md:text-4xl">Descubra como sua presença pode transmitir mais confiança</h2><p className="mt-4 max-w-2xl leading-8 text-teal-50">Responda duas informações rápidas e envie direto para nosso WhatsApp. Vamos indicar o melhor caminho para iluminar o valor do seu negócio.</p></div><div className="rounded-[1.5rem] bg-white p-5 text-[#0F2D3A] shadow-xl"><label className="text-sm font-bold" htmlFor="segmento">Qual é o segmento do seu negócio?</label><input id="segmento" value={segment} onChange={(e) => setSegment(e.target.value)} placeholder="Ex: salão de beleza, oficina, clínica estética" className="mt-2 w-full rounded-2xl border border-[#EAF2F5] px-4 py-3 outline-none ring-teal-100 transition focus:ring-4" /><label className="mt-4 block text-sm font-bold" htmlFor="objetivo">Objetivo principal</label><select id="objetivo" value={goal} onChange={(e) => setGoal(e.target.value)} className="mt-2 w-full rounded-2xl border border-[#EAF2F5] px-4 py-3 outline-none ring-teal-100 transition focus:ring-4"><option>WhatsApp</option><option>Formulário de orçamento</option><option>Agendamento</option><option>Ligação</option><option>Vendas locais</option></select><PrimaryButton href={whatsappLink(diagnosticMessage)} className="mt-5 w-full">Receber indicação do melhor plano</PrimaryButton></div></div></section>

    <section className="px-4 py-12 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl rounded-[2rem] border border-[#F4C95D]/40 bg-[#FFF8E7] p-8 md:p-10"><div className="grid gap-8 md:grid-cols-[1fr_0.7fr] md:items-center"><div><p className="text-sm font-black uppercase tracking-[0.2em] text-[#0F2D3A]">Oferta de lançamento</p><h2 className="mt-3 text-3xl font-black text-[#0F2D3A] md:text-4xl">Plano Profissional com condição especial para os {LAUNCH_SPOTS} primeiros clientes.</h2><p className="mt-4 leading-8 text-slate-700">Página completa com copy, WhatsApp, formulário, mapa, FAQ, Pixel, Analytics, SEO local básico, relatório simples e garantia de ajuste inicial.</p></div><div className="rounded-[1.5rem] bg-white p-6 shadow-sm"><p className="text-sm font-semibold text-slate-500">De R$ 1.497 + R$ 297/mês</p><p className="mt-2 text-4xl font-black text-[#0F2D3A]">R$ 997</p><p className="mt-1 text-lg font-black text-[#16B3A3]">+ R$ 197/mês</p><PrimaryButton href={whatsappLink(WHATSAPP_MESSAGES.launch)} className="mt-5 w-full">Garantir oferta de lançamento</PrimaryButton></div></div></div></section>

    <section id="planos" className="px-4 py-16 sm:px-6 lg:px-8"><SectionTitle eyebrow="Planos" title="Escolha a estrutura ideal para sua presença" subtitle="Cobramos implantação para criação da página e mensalidade para hospedagem, manutenção e suporte." /><div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-3">{plans.map((plan) => <div key={plan.name} className={`relative rounded-[2rem] border p-6 shadow-sm ${plan.highlighted ? "border-[#16B3A3] bg-white shadow-2xl shadow-teal-100" : "border-[#EAF2F5] bg-white"}`}>{plan.highlighted && <div className="absolute -top-4 left-6 rounded-full bg-[#16B3A3] px-4 py-2 text-xs font-black uppercase tracking-widest text-white shadow-lg">Mais recomendado</div>}<h3 className="mt-3 text-2xl font-black text-[#0F2D3A]">{plan.name}</h3><p className="mt-2 min-h-[56px] leading-7 text-slate-600">{plan.description}</p><div className="mt-6 rounded-2xl bg-[#F8FAFC] p-5"><p className="text-sm font-semibold text-slate-500">Implantação</p><p className="text-3xl font-black text-[#0F2D3A]">{plan.setup}</p><p className="mt-3 text-sm font-semibold text-slate-500">Mensalidade</p><p className="text-2xl font-black text-[#0F2D3A]">{plan.monthly}</p>{plan.promo && <p className="mt-3 rounded-xl bg-teal-50 px-3 py-2 text-sm font-bold text-[#16B3A3]">{plan.promo}</p>}</div><ul className="mt-6 space-y-3">{plan.features.map((feature) => <li key={feature} className="flex gap-3 text-sm leading-6 text-slate-700"><Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-[#16B3A3]" />{feature}</li>)}</ul><a href={whatsappLink(`Olá, Octalumen! Tenho interesse no Plano ${plan.name}. Pode me explicar os próximos passos?`)} className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-4 font-black transition ${plan.highlighted ? "bg-[#16B3A3] text-white shadow-lg shadow-teal-500/20 hover:bg-[#119789]" : "bg-[#0F2D3A] text-white hover:bg-[#123E4C]"}`}>{plan.cta}<Icon name="arrowRight" className="h-5 w-5" /></a></div>)}</div><p className="mx-auto mt-6 max-w-3xl text-center text-sm leading-6 text-slate-500">Verba de anúncios, compra de domínio, criação de logotipo, fotografia profissional e gestão completa de redes sociais não estão inclusos, salvo contratação separada.</p></section>

    <section className="px-4 py-16 sm:px-6 lg:px-8"><SectionTitle eyebrow="Por que confiar" title="Mais do que presença digital: confiança, clareza e estrutura" subtitle="Não criamos apenas páginas bonitas. Criamos uma apresentação profissional para seu negócio ser entendido, valorizado e escolhido." /><div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 lg:grid-cols-4">{trustItems.map((item) => <div key={item.title} className="rounded-[1.5rem] border border-[#EAF2F5] bg-white p-6 shadow-sm"><div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0F2D3A] text-white"><Icon name={item.icon} className="h-6 w-6" /></div><h3 className="text-xl font-black text-[#0F2D3A]">{item.title}</h3><p className="mt-3 leading-7 text-slate-600">{item.text}</p></div>)}</div></section>

    <section className="px-4 py-12 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl rounded-[2rem] bg-[#0F2D3A] p-8 text-white md:p-12"><div className="grid gap-8 md:grid-cols-[0.85fr_1.15fr] md:items-center"><div><p className="text-sm font-bold uppercase tracking-[0.2em] text-[#F4C95D]">Garantia de ajuste inicial</p><h2 className="mt-3 text-3xl font-black md:text-4xl">Você revisa antes da publicação final.</h2><p className="mt-4 leading-8 text-slate-200">Após a primeira versão, você pode solicitar uma rodada de ajustes para corrigir informações, textos e contatos antes da página final ir ao ar.</p></div><div className="grid gap-4 sm:grid-cols-2">{["Revisão de textos", "Correção de contatos", "Ajuste de serviços", "Conferência dos botões"].map((item) => <div key={item} className="rounded-2xl bg-white/10 p-5 font-bold"><Icon name="check" className="mb-3 h-5 w-5 text-[#F4C95D]" />{item}</div>)}</div></div></div></section>

    <section id="faq" className="px-4 py-16 sm:px-6 lg:px-8"><SectionTitle eyebrow="Perguntas frequentes" title="Dúvidas comuns antes de começar" subtitle="Veja as respostas principais ou fale direto conosco pelo WhatsApp." /><div className="mx-auto max-w-4xl space-y-4">{faqs.map(([question, answer]) => <details key={question} className="group rounded-2xl border border-[#EAF2F5] bg-white p-6 shadow-sm"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-black text-[#0F2D3A]">{question}<span className="rounded-full bg-[#EAF2F5] px-3 py-1 text-sm transition group-open:rotate-45">+</span></summary><p className="mt-4 leading-7 text-slate-600">{answer}</p></details>)}</div></section>

    <section className="px-4 py-16 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl rounded-[2.5rem] bg-[#0F2D3A] p-8 text-center text-white md:p-14"><p className="text-sm font-bold uppercase tracking-[0.2em] text-[#F4C95D]">Pronto para iluminar seu valor?</p><h2 className="mx-auto mt-4 max-w-3xl text-3xl font-black md:text-5xl">Transforme sua presença digital em uma estrutura clara, profissional e confiável.</h2><p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-200">Fale com a Octalumen e descubra como mostrar melhor o valor do seu negócio para receber contatos reais.</p><div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><PrimaryButton href={whatsappLink(WHATSAPP_MESSAGES.final)}>Falar com a Octalumen</PrimaryButton><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 font-black text-[#0F2D3A] transition hover:-translate-y-0.5 hover:bg-[#F8FAFC]">Ver Instagram <Icon name="instagram" className="h-5 w-5" /></a></div></div></section>

    <footer className="border-t border-[#EAF2F5] bg-white px-4 py-10 sm:px-6 lg:px-8"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row md:items-center"><div className="flex flex-col gap-3"><Logo footer /><p className="text-sm text-slate-500">Clareza para ser visto. Estrutura para ser escolhido.</p></div><div className="flex flex-col gap-2 text-sm text-slate-500 md:items-end"><p>{BUSINESS_EMAIL}</p><p>{CITY_STATE}</p><p>© 2026 Octalumen. Todos os direitos reservados.</p></div></div></footer>

    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[#16B3A3] bg-white p-3 shadow-2xl md:hidden"><a href={whatsappLink(WHATSAPP_MESSAGES.diagnostic)} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#16B3A3] px-5 py-4 font-black text-white" aria-label="Falar com a Octalumen no WhatsApp">Falar com a Octalumen <Icon name="message" className="h-5 w-5" /></a></div>
  </main>;
}
