# FAQ

## I'm confused about the need for the serve.sh script.  You say FateVend runs statically.
Sorry it is a little confusing.  The serve.sh script serves a few purposes:
- It makes FateVend accessible from other devices on your home network (e.g. you laptop and tablet).
- It also helps with handling the AI API keys.

When you enter the AI API keys into the Settings screen, the data is stored in your browser's local storage (a special database only your browser for your account can read).  This is secure and private, but it means that if you switch browsers (you used Chrome then try Firefox), you will have to enter the AI API keys again.  Furthermore, data in your browser's local storage expires after a while.

To overcome these limitations, I added the optional .env file.  However, it assumes that you are running FateVend on your own personal computer.  This is because anyone using FateVend will have access to the AI API keys in your .env.

The serve.sh script copies the keys from .env into the Javascript code at startup.
