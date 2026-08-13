import test from "node:test";
import assert from "node:assert/strict";

import { addSong, getSongs } from "./songs.ts";

test("seed songs are available", () => {
  const songs = getSongs();
  assert.ok(Array.isArray(songs));
  assert.ok(songs.length >= 3);
});

test("new songs can be added", () => {
  const created = addSong({
    title: "Midnight Café",
    artist: "The Lanterns",
    duration: "3:41",
    mood: "Warm",
  });

  assert.equal(created.title, "Midnight Café");
  assert.equal(typeof created.id, "string");
  assert.ok(getSongs().some((song) => song.id === created.id));
});
