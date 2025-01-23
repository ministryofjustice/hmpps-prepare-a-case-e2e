import { expect } from "@playwright/test";

/* String format.
* @param str String, needs to be formatted.
* @param args Arguments, needs to be placed properly in the string.
*/
// to pass the dynamic value in run time based on index
export const replaceJsonProperty = (str, ...args) =>
   str.replace(/{(\d+)}/g, (match, index) => args[index].toString() || "");