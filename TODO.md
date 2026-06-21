# TODO

## Bugs
- The aidungeon-importer needs to import the tags.
- If I click Narrate All button, it only narrates the first text blob.  It should read out everything, including the section titles (e.g. character names).
- In the Narration Settings, the Voice pick list seems static.  It should query the TTS provider for its installed voices.
- Synthetic constructs need special handling:
    - Industrial Androids should have no gender, orientation, relationship, or family background.
    - Plastic Androids may have a gender for appearances, but are asexual and do not have relationships.
    - Biomechanical Androids should have gender, orientation and relationship.


## New Features
- Enable scripts and add auto-cards
- Update the skeleton with a new "metadata" section with name and version of the text and image provider, generation datetime, commit hash

---

## Fixed Bugs
- Clicking on Spin The Reels should abort any music or sound effect currently playing.
- When generating NPC's, do NOT allow two characters with the same first name.  It just makes game play easier.
- The Copy To Clipboard builder needs to also add the Plot Essentials and Author's Notes sections.
- In the skeleton builder, add the NSFW attribute.
- In the aidungeon-importer, don't upload the portrait if the NSFW flag is set in the scenario.json.
- The Genre pick list style is hard to read.
- The font sizes are inconsistent.  Except for the title bar, make all fonts at least 0.8rem.
