# Prompt Block Copy

Copy prompt code blocks in Obsidian with a single click.

Prompt Block Copy adds a dedicated copy button to fenced prompt-style code blocks so their contents can be copied without selecting the text or activating the editor.

## Features

- Adds a **Copy prompt** button to supported fenced code blocks.
- Copies the complete code-block contents to the clipboard with one click.
- Shows a short **Copied ✓** confirmation after a successful copy.
- Prevents the copy action from switching the code block into edit mode.
- Uses Obsidian theme variables for light and dark mode.
- Replaces the existing code-block copy button with a dedicated **Copy prompt** button for supported prompt blocks.

## Supported code blocks

The plugin currently recognizes fenced code blocks with these language identifiers:

````
```text
Your prompt here
```
````

````
```txt
Your prompt here
```
````

````
```prompt
Your prompt here
```
````

## Installation

### Community Plugins

Once the plugin is available in the Obsidian Community Plugin directory:

1. Open **Settings → Community plugins**.
2. Search for **Prompt Block Copy**.
3. Install the plugin.
4. Enable it.

### Beta testing with BRAT

Before the Community Plugin release, the plugin can be installed through BRAT using this repository:

`MarianKlemm/obsidian-prompt-block-copy`

### Manual installation

Copy the following files into:

`<vault>/.obsidian/plugins/prompt-block-copy/`

Required files:

- `main.js`
- `manifest.json`
- `styles.css`

Restart Obsidian and enable **Prompt Block Copy** under Community plugins.

## Privacy

Prompt Block Copy works entirely inside Obsidian.

It does not:

- send data to external services,
- collect telemetry,
- require an account,
- store copied prompt contents.

Clipboard access is used only when the user presses the copy button.

## License

MIT

## Author

Marian Klemm
