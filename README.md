# exed

okay, so I wrote another text editor. this commit is what I have achived in just under two hours. It's also a depject example application!

It's more about navigating the file system actually, but you can edit and save files, and run commands too.

The design is simple: there is a `command` bar, and a `result` panel.
Type something into the command bar, then various handlers test if they understand what you wrote. So far, I have handlers for:

- *directories* (it shows the files in that directory)
- *files* (opens the file in a text editor, which I am using right now to edit this file, ctrl-s to save)
- *bash* if it wasn't a file or a directory, try to run it as a bash command, streaming the output into the terminal.

hiting `esc` takes you back to the command bar, and hitting `enter` in the command bar takes you to the result panel, (unless the result panel is not focusable, it leaves you in the command bar)

## License

MIT
