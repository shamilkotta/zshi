#!/usr/bin/env node

import fs from "fs";
import path from "path";
import os from "os";
import { error } from "console";

try {
  const tempDir = path.join(os.homedir(), ".zi");
  if (fs.existsSync(tempDir)) {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }

  const zshrcPath = path.join(os.homedir(), ".zshrc"); // TODO: add support for other shells
  if (fs.existsSync(zshrcPath)) {
    let content = fs.readFileSync(zshrcPath, "utf8");

    // Adjust this to match what you added
    const markerStart = "# >>> ZI >>>";
    const markerEnd = "# <<< ZI <<<";

    if (content.includes(markerStart) && content.includes(markerEnd)) {
      const regex = new RegExp(`${markerStart}[\\s\\S]*?${markerEnd}\\n?`, "g");
      content = content.replace(regex, "");
      fs.writeFileSync(zshrcPath, content, "utf8");
    }
  }
} catch {
  error("Failed to clean up");
  error("Please remove the config manually from your shell config file.");
}
