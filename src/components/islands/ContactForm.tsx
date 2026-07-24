import { useState, type SubmitEvent } from "react";
import { z } from "zod";

const contactFormSchema = z.object({
  name: z.string().min(1),
  email: z.email(),
  message: z.string().min(1),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

export interface ContactFormProps {
  onSubmit?: (values: ContactFormValues) => void;
}

export default function ContactForm({ onSubmit }: ContactFormProps) {
  const [errors, setErrors] = useState<ContactFormErrors>({});

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const values = Object.fromEntries(formData.entries());
    const result = contactFormSchema.safeParse(values);

    if (!result.success) {
      const tree = z.treeifyError(result.error);
      setErrors({
        name: tree.properties?.name?.errors[0],
        email: tree.properties?.email?.errors[0],
        message: tree.properties?.message?.errors[0],
      });
      return;
    }

    setErrors({});
    onSubmit?.(result.data);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="contact-name">Nombre</label>
      <input id="contact-name" name="name" type="text" />
      {errors.name && <span>{errors.name}</span>}

      <label htmlFor="contact-email">Correo</label>
      <input id="contact-email" name="email" type="email" />
      {errors.email && <span>{errors.email}</span>}

      <label htmlFor="contact-message">Mensaje</label>
      <textarea id="contact-message" name="message" />
      {errors.message && <span>{errors.message}</span>}

      <button type="submit">Enviar</button>
    </form>
  );
}
