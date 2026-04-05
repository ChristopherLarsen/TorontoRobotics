"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VALID_PASSWORDS = ["Chris", "Peter"];
const SESSION_KEY = "tr_business_auth";

export function setBusinessAuth() {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(SESSION_KEY, "1");
  }
}

export function checkBusinessAuth(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(SESSION_KEY) === "1";
}

export default function PasswordModal({ isOpen, onClose }: PasswordModalProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [shaking, setShaking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      setPassword("");
      setError(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (VALID_PASSWORDS.includes(password)) {
      setBusinessAuth();
      onClose();
      router.push("/business");
    } else {
      setError(true);
      setShaking(true);
      setPassword("");
      setTimeout(() => setShaking(false), 500);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className={`relative bg-[var(--color-brand-surface)] border border-[var(--color-brand-border)] shadow-2xl w-full max-w-sm mx-4 p-8 ${shaking ? "animate-shake" : ""}`}
        onClick={(e) => e.stopPropagation()}
        style={shaking ? { animation: "shake 0.4s ease-in-out" } : {}}
      >
        {/* Lock icon */}
        <div className="flex justify-center mb-5">
          <div className="w-12 h-12 rounded-full bg-[var(--color-brand-accent)]/10 flex items-center justify-center">
            <svg className="w-6 h-6 text-[var(--color-brand-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
        </div>

        <h2 className="text-center text-xl font-black tracking-tight text-[var(--color-brand-text)] mb-1">
          Restricted Access
        </h2>
        <p className="text-center text-sm text-[var(--color-brand-muted)] mb-6">
          This area is for authorised partners only.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              ref={inputRef}
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(false); }}
              placeholder="Enter password"
              className={`w-full px-4 py-3 text-sm border rounded-none bg-[var(--color-brand-bg)] text-[var(--color-brand-text)] placeholder:text-[var(--color-brand-muted)] outline-none transition-colors focus:border-[var(--color-brand-accent)] ${
                error ? "border-red-400 bg-red-50" : "border-[var(--color-brand-border)]"
              }`}
            />
            {error && (
              <p className="mt-1.5 text-xs text-red-500 font-medium">
                Incorrect password. Try again.
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[var(--color-brand-accent)] hover:bg-[var(--color-brand-accent-hover)] text-white text-sm font-bold tracking-widest uppercase transition-colors"
          >
            Enter
          </button>
        </form>

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[var(--color-brand-muted)] hover:text-[var(--color-brand-text)] transition-colors"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
        }
      `}</style>
    </div>
  );
}
