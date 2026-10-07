#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

const dataPath = path.join(process.cwd(), "data", "trmnl.json");
const payload = JSON.parse(fs.readFileSync(dataPath, "utf8"));
const required = [
  "id", "exhibit", "name", "proposal_period", "proposal_year", "category",
  "category_key", "stage", "image_url", "image_url_standard", "image_url_wide", "image_alt", "caption", "why_unbuilt", "what_remains",
  "source_name", "source_url", "note"
];
const allowedCategories = new Set(["architecture", "transport", "space", "infrastructure", "technology"]);
const errors = [];
const ids = new Set();
const exhibits = new Set();
const displayLimits = {
  name: 36,
  proposal_period: 24,
  proposal_year: 10,
  stage: 16,
  caption: 100,
  why_unbuilt: 125,
  what_remains: 120,
};

if (!Array.isArray(payload.items) || payload.items.length === 0) {
  errors.push("items must be a non-empty array");
} else {
  payload.items.forEach((item, index) => {
    const label = `items[${index}]`;
    required.forEach((key) => {
      if (typeof item[key] !== "string" || item[key].trim() === "") {
        errors.push(`${label}.${key} must be a non-empty string`);
      }
    });
    if (ids.has(item.id)) errors.push(`${label}.id is duplicated: ${item.id}`);
    if (exhibits.has(item.exhibit)) errors.push(`${label}.exhibit is duplicated: ${item.exhibit}`);
    ids.add(item.id);
    exhibits.add(item.exhibit);
    if (!allowedCategories.has(item.category_key)) {
      errors.push(`${label}.category_key is unsupported: ${item.category_key}`);
    }
    try {
      const url = new URL(item.source_url);
      if (url.protocol !== "https:") errors.push(`${label}.source_url must use HTTPS`);
    } catch {
      errors.push(`${label}.source_url is invalid`);
    }
    ["image_url", "image_url_standard", "image_url_wide"].forEach((key) => {
      try {
        const url = new URL(item[key]);
        if (url.protocol !== "https:") errors.push(`${label}.${key} must use HTTPS`);
      } catch {
        errors.push(`${label}.${key} is invalid`);
      }
    });
    Object.entries(displayLimits).forEach(([key, limit]) => {
      if (item[key].length > limit) {
        errors.push(`${label}.${key} exceeds the ${limit}-character layout limit`);
      }
    });
  });
}

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}

console.log(`Validated ${payload.items.length} NEVER BUILT entries.`);

