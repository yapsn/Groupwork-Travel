class DiagnosticConsole extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._logs = [];
        this._isOpen = false;

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    position: fixed;
                    bottom: 15px;
                    right: 15px;
                    z-index: 10000;
                }
                .toggle-button {
                    background-color: #007BFF;
                    color: white;
                    border: none;
                    border-radius: 50%;
                    width: 50px;
                    height: 50px;
                    font-size: 24px;
                    cursor: pointer;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .console-window {
                    display: none;
                    position: absolute;
                    bottom: 70px;
                    right: 0;
                    width: 400px;
                    height: 300px;
                    background-color: #1a1a1a;
                    border: 1px solid #333;
                    border-radius: 12px;
                    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.5);
                    flex-direction: column;
                    overflow: hidden;
                }
                .console-header {
                    background-color: #222;
                    padding: 10px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    color: #fff;
                }
                 .console-header h3 {
                    margin: 0;
                    font-size: 16px;
                 }
                .console-logs {
                    flex-grow: 1;
                    padding: 10px;
                    overflow-y: auto;
                    font-family: 'Courier New', Courier, monospace;
                    font-size: 13px;
                    color: #ddd;
                }
                .log-entry {
                    padding: 4px 0;
                    border-bottom: 1px solid #2a2a2a;
                }
                .log-entry.error {
                    color: #ff5555;
                    font-weight: bold;
                }
            </style>

            <div class="console-window">
                <div class="console-header">
                     <h3>Diagnostic Console</h3>
                     <button class="clear-button">Clear</button>
                </div>
                <div class="console-logs"></div>
            </div>
            <button class="toggle-button">&#x1F41B;</button> 
        `;

        this.toggleButton = this.shadowRoot.querySelector('.toggle-button');
        this.consoleWindow = this.shadowRoot.querySelector('.console-window');
        this.logsContainer = this.shadowRoot.querySelector('.console-logs');
        this.clearButton = this.shadowRoot.querySelector('.clear-button');

        this.toggleButton.addEventListener('click', () => this.toggle());
        this.clearButton.addEventListener('click', () => this.clear());
    }

    toggle() {
        this._isOpen = !this._isOpen;
        this.consoleWindow.style.display = this._isOpen ? 'flex' : 'none';
        this.toggleButton.innerHTML = this._isOpen ? '&times;' : '&#x1F41B;';
    }

    log(message, type = 'log') {
        this._logs.push({ message, type });
        const logEntry = document.createElement('div');
        logEntry.className = `log-entry ${type}`;
        logEntry.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
        this.logsContainer.appendChild(logEntry);
        this.logsContainer.scrollTop = this.logsContainer.scrollHeight;
    }

    clear() {
        this._logs = [];
        this.logsContainer.innerHTML = '';
    }
}

customElements.define('diagnostic-console', DiagnosticConsole);
