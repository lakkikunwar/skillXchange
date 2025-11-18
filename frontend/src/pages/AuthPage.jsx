import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AuthPage.css";

import { createPortal } from "react-dom";

// Error popup rendered via portal at the end of <body>
const ErrorPopup = ({ message, onClose }) => {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
		const timer = setTimeout(onClose, 5000);
		return () => clearTimeout(timer);
	}, [onClose]);

	if (!mounted) return null;

	return createPortal(
		<div className="auth-error-popup-overlay">
			<div className="auth-error-popup">
				<div className="auth-error-popup__icon">
					<svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
						<circle cx="19" cy="19" r="19" fill="#ff4d4f"/>
						<path d="M13 13L25 25" stroke="white" strokeWidth="3" strokeLinecap="round"/>
						<path d="M25 13L13 25" stroke="white" strokeWidth="3" strokeLinecap="round"/>
					</svg>
				</div>
				<div className="auth-error-popup__title">Error</div>
				<div className="auth-error-popup__desc">{message || "Something went wrong. Please try again."}</div>
				<button className="auth-error-popup__button" onClick={onClose}>Try again</button>
			</div>
		</div>,
		document.body
	);
};

const AuthPage = () => {
	const [error, setError] = useState("");
	const [showError, setShowError] = useState(false);
	       // Auto-hide error popup after 5 seconds
	       useEffect(() => {
		       if (showError) {
			       const timer = setTimeout(() => {
				       setShowError(false);
			       }, 5000);
			       return () => clearTimeout(timer);
		       }
	       }, [showError]);
	const [mode, setMode] = useState("signup"); // 'signup' | 'login'
	const animatorRef = useRef(null);
	const contentRef = useRef(null);
	const navRef = useRef(null);
	const navigate = useNavigate();

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
		setError("");
		setShowError(false);
		const form = new FormData(e.currentTarget);
		const payload = Object.fromEntries(form.entries());
		const endpoint = mode === "signup" ? "/api/auth/signup" : "/api/auth/login";
		fetch(endpoint, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(payload)
		})
			.then(async (res) => {
				if (!res.ok) {
					const errorMsg = await res.text();
					throw new Error(errorMsg || "Request failed");
				}
				return res.json();
			})
			.then((data) => {
				if (mode === "signup") {
					navigate("/onboarding");
				} else {
					// Optionally store token: localStorage.setItem('token', data)
					navigate("/login-success");
				}
			})
			.catch((err) => {
				setError(err.message || `Failed to ${mode === "signup" ? "sign up" : "log in"}. Please retry.`);
				setShowError(true);
			});
	};

	return (
		<div className="auth-page">
			{showError && error && (
				<ErrorPopup message={error} onClose={() => setShowError(false)} />
			)}
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
						</div>
						<div className="cat-card">
							<div className="cat-icon">🎨</div>
							<div className="cat-title">Design</div>
						</div>
						<div className="cat-card">
							<div className="cat-icon">🎵</div>
							<div className="cat-title">Music</div>
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
								{mode === "signup" ? "Join skillXchange" : "Welcome back"}
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

export default AuthPage;


