// state.js
// Shared mutable UI state that crosses module boundaries (app.js <-> narration.js
// today, and future frontend modules). A single exported object rather than
// individual `export let` bindings: importers read live values through property
// access, and — unlike a reassigned `export let`, which importers can't write —
// any module can update the value by mutating a property. Only genuinely
// cross-module state lives here; state used within one module stays private to
// that module.

export const state = {
  currentGenre: "fantasy",
  currentSkeleton: null,
  currentOutput: null,
};
