import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ArrowRight, ArrowUpRight, CalendarDays, Check, CheckCircle2, Clock3, Code2, Heart, MapPin, Menu, Sparkles, Users, X } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import sculpture from "@/assets/devfest-sculpture.jpg";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "GDG DevFest 2026 · Build what's next" },
    { name: "description", content: "Join GDG DevFest 2026 at IIIT Kalyani for a day of AI, web, cloud, and community. See why it's worth your day and reserve your spot." },
    { property: "og:title", content: "GDG DevFest 2026 · Build what's next" },
    { property: "og:description", content: "One community. Endless possibilities. Find out why DevFest is worth clearing your calendar, and join us at IIIT Kalyani." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});

const registrationSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name.").max(100),
  email: z.string().trim().email("Please enter a valid email address.").max(255),
  role: z.enum(["student", "professional"], { errorMap: () => ({ message: "Please choose your role." }) }),
});
const benefits = [
  { number: "01", color: "blue", icon: Sparkles, title: "Learn from Experts", description: "Hear from Google Developer Experts and engineers who ship real products — then ask them anything you’re stuck on.", points: ["Talks from people who build, not just present", "Straight answers to the questions you brought"] },
  { number: "02", color: "red", icon: Users, title: "Networking", description: "Sit beside students, founders, and engineers who share your curiosity. Your next collaborator is one coffee away.", points: ["Meet the people behind projects you admire", "Find mentors, teammates, and new openings"] },
  { number: "03", color: "green", icon: Code2, title: "Hands-on Skills", description: "Roll up your sleeves and build. Try today’s tools side by side with the community, and take the work home with you.", points: ["Workshops where you follow along, live", "Walk out with something you made yourself"] },
];

function Brand({ footer = false }: { footer?: boolean }) {
  return <a href="#home" className="brand" aria-label="GDG DevFest home"><img src="/favicon.svg" width="43" height="43" alt="" /><span>{footer ? "Google Developer Groups" : "GDG"}<small>{footer ? "Bengaluru" : "Google Developer Groups"}</small></span></a>;
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [role, setRole] = useState("");
  const [errors, setErrors] = useState<Partial<Record<"name" | "email" | "role", string>>>({});
  const [success, setSuccess] = useState(false);
  const [firstName, setFirstName] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const result = registrationSchema.safeParse({ name: data.get("name"), email: data.get("email"), role });
    if (!result.success) {
      const next: Record<string, string> = {};
      result.error.issues.forEach(issue => { next[String(issue.path[0])] = issue.message; });
      setErrors(next);
      return;
    }
    setErrors({});
    setFirstName(result.data.name.split(" ")[0] ?? result.data.name);
    setSuccess(true);
    form.reset();
    setRole("");
  }

  return <>
    <header className="site-header"><div className="page-width nav-inner">
      <Brand />
      <nav className={menuOpen ? "navigation is-open" : "navigation"} aria-label="Main navigation">
        <a href="#about" onClick={() => setMenuOpen(false)}>The event</a><a href="#why" onClick={() => setMenuOpen(false)}>Why attend</a><a href="#register" onClick={() => setMenuOpen(false)}>Join us</a>
      </nav>
      <Button variant="event" asChild className="nav-register"><a href="#register">Register now <ArrowUpRight /></a></Button>
      <Button variant="ghost" size="icon" className="menu-toggle" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button>
    </div></header>

    <main>
      <section className="hero" id="home">
        <img src={sculpture} className="hero-art" alt="Playful blue and green developer brackets with red and yellow geometric sculptures" width={1536} height={1024} fetchPriority="high" />
        <div className="page-width hero-inner">
          <div className="hero-copy"><div className="eyebrow"><span className="status-dot" /> LOCAL COMMUNITY. GLOBAL POSSIBILITIES.</div>
            <h1>GDG DevFest <span className="year"><i>2</i><i>0</i><i>2</i><i>6</i><span className="title-spark">✳</span></span></h1>
            <p className="hero-tagline">Big ideas start with <span>us.</span></p>
            <p className="hero-description">A day to learn, build, and connect with the people<br className="desktop-break" /> shaping what’s next. Your community is waiting.</p>
            <div className="event-badges"><span><CalendarDays /> Nov 14, 2026</span><span><Clock3 /> 9:00 AM – 5:00 PM</span><span><MapPin /> IIIT Kalyani</span></div>
            <div className="hero-actions"><Button variant="event" asChild><a href="#register">Register now <ArrowRight /></a></Button><span>Free to attend. Open to everyone.</span></div>
            <div className="community-proof"><div className="avatar-stack"><span>AS</span><span>RM</span><span>PN</span><span>AP</span></div><p><strong>Good people. Great conversations.</strong><br />Come for the tech. Stay for the community.</p></div>
          </div>
          <div className="art-caption"><span className="color-dots"><i /><i /><i /><i /></span> BUILT BY THE COMMUNITY, FOR THE COMMUNITY</div>
        </div>
      </section>

      <section className="intro-strip" id="about"><div className="page-width intro-inner"><p>One day. <strong>Endless possibilities.</strong></p><div><span><Code2 /> Learn something new</span><span><Users /> Find your people</span><span><Sparkles /> Build what’s next</span></div></div></section>

      <section className="why-section page-width" id="why">
        <div className="section-heading"><div><div className="eyebrow blue-eyebrow">WHY ATTEND</div><h2>One day.<br />Three good reasons<br />to be here.</h2></div><div className="heading-aside"><p>DevFest turns curiosity into capability.<br />Come for one. Stay for all three.</p><span><CalendarDays /> Saturday, November 14 <span className="timezone">IST</span></span></div></div>
        <div className="benefit-grid">{benefits.map(benefit => <article key={benefit.title} className={`benefit-card tone-${benefit.color}`}>
          <div className="benefit-top"><span className="benefit-icon"><benefit.icon /></span><span className="benefit-number">{benefit.number}</span></div>
          <h3>{benefit.title}</h3><p className="benefit-description">{benefit.description}</p>
          <ul className="benefit-list">{benefit.points.map(point => <li key={point}><Check />{point}</li>)}</ul>
        </article>)}</div>
        <div className="why-note"><span><Sparkles /> All three, included with your free spot.</span><span>Free to attend · Open to everyone</span></div>
      </section>

      <section className="registration-section" id="register"><div className="page-width registration-inner">
        <div className="registration-copy"><div className="eyebrow green-eyebrow">YOUR NEXT CONNECTION STARTS HERE</div><h2>You belong<br />in the room.<span className="registration-star">✳</span></h2><p>Whether you’re writing your first line of code or building your next big thing, there’s a place for you at DevFest.</p><ul><li><Check /> A full day of talks and hands-on learning</li><li><Check /> A welcoming community of curious minds</li><li><Check /> Fresh ideas, new friends, and a little swag</li></ul><div className="free-note"><Heart /> No ticket fee. Just bring your curiosity.</div></div>
        <form className="registration-form" onSubmit={submit} noValidate><div className="form-heading"><h3>Save your spot</h3><span className="free-badge">FREE EVENT</span></div><p>Good things happen when we get together.</p>
          <div className="form-field"><label htmlFor="full-name">Full name <span>*</span></label><Input id="full-name" name="name" placeholder="Your full name" autoComplete="name" maxLength={100} required aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />{errors.name && <small id="name-error" className="field-error">{errors.name}</small>}</div>
          <div className="form-field"><label htmlFor="email">Email address <span>*</span></label><Input id="email" name="email" type="email" placeholder="you@example.com" autoComplete="email" maxLength={255} required aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} />{errors.email && <small id="email-error" className="field-error">{errors.email}</small>}</div>
          <div className="form-field"><label htmlFor="role">I’m a… <span>*</span></label><Select value={role} onValueChange={setRole}><SelectTrigger id="role" aria-invalid={!!errors.role} aria-describedby={errors.role ? "role-error" : undefined}><SelectValue placeholder="Select your role" /></SelectTrigger><SelectContent><SelectItem value="student">Student</SelectItem><SelectItem value="professional">Professional</SelectItem></SelectContent></Select>{errors.role && <small id="role-error" className="field-error">{errors.role}</small>}</div>
          <Button type="submit" variant="event" className="submit-button">Submit registration <ArrowRight /></Button><p className="form-disclaimer">This is a demo registration. Your details aren’t stored or sent.</p>
        </form>
      </div></section>
    </main>
    <footer className="page-width footer"><Brand footer /><p>A community-led event. A world of possibilities.</p><span className="color-dots"><i /><i /><i /><i /></span></footer>
    <Dialog open={success} onOpenChange={setSuccess}><DialogContent className="success-modal"><div className="success-symbol"><CheckCircle2 /></div><span className="color-dots"><i /><i /><i /><i /></span><DialogTitle>Success! You’re registered.</DialogTitle><DialogDescription>Thanks for joining us, {firstName}! Your demo registration is complete. We can’t wait to build what’s next, together.</DialogDescription><div className="success-event"><CalendarDays /><span>GDG DevFest 2026<small>November 14 · IIIT Kalyani</small></span></div><Button variant="event" onClick={() => setSuccess(false)}>See you at DevFest <ArrowRight /></Button></DialogContent></Dialog>
  </>;
}
