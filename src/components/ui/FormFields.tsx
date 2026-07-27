import { cn } from "@/lib/utils";
import type { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes, ReactNode } from "react";

interface FieldProps {
  label: string;
  error?: string;
  className?: string;
  children: ReactNode;
  htmlFor?: string;
}

export function Field({ label, error, className, children, htmlFor }: FieldProps) {
  return (
    <div className={cn("w-full", className)}>
      <label htmlFor={htmlFor} className="admin-label">
        {label}
      </label>
      {children}
      {error ? <p className="mt-1.5 text-sm text-[var(--danger)]">{error}</p> : null}
    </div>
  );
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function Input({ label, error, id, className, ...props }: InputProps) {
  const inputId = id ?? props.name;
  return (
    <Field label={label} error={error} htmlFor={inputId}>
      <input id={inputId} className={cn("admin-input", className)} {...props} />
    </Field>
  );
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export function Textarea({ label, error, id, className, ...props }: TextareaProps) {
  const inputId = id ?? props.name;
  return (
    <Field label={label} error={error} htmlFor={inputId}>
      <textarea id={inputId} className={cn("admin-input min-h-28 resize-y", className)} {...props} />
    </Field>
  );
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  options: { value: string; label: string }[];
}

export function Select({ label, error, id, className, options, ...props }: SelectProps) {
  const inputId = id ?? props.name;
  return (
    <Field label={label} error={error} htmlFor={inputId}>
      <select id={inputId} className={cn("admin-input", className)} {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </Field>
  );
}

interface ToggleProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  id?: string;
}

export function Toggle({ label, checked, onChange, id }: ToggleProps) {
  const toggleId = id ?? label;
  return (
    <label htmlFor={toggleId} className="flex items-center justify-between gap-4 cursor-pointer">
      <span className="text-sm text-[var(--muted)]">{label}</span>
      <button
        id={toggleId}
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative h-7 w-12 rounded-full transition-colors",
          checked ? "bg-[var(--primary)]" : "bg-white/10"
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-white transition-transform",
            checked && "translate-x-5"
          )}
        />
      </button>
    </label>
  );
}
