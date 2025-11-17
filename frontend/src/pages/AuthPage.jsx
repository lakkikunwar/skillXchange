import { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./AuthPage.css";

export default function AuthPage() {
	const [mode, setMode] = useState("signup"); // 'signup' | 'login'
	const animatorRef = useRef(null);
	const contentRef = useRef(null);
	const navRef = useRef(null);

	// Smart hide-on-scroll for mobile navbar
	useEffect(() => {
		const nav = navRef.current;
		if (!nav) return;

		let lastY = window.scrollY;
		let ticking = false;
		const THRESHOLD = 8; // ignore tiny scrolls

		const prefersReduced = typeof window !== "undefined" &&
			window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

		function update() {
			const y = window.scrollY;
			const dy = y - lastY;
			if (Math.abs(dy) > THRESHOLD) {
				if (!prefersReduced) {
					if (dy > 0) {
						// scrolling down -> hide
						nav.classList.add("is-hidden");
					} else {
						// scrolling up -> show
						nav.classList.remove("is-hidden");
					}
				}
				lastY = y;
			}
			ticking = false;
		}

		function onScroll() {
			if (!ticking) {
				ticking = true;
				requestAnimationFrame(update);
			}
		}

		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	// Animate the panel height when switching modes to avoid layout flicker
	useLayoutEffect(() => {
		const el = animatorRef.current;
		const child = contentRef.current;
		if (!el || !child) return;

		// Respect reduced motion
		const prefersReduced = typeof window !== "undefined" &&
			window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		if (prefersReduced) {
			el.style.height = "auto";
			return;
		}

		const target = child.offsetHeight;
		// Ensure we have an explicit starting height; if not set by click handler, use current height
		if (!el.style.height) {
			el.style.height = el.offsetHeight + "px";
		}

		// Next frame, animate to the new height
		requestAnimationFrame(() => {
			el.style.transition = "height 220ms ease";
			el.style.height = `${target}px`;
		});

		function onEnd(e) {
			if (e.propertyName !== "height") return;
			el.style.transition = "";
			el.style.height = "auto"; // allow natural growth again
			el.removeEventListener("transitionend", onEnd);
		}
		el.addEventListener("transitionend", onEnd);
		return () => el.removeEventListener("transitionend", onEnd);
	}, [mode]);

	const handleSubmit = (e) => {
		e.preventDefault();
		const form = new FormData(e.currentTarget);
		const payload = Object.fromEntries(form.entries());
		// TODO: Replace with real API call
		console.log(`${mode} payload:`, payload);
		alert(`${mode === "signup" ? "Signed up" : "Logged in"} successfully (demo)`);
	};

	return (
		<div className="auth-page">
			<header className="mobile-navbar" ref={navRef}>
				<div className="mobile-navbar__inner">
					<h1 className="mobile-navbar__brand">Skillxchange</h1>
				</div>
			</header>
			{/* Left hero section */}
			<section className="hero">
				<div className="hero-overlay">
					<h1 className="hero-title">
						CONNECT
						<br />
						LEARN GROW
					</h1>
					<ul className="hero-bullets">
						<li>Share your knowledge</li>
						<li>Master new skills</li>
						<li>Join a global community</li>
					</ul>

					<div className="categories">
						<div className="cat-card">
							<div className="cat-icon">💻</div>
							<div className="cat-title">Coding</div>
							<button className="cat-btn" type="button">Music</button>
						</div>
						<div className="cat-card">
							<div className="cat-icon">🎨</div>
							<div className="cat-title">Design</div>
							<button className="cat-btn" type="button">Music</button>
						</div>
						<div className="cat-card">
							<div className="cat-icon">🎵</div>
							<div className="cat-title">Music</div>
							<button className="cat-btn" type="button">Cooking</button>
						</div>
					</div>
				</div>
			</section>

			{/* Right auth panel */}
			<section className="auth-panel">
				<div className="panel-inner">
					<div className="tabs">
						<button
							className={`tab ${mode === "signup" ? "active" : ""}`}
							onClick={() => {
								const el = animatorRef.current;
								if (el) {
									el.style.height = el.offsetHeight + "px"; // lock current height before switch
								}
								setMode("signup");
							}}
							type="button"
						>
							Sign Up
						</button>
						<button
							className={`tab ${mode === "login" ? "active" : ""}`}
							onClick={() => {
								const el = animatorRef.current;
								if (el) {
									el.style.height = el.offsetHeight + "px";
								}
								setMode("login");
							}}
							type="button"
						>
							Log In
						</button>
					</div>

						{/* Animated height wrapper to smoothly expand/shrink */}
						<div className="panel-animator" ref={animatorRef}>
							{/* Keyed content triggers enter animation and height measurement */}
							<div className="panel-content" key={mode} data-mode={mode} ref={contentRef}>
						<h2 className="panel-title">
							{mode === "signup" ? "Join SkillChange" : "Welcome back"}
						</h2>

						<form className="auth-form" onSubmit={handleSubmit}>
							{mode === "signup" && (
								<div className="field">
									<label htmlFor="name">Name</label>
									<input
										id="name"
										name="name"
										type="text"
										placeholder="Your name"
										required
									/>
								</div>
							)}

							<div className="field">
								<label htmlFor="email">Email</label>
								<input
									id="email"
									name="email"
									type="email"
									placeholder="you@example.com"
									required
								/>
							</div>

							<div className="field">
								<label htmlFor="password">Password</label>
								<input
									id="password"
									name="password"
									type="password"
									placeholder="••••••••"
									required
									minLength={6}
								/>
							</div>

							<button className="primary-btn" type="submit">
								{mode === "signup" ? "Sign Up" : "Log In"}
							</button>
						</form>

						<div className="divider">
							<span>Or continue with</span>
						</div>

						<div className="socials">
							<button className="social-btn google" type="button">
								<span>G</span> Google
							</button>
							<button className="social-btn facebook" type="button">
								<span>f</span> Facebook
							</button>
						</div>

						<p className="terms">
							By registering you agree to our <a href="#">Terms and Conditions</a>
						</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}

