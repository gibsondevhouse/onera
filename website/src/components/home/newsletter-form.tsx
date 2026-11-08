"use client";

import { useId, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";

type Status = "idle" | "error" | "done";

type NewsletterFormProps = { compact?: boolean };

export function NewsletterForm({ compact = false }: NewsletterFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [value, setValue] = useState("");
  const inputId = useId();
  const errorId = useId();

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
    if (!valid) {
      setStatus("error");
      return;
    }
    // Local demo only: nothing leaves the browser (decision D03).
    setStatus("done");
  }

  if (status === "done") {
    return (
      <p aria-live="polite" className={compact ? "newsletter__outcome newsletter__outcome--compact" : "newsletter__outcome"} role="status">
        Demo complete. Nothing was sent.
      </p>
    );
  }

  return (
    <form className={compact ? "newsletter newsletter--compact" : "newsletter"} noValidate onSubmit={onSubmit}>
      <div className="newsletter__field">
        <label className="visually-hidden" htmlFor={inputId}>
          E-mail address
        </label>
        <input
          aria-describedby={status === "error" ? errorId : undefined}
          aria-invalid={status === "error" || undefined}
          autoComplete="email"
          className="input"
          id={inputId}
          inputMode="email"
          name="email"
          onChange={(e) => {
            setValue(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder="E-mail"
          type="email"
          value={value}
        />
        <Button size={compact ? "compact" : "default"} type="submit" variant="primary">
          Subscribe
        </Button>
      </div>
      {status === "error" ? (
        <p className="newsletter__error" id={errorId}>
          Enter an e-mail address such as name@example.com.
        </p>
      ) : null}
    </form>
  );
}
