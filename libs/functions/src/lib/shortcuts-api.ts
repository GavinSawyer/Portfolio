import { getShortcutsApi } from "@gavinsawyer/shortcuts-api";
import { HttpsFunction }   from "firebase-functions";


export const shortcutsApi: HttpsFunction = getShortcutsApi({
  accessToken: process.env["SHORTCUTS_API_ACCESS_TOKEN"]!,
  environmentCollectionPath: "shortcutsEnvironment",
});
