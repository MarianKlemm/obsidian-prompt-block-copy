const { Plugin, Notice } = require("obsidian");

module.exports = class PromptBlockCopyPlugin extends Plugin {
  onload() {
    this.scanScheduled = false;

    this.scan = () => {
      this.scanScheduled = false;

      const root = this.app.workspace.containerEl;

      root.querySelectorAll("pre").forEach((pre) => {
        const code = pre.querySelector(
          "code.language-text, code.language-txt, code.language-prompt"
        );

        if (!code) return;

        const existingCopyButton = pre.querySelector(
          ":scope > .copy-code-button"
        );

        const ownButton = pre.querySelector(
          ":scope > .prompt-block-copy-button"
        );

        // Do not compete with Obsidian or another plugin that already
        // provides a copy button for this block.
        if (existingCopyButton) {
          ownButton?.remove();
          pre.classList.remove("prompt-block-copy-host");
          return;
        }

        if (ownButton) return;

        pre.classList.add("prompt-block-copy-host");

        const button = document.createElement("button");
        button.type = "button";
        button.className = "prompt-block-copy-button";
        button.textContent = "Copy prompt";
        button.setAttribute("aria-label", "Copy prompt");
        button.setAttribute("title", "Copy prompt");

        const stopEditorActivation = (event) => {
          event.preventDefault();
          event.stopPropagation();

          if (typeof event.stopImmediatePropagation === "function") {
            event.stopImmediatePropagation();
          }
        };

        button.addEventListener(
          "pointerdown",
          stopEditorActivation,
          true
        );

        button.addEventListener(
          "mousedown",
          stopEditorActivation,
          true
        );

        button.addEventListener(
          "click",
          async (event) => {
            stopEditorActivation(event);

            try {
              await navigator.clipboard.writeText(
                code.textContent ?? ""
              );

              button.textContent = "Copied ✓";
              button.classList.add("is-copied");

              window.setTimeout(() => {
                if (!button.isConnected) return;

                button.textContent = "Copy prompt";
                button.classList.remove("is-copied");
              }, 1200);
            } catch (error) {
              console.error(
                "Prompt Block Copy: clipboard write failed",
                error
              );

              new Notice("Could not copy prompt.");
            }
          },
          true
        );

        pre.appendChild(button);
      });
    };

    this.scheduleScan = () => {
      if (this.scanScheduled) return;

      this.scanScheduled = true;
      window.requestAnimationFrame(this.scan);
    };

    this.observer = new MutationObserver(() => {
      this.scheduleScan();
    });

    this.observer.observe(this.app.workspace.containerEl, {
      childList: true,
      subtree: true
    });

    this.register(() => {
      this.observer.disconnect();
    });

    this.registerEvent(
      this.app.workspace.on(
        "layout-change",
        () => this.scheduleScan()
      )
    );

    this.registerEvent(
      this.app.workspace.on(
        "active-leaf-change",
        () => this.scheduleScan()
      )
    );

    this.scheduleScan();
  }

  onunload() {
    document
      .querySelectorAll(".prompt-block-copy-button")
      .forEach((button) => button.remove());

    document
      .querySelectorAll(".prompt-block-copy-host")
      .forEach((pre) =>
        pre.classList.remove("prompt-block-copy-host")
      );
  }
};
