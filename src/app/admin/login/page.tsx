"use client";

import { PrimaryButton } from "@/components/ui/Button";
import { Input } from "@/components/ui/FormFields";
import { useAuthStore } from "@/store/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";

/**
 * LOCAL DEVELOPMENT ONLY.
 * Temporary insecure login for demo purposes. Replace before production.
 */
export default function AdminLoginPage() {
  const router = useRouter();
  const { login, hydrate, hydrated, isAuthenticated } = useAuthStore();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    if (hydrated && isAuthenticated) {
      router.replace("/admin");
    }
  }, [hydrated, isAuthenticated, router]);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const ok = login(username.trim(), password);
    if (!ok) {
      setError("Kullanıcı adı veya şifre hatalı.");
      return;
    }
    router.replace("/admin");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--background)] px-5">
      <div className="w-full max-w-md rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8">
        <p className="font-display text-2xl font-bold">Yönetim Paneli</p>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Bu giriş sistemi yalnızca yerel geliştirme ve demo içindir. Güvenli değildir.
        </p>
        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <Input
            label="Kullanıcı Adı"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />
          <Input
            label="Şifre"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          {error ? <p className="text-sm text-[var(--danger)]">{error}</p> : null}
          <PrimaryButton type="submit" className="w-full">
            Giriş Yap
          </PrimaryButton>
        </form>
        <p className="mt-6 text-center text-sm text-[var(--muted)]">
          <Link href="/" className="hover:text-white">
            Siteye dön
          </Link>
        </p>
      </div>
    </div>
  );
}
