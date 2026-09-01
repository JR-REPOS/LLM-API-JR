# WaveTerm Docs — waveterm.dev

Live documentation pulled from [context7.com/websites/waveterm_dev](https://context7.com/websites/waveterm_dev/llms.txt?tokens=45227).

Covers custom widgets, `widgets.json`, wsh, Wave AI, and configuration.

---

### Start development server

Source: https://docs.waveterm.dev/wsh

Use `wsh run -m` to start a development server in a new, magnified block.

```bash
wsh run -m -- npm run dev
```

--------------------------------

### Install Wave beta via Snap

Source: https://docs.waveterm.dev/faq

Use the snap command to install the beta version of Wave on supported Linux distributions.

```bash
sudo snap install waveterm --classic --beta
```

--------------------------------

### Example bookmarks.json Configuration

Source: https://docs.waveterm.dev/config

An example of a bookmarks.json file demonstrating various bookmark configurations, including custom titles, display order, and icon URLs.

```json
{
  "bookmark@google": {
    "url": "https://www.google.com",
    "title": "Google"
  },
  "bookmark@claude": {
    "url": "https://claude.ai",
    "title": "Claude AI"
  },
  "bookmark@wave": {
    "url": "https://waveterm.dev",
    "title": "Wave Terminal",
    "display:order": -1
  },
  "bookmark@wave-github": {
    "url": "https://github.com/wavetermdev/waveterm",
    "title": "Wave Github",
    "iconurl": "https://github.githubassets.com/favicons/favicon-dark.png"
  },
  "bookmark@chatgpt": {
    "url": "https://chatgpt.com",
    "iconurl": "https://cdn.oaistatic.com/assets/favicon-miwirzcw.ico"
  },
  "bookmark@wave-pulls": {
    "url": "https://github.com/wavetermdev/waveterm/pulls",
    "title": "Wave Pull Requests",
    "iconurl": "https://github.githubassets.com/favicons/favicon-dark.png"
  }
}

```

--------------------------------

### YouTube Web Widget Example

Source: https://docs.waveterm.dev/customwidgets

Example configuration for a web widget that defaults to the YouTube homepage and uses YouTube as its home page.

```json
{
    <... other widgets go here ...>,
    "youtube" : {
        "icon": "brands@youtube",
        "label": "youtube",
        "blockdef": {
            "meta": {
                "view": "web",
                "url": "https://youtube.com",
                "pinnedurl": "https://youtube.com"
            }
        }
    },
    <... other widgets go here ...>
}

```

--------------------------------

### GitHub Web Widget Example

Source: https://docs.waveterm.dev/customwidgets

Example configuration for a web widget that opens to GitHub but uses Google as its home page.

```json
{
    <... other widgets go here ...>,
    "github" : {
        "icon": "brands@github",
        "label": "github",
        "blockdef": {
            "meta": {
                "view": "web",
                "url": "https://github.com",
                "pinnedurl": "https://google.com"
            }
        }
    },
    <... other widgets go here ...>
}

```

--------------------------------

### Full AI Configuration Example

Source: https://docs.waveterm.dev/waveai-modes

This example demonstrates all available configuration fields for a custom AI endpoint. It includes settings for display, API type, model, endpoint, and capabilities.

```json
{
  "mode-key": {
    "display:name": "Display Name",
    "display:order": 1,
    "display:icon": "icon-name",
    "display:description": "Full description",
    "ai:provider": "custom",
    "ai:apitype": "openai-chat",
    "ai:model": "model-name",
    "ai:thinkinglevel": "medium",
    "ai:endpoint": "http://localhost:11434/v1/chat/completions",
    "ai:azureapiversion": "v1",
    "ai:apitoken": "your-token",
    "ai:apitokensecretname": "PROVIDER_KEY",
    "ai:azureresourcename": "your-resource",
    "ai:azuredeployment": "your-deployment",
    "ai:capabilities": ["tools", "images", "pdfs"]
  }
}
```

--------------------------------

### Full Configuration (all fields)

Source: https://docs.waveterm.dev/waveai-modes

An example showcasing all available configuration fields for maximum customization.

```APIDOC
## Full Configuration (all fields)

### Description
This configuration includes all possible fields for detailed control over AI mode settings.

### Request Body
```json
{
  "mode-key": {
    "display:name": "Display Name",
    "display:order": 1,
    "display:icon": "icon-name",
    "display:description": "Full description",
    "ai:provider": "custom",
    "ai:apitype": "openai-chat",
    "ai:model": "model-name",
    "ai:thinkinglevel": "medium",
    "ai:endpoint": "http://localhost:11434/v1/chat/completions",
    "ai:azureapiversion": "v1",
    "ai:apitoken": "your-token",
    "ai:apitokensecretname": "PROVIDER_KEY",
    "ai:azureresourcename": "your-resource",
    "ai:azuredeployment": "your-deployment",
    "ai:capabilities": ["tools", "images", "pdfs"]
  }
}
```
```

--------------------------------

### Install Wave Terminal via Snap

Source: https://docs.waveterm.dev/gettingstarted

Use the snap package manager to install Wave Terminal on supported Linux distributions.

```bash
sudo snap install --classic waveterm
```

--------------------------------

### Minimal Configuration (with Provider)

Source: https://docs.waveterm.dev/waveai-modes

A basic configuration example for connecting to an AI provider using presets.

```APIDOC
## Minimal Configuration (with Provider)

### Description
This configuration demonstrates the minimal setup required when using a predefined AI provider.

### Request Body
```json
{
  "mode-key": {
    "display:name": "Qwen (OpenRouter)",
    "ai:provider": "openrouter",
    "ai:model": "qwen/qwen-2.5-coder-32b-instruct"
  }
}
```
```

--------------------------------

### Automate Development Environment Setup with wsh

Source: https://docs.waveterm.dev/wsh

Use this script to initialize services, open project views, and trigger notifications upon build completion.

```bash
#!/bin/bash
# Setup development environment
wsh run -- docker-compose up -d
wsh web open localhost:8080
wsh view ./src
wsh run -- npm run test:watch

# Get notified when long-running tasks complete using wsh notify
npm run build && wsh notify "Build complete" || wsh notify "Build failed"
```

--------------------------------

### Background Image Configuration

Source: https://docs.waveterm.dev/tab-backgrounds

Example of configuring a background image using a URL, with specific sizing and repeat properties.

```json
{
  "bg@ocean": {
    "display:name": "Ocean Scene",
    "bg": "url('/path/to/ocean.jpg') center/cover no-repeat",
    "bg:opacity": 0.2
  }
}

```

--------------------------------

### Start new AI chat with attached files

Source: https://docs.waveterm.dev/wsh

Use `wsh ai -n` to start a new, fresh AI conversation with specified files attached.

```bash
wsh ai -n *.log -m "analyze these logs"
```

--------------------------------

### Start AI Chat with Files

Source: https://docs.waveterm.dev/wsh-reference

Initiate a new AI conversation or attach files to an existing one using the wsh ai command.

```bash
wsh ai -n report.pdf data.csv -m "summarize these reports"
```

```bash
wsh ai architecture.png api-spec.pdf server.go -m "review the system design"
```

--------------------------------

### Simple Solid Color Background

Source: https://docs.waveterm.dev/tab-backgrounds

Example of a basic solid color background configuration with custom opacity and active border color.

```json
{
  "bg@blue": {
    "display:name": "Blue",
    "bg": "blue",
    "bg:opacity": 0.3,
    "bg:activebordercolor": "rgba(0, 0, 255, 1.0)"
  }
}

```

--------------------------------

### Configure Ollama Local Model

Source: https://docs.waveterm.dev/waveai-modes

Example configuration for running a local Llama 3.3 model via Ollama.

```json
{
  "ollama-llama": {
    "display:name": "Ollama - Llama 3.3",
    "display:order": 1,
    "display:icon": "microchip",
    "display:description": "Local Llama 3.3 70B model via Ollama",
    "ai:apitype": "openai-chat",
    "ai:model": "llama3.3:70b",
    "ai:thinkinglevel": "medium",
    "ai:endpoint": "http://localhost:11434/v1/chat/completions",
    "ai:apitoken": "ollama"
  }
}
```

--------------------------------

### GET /editconfig

Source: https://docs.waveterm.dev/wsh-reference

Opens specified Wave configuration files for editing.

```APIDOC
## GET /editconfig

### Description
Opens a Wave configuration file in the editor.

### Method
GET

### Endpoint
wsh editconfig [config-file-name]

### Parameters
#### Path Parameters
- **config-file-name** (string) - Optional - The name of the config file to open (e.g., presets.json, widgets.json). Defaults to settings.json if omitted.
```

--------------------------------

### Basic AI Preset Configuration (Claude)

Source: https://docs.waveterm.dev/ai-presets

A basic example of an AI preset configuration for Claude 3 Sonnet. Replace '<your anthropic API key>' with your actual key.

```json
{
  "ai@claude-sonnet": {
    "display:name": "Claude 3 Sonnet",
    "display:order": 1,
    "ai:*": true,
    "ai:apitype": "anthropic",
    "ai:model": "claude-3-5-sonnet-latest",
    "ai:apitoken": "<your anthropic API key>"
  }
}

```

--------------------------------

### Get File Information

Source: https://docs.waveterm.dev/wsh-reference

Displays information about a file, including size, creation time, modification time, and metadata. Supports local and remote files via WSH.

```bash
wsh file info [file-uri]  

```

```bash
wsh file info wsh://user@ec2/home/user/config.txt  

```

```bash
wsh file info ./local-config.txt  

```

--------------------------------

### Define Multiple AI Modes

Source: https://docs.waveterm.dev/waveai-modes

Configure multiple AI modes with different models and endpoints, allowing easy switching between them. This example shows configurations for Ollama and OpenAI.

```json
{
  "ollama-llama": {
    "display:name": "Ollama - Llama 3.3",
    "display:order": 1,
    "ai:model": "llama3.3:70b",
    "ai:endpoint": "http://localhost:11434/v1/chat/completions",
    "ai:apitoken": "ollama"
  },
  "ollama-codellama": {
    "display:name": "Ollama - CodeLlama",
    "display:order": 2,
    "ai:model": "codellama:34b",
    "ai:endpoint": "http://localhost:11434/v1/chat/completions",
    "ai:apitoken": "ollama"
  },
  "openai-gpt4o": {
    "display:name": "GPT-4o",
    "display:order": 10,
    "ai:provider": "openai",
    "ai:model": "gpt-4o"
  }
}
```

--------------------------------

### Append content to Wave AI sidebar

Source: https://docs.waveterm.dev/wsh-reference

Use `wsh ai` to append content to the Wave AI sidebar. Files are attached directly. Use `-m` to add a message, `-s` to auto-submit, and `-n` to start a new chat. Use '-' to read from stdin. Multiple files can be attached.

```bash
# Pipe command output to AI (ask question in UI)
git diff | wsh ai -
```

```bash
docker logs mycontainer | wsh ai -
```

```bash
# Attach files without auto-submit (review in UI first)
wsh ai main.go utils.go
```

```bash
wsh ai screenshot.png logs.txt
```

```bash
# Attach files with message
wsh ai app.py -m "find potential bugs"
```

```bash
wsh ai *.log -m "analyze these error logs"
```

```bash
# Auto-submit immediately
wsh ai config.json -s -m "explain this configuration"
```

```bash
tail -n 50 app.log | wsh ai -s - -m "what's causing these errors?"
```

--------------------------------

### Get metadata from a block

Source: https://docs.waveterm.dev/wsh

Use `wsh getmeta` to retrieve metadata, such as the file path, from a specified block.

```bash
wsh getmeta -b 2 file
```

--------------------------------

### Get information about the current block

Source: https://docs.waveterm.dev/wsh

Use `wsh getmeta` without arguments to retrieve metadata about the current block.

```bash
wsh getmeta
```

--------------------------------

### Get a Secret

Source: https://docs.waveterm.dev/wsh-reference

Retrieve a previously stored secret using the `wsh secret get` command. Secrets are securely retrieved from your local machine, even when accessed from remote connections.

```bash
wsh secret get
```

--------------------------------

### Retrieve secrets with wsh secret get

Source: https://docs.waveterm.dev/wsh-reference

Access stored secrets from the system's native secure storage backend.

```bash
wsh secret get [name]
```

```bash
# Get an API key
wsh secret get github_token

# Use in scripts
export API_KEY=$(wsh secret get my_api_key)
```

--------------------------------

### Use stored variables in commands

Source: https://docs.waveterm.dev/wsh

Retrieve stored variables using `wsh getvar` and use them in subsequent commands, for example, in API request headers.

```bash
curl -H "Authorization: $(wsh getvar API_KEY)" https://api.example.com
```

--------------------------------

### Get persistent variables using wsh getvar

Source: https://docs.waveterm.dev/wsh-reference

Use `wsh getvar` to retrieve variable values. It returns exit code 0 if the variable exists. Use `--all` to list all variables and `-0` for null-terminated output.

```bash
wsh getvar [flags] [key]
```

```bash
# Check if a variable exists
if wsh getvar API_KEY >/dev/null; then
    echo "API key is set"
fi
```

```bash
# Use a variable in a command
curl -H "Authorization: $(wsh getvar API_KEY)" https://api.example.com
```

```bash
# Get a block-local variable
wsh getvar -l BLOCK_SPECIFIC
```

```bash
# List all variables
wsh getvar --all
```

```bash
# List all variables with null terminators (for scripting)
wsh getvar --all -0
```

--------------------------------

### Get metadata for blocks or tabs

Source: https://docs.waveterm.dev/wsh-reference

Use `wsh getmeta` to retrieve metadata for blocks or tabs. Specify the block using `-b` with block ID, number, or 'this'/'tab'. You can dump specific keys or sets of keys using wildcard prefixes. The default is the current terminal block.

```bash
# get the metadata for the current terminal block
wsh getmeta
```

```bash
# get the metadata for block num 2 (see block numbers by holidng down Ctrl+Shift)
wsh getmeta -b 2
```

```bash
# get the metadata for a blockid (get block ids by right clicking any block header "Copy Block Id")
wsh getmeta -b [blockid]
```

```bash
# get the metadata for a tab
wsh getmeta -b tab
```

```bash
# dump a single metadata key
wsh getmeta [-b [blockid]] [key]
```

```bash
# dump a set of keys with a certain prefix
wsh getmeta -b tab "bg:*"
```

```bash
# dump a set of keys with prefix (and include the 'clear' key)
wsh getmeta -b tab --clear-prefix "bg:*"
```

--------------------------------

### Retrieve terminal scrollback using wsh termscrollback

Source: https://docs.waveterm.dev/wsh-reference

Use `wsh termscrollback` to get terminal scrollback. Specify a block ID, line range, or use `--lastcommand` for the last command's output. Output can be saved to a file with `-o`.

```bash
wsh termscrollback [-b blockid] [flags]
```

```bash
# Get all scrollback from current terminal
wsh termscrollback
```

```bash
# Get scrollback from a specific terminal block
wsh termscrollback -b 2
```

```bash
# Get only the last command's output
wsh termscrollback --lastcommand
```

```bash
# Get a specific line range (lines 100-200)
wsh termscrollback --start 100 --end 200
```

```bash
# Save scrollback to a file
wsh termscrollback -o terminal-log.txt
```

--------------------------------

### Enable beta updates in settings

Source: https://docs.waveterm.dev/faq

Configure the auto-update channel to beta in the settings.json file.

```json
"autoupdate:enabled": true,
"autoupdate:channel": "beta"
```

--------------------------------

### wsh launch

Source: https://docs.waveterm.dev/wsh-reference

Opens pre-configured widgets directly from the terminal.

```APIDOC
## wsh launch

### Description
Opens pre-configured widgets directly from the terminal by searching for the specified widget ID.

### Endpoint
wsh launch [flags] widget-id

### Parameters
#### Path Parameters
- **widget-id** (string) - Required - The ID of the widget to launch.

#### Flags
- **-m, --magnify** (flag) - Optional - Open the widget in magnified mode, overriding the widget's default magnification setting.
```

--------------------------------

### Configure All CPU Data Sysinfo Widget

Source: https://docs.waveterm.dev/customwidgets

Create a widget to display all available CPU data, overriding the default 100-second limit. This is useful when you need to see the complete CPU activity history.

```json
{
    "<... other widgets go here ...>",
    "all-cpu" : {
        "icon": "chart-scatter",
        "label": "all-cpu",
        "blockdef": {
            "meta": {
                "view": "sysinfo",
                "sysinfo:type": "All CPU"
            }
        }
    },
    "<... other widgets go here ...>"
}
```

--------------------------------

### Edit Backgrounds Configuration

Source: https://docs.waveterm.dev/tab-backgrounds

Launches the configuration file for custom backgrounds from the command line.

```bash
wsh editconfig backgrounds.json  
```

--------------------------------

### List Secrets for Troubleshooting

Source: https://docs.waveterm.dev/secrets

Verify the existence of a secret by listing all available secret names.

```bash
wsh secret list
```

--------------------------------

### Connect to WSL

Source: https://docs.waveterm.dev/wsh-reference

Connects to a local Windows Subsystem for Linux distribution.

```bash
wsh wsl [-d <distribution-name>]
```

--------------------------------

### Configuration Settings Reference

Source: https://docs.waveterm.dev/config

A comprehensive list of available configuration keys and their types for customizing the WaveTerm environment.

```APIDOC
## Configuration Settings

### Description
This reference lists the available configuration keys used to customize the behavior and appearance of the WaveTerm application.

### Parameters
#### Configuration Keys
- **editor:minimapenabled** (bool) - Set to false to disable editor minimap
- **editor:stickyscrollenabled** (bool) - Enables monaco editor's stickyScroll feature
- **editor:wordwrap** (bool) - Set to true to enable word wrapping
- **editor:fontsize** (float64) - Set the font size for the editor
- **editor:inlinediff** (bool) - Set to true to show diffs inline
- **preview:showhiddenfiles** (bool) - Set to false to disable showing hidden files
- **preview:defaultsort** (string) - Sets the default sort column for directory preview
- **markdown:fontsize** (float64) - Font size for normal text in markdown preview
- **markdown:fixedfontsize** (float64) - Font size for code blocks in markdown preview
- **web:openlinksinternally** (bool) - Set to false to open web links in external browser
- **web:defaulturl** (string) - Default web page to open
- **web:defaultsearch** (string) - Search template for web searches
- **autoupdate:enabled** (bool) - Enable/disable checking for updates
- **autoupdate:intervalms** (float64) - Time in milliseconds between update checks
- **autoupdate:installonquit** (bool) - Automatically install updates on quit
- **autoupdate:channel** (string) - Auto update channel ("latest" or "beta")
- **tab:background** (string) - A "bg@" preset to apply to new tabs
- **tab:confirmclose** (bool) - Show confirmation dialog before closing a tab
- **widget:showhelp** (bool) - Show help/tips widgets in right sidebar
- **window:transparent** (bool) - Enable window transparency
- **window:blur** (bool) - Enable window background blurring
- **window:opacity** (float64) - Window opacity (0-1)
- **window:bgcolor** (string) - Window background color (hex)
- **window:reducedmotion** (bool) - Disable most animations
- **window:tilegapsize** (int) - Override default gap size between blocks
- **window:magnifiedblockopacity** (float64) - Opacity of a magnified block
- **window:magnifiedblocksize** (float64) - Size of a magnified block as percentage
- **window:magnifiedblockblurprimarypx** (int) - Blur pixels behind a magnified block
- **window:magnifiedblockblursecondarypx** (int) - Blur pixels for non-magnified blocks
- **window:maxtabcachesize** (int) - Number of tabs to cache
- **window:showmenubar** (bool) - Use OS-native menu bar
- **window:nativetitlebar** (bool) - Use OS-native title bar
- **window:disablehardwareacceleration** (bool) - Disable Chromium hardware acceleration
- **window:fullscreenonlaunch** (bool) - Launch in fullscreen mode
- **window:savelastwindow** (bool) - Preserve last window on close
- **window:confirmonclose** (bool) - Confirm close if unsaved workspace exists
```

--------------------------------

### Manage system paths with wavepath

Source: https://docs.waveterm.dev/wsh-reference

Retrieve paths to configuration, data, or log directories and files. Supports opening paths in blocks or external applications.

```bash
wsh wavepath {config|data|log}
```

```bash
# Get path to config directory
wsh wavepath config

# Get path to data directory
wsh wavepath data

# Get path to log file
wsh wavepath log

# Open log file in a new block
wsh wavepath -o log

# Open config directory in system file explorer
wsh wavepath -O config

# View recent log entries
wsh wavepath -t log
```

--------------------------------

### Connect to a Connection (WSL)

Source: https://docs.waveterm.dev/wsh-reference

Connects to the specified WSL distribution without creating a block for it.

```bash
wsh conn connect [wsl://<distribution-name>]  

```

--------------------------------

### Preview Background Metadata

Source: https://docs.waveterm.dev/customization

Print the metadata for a background configuration without applying it to the current tab.

```bash
wsh setbg --print "#ff0000"
```

--------------------------------

### Global Hotkey Configuration

Source: https://docs.waveterm.dev/config

Configure a system-wide hotkey to quickly open your most recent WaveTerm window.

```APIDOC
## Customizable Systemwide Global Hotkey

Wave allows setting a custom global hotkey to open your most recent window from anywhere on your computer. This has the name `"app:globalhotkey"` in the `settings.json` file and takes the form of a series of key names separated by the `:` character.

### Examples

*   **Single Key:** To set `F5` as your global hotkey:
    ```json
    {
      "app:globalhotkey": "F5"
    }
    ```

*   **Key Combination:** To set `Ctrl + Option + e` as your global hotkey:
    ```json
    {
      "app:globalhotkey": "Ctrl:Option:e"
    }
    ```

After modifying `settings.json`, reboot Wave for the changes to take effect.
```

--------------------------------

### Launch a widget by ID using wsh launch

Source: https://docs.waveterm.dev/wsh-reference

Use `wsh launch` to open pre-configured widgets. The command searches for the widget ID and creates a new block. Use the `-m` flag to force magnified mode.

```bash
wsh launch [flags] widget-id
```

```bash
# Launch a widget with its default settings
wsh launch my-custom-widget
```

```bash
# Launch a widget in magnified mode
wsh launch -m system-monitor
```

--------------------------------

### Define a Local Shell Widget

Source: https://docs.waveterm.dev/customwidgets

Configure a widget to launch a specific local shell like fish or pwsh. Ensure the shell path is accessible or provide an absolute path if it is not in the system PATH.

```json
{
    <... other widgets go here ...>,
    "fish" : {
        "icon": "fish",
        "color": "#4abc39",
        "label": "fish",
        "blockdef": {
            "meta": {
                "view": "term",
                "controller": "shell",
                "term:localshellpath": "/usr/local/bin/fish",
                "term:localshellopts": "-i -l"
            }
        }
    },
    <... other widgets go here ...>
}
```

```json
{
    <... other widgets go here ...>,
    "pwsh" : {
        "icon": "rectangle-terminal",
        "color": "#2671be",
        "label": "pwsh",
        "blockdef": {
            "meta": {
                "view": "term",
                "controller": "shell",
                "term:localshellpath": "pwsh"
            }
        }
    },
    <... other widgets go here ...>
}
```

--------------------------------

### Configure Local AI Inference Servers

Source: https://docs.waveterm.dev/waveai-modes

Use these configurations to connect to local servers. Ensure the endpoint matches the specific server's chat completion path.

```json
{
  "lmstudio-qwen": {
    "display:name": "LM Studio - Qwen",
    "display:order": 2,
    "display:icon": "server",
    "display:description": "Local Qwen model via LM Studio",
    "ai:apitype": "openai-chat",
    "ai:model": "qwen/qwen-2.5-coder-32b-instruct",
    "ai:thinkinglevel": "medium",
    "ai:endpoint": "http://localhost:1234/v1/chat/completions",
    "ai:apitoken": "not-needed"
  }
}
```

```json
{
  "vllm-local": {
    "display:name": "vLLM",
    "display:order": 3,
    "display:icon": "server",
    "display:description": "Local model via vLLM",
    "ai:apitype": "openai-chat",
    "ai:model": "your-model-name",
    "ai:thinkinglevel": "medium",
    "ai:endpoint": "http://localhost:8000/v1/chat/completions",
    "ai:apitoken": "not-needed"
  }
}
```

--------------------------------

### Local LLMs (Ollama) AI Preset Configuration

Source: https://docs.waveterm.dev/ai-presets

Connect to a local Ollama instance. The 'ai:apitoken' is required but can be any value as Ollama ignores it.

```json
{
  "ai@ollama-llama": {
    "display:name": "Ollama - Llama2",
    "display:order": 3,
    "ai:*": true,
    "ai:baseurl": "http://localhost:11434/v1",
    "ai:name": "llama2",
    "ai:model": "llama2",
    "ai:apitoken": "ollama"
  }
}

```

--------------------------------

### Define Multiple AI Presets

Source: https://docs.waveterm.dev/ai-presets

Configure various AI models with their specific settings in `ai.json`. The `display:order` key determines the order in the UI.

```json
{
  "ai@claude-sonnet": {
    "display:name": "Claude 3 Sonnet",
    "display:order": 1,
    "ai:*": true,
    "ai:apitype": "anthropic",
    "ai:model": "claude-3-5-sonnet-latest",
    "ai:apitoken": "<your anthropic API key>"
  },
  "ai@openai-gpt41": {
    "display:name": "GPT-4.1",
    "display:order": 2,
    "ai:*": true,
    "ai:model": "gpt-4.1",
    "ai:apitoken": "<your OpenAI API key>"
  },
  "ai@ollama-llama": {
    "display:name": "Ollama - Llama2",
    "display:order": 3,
    "ai:*": true,
    "ai:baseurl": "http://localhost:11434/v1",
    "ai:name": "llama2",
    "ai:model": "llama2",
    "ai:apitoken": "ollama"
  },
  "ai@perplexity-sonar": {
    "display:name": "Perplexity Sonar",
    "display:order": 4,
    "ai:*": true,
    "ai:apitype": "perplexity",
    "ai:model": "llama-3.1-sonar-small-128k-online",
    "ai:apitoken": "<your perplexity API key>"
  }
}
```

--------------------------------

### Configure 3-Minute CPU and Memory Sysinfo Widget

Source: https://docs.waveterm.dev/customwidgets

Add a custom widget to display CPU and Memory usage for the last 180 seconds. This widget is useful for monitoring short, intensive processes.

```json
{
    "<... other widgets go here ...>",
    "3min-info" : {
        "icon": "circle-3",
        "label": "3mininfo",
        "blockdef": {
            "meta": {
                "view": "sysinfo",
                "graph:numpoints": 180,
                "sysinfo:type": "CPU + Mem"
            }
        }
    },
    "<... other widgets go here ...>"
}
```

--------------------------------

### Generate Solid Color Background JSON

Source: https://docs.waveterm.dev/tab-backgrounds

Uses the `setbg` command to preview and generate the JSON for a solid color background.

```bash
# Preview a solid color background
wsh setbg --print "#ff0000"
{
  "bg:*": true,
  "bg": "#ff0000",
  "bg:opacity": 0.5
}

```

--------------------------------

### Edit Configuration File

Source: https://docs.waveterm.dev/config

Open the termthemes.json configuration file directly using this command.

```shell
wsh editconfig termthemes.json  

```

--------------------------------

### Edit Configuration Files

Source: https://docs.waveterm.dev/wsh-reference

Open specific Wave configuration files for editing.

```bash
wsh editconfig [config-file-name]

# opens the default settings.json file
wsh editconfig

# opens presets.json
wsh editconfig presets.json

# opens widgets.json
wsh editconfig widgets.json

# opens ai presets
wsh editconfig presets/ai.json
```

--------------------------------

### Open a webpage in a new block

Source: https://docs.waveterm.dev/wsh

Use `wsh web open` to open a specified URL in a new web block.

```bash
wsh web open github.com
```

```bash
wsh web open "wave terminal"
```

--------------------------------

### Preview file or directory contents

Source: https://docs.waveterm.dev/wsh-reference

Use `wsh view` to open a preview block for any file or directory. Use the `-m` flag to open in magnified mode. This is useful for images, markdown, and directories, and opens a codeedit block for text/code files.

```bash
wsh view [path]
```

```bash
wsh view -m [path]           # opens in magnified block
```

--------------------------------

### Connection Issues

Source: https://docs.waveterm.dev/waveai-modes

Troubleshooting steps for when Wave cannot connect to the model server.

```APIDOC
## Connection Issues

### Description
This section provides troubleshooting steps for common connection problems encountered when Wave cannot establish a connection with your model server.

### Troubleshooting Steps
1.  **For cloud providers with `ai:provider` set**: Ensure you have the correct secret stored (e.g., `OPENAI_KEY`, `OPENROUTER_KEY`).
2.  **For local/custom endpoints**: Verify the server is running (e.g., `curl http://localhost:11434/v1/models` for Ollama).
3.  Check that the `ai:endpoint` is the complete endpoint URL, including the path (e.g., `http://localhost:11434/v1/chat/completions`).
4.  Verify that the `ai:apitype` matches your server's API (defaults are usually correct when using providers).
5.  Check firewall settings if using a non-localhost address.
```

--------------------------------

### Verifying Local Server Connection

Source: https://docs.waveterm.dev/waveai-modes

Test your local AI server connection by sending a request to its `/v1/models` endpoint. This is useful for diagnosing connection issues.

```bash
curl http://localhost:11434/v1/models
```

--------------------------------

### Configure NanoGPT Provider

Source: https://docs.waveterm.dev/waveai-modes

NanoGPT acts as a proxy service. Capabilities must be defined manually based on the specific model's supported features.

```json
{
  "nanogpt-glm47": {
    "display:name": "NanoGPT - GLM 4.7",
    "ai:provider": "nanogpt",
    "ai:model": "zai-org/glm-4.7"
  }
}
```

```json
{
  "nanogpt-glm47": {
    "display:name": "NanoGPT - GLM 4.7",
    "ai:provider": "nanogpt",
    "ai:model": "zai-org/glm-4.7",
    "ai:capabilities": ["tools"]
  }
}
```

--------------------------------

### Web Widgets Configuration

Source: https://docs.waveterm.dev/customwidgets

Configuration for creating custom web widgets that display external websites.

```APIDOC
## Web Widgets

Web widgets allow you to embed external websites directly into Waveterm. They are configured within the main widget structure.

### General Structure
```json
{
    "<widget name>": {
        "icon": "<font awesome icon name>",
        "label": "<the text label of the widget>",
        "color": "<the color of the label>",
        "blockdef": {
            "meta": {
                "view": "web",
                "url": "<url of the first webpage>",
                "pinnedurl": "<url of the homepage button>"
            }
        }
    }
}
```

### Meta Parameters for Web Widgets

- **view** (string): Must be set to `"web"` for web widgets.
- **url** (string): The initial URL to load in the web widget. Defaults to `"web:defaulturl"`.
- **pinnedurl** (string, optional): The URL the home button navigates to. Defaults to `"web:defaulturl"`.

### Example: YouTube Widget

This example creates a widget that opens to the YouTube homepage and uses YouTube as its home page.

```json
{
    "youtube" : {
        "icon": "brands@youtube",
        "label": "youtube",
        "blockdef": {
            "meta": {
                "view": "web",
                "url": "https://youtube.com",
                "pinnedurl": "https://youtube.com"
            }
        }
    }
}
```

### Example: GitHub Widget with Google Homepage

This example creates a widget that opens to GitHub but uses Google as its home page.

```json
{
    "github" : {
        "icon": "brands@github",
        "label": "github",
        "blockdef": {
            "meta": {
                "view": "web",
                "url": "https://github.com",
                "pinnedurl": "https://google.com"
            }
        }
    }
}
```
```

--------------------------------

### Reinstall Wave Shell Extensions (WSL)

Source: https://docs.waveterm.dev/wsh-reference

Use this command to reinstall the Wave Shell Extensions on a specified WSL distribution.

```bash
wsh conn reinstall [wsl://<distribution-name>]  

```

--------------------------------

### Set Configuration Option

Source: https://docs.waveterm.dev/wsh-reference

Allows setting various options in the `config/settings.json` file. It validates that a valid config option was provided.

```bash
wsh setconfig [<config-name>=<config-value>]  

```

--------------------------------

### Auto-submit files to AI with a message

Source: https://docs.waveterm.dev/wsh

Use `wsh ai` with the `-s` flag to auto-submit files and a message to the AI immediately.

```bash
wsh ai config.json -s -m "explain this config"
```

--------------------------------

### Generate Image Background JSON

Source: https://docs.waveterm.dev/tab-backgrounds

Uses the `setbg` command to preview and generate JSON for a centered image background with specified opacity.

```bash
# Preview a centered image background
wsh setbg --print --center --opacity 0.3 ~/logo.png
{
  "bg:*": true,
  "bg": "url('/absolute/path/to/logo.png') no-repeat center/auto",
  "bg:opacity": 0.3
}

```

--------------------------------

### Configure OpenAI Compatible API

Source: https://docs.waveterm.dev/waveai-modes

Manual configuration for third-party providers. The endpoint must be the full URL to the chat completions path.

```json
{
  "xai-grokfast": {
    "display:name": "xAI Grok Fast",
    "display:order": 2,
    "display:icon": "server",
    "ai:apitype": "openai-chat",
    "ai:model": "grok-4-1-fast-reasoning",
    "ai:endpoint": "https://api.x.ai/v1/chat/completions",
    "ai:apitokensecretname": "XAI_KEY",
    "ai:capabilities": ["tools", "images", "pdfs"]
  }
}
```

--------------------------------

### Configure AI Preset with Proxy

Source: https://docs.waveterm.dev/ai-presets

Route AI requests through an HTTP proxy by adding the `ai:proxyurl` setting to a preset. This is compatible with most AI providers except Wave Cloud AI.

```json
{
  "ai@claude-with-proxy": {
    "display:name": "Claude 3 Sonnet (via Proxy)",
    "display:order": 1,
    "ai:*": true,
    "ai:apitype": "anthropic",
    "ai:model": "claude-3-5-sonnet-latest",
    "ai:apitoken": "<your anthropic API key>",
    "ai:proxyurl": "http://proxy.example.com:8080"
  }
}
```

--------------------------------

### Store API Key via Command Line

Source: https://docs.waveterm.dev/waveai-modes

Securely store API keys using Wave's secret store via the command line. Replace 'OPENAI_KEY' and 'sk-xxxxxxxxxxxxxxxx' with your actual secret name and API key.

```bash
wsh secret set OPENAI_KEY=sk-xxxxxxxxxxxxxxxx
wsh secret set OPENROUTER_KEY=sk-xxxxxxxxxxxxxxxx
```

--------------------------------

### Ensure Connection is Active (WSL)

Source: https://docs.waveterm.dev/wsh-reference

Connects to the specified WSL distribution if it is not already connected.

```bash
wsh conn ensure [wsl://<distribution-name>]  

```

--------------------------------

### Configure Environment Variable Fallbacks

Source: https://docs.waveterm.dev/releasenotes

Use the $ENV:envvar:fallback syntax in configuration files to retrieve values from the environment, useful for managing secrets.

```text
$ENV:envvar:fallback
```

--------------------------------

### Set Global Hotkey

Source: https://docs.waveterm.dev/config

Configure a global hotkey to open the most recent Waveterm window. The hotkey is defined as a string of key names separated by colons.

```json
"app:globalhotkey": "F5"

```

```json
"app:globalhotkey": "Ctrl:Option:e"

```

--------------------------------

### Sysinfo Widgets Configuration

Source: https://docs.waveterm.dev/customwidgets

Configuration for creating custom sysinfo widgets to display system monitoring graphs.

```APIDOC
## Sysinfo Widgets

Sysinfo widgets display system monitoring graphs. You can customize the data displayed and the number of points shown.

### General Structure
```json
{
    "<widget name>": {
        "icon": "<font awesome icon name>",
        "label": "<the text label of the widget>",
        "color": "<the color of the label>",
        "blockdef": {
            "meta": {
                "view": "sysinfo",
                "graph:numpoints": <the max number of points in the graph>,
                "sysinfo:type": <the name of the plot collection>
            }
        }
    }
}
```

### Meta Parameters for Sysinfo Widgets

- **view** (string): Must be set to `"sysinfo"` for sysinfo widgets.
- **graph:numpoints** (integer, optional): The maximum number of data points to display on the graph. Defaults to 100.
- **sysinfo:type** (string, optional): The type of data collection to display. Valid values are `"CPU"`, `"Mem"`, `"CPU + Mem"`, and `"All CPU"`. Defaults to `"CPU"`.

### Example: Custom Sysinfo Widget

This example shows a sysinfo widget configured to display memory usage with 200 data points.

```json
{
    "memory_monitor" : {
        "icon": "fas@microchip",
        "label": "Memory Usage",
        "blockdef": {
            "meta": {
                "view": "sysinfo",
                "graph:numpoints": 200,
                "sysinfo:type": "Mem"
            }
        }
    }
}
```
```

--------------------------------

### Minimal AI Configuration with Provider

Source: https://docs.waveterm.dev/waveai-modes

Use this minimal configuration when integrating with a provider like OpenRouter. Ensure the `ai:provider` and `ai:model` fields are correctly set for your chosen service.

```json
{
  "mode-key": {
    "display:name": "Qwen (OpenRouter)",
    "ai:provider": "openrouter",
    "ai:model": "qwen/qwen-2.5-coder-32b-instruct"
  }
}
```

--------------------------------

### View files or directories

Source: https://docs.waveterm.dev/wsh

Use `wsh view` to open files or directories in the editor. The `-m` flag opens the block in magnified mode.

```bash
wsh view .
```

```bash
wsh view README.md
```

```bash
wsh view -m README.md
```

--------------------------------

### Open secrets UI with wsh secret ui

Source: https://docs.waveterm.dev/wsh-reference

Launch the graphical interface for managing secrets in a new block.

```bash
wsh secret ui [-m]
```

```bash
# Open the secrets UI
wsh secret ui
```

--------------------------------

### Configure Azure OpenAI (Legacy Deployment API)

Source: https://docs.waveterm.dev/waveai-modes

Use the 'azure-legacy' provider for legacy Azure deployments. The provider constructs the endpoint URL and sets a default API version, which can be overridden.

```json
{
  "azure-legacy-gpt4": {
    "display:name": "Azure GPT-4 (Legacy)",
    "ai:provider": "azure-legacy",
    "ai:azureresourcename": "your-resource-name",
    "ai:azuredeployment": "your-deployment-name"
  }
}
```

--------------------------------

### Connect via SSH

Source: https://docs.waveterm.dev/wsh-reference

Establishes a remote connection using Wave's internal SSH implementation.

```bash
wsh ssh [user@host]
```

--------------------------------

### CLI Integration with Wave AI

Source: https://docs.waveterm.dev/waveai

Use the `wsh ai` command to send files and prompts from the command line. Supports piping output, attaching files, and auto-submitting with output. Use `-n` for a new chat and `-s` to auto-submit.

```bash
git diff | wsh ai - 

```

```bash
wsh ai main.go -m "find bugs" 

```

```bash
wsh ai $(tail -n 500 my.log) -m "review" -s 

```

--------------------------------

### Interact with Wave GUI Features

Source: https://docs.waveterm.dev/gettingstarted

Use the wsh command to perform graphical tasks like viewing files, browsing the web, or invoking AI assistance directly from the terminal.

```bash
# View a file or directory
wsh view ~/Documents

# Open a webpage
wsh web open github.com

# Get AI assistance
wsh ai -m "how do I find large files in my current directory?" -s
```

--------------------------------

### Interact with Wave AI via CLI

Source: https://docs.waveterm.dev/releasenotes

Use the wsh ai command to send files and command output directly to the Wave AI interface.

```bash
wsh ai
```

--------------------------------

### OpenAI AI Preset Configuration

Source: https://docs.waveterm.dev/ai-presets

Configuration for using OpenAI's models. Replace '<your OpenAI API key>' with your actual API key.

```json
{
  "ai@openai-gpt41": {
    "display:name": "GPT-4.1",
    "display:order": 2,
    "ai:*": true,
    "ai:model": "gpt-4.1",
    "ai:apitoken": "<your OpenAI API key>"
  }
}

```

--------------------------------

### Checking Ollama Models

Source: https://docs.waveterm.dev/waveai-modes

Use the `ollama list` command to verify the exact model names available on your local Ollama server. This helps resolve 'model not found' errors.

```bash
ollama list
```

--------------------------------

### Define a Remote Shell Widget

Source: https://docs.waveterm.dev/customwidgets

Use the connection meta key to target specific SSH or WSL connections. The value must match the canonical name found in connections.json.

```json
{
	<... other widgets go here ...>,
	"remote-term": {
		"icon": "rectangle-terminal",
		"label": "remote",
		"blockdef": {
			"meta": {
				"view": "term",
				"controller": "shell",
				"connection": "<connection>"
			}
		}
	},
	<... other widgets go here ...>
}
```

--------------------------------

### Configuration API

Source: https://docs.waveterm.dev/wsh-reference

Utility for updating the Wave Terminal configuration settings.

```APIDOC
## wsh setconfig

### Description
Sets options in the config/settings.json file after validating the provided option.

### Parameters
#### Request Body
- **config-name** (string) - Required - The name of the configuration setting.
- **config-value** (string) - Required - The value to assign to the setting.
```

--------------------------------

### Edit Wave AI Configuration

Source: https://docs.waveterm.dev/waveai-modes

Launch the configuration file for AI modes from the command line.

```shell
wsh editconfig waveai.json  
```

--------------------------------

### Set Default AI Preset via Command

Source: https://docs.waveterm.dev/ai-presets

A convenient command-line method to set the default AI preset without directly editing settings.json.

```bash
wsh setconfig ai:preset=ai@claude-sonnet  

```

--------------------------------

### Field Reference

Source: https://docs.waveterm.dev/waveai-modes

Detailed explanation of each configuration field available for AI modes.

```APIDOC
## Field Reference

### Description
This section provides a detailed breakdown of each configuration field used to define an AI mode.

### Parameters
#### Request Body Fields
- **`display:name`** (string) - Required - Name shown in the AI mode selector
- **`display:order`** (number) - Optional - Sort order in the selector (lower numbers first)
- **`display:icon`** (string) - Optional - Icon identifier for the mode (can use any FontAwesome icon, use the name without the "fa-" prefix). Default is "sparkles"
- **`display:description`** (string) - Optional - Full description of the mode
- **`ai:provider`** (string) - Optional - Provider preset: `openai`, `openrouter`, `nanogpt`, `groq`, `google`, `azure`, `azure-legacy`, `custom`
- **`ai:apitype`** (string) - Optional - API type: `openai-chat`, `openai-responses`, or `google-gemini` (defaults to `openai-chat` if not specified)
- **`ai:model`** (string) - Optional - Model identifier (required for most providers)
- **`ai:thinkinglevel`** (string) - Optional - Thinking level: `low`, `medium`, or `high`
- **`ai:endpoint`** (string) - Optional - _Full_ API endpoint URL (auto-set by provider when available)
- **`ai:azureapiversion`** (string) - Optional - Azure API version (for `azure-legacy` provider, defaults to `2025-04-01-preview`)
- **`ai:apitoken`** (string) - Optional - API key/token (not recommended - use secrets instead)
- **`ai:apitokensecretname`** (string) - Optional - Name of secret containing API token (auto-set by provider)
- **`ai:azureresourcename`** (string) - Optional - Azure resource name (for Azure providers)
- **`ai:azuredeployment`** (string) - Optional - Azure deployment name (for `azure-legacy` provider)
- **`ai:capabilities`** (array of strings) - Optional - Array of supported capabilities: `"tools"`, `"images"`, `"pdfs"`
- **`waveai:cloud`** (any) - Optional - Internal - for Wave Cloud AI configuration only
- **`waveai:premium`** (any) - Optional - Internal - for Wave Cloud AI configuration only
```

--------------------------------

### Open Secrets UI via CLI

Source: https://docs.waveterm.dev/secrets

Launch the graphical secrets management interface from the terminal.

```bash
wsh secret ui
```

--------------------------------

### General Web Widget Configuration

Source: https://docs.waveterm.dev/customwidgets

Defines the basic structure for a custom web widget, including icon, label, and the meta view and URL.

```json
{
    <... other widgets go here ...>,
    "<widget name>": {
        "icon": "<font awesome icon name>",
        "label": "<the text label of the widget>",
        "color": "<the color of the label>",
        "blockdef": {
            "meta": {
                "view": "web",
                "url": "<url of the first webpage>"
            }
        }
    },
    <... other widgets go here ...>
}

```

--------------------------------

### Connect to a remote server

Source: https://docs.waveterm.dev/wsh

Use `wsh ssh` to connect to a remote server. An optional private key can be specified with the `-i` flag.

```bash
wsh ssh -i ~/.ssh/mykey.pem dev@server
```

--------------------------------

### POST /ai

Source: https://docs.waveterm.dev/wsh-reference

Initiates a new AI chat session or continues an existing one with optional file attachments.

```APIDOC
## POST /ai

### Description
Starts a new AI chat session or sends a message with attached files to the AI model.

### Method
POST

### Endpoint
wsh ai

### Parameters
#### Query Parameters
- **-n, --new** (flag) - Optional - Clear current chat and start fresh conversation
- **-m, --message** (string) - Optional - Add message text along with files
- **-s, --submit** (flag) - Optional - Auto-submit immediately

### Request Body
- **files** (list) - Optional - List of file paths to attach (Max 15 files; size limits apply: 200KB text, 5MB PDF, 7MB image)
```

--------------------------------

### Open web content

Source: https://docs.waveterm.dev/wsh-reference

Opens a URL or search query in a web block. Supports magnification and replacing existing blocks.

```bash
wsh web open [url] [-m] [-r blockid]
```

```bash
# Open a URL
wsh web open https://waveterm.dev

# Search with the configured search engine
wsh web open "wave terminal documentation"

# Open in magnified mode
wsh web open -m https://github.com

# Replace an existing block
wsh web open -r 2 https://example.com
```

--------------------------------

### Attach files to AI with a message

Source: https://docs.waveterm.dev/wsh

Use `wsh ai` with file arguments and the `-m` flag to attach files to the AI sidebar with an accompanying message. Files are not auto-submitted by default.

```bash
wsh ai main.go utils.go -m "find bugs in these files"
```

--------------------------------

### Enabling AI Capabilities

Source: https://docs.waveterm.dev/waveai-modes

The `ai:capabilities` array allows you to specify features like tool usage, image processing, and PDF reading. Ensure 'tools' is included for optimal terminal interaction.

```json
{
    "ai:capabilities": ["tools", "images", "pdfs"]
  }
```

--------------------------------

### Define a Command Execution Widget

Source: https://docs.waveterm.dev/customwidgets

Configure widgets to run specific commands or TUI applications using the cmd controller. Use cmd:clearonstart to clear terminal output on restart.

```json
{
    <... other widgets go here ...>,
    "speedtest" : {
        "icon": "gauge-high",
        "label": "speed",
        "blockdef": {
            "meta": {
                "view": "term",
                "controller": "cmd",
                "cmd": "speedtest-go --unix",
                "cmd:clearonstart": true
            }
        }
    },
    <... other widgets go here ...>
}
```

```json
{
    <... other widgets go here ...>,
    "dua" : {
        "icon": "brands@linux",
        "label": "dua",
        "blockdef": {
            "meta": {
                "view": "term",
                "controller": "cmd",
                "cmd": "dua"
            }
        }
    },
    <... other widgets go here ...>
}
```

--------------------------------

### List files in a directory using wsh file ls

Source: https://docs.waveterm.dev/wsh-reference

Use `wsh file ls` to list files. Specify a URI for remote directories or a local path. The command automatically formats output for piping.

```bash
wsh file ls [flags] [file-uri]
```

```bash
wsh file ls wsh://user@ec2/home/user/
```

```bash
wsh file ls ./local-dir/
```

```bash
# Easy to process with grep, awk, etc.
wsh file ls ./ | grep ".json$"
```

--------------------------------

### Attach multiple file types to AI

Source: https://docs.waveterm.dev/wsh

Attach various file types, including images, PDFs, and code, to the AI sidebar using `wsh ai`.

```bash
wsh ai screenshot.png report.pdf app.py -m "review these"
```

--------------------------------

### Edit Wave Term Configuration

Source: https://docs.waveterm.dev/config

Use this command to open the Wave Term configuration file in the built-in preview editor. This is the recommended way to edit configuration files.

```bash
wsh editconfig  
```

--------------------------------

### SSH Host Configuration

Source: https://docs.waveterm.dev/connections

Configure a host in your SSH config file to simplify connections. Specify user, hostname, and identity file for easy access.

```bash
Host myhost  
   User username  
   HostName 203.0.113.254  
   IdentityFile ~/.ssh/id_rsa  
   AddKeysToAgent yes  

```

--------------------------------

### Configure Connection-Specific Durable Sessions

Source: https://docs.waveterm.dev/durable-sessions

Enable durable sessions for a specific host by adding the configuration to your connections.json file.

```json
{
  "connections": {
    "user@host": {
      "term:durable": true
    }
  }
}
```

--------------------------------

### Google (Gemini) AI Preset Configuration

Source: https://docs.waveterm.dev/ai-presets

Configuration for using Google's Gemini models from Google AI Studio. Replace '<your Google AI API key>' with your actual API key.

```json
{
  "ai@gemini-2.0": {
    "display:name": "Gemini 2.0",
    "display:order": 6,
    "ai:*": true,
    "ai:apitype": "google",
    "ai:model": "gemini-2.0-flash-exp",
    "ai:apitoken": "<your Google AI API key>"
  }
}

```

--------------------------------

### Query blocks with wsh blocks list

Source: https://docs.waveterm.dev/wsh-reference

List and filter blocks across workspaces, windows, and tabs. Output can be formatted as JSON for programmatic use.

```bash
wsh blocks list [flags]
```

```bash
# List all blocks
wsh blocks list

# List only terminal blocks
wsh blocks list --view=term

# Filter by workspace
wsh blocks list --workspace=12d0c067-378e-454c-872e-77a314248114

# Output as JSON for scripting
wsh blocks list --json
```

--------------------------------

### OpenRouter AI Preset Configuration

Source: https://docs.waveterm.dev/ai-presets

Configuration for using OpenRouter's models. Replace '<openrouter-key>' with your actual OpenRouter API key.

```json
{
  "ai@openrouter": {
    "display:name": "OpenRouter (Qwen)",
    "display:order": 7,
    "ai:*": true,
    "ai:model": "qwen/qwen3-next-80b-a3b-thinking",
    "ai:apitoken": "<openrouter-key>",
    "ai:baseurl": "https://openrouter.ai/api/v1"
  }
}

```

--------------------------------

### Set Default AI Mode

Source: https://docs.waveterm.dev/waveai-modes

Configure the default AI mode using the command line or by editing settings.json.

```shell
wsh setconfig waveai:defaultmode="ollama-llama"
```

```json
  "waveai:defaultmode": "ollama-llama"
```

--------------------------------

### General Sysinfo Widget Configuration

Source: https://docs.waveterm.dev/customwidgets

Defines the basic structure for a custom sysinfo widget, including icon, label, and meta view, graph points, and sysinfo type.

```json
{
    <... other widgets go here ...>,
    "<widget name>": {
        "icon": "<font awesome icon name>",
        "label": "<the text label of the widget>",
        "color": "<the color of the label>",
        "blockdef": {
            "meta": {
                "view": "sysinfo",
                "graph:numpoints": <the max number of points in the graph>,
                "sysinfo:type": <the name of the plot collection>,
            }
        }
    },
    <... other widgets go here ...>
}

```

--------------------------------

### Open a file in the editor

Source: https://docs.waveterm.dev/wsh

Use `wsh edit` to open a specified file in the Wave editor.

```bash
wsh edit config.json
```

--------------------------------

### Terminal and CLI Widget Configuration

Source: https://docs.waveterm.dev/customwidgets

This section describes the structure and available options for configuring terminal and CLI widgets.

```APIDOC
## Terminal and CLI Widgets

A terminal widget, or CLI widget, is a widget that simply opens a terminal and runs a CLI command. They tend to look something like the example below:
```json
{
    "<widget name>": {
        "icon": "<font awesome icon name>",
        "label": "<the text label of the widget>",
        "color": "<the color of the label>",
        "blockdef": {
            "meta": {
                "view": "term",
                "controller": "cmd",
                "cmd": "<the actual cli command>"
            }
        }
    }
}
```

The `WidgetConfigType` takes the usual options common to all widgets. The `MetaTSType` can include the keys listed below:

### Meta Options

Key| Description  
---|---
"view"| A string that specifies the general type of widget. In the case of custom terminal widgets, this must be set to `"term"`.
"controller"| A string that specifies the type of command being used. For more persistent shell sessions, set it to `"shell"`. For one off commands, set it to `"cmd"`. When `"cmd"` is set, the widget has an additional refresh button in its header that allows the command to be re-run.
"cmd"| (optional) When the `"controller"` is set to `"cmd"`, this option provides the actual command to be run. Note that because it is run as a command, there is no shell session unless you are launching a command that contains a shell session itself. Defaults to an empty string.
"cmd:args"| (optional, array of strings) arguments to pass to the `cmd`
"cmd:shell"| (optional) if `cmd:shell` if false (default), then we use `cmd` + `cmd:args` (suitable to pass to `execve`). if `cmd:shell` is true, then we just use `cmd`, and `cmd` can include spaces, and shell syntax (like pipes or redirections, etc.)
"cmd:interactive"| (optional) When the `"controller"` is set to `"term"`, this boolean adds the interactive flag to the launched terminal. Defaults to false.
"cmd:login"| (optional) When the `"controller"` is set to `"term"`, this boolean adds the login flag to the term command. Defaults to false.
"cmd:runonstart"| (optional) The command will rerun when the block is created or the app is started. Without it, you must manually run the command. Defaults to true.
"cmd:runonce"| (optional) Runs on start, but then sets `"cmd:runonce"` and `"cmd:runonstart"` to false (so future runs require manual restarts)
"cmd:clearonstart"| (optional) When the cmd runs, the contents of the block are cleared out. Defaults to false.
"cmd:closeonexit"| (optional) Automatically closes the block if the command successfully exits (exit code = 0)
"cmd:closeonexitforce"| (optional) Automatically closes the block if when the command exits (success or failure)
"cmd:closeonexitdelay"| (optional) Change the delay between when the command exits and when the block gets closed, in milliseconds, default 2000
"cmd:env"| (optional) A key-value object representing environment variables to be run with the command. Defaults to an empty object.
"cmd:cwd"| (optional) A string representing the current working directory to be run with the command. Currently only works locally. Defaults to the home directory.
"cmd:nowsh"| (optional) A boolean that will turn off wsh integration for the command. Defaults to false.
"cmd:jwt"| (optional) A boolean that forces adding JWT token to the environment. Required for running waveapps as widgets (both local and remote). Defaults to false.
"term:localshellpath"| (optional) Sets the shell used for running your widget command. Only works locally. If left blank, wave will determine your system default instead.
"term:localshellopts"| (optional) Sets the shell options meant to be used with `"term:localshellpath"`. This is useful if you are using a nonstandard shell and need to provide a specific option that we do not cover. Only works locally. Defaults to an empty string.
"cmd:initscript"| (optional) for `"shell"` controller only. an init script to run before starting the shell (can be an inline script or an absolute local file path)
"cmd:initscript.sh"| (optional) same as `cmd:initscript` but applies to bash/zsh shells only
"cmd:initscript.bash"| (optional) same as `cmd:initscript` but applies to bash shells only
"cmd:initscript.zsh"| (optional) same as `cmd:initscript` but applies to zsh shells only
"cmd:initscript.pwsh"| (optional) same as `cmd:initscript` but applies to pwsh/powershell shells only
"cmd:initscript.fish"| (optional) same as `cmd:initscript` but applies to fish shells only
```

--------------------------------

### Perplexity AI Preset Configuration

Source: https://docs.waveterm.dev/ai-presets

Configuration for using Perplexity's models. Replace '<your perplexity API key>' with your actual API key.

```json
{
  "ai@perplexity-sonar": {
    "display:name": "Perplexity Sonar",
    "display:order": 5,
    "ai:*": true,
    "ai:apitype": "perplexity",
    "ai:model": "llama-3.1-sonar-small-128k-online",
    "ai:apitoken": "<your perplexity API key>"
  }
}

```

--------------------------------

### Edit AI Presets Configuration

Source: https://docs.waveterm.dev/ai-presets

Use this command to open the AI presets configuration file in your default editor.

```bash
wsh editconfig presets/ai.json  

```

--------------------------------

### Blocks Command

Source: https://docs.waveterm.dev/wsh-reference

Commands for listing and querying blocks across workspaces, windows, and tabs.

```APIDOC
## wsh blocks

### Description
The `blocks` command provides operations for listing and querying blocks across workspaces, windows, and tabs. Primarily useful for debugging and scripting.

### list

#### Usage
```
wsh blocks list [flags]
```

List all blocks with optional filtering by workspace, window, tab, or view type. Output can be formatted as a table (default) or JSON for scripting.

#### Flags
* `--workspace <id>` - restrict to specific workspace id
* `--window <id>` - restrict to specific window id
* `--tab <id>` - restrict to specific tab id
* `--view <type>` - filter by view type (term, web, preview, edit, sysinfo, waveai)
* `--json` - output results as JSON
* `--timeout <ms>` - RPC timeout in milliseconds (default: 5000)

#### Examples
```
# List all blocks
wsh blocks list

# List only terminal blocks
wsh blocks list --view=term

# Filter by workspace
wsh blocks list --workspace=12d0c067-378e-454c-872e-77a314248114

# Output as JSON for scripting
wsh blocks list --json
```
```

--------------------------------

### POST /setbg

Source: https://docs.waveterm.dev/wsh-reference

Configures the background appearance of the current tab.

```APIDOC
## POST /setbg

### Description
Sets a background image or color for the current tab with various styling options.

### Method
POST

### Endpoint
wsh setbg

### Parameters
#### Query Parameters
- **--opacity** (float) - Optional - Set background opacity (0.0-1.0)
- **--tile** (flag) - Optional - Tile the background image
- **--center** (flag) - Optional - Center the image without scaling
- **--size** (string) - Optional - Size for centered images
- **--border-color** (string) - Optional - Set block frame border color
- **--active-border-color** (string) - Optional - Set focused border color
- **--clear** (flag) - Optional - Remove background
- **--print** (flag) - Optional - Show metadata without applying
```

--------------------------------

### Write Data to File

Source: https://docs.waveterm.dev/wsh-reference

Writes data from standard input to a file specified by URI. Supports local and remote files via WSH. Maximum file size is 10MB.

```bash
wsh file write [file-uri]  

```

```bash
echo "hello" | wsh file write ./greeting.txt

```

```bash
cat config.json | wsh file write //ec2-user@remote01/~/config.json

```

--------------------------------

### POST /badge

Source: https://docs.waveterm.dev/wsh-reference

Manages visual badge indicators on block or tab headers.

```APIDOC
## POST /badge

### Description
Sets or clears a visual badge indicator on a block or tab header.

### Method
POST

### Endpoint
wsh badge

### Parameters
#### Query Parameters
- **icon** (string) - Optional - Font Awesome icon name
- **--color** (string) - Optional - Badge color
- **--priority** (float) - Optional - Badge priority (default 10)
- **--clear** (flag) - Optional - Remove the badge
- **--beep** (flag) - Optional - Play system bell
- **--pid** (int) - Optional - Watch PID and clear on exit
- **-b, --block** (string) - Optional - Target specific block or tab
```

--------------------------------

### Configure OpenRouter Provider

Source: https://docs.waveterm.dev/waveai-modes

OpenRouter requires manual specification of capabilities based on the model's features.

```json
{
  "openrouter-qwen": {
    "display:name": "OpenRouter - Qwen",
    "ai:provider": "openrouter",
    "ai:model": "qwen/qwen-2.5-coder-32b-instruct"
  }
}
```

```json
{
  "openrouter-qwen": {
    "display:name": "OpenRouter - Qwen",
    "ai:provider": "openrouter",
    "ai:model": "qwen/qwen-2.5-coder-32b-instruct",
    "ai:capabilities": ["tools"]
  }
}
```

--------------------------------

### Widget Configuration Structure

Source: https://docs.waveterm.dev/customwidgets

Defines the basic JSON structure for a custom widget, including its name, icon, label, and command definition. This is the fundamental template for creating any new widget.

```json
"<widget name>": {
    "icon": "<font awesome icon name>",
    "label": "<the text label of the widget>",
    "color": "<the color of the label>",
    "blockdef": {
        "meta": {
            "view": "term",
            "controller": "cmd",
            "cmd": "<the actual cli command>"
        }
    }
}

```

--------------------------------

### Reinstall Wave Shell Extensions (SSH)

Source: https://docs.waveterm.dev/wsh-reference

Use this command to reinstall the Wave Shell Extensions on a specified SSH connection.

```bash
wsh conn reinstall [user@host]  

```

--------------------------------

### Wavepath Command

Source: https://docs.waveterm.dev/wsh-reference

Utility to retrieve paths to Wave Terminal directories and files.

```APIDOC
## wsh wavepath

### Description
The `wavepath` command lets you get the paths to various Wave Terminal directories and files, including configuration, data storage, and logs.

### Usage
```
wsh wavepath {config|data|log}
```

This command returns the full path to the requested Wave Terminal system directory or file. It's useful for accessing Wave's configuration files, data storage, or checking logs.

### Flags
* `-o, --open` - open the path in a new block
* `-O, --open-external` - open the path in the default external application
* `-t, --tail` - show the last ~100 lines of the log file (only valid for log path)

### Examples
```
# Get path to config directory
wsh wavepath config

# Get path to data directory
wsh wavepath data

# Get path to log file
wsh wavepath log

# Open log file in a new block
wsh wavepath -o log

# Open config directory in system file explorer
wsh wavepath -O config

# View recent log entries
wsh wavepath -t log
```

The command will show you the full path to:
* `config` - Where Wave Terminal stores its configuration files
* `data` - Where Wave Terminal stores its persistent data
* `log` - The main Wave Terminal log file

### Tip
Use the `-t` flag with the log path to quickly view recent log entries without having to open the full file. This is particularly useful for troubleshooting.
```

--------------------------------

### Set Tab Backgrounds via CLI

Source: https://docs.waveterm.dev/customization

Use the wsh setbg command to apply images, colors, or patterns to tab backgrounds with various positioning and opacity options.

```bash
# Set an image background with 50% opacity (default)
wsh setbg ~/pictures/background.jpg

# Set a color background (use quotes to prevent # being interpreted as a shell comment)
wsh setbg "#ff0000"          # hex color
wsh setbg forestgreen        # CSS color name

# Adjust opacity
wsh setbg --opacity 0.3 ~/pictures/light-pattern.png
wsh setbg --opacity 0.7      # change only opacity of current background

# Image positioning options
wsh setbg --tile ~/pictures/texture.png          # create tiled pattern
wsh setbg --center ~/pictures/logo.png           # center without scaling
wsh setbg --center --size 200px ~/pictures/logo.png  # center with specific size (px, %, auto)

# Remove background
wsh setbg --clear
```

--------------------------------

### Configure local shell path for Git Bash

Source: https://docs.waveterm.dev/faq

Set the local shell path in settings.json to point to the Git Bash executable on Windows.

```json
"term:localshellpath": "C:\\Program Files\\Git\\bin\\bash.exe"
```

--------------------------------

### Environment Variable Resolution in Configuration

Source: https://docs.waveterm.dev/config

Configure sensitive information like API keys using environment variables. Supports fallback values if the environment variable is not set.

```json
{
  "ai:apitoken": "$ENV:OPENAI_APIKEY",
  "ai:baseurl": "$ENV:AI_BASEURL:https://api.openai.com/v1"
}

```

--------------------------------

### Monitor remote logs

Source: https://docs.waveterm.dev/wsh

Use `wsh run -- tail -f` to monitor log files on a remote server in real-time.

```bash
wsh run -- tail -f /var/log/app.log
```

--------------------------------

### Connect to a Connection (SSH)

Source: https://docs.waveterm.dev/wsh-reference

Connects to the specified SSH connection without creating a block for it.

```bash
wsh conn connect [user@host]  

```

--------------------------------

### Check connection status

Source: https://docs.waveterm.dev/wsh-reference

Displays the status of all active connections.

```bash
wsh conn status
```

--------------------------------

### Bookmark Structure for Bookmarks.json

Source: https://docs.waveterm.dev/config

Defines the structure for a single bookmark entry, including URL, title, and optional display order. Only the URL is strictly required.

```json
{
  "url": "https://example.com",
  "title": "Example Site",
  "iconurl": "https://example.com/custom-icon.png",
  "display:order": 1
}

```

--------------------------------

### Backgrounds JSON File Format

Source: https://docs.waveterm.dev/tab-backgrounds

Defines the structure for custom background configurations in Wave Term.

```json
{
  "bg@<key>": {
    "display:name": "<Background name>",
    "display:order": <number>,
    "bg": "<CSS background value>",
    "bg:opacity": <float>
  }
}

```

--------------------------------

### Display File Contents

Source: https://docs.waveterm.dev/wsh-reference

Displays the contents of a file from a specified URI. Supports local files and remote files via WSH. Maximum file size is 10MB.

```bash
wsh file cat [file-uri]

```

```bash
wsh file cat wsh://user@ec2/home/user/config.txt

```

```bash
wsh file cat ./local-config.txt

```

--------------------------------

### Connection Management API

Source: https://docs.waveterm.dev/wsh-reference

Commands for managing SSH and WSL connections, including reinstalling extensions, disconnecting, connecting, and ensuring connection status.

```APIDOC
## wsh conn reinstall

### Description
Reinstalls the Wave Shell Extensions on the specified connection.

### Parameters
#### Path Parameters
- **connection** (string) - Required - The connection identifier (e.g., user@host or wsl://distribution-name).

## wsh conn disconnect

### Description
Completely disconnects the specified connection, affecting all active blocks using it.

### Parameters
#### Path Parameters
- **connection** (string) - Required - The connection identifier.

## wsh conn connect

### Description
Connects to the specified connection without creating a block.

### Parameters
#### Path Parameters
- **connection** (string) - Required - The connection identifier.

## wsh conn ensure

### Description
Connects to the specified connection only if it is not already connected.

### Parameters
#### Path Parameters
- **connection** (string) - Required - The connection identifier.
```

--------------------------------

### Set Tab Background

Source: https://docs.waveterm.dev/wsh-reference

Configure the background of the current tab using images or colors.

```bash
wsh setbg [--opacity value] [--tile|--center] [--size value] [--border-color color] [--active-border-color color] (image-path|"#color"|color-name)
```

```bash
# Set an image background with default settings
wsh setbg ~/pictures/background.jpg

# Set a background with custom opacity
wsh setbg --opacity 0.3 ~/pictures/light-pattern.png

# Set a tiled background
wsh setbg --tile --opacity 0.2 ~/pictures/texture.png

# Center an image (good for logos)
wsh setbg --center ~/pictures/logo.png
wsh setbg --center --size 200px ~/pictures/logo.png

# Set color backgrounds
wsh setbg "#ff0000"          # hex color (requires quotes)
wsh setbg forestgreen        # CSS color name

# Change just the opacity of current background
wsh setbg --opacity 0.7

# Set border colors alongside a background
wsh setbg --border-color "#ff0000" --active-border-color "#00ff00" ~/pictures/background.jpg
wsh setbg --border-color steelblue forestgreen

# Remove background
wsh setbg --clear

# Preview the metadata
wsh setbg --print "#ff0000"
```

--------------------------------

### Set Default AI Preset

Source: https://docs.waveterm.dev/ai-presets

Configure the default AI preset by adding this line to your settings.json file. This specifies which preset the AI widget should use by default.

```json
{
  "ai:preset": "ai@claude-sonnet"
}

```

--------------------------------

### wsh view

Source: https://docs.waveterm.dev/wsh-reference

Opens a preview block for a file or directory. Supports magnified view and integrates with codeedit for text/code files.

```APIDOC
## wsh view

### Description
Opens a preview block with the contents of any file or directory. For code/text files, it opens a codeedit block for quick editing.

### Method
N/A (CLI command)

### Endpoint
N/A

### Parameters
#### Path Parameters
- **path** (string) - Required - The path to the file or directory to preview.

#### Query Parameters
- **-m** (flag) - Optional - Opens the preview in a magnified block.

### Request Example
```
wsh view my_image.png
wsh view -m my_directory/
wsh view README.md
```

### Response
N/A (Opens a Wave block)
```

--------------------------------

### Theme and Style a Connection in connections.json

Source: https://docs.waveterm.dev/connections

Customize the appearance of a connection's widgets using `term:theme`, `term:fontsize`, and `term:fontfamily`. These settings apply only to widgets using this specific connection.

```json
{
    "...": "...",
    "myusername@myhost" : {
        "term:theme": "warmyellow",
        "term:fontsize": 16,
        "term:fontfamily": "menlo"
    },
    "...": "..."
}
```

--------------------------------

### Open Secrets UI in Magnified Mode

Source: https://docs.waveterm.dev/wsh-reference

Use this command to open the secrets UI with an expanded view. The secrets UI allows visual management of secrets.

```bash
wsh secret ui -m
```

--------------------------------

### Debug with stdin and auto-submit to AI

Source: https://docs.waveterm.dev/wsh

Pipe output from a command to `wsh ai -s -` to send it directly to the AI for debugging and analysis with auto-submission.

```bash
dmesg | wsh ai -s - -m "help me understand these errors"
```

--------------------------------

### Configure Azure OpenAI with Capabilities

Source: https://docs.waveterm.dev/waveai-modes

When using Azure OpenAI, manually specify 'ai:capabilities' based on your model's features, such as 'tools' and 'images'.

```json
{
  "azure-gpt4": {
    "display:name": "Azure GPT-4",
    "ai:provider": "azure",
    "ai:model": "gpt-4",
    "ai:azureresourcename": "your-resource-name",
    "ai:capabilities": ["tools", "images"]
  }
}
```

--------------------------------

### AI Capabilities

Source: https://docs.waveterm.dev/waveai-modes

Explanation of supported AI capabilities and provider-specific behavior.

```APIDOC
## AI Capabilities

### Description
This section details the `ai:capabilities` field, which specifies the features an AI mode supports, and outlines provider-specific handling.

### Capabilities
- **`tools`**: Enables AI tool usage for file reading/writing, shell integration, and widget interaction.
- **`images`**: Allows image attachments in chat (model can view uploaded images).
- **`pdfs`**: Allows PDF file attachments in chat (model can read PDF content).

### Provider Behavior
- **OpenAI and Google providers**: Capabilities are automatically configured based on the model. Manual specification is not needed.
- **OpenRouter, NanoGPT, Groq, Azure, Azure-Legacy, and Custom providers**: Capabilities must be manually specified based on the model's features.

### Warning
Including `"tools"` in `ai:capabilities` is crucial for the AI model to interact with Wave terminal widgets, read/write files, and execute commands, enhancing the overall Wave experience. Vision-capable models should include `"images"`. Only include `"pdfs"` if the model supports PDF processing.
```

--------------------------------

### Set Default AI Preset

Source: https://docs.waveterm.dev/ai-presets

Specify the default AI preset to be used by setting the `ai:preset` key in `settings.json`.

```json
{
  "ai:preset": "ai@claude-sonnet"
}
```

--------------------------------

### Configure OpenAI Provider with Default Secret

Source: https://docs.waveterm.dev/waveai-modes

The 'openai' provider automatically looks for the 'OPENAI_KEY' secret. Ensure this secret is stored in Wave's secret store for the provider to access your API key.

```json
{
  "my-openai-mode": {
    "display:name": "OpenAI GPT-4o",
    "ai:provider": "openai",
    "ai:model": "gpt-4o"
  }
}
```

--------------------------------

### Manage Block Badges

Source: https://docs.waveterm.dev/wsh-reference

Set or clear visual indicators on block or tab headers.

```bash
wsh badge [icon]  
wsh badge --clear
```

```bash
# Set a default badge on the current block
wsh badge

# Set a badge with a custom icon and color
wsh badge circle-check --color green

# Set a high-priority badge on a specific block
wsh badge triangle-exclamation --color red --priority 20 -b 2

# Set a badge that clears when a process exits
wsh badge --pid 12345

# Play the bell and set a badge when done
wsh badge circle-check --beep

# Clear the badge on the current block
wsh badge --clear

# Clear the badge on a specific tab
wsh badge --clear -b tab
```

--------------------------------

### Terminal Theming

Source: https://docs.waveterm.dev/config

Customize the appearance of the terminal by defining custom themes in `~/.config/waveterm/termthemes.json`. Themes can be applied via the terminal's context menu or by setting the `term:theme` metadata key.

```APIDOC
## Terminal Theming

User-defined terminal themes are located in `~/.config/waveterm/termthemes.json`.
This JSON file is structured as an object, with each sub-key defining a theme. Themes are applied by right-clicking on the terminal's header bar and selecting an entry from the "Themes" sub-menu. Alternatively they can be applied to the block's metadata key `term:theme`. This uses the JSON key value as the identifier. Note, for best consistency all colors should be of the format "#rrggbb" or "#rrggbbaa" (aa = alpha channel for transparency).

### Applying a Theme
```
wsh setmeta this term:theme="default-dark"
```

### Theme Configuration Structure
```json
{
  "theme-key": {
    "display:name": "Theme Name",
    "display:order": 1,
    "black": "#rrggbb",
    "red": "#rrggbb",
    "green": "#rrggbb",
    "yellow": "#rrggbb",
    "blue": "#rrggbb",
    "magenta": "#rrggbb",
    "cyan": "#rrggbb",
    "white": "#rrggbb",
    "brightBlack": "#rrggbb",
    "brightRed": "#rrggbb",
    "brightGreen": "#rrggbb",
    "brightYellow": "#rrggbb",
    "brightBlue": "#rrggbb",
    "brightMagenta": "#rrggbb",
    "brightCyan": "#rrggbb",
    "brightWhite": "#rrggbb",
    "gray": "#rrggbb",
    "cmdtext": "#rrggbb",
    "foreground": "#rrggbb",
    "selectionBackground": "#rrggbb",
    "background": "#rrggbbaa",
    "cursorAccent": "#rrggbb"
  }
}
```

### Key Descriptions

| Key Name            | Type   | ANSI FG# | ANSI BG# | Function                                                                 |
|---------------------|--------|----------|----------|--------------------------------------------------------------------------|
| `display:name`      | string |          |          | The name as it will appear in the UI context menu.                       |
| `display:order`     | float  |          |          | Entries in the context menu are sorted by `display:order`.               |
| `black`             | CSS color | 30       | 40       | Color for black.                                                         |
| `red`               | CSS color | 31       | 41       | Color for red.                                                           |
| `green`             | CSS color | 32       | 42       | Color for green.                                                         |
| `yellow`            | CSS color | 33       | 43       | Color for yellow.                                                        |
| `blue`              | CSS color | 34       | 44       | Color for blue.                                                          |
| `magenta`           | CSS color | 35       | 45       | Color for magenta.                                                       |
| `cyan`              | CSS color | 36       | 46       | Color for cyan.                                                          |
| `white`             | CSS color | 37       | 47       | Color for white.                                                         |
| `brightBlack`       | CSS color | 90       | 100      | Color for bright black.                                                  |
| `brightRed`         | CSS color | 91       | 101      | Color for bright red.                                                    |
| `brightGreen`       | CSS color | 92       | 102      | Color for bright green.                                                  |
| `brightYellow`      | CSS color | 93       | 103      | Color for bright yellow.                                                 |
| `brightBlue`        | CSS color | 94       | 104      | Color for bright blue.                                                   |
| `brightMagenta`     | CSS color | 95       | 105      | Color for bright magenta.                                                |
| `brightCyan`        | CSS color | 96       | 106      | Color for bright cyan.                                                   |
| `brightWhite`       | CSS color | 97       | 107      | Color for bright white.                                                  |
| `gray`              | CSS color |          |          | Currently unused.                                                        |
| `cmdtext`           | CSS color |          |          | Currently unused.                                                        |
| `foreground`        | CSS color |          |          | Default foreground color when no color code is applied.                  |
| `background`        | CSS color |          |          | Default background color when no color code is applied. Must have alpha channel (#rrggbbaa) for transparency. |
| `cursorAccent`      | CSS color |          |          | Color for the cursor.                                                    |
| `selectionBackground`| CSS color |          |          | Background color for selected text.                                      |

### Editing the Configuration File
```
wsh editconfig termthemes.json
```
```

--------------------------------

### Run a command in a new block and auto-close

Source: https://docs.waveterm.dev/wsh

Use `wsh run -x` to execute a command in a new block that automatically closes upon completion.

```bash
wsh run -x -- npm test
```

--------------------------------

### Configure Global Durable Sessions

Source: https://docs.waveterm.dev/durable-sessions

Enable durable sessions for all SSH connections by adding this setting to your settings.json file.

```json
{
  "term:durable": true
}
```

--------------------------------

### Access local files from remote machine

Source: https://docs.waveterm.dev/wsh

Access local files from a remote machine using the `wsh://local/~/` prefix with `wsh file` commands. The `/~/` shorthand can also be used.

```bash
wsh file cat wsh://local/~/config/app.json
```

```bash
bash <(wsh file cat wsh://local/~/scripts/deploy.sh)
```

```bash
python <(wsh file cat wsh://local/~/scripts/deploy.py)
```

```bash
echo "Remote machine log entry" | wsh file append wsh://local/~/app.log
```

```bash
wsh file cp wsh://local/~/data.csv ./remote-data.csv
```

```bash
wsh file cp ./results.txt wsh://local/~/results.txt
```

```bash
wsh file cat /~/config/app.json
```

--------------------------------

### Append Data to File

Source: https://docs.waveterm.dev/wsh-reference

Appends data from standard input to a file specified by URI. Input is buffered locally (up to 10MB) before writing. Supports local and remote files via WSH.

```bash
wsh file append [file-uri]  

```

```bash
cat additional-content.txt | wsh file append ./notes.txt

```

```bash
echo "new line" | wsh file append //user@remote/~/notes.txt

```

--------------------------------

### Configure Groq Provider

Source: https://docs.waveterm.dev/waveai-modes

Use the 'groq' provider for fast inference with open models via an OpenAI-compatible API. The provider automatically sets the endpoint, API type, and secret name for your Groq API key.

```json
{
  "groq-kimi-k2": {
    "display:name": "Groq - Kimi K2",
    "ai:provider": "groq",
    "ai:model": "moonshotai/kimi-k2-instruct"
  }
}
```

--------------------------------

### File Management API

Source: https://docs.waveterm.dev/wsh-reference

Commands for managing files across local and remote storage systems using URI-based addressing.

```APIDOC
## wsh file cat

### Description
Displays the contents of a file (max 10MB).

### Parameters
#### Path Parameters
- **file-uri** (string) - Required - The URI of the file to read.

## wsh file write

### Description
Writes data from stdin to a file (max 10MB).

### Parameters
#### Path Parameters
- **file-uri** (string) - Required - The destination file URI.

## wsh file cp

### Description
Copies files between storage systems.

### Parameters
#### Path Parameters
- **source-uri** (string) - Required - The source file URI.
- **destination-uri** (string) - Required - The destination file URI.
#### Query Parameters
- **-f, --force** (flag) - Optional - Overwrites conflicts.
- **-m, --merge** (flag) - Optional - Merges directory contents.
```

--------------------------------

### Reorder a Connection in connections.json

Source: https://docs.waveterm.dev/connections

Use the `display:order` property to change the position of a connection in the connections dropdown. Assign a numerical value to control the order.

```json
{
    "...": "...",
    "myusername@rarelyused:9999" : {
        "display:order": 100
    },
    "...": "..."
}
```

--------------------------------

### Define SSH Connection Internally in connections.json

Source: https://docs.waveterm.dev/connections

Use this to define SSH connection parameters directly within `connections.json` without needing a `~/.ssh/config` file. Ensure all necessary SSH parameters are correctly specified.

```json
{
    "myusername@myhost" : {
        "ssh:hostname": "190.0.2.0",
        "ssh:identityfile": ["~/.ssh/myidentityfile"],
        "ssh:identitiesonly": true,
        "ssh:addkeystoagent": true
    }
}
```

--------------------------------

### List and Filter Blocks

Source: https://docs.waveterm.dev/releasenotes

Use the wsh blocks list command to view and filter blocks by workspace, tab, or view type.

```bash
wsh blocks list
```

--------------------------------

### Configure Claude Code Hooks for Wave Badges

Source: https://docs.waveterm.dev/claude-code

Add this JSON configuration to your global Claude Code settings (~/.claude/settings.json) to enable Wave's badge notifications for various session events. Ensure you merge with existing 'hooks' if present.

```json
{
  "hooks": {
    "Notification": [
      {
        "matcher": "permission_prompt",
        "hooks": [
          {
            "type": "command",
            "command": "wsh badge bell-exclamation --color '#e0b956' --priority 20 --beep"
          }
        ]
      },
      {
        "matcher": "elicitation_dialog",
        "hooks": [
          {
            "type": "command",
            "command": "wsh badge message-question --color '#e0b956' --priority 20 --beep"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "wsh badge check --color '#58c142' --priority 10"
          }
        ]
      }
    ],
    "PreToolUse": [
      {
        "matcher": "AskUserQuestion",
        "hooks": [
          {
            "type": "command",
            "command": "wsh badge message-question --color '#e0b956' --priority 20 --beep"
          }
        ]
      }
    ]
  }
}

```

--------------------------------

### Apply Terminal Theme

Source: https://docs.waveterm.dev/config

Use this command to apply a terminal theme by its identifier. Ensure the theme is defined in your termthemes.json file.

```shell
wsh setmeta this term:theme="default-dark"  

```

--------------------------------

### Pipe output to AI sidebar

Source: https://docs.waveterm.dev/wsh

Pipe terminal command output to `wsh ai -` to send it to the AI sidebar for analysis. The AI will prompt for a question.

```bash
git diff | wsh ai -
```

--------------------------------

### wsh edit

Source: https://docs.waveterm.dev/wsh-reference

Opens a codeedit block for a specified file, allowing for quick editing in Wave's graphical editor. Returns immediately after opening.

```APIDOC
## wsh edit

### Description
Opens a codeedit block for the specified file, enabling quick editing using Wave's graphical editor. This command returns immediately.

### Method
N/A (CLI command)

### Endpoint
N/A

### Parameters
#### Path Parameters
- **path** (string) - Required - The path to the file to edit.

#### Query Parameters
- **-m** (flag) - Optional - Opens the editor in a magnified block.

### Request Example
```
wsh edit config.yaml
wsh edit -m main.py
```

### Response
N/A (Opens a Wave block)
```

--------------------------------

### Configure OpenAI Provider

Source: https://docs.waveterm.dev/waveai-modes

The openai provider automatically handles endpoint and token secret mapping. Specify the model name to enable automatic capability detection.

```json
{
  "openai-gpt4o": {
    "display:name": "GPT-4o",
    "ai:provider": "openai",
    "ai:model": "gpt-4o"
  }
}
```

```json
{
  "openai-gpt41": {
    "display:name": "GPT-4.1",
    "ai:provider": "openai",
    "ai:model": "gpt-4.1"
  }
}
```

--------------------------------

### Set Block-Level Durability via Command Line

Source: https://docs.waveterm.dev/durable-sessions

Use the wsh command to toggle session durability for the current terminal block.

```bash
wsh setmeta term:durable=true
```

```bash
wsh setmeta term:durable=false
```

--------------------------------

### Model Not Found Errors

Source: https://docs.waveterm.dev/waveai-modes

Guidance on resolving "model not found" errors.

```APIDOC
## Model Not Found

### Description
This section addresses "model not found" errors and provides steps to resolve them.

### Troubleshooting Steps
1.  Verify that the model name exactly matches what your server expects.
2.  For Ollama, use `ollama list` to see available models.
3.  Be aware that some servers require specific prefixes or naming formats for models.
```

--------------------------------

### Capture command output with termscrollback

Source: https://docs.waveterm.dev/wsh-reference

Use these commands to save or process the output of the most recent terminal command. Requires shell integration to be enabled.

```bash
wsh termscrollback --lastcommand -o last-output.txt
```

```bash
wsh termscrollback --lastcommand | grep "ERROR"
```

--------------------------------

### Azure OpenAI AI Preset Configuration

Source: https://docs.waveterm.dev/ai-presets

Configuration for connecting to Azure AI services. Do not include query parameters or 'api-version' in the 'ai:baseurl'. The 'ai:model' should be your model deployment name in Azure.

```json
{
  "ai@azure-gpt4": {
    "display:name": "Azure GPT-4",
    "display:order": 4,
    "ai:*": true,
    "ai:apitype": "azure",
    "ai:baseurl": "<your Azure AI base URL>",
    "ai:model": "<your model deployment name>",
    "ai:apitoken": "<your Azure API key>"
  }
}

```

--------------------------------

### Configure Terminal Font Size

Source: https://docs.waveterm.dev/customization

Set the default font size for all terminals by adding this key to your settings.json file.

```json
{ "term:fontsize": 14}
```

--------------------------------

### Define a Terminal Widget Configuration

Source: https://docs.waveterm.dev/customwidgets

Use this structure within your widget configuration to define a terminal-based widget. The 'view' must be set to 'term' and the 'controller' to either 'cmd' or 'shell'.

```json
{
    <... other widgets go here ...>,
    "<widget name>": {
        "icon": "<font awesome icon name>",
        "label": "<the text label of the widget>",
        "color": "<the color of the label>",
        "blockdef": {
            "meta": {
                "view": "term",
                "controller": "cmd",
                "cmd": "<the actual cli command>"
            }
        }
    },
    <... other widgets go here ...>
}
```

--------------------------------

### Complex Gradient Background

Source: https://docs.waveterm.dev/tab-backgrounds

Demonstrates a complex background using multiple linear and radial gradients with opacity and blend mode.

```json
{
  "bg@duskhorizon": {
    "display:name": "Dusk Horizon",
    "bg": "linear-gradient(0deg, rgba(128,0,0,1) 0%, rgba(204,85,0,0.7) 20%, rgba(255,140,0,0.6) 45%, rgba(160,90,160,0.5) 65%, rgba(60,60,120,1) 100%), radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1), transparent 60%), radial-gradient(circle at 70% 70%, rgba(255,255,255,0.05), transparent 70%)",
    "bg:opacity": 0.9,
    "bg:blendmode": "overlay"
  }
}

```

--------------------------------

### wsh file ls

Source: https://docs.waveterm.dev/wsh-reference

Lists files in a directory. By default, lists files in the current directory for the current terminal session.

```APIDOC
## wsh file ls

### Description
List files in a directory. By default, lists files in the current directory for the current terminal session.

### Endpoint
wsh file ls [flags] [file-uri]

### Parameters
#### Path Parameters
- **file-uri** (string) - Optional - The URI of the directory to list.

#### Flags
- **-l, --long** (flag) - Optional - Use long listing format showing size, timestamps, and metadata.
- **-1, --one** (flag) - Optional - List one file per line.
- **-f, --files** (flag) - Optional - List only files (no directories).
```

--------------------------------

### Toggle Wave Cloud Modes

Source: https://docs.waveterm.dev/waveai-modes

Hide or show built-in cloud AI modes in the dropdown menu.

```shell
wsh setconfig waveai:showcloudmodes=false
```

```json
  "waveai:showcloudmodes": false
```

--------------------------------

### Copy Files Between Storage Systems

Source: https://docs.waveterm.dev/wsh-reference

Copies files between different storage systems, including local, SSH remote, and other WSH-compatible systems. Supports force overwrite and merge flags. Maximum file size is 10MB.

```bash
wsh file cp [flags] [source-uri] [destination-uri]

```

```bash
# Copy a remote file to your local filesystem
wsh file cp wsh://user@ec2/home/user/config.txt ./local-config.txt

```

```bash
# Copy a local file to a remote system
wsh file cp ./local-config.txt wsh://user@ec2/home/user/config.txt

```

```bash
# Copy between remote systems
wsh file cp wsh://user@ec2/home/user/config.txt wsh://user@server2/home/user/backup.txt

```

--------------------------------

### Default Wave Terminal Configuration

Source: https://docs.waveterm.dev/config

This is the default configuration for Wave Terminal v0.14.0. It includes settings for AI, application behavior, updates, connections, editor, web, window, and terminal.

```json
{
    "ai:preset": "ai@global",
    "ai:model": "gpt-5-mini",
    "ai:maxtokens": 4000,
    "ai:timeoutms": 60000,
    "app:defaultnewblock": "term",
    "app:confirmquit": true,
    "app:hideaibutton": false,
    "app:disablectrlshiftarrows": false,
    "app:disablectrlshiftdisplay": false,
    "app:focusfollowscursor": "off",
    "autoupdate:enabled": true,
    "autoupdate:installonquit": true,
    "autoupdate:intervalms": 3600000,
    "conn:askbeforewshinstall": true,
    "conn:wshenabled": true,
    "editor:minimapenabled": true,
    "web:defaulturl": "https://github.com/wavetermdev/waveterm",
    "web:defaultsearch": "https://www.google.com/search?q={query}",
    "window:tilegapsize": 3,
    "window:maxtabcachesize": 10,
    "window:nativetitlebar": true,
    "window:magnifiedblockopacity": 0.6,
    "window:magnifiedblocksize": 0.9,
    "window:magnifiedblockblurprimarypx": 10,
    "window:fullscreenonlaunch": false,
    "window:magnifiedblockblursecondarypx": 2,
    "window:confirmclose": true,
    "window:savelastwindow": true,
    "telemetry:enabled": true,
    "term:bellsound": false,
    "term:bellindicator": false,
    "term:osc52": "always",
    "term:cursor": "block",
    "term:cursorblink": false,
    "term:copyonselect": true,
    "term:durable": false,
    "waveai:showcloudmodes": true,
    "waveai:defaultmode": "waveai@balanced",
    "preview:defaultsort": "name"
}

```

--------------------------------

### Termscrollback Commands

Source: https://docs.waveterm.dev/wsh-reference

Commands for interacting with the terminal's scrollback buffer, such as saving command output.

```APIDOC
## wsh termscrollback

### Description
Commands for interacting with the terminal's scrollback buffer.

### Save last command output to a file
```
wsh termscrollback --lastcommand -o last-output.txt
```

### Process last command output with grep
```
wsh termscrollback --lastcommand | grep "ERROR"
```

### Note
The `--lastcommand` flag requires shell integration to be enabled. This feature allows you to capture just the output from the most recent command, which is particularly useful for scripting and automation.
```

--------------------------------

### Manage Secrets via CLI

Source: https://docs.waveterm.dev/secrets

Perform CRUD operations on secrets using the wsh command-line interface.

```bash
# List all secret names (not values)
wsh secret list

# Get a specific secret value
wsh secret get MY_SECRET_NAME

# Set a secret (format: name=value, no spaces around =)
wsh secret set GITHUB_TOKEN=ghp_xxxxxxxxxx
wsh secret set DB_PASSWORD=super_secure_password

# Delete a secret
wsh secret delete MY_SECRET_NAME
```

--------------------------------

### Ensure Connection is Active (SSH)

Source: https://docs.waveterm.dev/wsh-reference

Connects to the specified SSH connection if it is not already connected.

```bash
wsh conn ensure [user@host]  

```

--------------------------------

### API Type Selection

Source: https://docs.waveterm.dev/waveai-modes

Information on selecting the correct API type for different AI providers and models.

```APIDOC
## API Type Selection

### Description
This section explains how to choose the appropriate `ai:apitype` for your AI configuration, ensuring compatibility with various providers and models.

### API Types
- The API type defaults to `openai-chat` if not specified. This is suitable for most providers.
- Use `openai-chat` for Ollama, LM Studio, custom endpoints, and most cloud providers.
- Use `openai-responses` for newer OpenAI models (GPT-5+) or when your provider specifically requires it.
- Provider presets automatically set the correct API type when needed.
```

--------------------------------

### Run terminal commands

Source: https://docs.waveterm.dev/wsh-reference

Executes commands in a new terminal block. Use -- for argument preservation or -c for shell strings.

```bash
# Run a command specified after --
wsh run -- ls -la

# Run a command using -c flag
wsh run -c "ls -la"

# Run with working directory specified
wsh run --cwd /path/to/dir -- ./script.sh

# Run in magnified mode
wsh run -m -- make build

# Run and auto-close on successful completion
wsh run -x -- npm test

# Run and auto-close regardless of exit status
wsh run -X -- ./long-running-task.sh
```

```bash
# Run a build command in magnified mode
wsh run -m -- npm run build

# Execute a script and auto-close after success
wsh run -x -- ./backup-script.sh

# Run a command in a specific directory
wsh run --cwd ./project -- make test

# Run a shell command and force close after completion
wsh run -X -c "find . -name '*.log' -delete"

# Start a command in paused state
wsh run -p -- ./server --dev

# Run with custom close delay
wsh run -x --delay 5000 -- ./deployment.sh
```

--------------------------------

### Configure Google AI (Gemini) Provider

Source: https://docs.waveterm.dev/waveai-modes

Use the 'google' provider for Google's Gemini models. This configuration automatically sets the endpoint, API type, API token secret name, and capabilities for image and PDF processing.

```json
{
  "google-gemini": {
    "display:name": "Gemini 3 Pro",
    "ai:provider": "google",
    "ai:model": "gemini-3-pro-preview"
  }
}
```

--------------------------------

### Remove Default Widget Configuration

Source: https://docs.waveterm.dev/customwidgets

To remove any of the default widgets (terminal, files, web, ai, sysinfo), set their corresponding key to `null` in your `widgets.json` file.

```json
"defwidget@terminal": null
```

--------------------------------

### Send terminal output to AI

Source: https://docs.waveterm.dev/wsh

Pipe the output of a terminal command to `wsh ai` to send it to an AI assistant for analysis, along with a prompt.

```bash
ls -la | wsh ai - "what are the largest files here?"
```

--------------------------------

### List stored secrets with wsh secret list

Source: https://docs.waveterm.dev/wsh-reference

Display the names of all stored secrets without revealing their values.

```bash
wsh secret list
```

```bash
# List all secrets
wsh secret list
```

--------------------------------

### Set metadata for blocks or tabs

Source: https://docs.waveterm.dev/wsh-reference

Use `wsh setmeta` to update metadata key-value pairs for blocks or tabs. It accepts the same `-b` arguments as `getmeta`. Metadata can be set directly or via a JSON file using `--json`, reading from a file or stdin.

```bash
wsh setmeta -b [blockid] [key]=[value]
```

```bash
wsh setmeta -b [blockid] file=~/myfile.txt
```

```bash
wsh setmeta -b [blockid] url=https://waveterm.dev/
```

```bash
# set the metadata for the current tab using the given json file
wsh setmeta -b tab --json [jsonfile]
```

```bash
# set the metadata for the current tab using a json file read from stdin
wsh setmeta -b tab --json
```

```bash
wsh getmeta -b [other-tab-id] "bg:*" --clear-prefix | wsh setmeta -b tab --json -
```

--------------------------------

### Edit file in Wave's graphical editor

Source: https://docs.waveterm.dev/wsh-reference

Use `wsh edit` to open a specified file in a codeedit block for editing within Wave's graphical editor. The command returns immediately. Use `-m` for magnified mode. For `$EDITOR` integration, use `wsh editor`.

```bash
wsh edit [path]
```

```bash
wsh edit -m [path]           # opens in magnified block
```

--------------------------------

### Manage variables at different scopes using wsh getvar/setvar

Source: https://docs.waveterm.dev/wsh-reference

Variables can be accessed at block, tab, workspace, or client levels using the `-b` flag with `wsh getvar` and `wsh setvar`.

```bash
# Get/set at block level
wsh getvar -b block MYVAR
wsh setvar -b block MYVAR=value
```

```bash
# Get/set at tab level
wsh getvar -b tab MYVAR
wsh setvar -b tab MYVAR=value
```

```bash
# Get/set at workspace level
wsh getvar -b workspace MYVAR
wsh setvar -b workspace MYVAR=value
```

```bash
# Get/set at client (global) level
wsh getvar -b client MYVAR
wsh setvar -b client MYVAR=value
```

--------------------------------

### wsh ai

Source: https://docs.waveterm.dev/wsh-reference

Appends content to the Wave AI sidebar, supporting file attachments and various interaction modes.

```APIDOC
## wsh ai

### Description
Appends content to the Wave AI sidebar. Files are attached as proper attachments. Content is added without auto-submission by default, allowing for review.

### Method
N/A (CLI command)

### Endpoint
N/A

### Parameters
#### Path Parameters
- **content** (string) - Optional - Content to send to AI. Can be a file path or '-' to read from stdin.

#### Query Parameters
- **-m** (string) - Optional - A message to accompany the attached files or stdin content.
- **-s** (flag) - Optional - Auto-submits the content to the AI immediately.
- **-n** (flag) - Optional - Starts a new chat conversation in the AI sidebar.

### Request Example
```
git diff | wsh ai -
docker logs mycontainer | wsh ai -
wsh ai main.go utils.go
wsh ai screenshot.png logs.txt
wsh ai app.py -m "find potential bugs"
wsh ai config.json -s -m "explain this configuration"
```

### Response
N/A (Appends to AI sidebar)
```

--------------------------------

### Define Custom Terminal Theme

Source: https://docs.waveterm.dev/config

This JSON structure defines a custom terminal theme. All color values should be in #rrggbb or #rrggbbaa format. The 'display:order' key sorts themes in the context menu.

```json
{
  "default-dark": {
    "display:name": "Default Dark",
    "display:order": 1,
    "black": "#757575",
    "red": "#cc685c",
    "green": "#76c266",
    "yellow": "#cbca9b",
    "blue": "#85aacb",
    "magenta": "#cc72ca",
    "cyan": "#74a7cb",
    "white": "#c1c1c1",
    "brightBlack": "#727272",
    "brightRed": "#cc9d97",
    "brightGreen": "#a3dd97",
    "brightYellow": "#cbcaaa",
    "brightBlue": "#9ab6cb",
    "brightMagenta": "#cc8ecb",
    "brightCyan": "#b7b8cb",
    "brightWhite": "#f0f0f0",
    "gray": "#8b918a",
    "cmdtext": "#f0f0f0",
    "foreground": "#c1c1c1",
    "selectionBackground": "",
    "background": "#00000077",
    "cursorAccent": ""
  }
}

```

--------------------------------

### wsh setvar / getvar

Source: https://docs.waveterm.dev/wsh-reference

Manages persistent variables at different scopes (block, tab, workspace, or client-wide).

```APIDOC
## wsh setvar

### Description
Set one or more variables. By default, variables are set at the client (global) level.

### Endpoint
wsh setvar [flags] KEY=VALUE...

### Parameters
#### Flags
- **-l, --local** (flag) - Optional - Set variables local to the current block.
- **-r, --remove** (flag) - Optional - Remove the specified variables instead of setting them.
- **--varfile** (string) - Optional - Use a different variable file.
- **-b** (string) - Optional - Set a specific zone (block, tab, workspace, client, or UUID).

## wsh getvar

### Description
Get the value of a variable. Returns exit code 0 if the variable exists, 1 if it doesn't.

### Endpoint
wsh getvar [flags] [key]

### Parameters
#### Flags
- **-l, --local** (flag) - Optional - Get variables local to the current block.
- **--all** (flag) - Optional - List all variables.
- **-0, --null** (flag) - Optional - Use null terminators in output instead of newlines.
- **--varfile** (string) - Optional - Use a different variable file.
```

--------------------------------

### Secret Commands

Source: https://docs.waveterm.dev/wsh-reference

Commands for secure storage and management of sensitive information.

```APIDOC
## wsh secret

### Description
The `secret` command provides secure storage and management of sensitive information like API keys, passwords, and tokens. Secrets are stored using your system's native secure storage backend (Keychain on macOS, Secret Service on Linux, Credential Manager on Windows).

Secret names must start with a letter and contain only letters, numbers, and underscores.

### get

#### Usage
```
wsh secret get [name]
```

Retrieve and display the value of a stored secret.

#### Examples
```
# Get an API key
wsh secret get github_token

# Use in scripts
export API_KEY=$(wsh secret get my_api_key)
```

### set

#### Usage
```
wsh secret set [name]=[value]
```

Store a secret value securely. This command requires an appropriate system secret manager to be available and will fail if only basic text storage is available.

#### Examples
```
# Set an API token
wsh secret set github_token=ghp_abc123xyz

# Set a database password
wsh secret set db_password=mySecurePassword123
```

### Warning
The `set` command requires a proper system secret manager (Keychain, Secret Service, or Credential Manager). It will not work with basic text storage for security reasons.

### list

#### Usage
```
wsh secret list
```

Display all stored secret names (values are not shown).

#### Example
```
# List all secrets
wsh secret list
```

### delete

#### Usage
```
wsh secret delete [name]
```

Remove a secret from secure storage.

#### Examples
```
# Delete an API key
wsh secret delete github_token

# Delete multiple secrets
wsh secret delete old_api_key
wsh secret delete temp_token
```

### ui

#### Usage
```
wsh secret ui [-m]
```

Open the secrets management interface in a new block. This provides a graphical interface for viewing and managing all your secrets.

#### Flags
* `-m, --magnified` - open the secrets UI in magnified mode

#### Examples
```
# Open the secrets UI
wsh secret ui
```
```

--------------------------------

### Move Files Between Storage Systems

Source: https://docs.waveterm.dev/wsh-reference

Moves files between different storage systems, including local, SSH remote, and other WSH-compatible systems. The source file is deleted upon successful completion. Supports force flag. Maximum file size is 10MB.

```bash
wsh file mv [flags] [source-uri] [destination-uri]

```

```bash
# Move a remote file to your local filesystem
wsh file mv wsh://user@ec2/home/user/config.txt ./local-config.txt

```

```bash
# Move a local file to a remote system
wsh file mv ./local-config.txt wsh://user@ec2/home/user/config.txt

```

```bash
# Move between remote systems
wsh file mv wsh://user@ec2/home/user/config.txt wsh://user@server2/home/user/backup.txt

```

--------------------------------

### Set a Secret

Source: https://docs.waveterm.dev/wsh-reference

Store a sensitive value, such as an API key, using the `wsh secret set` command. This allows the secret to be securely retrieved later.

```bash
wsh secret set
```

--------------------------------

### Share variables between sessions

Source: https://docs.waveterm.dev/wsh

Use `wsh setvar -b tab` to share variables between sessions within the same tab.

```bash
wsh setvar -b tab SHARED_ENV=staging
```

--------------------------------

### Trigger desktop notifications

Source: https://docs.waveterm.dev/wsh-reference

Sends a system notification from the terminal. Useful for tracking long-running tasks.

```bash
wsh notify [message] [-t title] [-s]
```

```bash
# Basic notification
wsh notify "Build completed successfully"

# Notification with custom title
wsh notify -t "Deployment Status" "Production deployment finished"

# Silent notification
wsh notify -s "Background task completed"
```

--------------------------------

### Configure Azure OpenAI (Modern API)

Source: https://docs.waveterm.dev/waveai-modes

Use the 'azure' provider for the modern Azure OpenAI API. This configuration automatically sets the endpoint, API type, and secret name for your Azure OpenAI API key. You must manually specify capabilities.

```json
{
  "azure-gpt4": {
    "display:name": "Azure GPT-4",
    "ai:provider": "azure",
    "ai:model": "gpt-4",
    "ai:azureresourcename": "your-resource-name"
  }
}
```

--------------------------------

### wsh editor

Source: https://docs.waveterm.dev/wsh-reference

Opens a codeedit block for a file and blocks until the editor is closed. Useful for setting the `$EDITOR` environment variable.

```APIDOC
## wsh editor

### Description
Opens a codeedit block for a specified file and waits until the editor is closed. This is useful for integrating with CLI tools that rely on an external editor, such as `git commit` or `crontab -e`.

### Method
N/A (CLI command)

### Endpoint
N/A

### Parameters
#### Path Parameters
- **path** (string) - Required - The path to the file to edit. The file must exist.

#### Query Parameters
- **-m** (flag) - Optional - Opens the editor in a magnified block.

### Request Example
```bash
export EDITOR="wsh editor"
wsh editor my_script.sh
```

### Response
N/A (Blocks until editor is closed)
```

--------------------------------

### Edit remote files

Source: https://docs.waveterm.dev/wsh

Use `wsh edit` to edit files on a remote server.

```bash
wsh edit /etc/nginx/nginx.conf
```

--------------------------------

### Configure SSH Secrets in connections.json

Source: https://docs.waveterm.dev/secrets

Reference a stored secret by name within an SSH connection configuration.

```json
{
    "myserver": {
        "ssh:hostname": "example.com",
        "ssh:user": "myuser",
        "ssh:passwordsecretname": "SERVER_PASSWORD"
    }
}
```

--------------------------------

### wsh getmeta

Source: https://docs.waveterm.dev/wsh-reference

Retrieves metadata for blocks or tabs. Supports filtering by block ID, key, and key prefix.

```APIDOC
## wsh getmeta

### Description
Retrieves the metadata for any block or tab. It allows specifying the target block/tab and filtering metadata keys.

### Method
N/A (CLI command)

### Endpoint
N/A

### Parameters
#### Path Parameters
- **key** (string) - Optional - A specific metadata key to dump. If omitted, all keys are dumped.

#### Query Parameters
- **-b** (string) - Optional - Specifies the block or tab to get metadata from. Accepts `this` (default), `tab`, a block ID (UUID or truncated), or a block number.
- **--clear-prefix** (flag) - Optional - When used with a prefix, this flag also includes the 'clear' key.

### Request Example
```
wsh getmeta
wsh getmeta -b 2
wsh getmeta -b d6ff4966-231a-4074-b78a-20acc7226b41 "bg:"
wsh getmeta -b tab "bg:"
wsh getmeta -b tab --clear-prefix "bg:"
wsh getmeta "some_key"
wsh getmeta -b 5 "another_key"
```

### Response
- **(string)** - The value(s) of the requested metadata key(s).
```

--------------------------------

### Remove File or Directory

Source: https://docs.waveterm.dev/wsh-reference

Removes a file or directory specified by URI. Use the `-r` flag for recursive deletion of directories. Supports local and remote files via WSH.

```bash
wsh file rm [flag] [file-uri]

```

```bash
wsh file rm wsh://user@ec2/home/user/config.txt

```

```bash
wsh file rm ./local-config.txt

```

--------------------------------

### Set persistent variables using wsh setvar

Source: https://docs.waveterm.dev/wsh-reference

Use `wsh setvar` to set client-wide or block-local variables. Variables can be removed using the `-r` flag. Use `--varfile` to specify a different variable file.

```bash
wsh setvar [flags] KEY=VALUE...
```

```bash
# Set a single variable
wsh setvar API_KEY=abc123
```

```bash
# Set multiple variables at once
wsh setvar HOST=localhost PORT=8080 DEBUG=true
```

```bash
# Set a block-local variable
wsh setvar -l BLOCK_SPECIFIC=value
```

```bash
# Remove variables
wsh setvar -r API_KEY PORT
```

--------------------------------

### Store secrets with wsh secret set

Source: https://docs.waveterm.dev/wsh-reference

Securely save a secret value. Requires a system secret manager to be available.

```bash
wsh secret set [name]=[value]
```

```bash
# Set an API token
wsh secret set github_token=ghp_abc123xyz

# Set a database password
wsh secret set db_password=mySecurePassword123
```

--------------------------------

### Edit file and block until closed

Source: https://docs.waveterm.dev/wsh-reference

Use `wsh editor` to open a file in a codeedit block and block execution until the editor is closed. This is ideal for setting the `$EDITOR` environment variable for CLI tools like `git commit` or `crontab -e`. The file must exist. Use `-m` for magnified mode.

```bash
wsh editor [path]
```

```bash
wsh editor -m [path]         # opens in magnified block
```

```bash
export EDITOR="wsh editor"
```

--------------------------------

### wsh setmeta

Source: https://docs.waveterm.dev/wsh-reference

Updates metadata key-value pairs for blocks or tabs. Supports setting individual keys or bulk updates via JSON.

```APIDOC
## wsh setmeta

### Description
Updates any metadata key-value pair for blocks and tabs. Changes are reflected instantly for preview and web blocks.

### Method
N/A (CLI command)

### Endpoint
N/A

### Parameters
#### Path Parameters
- **key** (string) - Required - The metadata key to set.
- **value** (string) - Required - The value to set for the metadata key.

#### Query Parameters
- **-b** (string) - Optional - Specifies the block or tab to set metadata for. Accepts `this` (default), `tab`, a block ID (UUID or truncated), or a block number.
- **--json** (flag) - Optional - Reads metadata from a JSON file or stdin. If a file path is provided, it reads from that file. If omitted, it reads from stdin.

### Request Example
```
wsh setmeta -b [blockid] file=~/myfile.txt
wsh setmeta -b [blockid] url=https://waveterm.dev/
wsh setmeta -b tab --json my_metadata.json
wsh getmeta -b [other-tab-id] "bg:*" --clear-prefix | wsh setmeta -b tab --json -
```

### Response
N/A (Updates metadata)
```

--------------------------------

### Disconnect Connection (WSL)

Source: https://docs.waveterm.dev/wsh-reference

Completely disconnects the specified WSL connection. This action affects all blocks using this connection.

```bash
wsh conn disconnect [wsl://<distribution name>]  

```

--------------------------------

### wsh termscrollback

Source: https://docs.waveterm.dev/wsh-reference

Retrieves terminal scrollback from a terminal block for processing or archiving.

```APIDOC
## wsh termscrollback

### Description
Get the terminal scrollback from a terminal block.

### Endpoint
wsh termscrollback [-b blockid] [flags]

### Parameters
#### Flags
- **-b, --block** (string) - Optional - Specify target terminal block (default: current block).
- **--start** (integer) - Optional - Starting line number.
- **--end** (integer) - Optional - Ending line number.
- **--lastcommand** (flag) - Optional - Get output of last command.
- **-o, --output** (string) - Optional - Write output to file instead of stdout.
```

--------------------------------

### Execute Long-Running Commands

Source: https://docs.waveterm.dev/durable-sessions

Run scripts that persist even after disconnecting from the terminal.

```bash
# Start a long build
./build.sh

# Close your laptop, get coffee
# Later: reconnect and see the completed output
```

--------------------------------

### Disable wsh for a Connection in connections.json

Source: https://docs.waveterm.dev/connections

Manually disable the wsh feature for a specific connection by adding `"conn:enablewsh": false` to its entry in `connections.json`. This is useful if wsh is causing connection issues or is not needed.

```json
{
    "root@wshless" : {
        "conn:enablewsh": false
    }
}
```

--------------------------------

### Store persistent variables

Source: https://docs.waveterm.dev/wsh

Use `wsh setvar` to store variables that persist across terminal sessions. Variables can be stored globally or within the current workspace.

```bash
wsh setvar API_KEY=abc123
```

```bash
wsh setvar DEPLOY_ENV=prod
```

```bash
wsh setvar -b workspace DEPLOY_ENV=staging
```

--------------------------------

### Hide a Connection in connections.json

Source: https://docs.waveterm.dev/connections

Use the `display:hidden` property to hide a connection from the connections dropdown. This is useful for entries in `~/.ssh/config` that are only for authentication.

```json
{
    "...": "...",
    "git@github.com" : {
        "display:hidden": true
    },
    "...": "..."
}
```

--------------------------------

### Set SSH Password Secret

Source: https://docs.waveterm.dev/secrets

Store the password value associated with the secret name defined in the connection configuration.

```bash
wsh secret set SERVER_PASSWORD=my_actual_password
```

--------------------------------

### Disconnect Connection (SSH)

Source: https://docs.waveterm.dev/wsh-reference

Completely disconnects the specified SSH connection. This action affects all blocks using this connection.

```bash
wsh conn disconnect [user@host]  

```

--------------------------------

### Delete secrets with wsh secret delete

Source: https://docs.waveterm.dev/wsh-reference

Remove a specific secret from secure storage.

```bash
wsh secret delete [name]
```

```bash
# Delete an API key
wsh secret delete github_token

# Delete multiple secrets
wsh secret delete old_api_key
wsh secret delete temp_token
```

--------------------------------

### Delete a terminal block

Source: https://docs.waveterm.dev/wsh-reference

Removes a specific terminal block by its ID.

```bash
wsh deleteblock -b [blockid]
```

=== COMPLETE CONTENT === This response contains all available snippets from this library. No additional content exists. Do not make further requests.