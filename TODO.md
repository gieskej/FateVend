# TODO

## Bugs
- Plot essentials should be short bullet points, not wordy prose.  Ideally around 1000 characters, maximum 1500 characters.
- The text-to-image generator has no idea what an alien looks like, so we need specific alien features mentioned in their portrait prompts (e.g. unusual skin color, horns, scales, webbed fingers, forked tongue, pointed ears, etc).  Likewise, non-humanoid aliens should be even more unusual looking (e.g. four legs, no legs, amoeba, tenticals, insect, vapor, lava, jelly, etc)

- Think of a better name.
- Update help with narration settings
- Inject current git version from serve.sh
- Settings - Narration tab is too tall and gets clipped by the status bar.  The modal should have fixed height and scroll vertically if necessary to show tall tabs.

### Low Priority Bugs
- The aidungeon-importer is flaky about uploading the portrait image.  Sometimes it works, sometimes it does not.
- Sometimes generate_icons hangs and you have to restart the whole shell to recover.
- Redo all of the Joseon icons.  The current icons are a cultural mashup of Chinese, Japanese, Vietnamese and Korean, so they are not accurate.
- Redo all the missing icons in Fantasy

## New Features
- Enable scripts and add auto-cards
- Update the skeleton with a new "metadata" section with name and version of the text and image provider, generation datetime, commit hash
- Add a button that creates a promo video for the scenario using the character portraits, overture, name overlays, "Starring YOU as xxx".
- Add genertion of a couple of faction cards.

---

## Fixed Bugs
- BUG: Change the tone of the Paleolithic genre in Authors Notes - It should be more sitcom/comedy of errors mixed with dark humor that you'll likely be eaten by a predator.  Also make it 100000 BC, more Neanderthal period, less language, more wild, anything goes.
- BUG: Change the tone of the Joseon genre in Authors Notes - It should be more about palace intrigue.
- BUG: Remove secondary Spin The Reels button
- BUG: For genders, change "man" to "male" and "woman" to "female"
- BUG: Stop Narrate All button looks bad
- FEAT: Add an option to auto play Narrate All
- FEAT: Add an option to auto generate NPC portraits.
- BUG: Remove token stats completely from the status bar
- BUG: Redo the UI title bar and selectors.  It occupies too much vertical space.  Selectors should move to a single line toolbar.
- FEAT: Make genre selector a carousel, and each Genre should get a thumbnail and brief description like "Nihongi - Japanese horror"
- Stat adjectives need some work so AI understand them better (e.g. use "average intelligence" instead of just "average").
- Fantasy - Human - Common folk needs "—" to prevent long string shown in roller.
- Synthetic constructs need special handling:
    - Industrial Androids should have no gender, orientation, relationship, or family background.
    - Plastic Androids and Combat Androids may have a gender for appearances, but are asexual and do not have relationships.
    - Biomechanical Androids should have gender, orientation and relationship.
- In the Narration Settings, the Voice pick list seems static.  It should query the TTS provider for its installed voices.
- The aidungeon-importer needs to import the skeleton.tags after setting the title.  Each tag must be entered one at a time after pressing the "+" button.  The input field has placeholder="dragons, magic, etc."  The Add button: locator('[role="button"]:has-text("+"))
- If I click Narrate All button, it plays the sections out in wrong order. It should be title, description, opening, plot essentials, authors note, then characters.
- If I click Narrate All button, it only narrates the first text blob.  It should read out everything, including the section titles (e.g. character names).  If possible, it is desirable to make multiple TTS calls since it takes a long time to generate.
- Clicking on Spin The Reels should abort any music or sound effect currently playing.
- When generating NPC's, do NOT allow two characters with the same first name.  It just makes game play easier.
- The Copy To Clipboard builder needs to also add the Plot Essentials and Author's Notes sections.
- In the skeleton builder, add the NSFW attribute.
- In the aidungeon-importer, don't upload the portrait if the NSFW flag is set in the scenario.json.
- The Genre pick list style is hard to read.
- The font sizes are inconsistent.  Except for the title bar, make all fonts at least 0.8rem.
