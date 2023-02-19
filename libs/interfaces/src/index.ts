export type MessageFormStatus = "unsent" | "sending" | "sent"

export interface MessageDocument {
  "email"?: string,
  "message": string,
  "name": string,
  "owner": string,
  "phone"?: string,
}

export interface ShortcutsAPIPublicDocument {
  "focus": string,
}