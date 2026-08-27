import React, { useEffect, useState } from "react";
import {
  Mail,
  ArrowRight,
  ShieldCheck,
  ExternalLink,
  Download,
  MapPin,
  Briefcase,
  Code2,
  Layers3,
  Terminal,
  Send,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  CheckCircle2,
} from "lucide-react";


const Portfolio = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio - a.intersectionRatio
          );

        if (visible.length) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        threshold: [0.15, 0.3, 0.5],
        rootMargin: "-80px 0px -45% 0px",
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const revealElements =
      document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      {
        threshold: 0.12,
      }
    );

    revealElements.forEach((element) =>
      observer.observe(element)
    );

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    setMenuOpen(false);
  };

  const projects = [
    {
      number: "01",
      title: "Connect2Me",
      type: "IoT Platform",
      description:
        "Scalable IoT dashboard processing live sensor streams from 500+ devices with high-frequency UI updates.",
      tech: [
        "React.js",
        "Redux Toolkit",
        "REST API",
        "Charts",
        "Performance",
      ],
      featured: true,
    },
    {
      number: "02",
      title: "MSME Portal",
      type: "Government Project",
      description:
        "Enterprise-grade government portal with reusable components, role-based access and API-driven workflows.",
      tech: [
        "React.js",
        "Redux",
        "REST API",
        "RBAC",
      ],
    },
    {
      number: "03",
      title: "ProjectFlow",
      type: "Project Management",
      description:
        "Modern project, task, user, role and permission management platform with an admin dashboard.",
      tech: [
        "React",
        "Redux Toolkit",
        "Node.js",
        "MongoDB",
      ],
    },
    {
      number: "04",
      title: "Macmillan Higher Education",
      type: "Education Platform",
      description:
        "Interactive education platform focused on scalable frontend architecture and smooth user experience.",
      tech: [
        "React",
        "Redux",
        "MySQL",
        "REST API",
      ],
    },
    {
      number: "05",
      title: "FinCredit Pro",
      type: "FinTech Application",
      description:
        "Responsive financial application with data-driven interfaces and reusable frontend modules.",
      tech: [
        "React",
        "JavaScript",
        "API",
        "Responsive UI",
      ],
    },
    {
      number: "06",
      title: "Althomes",
      type: "Real Estate",
      description:
        "Property-focused application with clean search, responsive layouts and reusable React components.",
      tech: [
        "React",
        "JavaScript",
        "Bootstrap",
        "API",
      ],
    },
  ];

  const experiences = [
    {
      year: "Jul 2025 — Jan 2026",
      role: "React Developer",
      company: "Uneecops Technologies",
      location: "New Delhi",
      description:
        "Worked on enterprise React applications, reusable UI components, API integration and scalable frontend architecture.",
      stack: [
        "React.js",
        "Redux Toolkit",
        "JavaScript",
        "REST API",
        "Git",
      ],
    },
    {
      year: "2023 — 2025",
      role: "Software Developer",
      company: "Sun System InfoTech Pvt. Ltd.",
      location: "Noida",
      description:
        "Developed responsive business applications using React, JavaScript and REST APIs while improving UI performance and maintainability.",
      stack: [
        "React",
        "Redux",
        "Axios",
        "JavaScript",
        "Bootstrap",
      ],
    },
    {
      year: "2022 — 2023",
      role: "React Developer",
      company: "Clikon Technologies",
      location: "Noida",
      description:
        "Built reusable frontend modules, integrated APIs and worked closely with backend teams to deliver production-ready interfaces.",
      stack: [
        "React.js",
        "Redux",
        "REST API",
        "HTML",
        "CSS",
      ],
    },
    {
      year: "2022",
      role: "UI / React Developer",
      company: "TechChefz",
      location: "Delhi NCR",
      description:
        "Worked on frontend development, responsive UI implementation and component-based application development.",
      stack: [
        "React",
        "JavaScript",
        "CSS",
        "Bootstrap",
      ],
    },
  ];

  const skills = [
    {
      title: "Frontend",
      items: [
        "React.js",
        "JavaScript ES6+",
        "HTML5",
        "CSS3",
        "Responsive Design",
      ],
    },
    {
      title: "State Management",
      items: [
        "Redux Toolkit",
        "Redux Saga",
        "Context API",
        "React Hooks",
      ],
    },
    {
      title: "API & Backend",
      items: [
        "REST API",
        "Axios",
        "Node.js",
        "Express.js",
        "JWT",
      ],
    },
    {
      title: "Database",
      items: [
        "MongoDB",
        "MySQL",
        "Mongoose",
      ],
    },
    {
      title: "Performance",
      items: [
        "Code Splitting",
        "Lazy Loading",
        "Memoization",
        "Lighthouse",
      ],
    },
    {
      title: "Tools",
      items: [
        "Git",
        "GitHub",
        "Vite",
        "Webpack",
        "NPM",
      ],
    },
  ];

  const blogs = [
    {
      tag: "REACT",
      title: "Building Scalable React Applications",
      description:
        "Practical patterns for creating maintainable React applications with reusable components and clean architecture.",
    },
    {
      tag: "JAVASCRIPT",
      title: "Why Your React App Feels Slow",
      description:
        "Understanding unnecessary renders, expensive calculations and practical frontend performance optimization.",
    },
    {
      tag: "AI",
      title: "Using AI Tools as a Developer",
      description:
        "How modern AI tools can improve development speed without replacing engineering fundamentals.",
    },
  ];

  return (
    <div className="portfolio-page">
      {/* BACKGROUND */}
      <div className="background-grid"></div>
      <div className="glow glow-one"></div>
      <div className="glow glow-two"></div>
      <div className="noise"></div>

      {/* TOP NAV */}
      <header className="portfolio-header">
        <div
          className="brand"
          onClick={() => scrollToSection("home")}
        >
          <div className="brand-mark">
            <ShieldCheck size={18} />
          </div>

          <span>
            kapil<span>.</span>
          </span>
        </div>

        <nav className="desktop-nav">
          {[
            "home",
            "about",
            "projects",
            "experience",
            "skills",
            "blogs",
            "contact",
          ].map((item) => (
            <button
              key={item}
              className={
                activeSection === item ? "active" : ""
              }
              onClick={() => scrollToSection(item)}
            >
              {item}
            </button>
          ))}
        </nav>

        <div className="header-right">
          <span className="available-status">
            <span></span>
            Available
          </span>

          <button
            className="menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <X size={21} />
            ) : (
              <Menu size={21} />
            )}
          </button>
        </div>
      </header>

      {/* MOBILE NAV */}
      {menuOpen && (
        <div className="mobile-nav">
          {[
            "home",
            "about",
            "projects",
            "experience",
            "skills",
            "blogs",
            "contact",
          ].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
            >
              {item}
            </button>
          ))}
        </div>
      )}

      {/* SIDE SOCIAL */}
      <aside className="side-social">
        <a
          href="https://github.com/"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
        >
          GH
        </a>

        <a
          href="https://www.linkedin.com/"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
        >
          in
        </a>

        <a
          href="mailto:yourmail@example.com"
          aria-label="Email"
        >
          <Mail size={15} />
        </a>

        <span className="side-line"></span>
      </aside>

      <main>
        {/* ================= HERO ================= */}
        <section
          id="home"
          className="hero section-container"
        >
          <div className="hero-content reveal">
            <div className="terminal-label">
              <Terminal size={14} />
              <span>HELLO, I'M KAPIL</span>
            </div>

            <p className="hero-small">
              React Developer / Frontend Engineer
            </p>

            <h1>
              Building
              <br />
              <span>Scalable</span>
              <br />
              Digital
              <br />
              Experiences.
            </h1>

            <p className="hero-description">
              Software Developer passionate about
              creating high-performance, intuitive and
              modern web applications.
            </p>

            <div className="hero-actions">
              <button
                className="primary-button"
                onClick={() =>
                  scrollToSection("projects")
                }
              >
                Explore Work
                <ArrowRight size={16} />
              </button>

              <button
                className="outline-button"
                onClick={() =>
                  scrollToSection("contact")
                }
              >
                Contact Me
              </button>
            </div>

            <div className="hero-meta">
              <div>
                <strong>4.8+</strong>
                <span>Years Experience</span>
              </div>

              <div>
                <strong>20+</strong>
                <span>Projects</span>
              </div>

              <div>
                <strong>100%</strong>
                <span>Passion</span>
              </div>
            </div>
          </div>

          <div className="hero-visual reveal">
            <div className="visual-frame">
              <div className="frame-top">
                <span></span>
                <span></span>
                <span></span>
              </div>

              <div className="developer-avatar">
                <div className="avatar-glow"></div>

                <div className="avatar-head">
                  <div className="avatar-hair"></div>
                  <div className="avatar-face">
                    <span></span>
                    <span></span>
                  </div>
                </div>

                <div className="avatar-body">
                  <div className="avatar-arm left"></div>
                  <div className="avatar-arm right"></div>
                </div>
              </div>

              <div className="code-float code-one">
                <span>const</span> developer =
                <b>"React"</b>;
              </div>

              <div className="code-float code-two">
                &lt;Build /&gt;
              </div>

              <div className="availability-card">
                <span className="pulse-dot"></span>
                <div>
                  <strong>Available for freelance</strong>
                  <small>
                    Projects and collaborations
                  </small>
                </div>
              </div>
            </div>
          </div>

          <button
            className="scroll-down"
            onClick={() =>
              scrollToSection("about")
            }
          >
            <span>SCROLL TO EXPLORE</span>
            <ChevronDown size={15} />
          </button>
        </section>

        {/* ================= ABOUT ================= */}
        <section
          id="about"
          className="section-container about-section"
        >
          <div className="section-heading reveal">
            <span>#01</span>
            <h2>About Me</h2>
            <div></div>
          </div>

          <div className="about-grid">
            <div className="about-text reveal">
              <p className="big-text">
                I craft interfaces that are
                <span> fast, scalable and meaningful.</span>
              </p>

              <p>
                I'm a result-oriented React Developer with
                strong experience in building modern web
                applications, dashboards and enterprise
                platforms.
              </p>

              <p>
                My focus is writing clean, reusable and
                maintainable frontend code while keeping
                performance and user experience at the
                center of every product.
              </p>

              <div className="about-points">
                <div>
                  <CheckCircle2 size={16} />
                  <span>Clean & reusable architecture</span>
                </div>

                <div>
                  <CheckCircle2 size={16} />
                  <span>Performance focused development</span>
                </div>

                <div>
                  <CheckCircle2 size={16} />
                  <span>API & state management expertise</span>
                </div>
              </div>
            </div>

            <div className="about-card reveal">
              <div className="about-card-top">
                <Code2 size={18} />
                <span>developer.json</span>
              </div>

              <div className="json-code">
                <p>
                  <span className="json-purple">
                    {"{"}
                  </span>
                </p>

                <p>
                  <span className="json-key">
                    "name"
                  </span>
                  : <span>"Kapil Bawari"</span>,
                </p>

                <p>
                  <span className="json-key">
                    "role"
                  </span>
                  : <span>"React Developer"</span>,
                </p>

                <p>
                  <span className="json-key">
                    "experience"
                  </span>
                  : <span>"4.8+ Years"</span>,
                </p>

                <p>
                  <span className="json-key">
                    "location"
                  </span>
                  : <span>"Delhi NCR"</span>,
                </p>

                <p>
                  <span className="json-key">
                    "status"
                  </span>
                  :{" "}
                  <span className="json-green">
                    "available"
                  </span>
                </p>

                <p>
                  <span className="json-purple">
                    {"}"}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= PROJECTS ================= */}
        <section
          id="projects"
          className="section-container"
        >
          <div className="section-heading reveal">
            <span>#02</span>
            <h2>Selected Projects</h2>
            <div></div>
            <small>Things I've built</small>
          </div>

          <div className="projects-grid">
            {projects.map((project, index) => (
              <article
                className={`project-card reveal ${
                  project.featured ? "featured" : ""
                }`}
                key={project.number}
                style={{
                  transitionDelay: `${index * 70}ms`,
                }}
              >
                <div className="project-top">
                  <span className="project-number">
                    {project.number}
                  </span>

                  <ExternalLink size={16} />
                </div>

                <div className="project-type">
                  {project.type}
                </div>

                <h3>{project.title}</h3>

                <p>{project.description}</p>

                <div className="tech-list">
                  {project.tech.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ================= EXPERIENCE ================= */}
        <section
          id="experience"
          className="section-container experience-section"
        >
          <div className="section-heading reveal">
            <span>#03</span>
            <h2>Experience</h2>
            <div></div>
          </div>

          <div className="experience-list">
            {experiences.map((experience, index) => (
              <div
                className="experience-item reveal"
                key={index}
              >
                <div className="timeline">
                  <span></span>
                  {index !== experiences.length - 1 && (
                    <i></i>
                  )}
                </div>

                <div className="experience-card">
                  <div className="experience-head">
                    <div>
                      <span className="experience-date">
                        {experience.year}
                      </span>

                      <h3>{experience.role}</h3>

                      <h4>{experience.company}</h4>
                    </div>

                    <div className="experience-location">
                      <MapPin size={13} />
                      {experience.location}
                    </div>
                  </div>

                  <p>{experience.description}</p>

                  <div className="stack-row">
                    {experience.stack.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= SKILLS ================= */}
        <section
          id="skills"
          className="section-container skills-section"
        >
          <div className="section-heading reveal">
            <span>#04</span>
            <h2>Skills & Tools</h2>
            <div></div>
          </div>

          <div className="skills-intro reveal">
            <div>
              <Layers3 size={24} />
            </div>

            <p>
              A practical toolkit built through real-world
              projects, production applications and
              continuous learning.
            </p>
          </div>

          <div className="skills-grid">
            {skills.map((group, index) => (
              <div
                className="skill-box reveal"
                key={group.title}
                style={{
                  transitionDelay: `${index * 60}ms`,
                }}
              >
                <div className="skill-box-title">
                  <span>0{index + 1}</span>
                  <h3>{group.title}</h3>
                </div>

                <div className="skill-items">
                  {group.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= BLOGS ================= */}
        <section
          id="blogs"
          className="section-container"
        >
          <div className="section-heading reveal">
            <span>#05</span>
            <h2>Thoughts & Blogs</h2>
            <div></div>
            <small>Read more →</small>
          </div>

          <div className="blog-grid">
            {blogs.map((blog, index) => (
              <article
                className="blog-card reveal"
                key={blog.title}
                style={{
                  transitionDelay: `${index * 80}ms`,
                }}
              >
                <div className="blog-image">
                  <div className="blog-image-icon">
                    {index === 0 ? (
                      <Code2 size={38} />
                    ) : index === 1 ? (
                      <Terminal size={38} />
                    ) : (
                      <Sparkles size={38} />
                    )}
                  </div>
                </div>

                <div className="blog-content">
                  <span>{blog.tag}</span>

                  <h3>{blog.title}</h3>

                  <p>{blog.description}</p>

                  <button>
                    Read Article
                    <ArrowRight size={14} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ================= CONTACT ================= */}
        <section
          id="contact"
          className="section-container contact-section"
        >
          <div className="section-heading reveal">
            <span>#06</span>
            <h2>Let's Connect</h2>
            <div></div>
          </div>

          <div className="contact-grid">
            <div className="contact-info reveal">
              <span className="contact-kicker">
                HAVE A PROJECT IN MIND?
              </span>

              <h2>
                Let's build something
                <span> great together.</span>
              </h2>

              <p>
                I'm always open to discussing new products,
                interesting ideas, freelance opportunities
                or potential collaborations.
              </p>

              <div className="contact-links">
                <a href="mailto:yourmail@example.com">
                  <Mail size={17} />
                  <span>yourmail@example.com</span>
                </a>

                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="social-mini">in</span>
                  <span>LinkedIn Profile</span>
                </a>

                <a
                  href="https://github.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="social-mini">GH</span>
                  <span>GitHub Profile</span>
                </a>
              </div>
            </div>

            <form
              className="contact-form reveal"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="form-row">
                <div>
                  <label>Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label>Company / Project</label>
                <input
                  type="text"
                  placeholder="Company or project name"
                />
              </div>

              <div>
                <label>Message</label>
                <textarea
                  rows="6"
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="send-button"
              >
                Send Message
                <Send size={15} />
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="portfolio-footer">
        <div>
          <strong>
            © 2026 Kapil Bawari
          </strong>
          <span>
            Built with React & lots of coffee.
          </span>
        </div>

        <div className="footer-socials">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
          >
            GH
          </a>

          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noreferrer"
          >
            in
          </a>

          <a href="mailto:yourmail@example.com">
            <Mail size={14} />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;