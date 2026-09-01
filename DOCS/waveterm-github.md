# WaveTerm Source — wavetermdev/waveterm

Live documentation pulled from [context7.com/wavetermdev/waveterm](https://context7.com/wavetermdev/waveterm/llms.txt?tokens=100000).

Covers ViewModels, widget internals, Wave AI architecture, and TypeScript interfaces.

---

### Rate Limit Update Event Example

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/wps-events.md

Example demonstrating publishing a rate limit update event. Includes defining the event constant, publishing the event asynchronously with RateLimitInfo data, and frontend subscription setup.

```go
const (
    // ... other events ...
    Event_WaveAIRateLimit  = "waveai:ratelimit"
)
```

```go
import "github.com/wavetermdev/waveterm/pkg/wps"

func updateRateLimit(info *uctypes.RateLimitInfo) {
    if info == nil {
        return
    }
    rateLimitLock.Lock()
    defer rateLimitLock.Unlock()
    globalRateLimitInfo = info

    // Publish event in goroutine to avoid blocking
    go func() {
        wps.Broker.Publish(wps.WaveEvent{
            Event: wps.Event_WaveAIRateLimit,
            Data:  info,  // RateLimitInfo struct
        })
    }()
}
```

```typescript
// Subscribe to rate limit updates
const subscription = {
  event: "waveai:ratelimit",
  allscopes: true, // Receive all rate limit events
};
```

--------------------------------

### Install Linux Dependencies (Debian/Ubuntu)

Source: https://github.com/wavetermdev/waveterm/blob/main/BUILD.md

Installs zip and snapd, then installs the Zig compiler via snap.

```sh
sudo apt install zip snapd
sudo snap install zig --classic --beta
```

--------------------------------

### Install Linux Dependencies (Arch)

Source: https://github.com/wavetermdev/waveterm/blob/main/BUILD.md

Installs zip and the Zig compiler using pacman.

```sh
sudo pacman -S zip zig
```

--------------------------------

### Partially Filled Assistant Response Example

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/anthropic-messages-api.md

Illustrates how to provide a partial assistant response to guide the model's continuation. This is useful for constraining the output.

```json
[
  {"role": "user", "content": "What's the Greek name for Sun? (A) Sol (B) Helios (C) Sun"},
  {"role": "assistant", "content": "The best answer is ("},
]
```

--------------------------------

### Install Linux Dependencies (Fedora/RHEL)

Source: https://github.com/wavetermdev/waveterm/blob/main/BUILD.md

Installs zip and the Zig compiler using dnf.

```sh
sudo dnf install zip zig
```

--------------------------------

### SSH Shell Client Usage Pattern

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/conn-arch.md

Demonstrates the typical usage pattern for creating and interacting with an SSH shell client and process controller. It shows how to instantiate the client, create a process controller, get stdout, start the process, and wait for its completion.

```go
client := genconn.MakeSSHShellClient(sshClient)
proc, _ := client.MakeProcessController(cmdSpec)
stdout, _ := proc.StdoutPipe()
proc.Start()
// Read from stdout...
proc.Wait()
```

--------------------------------

### Start Local Development Server

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/README.md

Run this command to start a local development server for the docs. Changes are usually reflected live without a server restart.

```sh
task docsite
```

--------------------------------

### Minimal 'Hello World' Example for Waveterm Block

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/view-prompt.md

A basic example demonstrating how to create a ViewModel and a ViewComponent for a simple 'Hello World' block using Jotai for state management.

```typescript
import * as jotai from "jotai";
import React from "react";

class HelloWorldModel implements ViewModel {
    viewType = "helloworld";
    viewIcon = jotai.atom("smile");
    viewName = jotai.atom("Hello World");
    viewText = jotai.atom("A simple greeting block");
    viewComponent = HelloWorldView;
}

const HelloWorldView: ViewComponent<HelloWorldModel> = ({ model }) => {
    return <div style={{ padding: "10px" }}>Hello, World!</div>;
};

export { HelloWorldModel };

```

--------------------------------

### Install Code Dependencies

Source: https://github.com/wavetermdev/waveterm/blob/main/BUILD.md

Loads project dependencies for the first time. Run this again if you encounter build issues.

```sh
task init
```

--------------------------------

### Create Message Request (JavaScript)

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/anthropic-messages-api.md

This JavaScript example shows how to create a message using the Anthropic SDK. Make sure to install the SDK and initialize the client.

```javascript
import { Anthropic } from '@anthropic-ai/sdk';

const anthropic = new Anthropic();

await anthropic.messages.create({
  model: "claude-sonnet-4-20250514",
  max_tokens: 1024,
  messages: [
    {"role": "user", "content": "Hello, world"}
  ]
});
```

--------------------------------

### Install Wave Term Beta via Snap

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/faq.mdx

Install the beta version of Wave Term on Linux using the snap package manager with the --beta flag.

```sh
sudo snap install waveterm --classic --beta
```

--------------------------------

### System Prompt Example

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/anthropic-messages-api.md

Example of a system prompt for defining the AI's role or goal. This can include specific instructions or context for the model's responses.

```yaml
system: "Today's date is 2024-06-01."
```

--------------------------------

### Tool Use Example: Get Stock Price

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/anthropic-messages-api.md

Demonstrates how the model might request to use a tool for fetching stock prices. The `get_stock_price` tool is defined with a `ticker` input.

```json
[
  {
    "type": "tool_use",
    "id": "toolu_01D7FLrfh4GYq7yT1ULFeyMV",
    "name": "get_stock_price",
    "input": { "ticker": "^GSPC" }
  }
]
```

--------------------------------

### Python SDK Streaming Example

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/anthropic-streaming.md

Example demonstrating how to stream messages using the Anthropic Python SDK.

```APIDOC
## Streaming with Python SDK

### Description
This example shows how to use the `client.messages.stream` method to receive streaming responses from the Anthropic API.

### Method
`client.messages.stream`

### Parameters
- `max_tokens` (int): The maximum number of tokens to generate.
- `messages` (list): A list of message objects representing the conversation history.
- `model` (str): The model to use for generation.

### Request Example
```python
import anthropic

client = anthropic.Anthropic()

with client.messages.stream(
    max_tokens=1024,
    messages=[{"role": "user", "content": "Hello"}],
    model="claude-opus-4-1-20250805",
) as stream:
    for text in stream.text_stream:
        print(text, end="", flush=True)
```

### Response
Streaming responses are received as a sequence of text chunks.
```

--------------------------------

### Install Wave Terminal with Homebrew (macOS)

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/gettingstarted.mdx

Use Homebrew to install the Wave Terminal application on macOS.

```bash
brew install --cask wave
```

--------------------------------

### Install Wave Terminal with Snap (Linux)

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/gettingstarted.mdx

Install Wave Terminal on Linux using the Snap package manager. This command requires sudo privileges.

```bash
sudo snap install --classic waveterm
```

--------------------------------

### Complete OpenAI Request Example

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/openai-request.md

A comprehensive example of an OpenAI API request input, including user message, function call, function call output, and assistant response.

```json
{
  "model": "gpt-4o",
  "input": [
    {
      "role": "user",
      "content": [
        {
          "type": "input_text",
          "text": "What files are in src/?"
        }
      ]
    },
    {
      "type": "function_call",
      "call_id": "call_xyz789",
      "name": "list_files",
      "arguments": "{\"path\":\"src/\"}"
    },
    {
      "type": "function_call_output",
      "call_id": "call_xyz789",
      "output": "main.go\nutil.go\nconfig.go"
    },
    {
      "role": "assistant",
      "content": [
        {
          "type": "output_text",
          "text": "The src/ directory contains 3 files: main.go, util.go, and config.go"
        }
      ]
    }
  ],
  "stream": true,
  "max_output_tokens": 4096
}
```

--------------------------------

### Install Wave Terminal with Chocolatey (Windows)

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/gettingstarted.mdx

Install Wave Terminal on Windows using the Chocolatey package manager.

```powershell
choco install wave
```

--------------------------------

### Install Wave Terminal with Windows Package Manager

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/gettingstarted.mdx

Install Wave Terminal on Windows using the Windows Package Manager (winget).

```powershell
winget install CommandLine.Wave
```

--------------------------------

### Full HTTP Stream Response Example

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/anthropic-streaming.md

Provides a complete example of an HTTP stream response from the Anthropic API, illustrating the sequence of events including message start, content blocks, deltas, and message stop.

```JSON
event: message_start
data: {"type": "message_start", "message": {"id": "msg_1nZdL29xx5MUA1yADyHTEsnR8uuvGzszyY", "type": "message", "role": "assistant", "content": [], "model": "claude-opus-4-1-20250805", "stop_reason": null, "stop_sequence": null, "usage": {"input_tokens": 25, "output_tokens": 1}}}

event: content_block_start
data: {"type": "content_block_start", "index": 0, "content_block": {"type": "text", "text": ""}}

event: ping
data: {"type": "ping"}

event: content_block_delta
data: {"type": "content_block_delta", "index": 0, "delta": {"type": "text_delta", "text": "Hello"}}

event: content_block_delta
data: {"type": "content_block_delta", "index": 0, "delta": {"type": "text_delta", "text": "!"}}

event: content_block_stop
data: {"type": "content_block_stop", "index": 0}

event: message_delta
data: {"type": "message_delta", "delta": {"stop_reason": "end_turn", "stop_sequence":null}, "usage": {"output_tokens": 15}}

event: message_stop
data: {"type": "message_stop"}
```

--------------------------------

### System Prompt Configuration

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/anthropic-messages-api.md

Defines the system prompt for guiding the model's behavior and role. It can include text examples and is crucial for setting the context of the conversation.

```APIDOC
## System Prompt

### Description
Guides the model's behavior and role. See our [guide to system prompts](https://docs.anthropic.com/en/docs/system-prompts).

### Examples
- text: Today's date is 2024-06-01.
  type: text
- Today's date is 2023-01-01.
```

--------------------------------

### Basic Context Menu Example

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/contextmenu.md

Creates a simple context menu with text labels, a separator, and click handlers for actions like creating new files or folders.

```typescript
const menu: ContextMenuItem[] = [
  {
    label: "New File",
    click: () => {
      /* create a new file */
    },
  },
  {
    label: "New Folder",
    click: () => {
      /* create a new folder */
    },
  },
  { type: "separator" },
  {
    label: "Rename",
    click: () => {
      /* rename item */
    },
  },
];

ContextMenuModel.showContextMenu(menu, e);
```

--------------------------------

### Start a Long-Running Build

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/durable-sessions.mdx

Use this command to initiate a build process that can continue even if you close your laptop or disconnect. Reconnect later to view the completed output.

```bash
# Start a long build
./build.sh

# Close your laptop, get coffee
# Later: reconnect and see the completed output
```

--------------------------------

### TypeScript SDK Streaming Example

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/anthropic-streaming.md

Example demonstrating how to stream messages using the Anthropic TypeScript SDK.

```APIDOC
## Streaming with TypeScript SDK

### Description
This example demonstrates how to stream messages using the Anthropic TypeScript SDK, handling text chunks via the `.on('text', ...)` event handler.

### Method
`client.messages.stream`

### Parameters
- `messages` (list): A list of message objects representing the conversation history.
- `model` (str): The model to use for generation.
- `max_tokens` (int): The maximum number of tokens to generate.

### Request Example
```typescript
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();

await client.messages.stream({
    messages: [{role: 'user', content: "Hello"}],
    model: 'claude-opus-4-1-20250805',
    max_tokens: 1024,
}).on('text', (text) => {
    console.log(text);
});
```

### Response
Streaming responses are processed via the `text` event, which provides chunks of generated text.
```

--------------------------------

### Start Step Part SSE Format

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/aisdk-streaming.md

A part indicating the start of a step. This is a Server-Sent Event with a JSON object payload.

```text
data: {"type":"start-step"}

```

--------------------------------

### OpenAI Code Interpreter Call Example

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/openai-streaming.md

Demonstrates a code interpreter call, showing the code to be executed and its output logs.

```json
{
  "type": "code_interpreter_call",
  "id": "code_abc123",
  "code": "print('Hello, world!')",
  "container_id": "container_123",
  "outputs": [
    {
      "type": "logs",
      "logs": "Hello, world!\n"
    }
  ]
}
```

--------------------------------

### Full AI Mode Configuration

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/waveai-modes.mdx

A comprehensive configuration example including all available fields for custom endpoints and advanced settings.

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

### Minimal AI Mode Configuration

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/waveai-modes.mdx

A basic configuration using a provider preset for quick setup.

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

### Background Image Configuration

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/tab-backgrounds.mdx

Example of configuring a tab background using an image, specifying its URL, size, and position.

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

### Example Bookmarks Configuration

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/config.mdx

This JSON object demonstrates how to configure multiple web bookmarks, including custom titles, display orders, and icon URLs. Bookmarks are sorted by 'display:order' or 'id'.

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

### Install Monaco Editor and Remove Loader

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/monaco-v0.53.md

Update dependencies by removing the Monaco editor loader and installing the new version of monaco-editor.

```bash
npm rm @monaco-editor/loader
npm i monaco-editor@^0.53
```

--------------------------------

### Send Prompt Start Command (A)

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/wave-osc-16162.md

Use this command in the 'precmd' hook to signal the start of a new shell prompt. It helps differentiate prompt output from command output.

```bash
printf '\033]16162;A\007'
```

--------------------------------

### Container Query Examples with Custom Breakpoints

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/tailwind-container-queries.md

Demonstrates min-width and max-width container queries using custom breakpoints like `@w600:` and `@max-w600:`, as well as smaller, specialized breakpoints such as `@xs:` and `@max-xxs:`. These are useful for responsive panel designs.

```html
<!-- Min-width (container >= 600px) -->
<div class="@w600:block @w600:h-full">

<!-- Max-width (container < 600px) -->
<div class="@max-w600:hidden @max-w600:fixed">

<!-- Smaller breakpoints -->
<div class="@xs:ml-4 @max-xxs:p-2">
```

--------------------------------

### Multiple Conversational Turns Example

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/anthropic-messages-api.md

Shows how to include multiple user and assistant turns for a more complex conversation history. This helps the model understand context.

```json
[
  {"role": "user", "content": "Hello there."},
  {"role": "assistant", "content": "Hi, I'm Claude. How can I help you?"},
  {"role": "user", "content": "Can you explain LLMs in plain English?"},
]
```

--------------------------------

### Get wsh Command Help

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh.mdx

Run wsh with no arguments to get a list of available commands, or use the -h flag with a specific command for detailed help.

```bash
wsh
```

```bash
wsh [command] -h
```

--------------------------------

### Streaming Tool Use Response Example

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/anthropic-streaming.md

This JSON represents a streamed response from the Anthropic API when tool use is involved. It shows the sequence of events, including message start, text deltas, and tool use input deltas, demonstrating fine-grained streaming for parameter values.

```json
event: message_start
data: {"type":"message_start","message":{"id":"msg_014p7gG3wDgGV9EUtLvnow3U","type":"message","role":"assistant","model":"claude-opus-4-1-20250805","stop_sequence":null,"usage":{"input_tokens":472,"output_tokens":2},"content":[],"stop_reason":null}}

event: content_block_start
data: {"type":"content_block_start","index":0,"content_block":{"type":"text","text":""}}

event: ping
data: {"type": "ping"}

event: content_block_delta
data: {"type":"content_block_delta","index":0,"delta":{"type":"text_delta","text":"Okay"}}

event: content_block_delta
data: {"type":"content_block_delta","index":0,"delta":{"type":"text_delta","text":","}}

event: content_block_delta
data: {"type":"content_block_delta","index":0,"delta":{"type":"text_delta","text":" let"}}

event: content_block_delta
data: {"type":"content_block_delta","index":0,"delta":{"type":"text_delta","text":"'s"}}

event: content_block_delta
data: {"type":"content_block_delta","index":0,"delta":{"type":"text_delta","text":" check"}}

event: content_block_delta
data: {"type":"content_block_delta","index":0,"delta":{"type":"text_delta","text":" the"}}

event: content_block_delta
data: {"type":"content_block_delta","index":0,"delta":{"type":"text_delta","text":" weather"}}

event: content_block_delta
data: {"type":"content_block_delta","index":0,"delta":{"type":"text_delta","text":" for"}}

event: content_block_delta
data: {"type":"content_block_delta","index":0,"delta":{"type":"text_delta","text":" San"}}

event: content_block_delta
data: {"type":"content_block_delta","index":0,"delta":{"type":"text_delta","text":" Francisco"}}

event: content_block_delta
data: {"type":"content_block_delta","index":0,"delta":{"type":"text_delta","text":","}}

event: content_block_delta
data: {"type":"content_block_delta","index":0,"delta":{"type":"text_delta","text":" CA"}}

event: content_block_delta
data: {"type":"content_block_delta","index":0,"delta":{"type":"text_delta","text":":"}}

event: content_block_stop
data: {"type":"content_block_stop","index":0}

event: content_block_start
data: {"type":"content_block_start","index":1,"content_block":{"type":"tool_use","id":"toolu_01T1x1fJ34qAmk2tNTrN7Up6","name":"get_weather","input":{}}}

event: content_block_delta
data: {"type":"content_block_delta","index":1,"delta":{"type":"input_json_delta","partial_json":""}}

event: content_block_delta
data: {"type":"content_block_delta","index":1,"delta":{"type":"input_json_delta","partial_json":" {\"location\":"}}

event: content_block_delta
data: {"type":"content_block_delta","index":1,"delta":{"type":"input_json_delta","partial_json":" \"San"}}
```

--------------------------------

### Tool Definition: Get Weather

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/anthropic-messages-api.md

An example schema for defining a `get_weather` tool. It specifies required inputs like `location` and optional inputs like `unit`.

```json
{
  "name": "get_weather",
  "input_schema": {
    "properties": {
      "location": {
        "description": "The city and state, e.g. San Francisco, CA",
        "type": "string"
      },
      "unit": {
        "description": ">- Unit for the output - one of (celsius, fahrenheit)",
        "type": "string"
      }
    },
    "required": [
      "location"
    ],
    "type": "object"
  }
}
```

--------------------------------

### Automate Development Environment Setup with wsh

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh.mdx

Use wsh commands in a bash script to set up a development environment, open a web interface, view files, and run tests. This script also demonstrates using wsh notify to monitor long-running build tasks.

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

### OpenAI Image Generation Call Example

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/openai-streaming.md

An example of an image generation call, indicating the ID and the URL of the generated image.

```json
{
  "type": "image_generation_call",
  "id": "img_abc123",
  "result": "https://example.com/generated-image.png"
}
```

--------------------------------

### Subscribe with Wildcard Scopes

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/wps-events.md

Scopes support wildcard matching using `*` for a single segment and `**` for multiple segments. This example subscribes to all workspace events.

```go
wps.Broker.Subscribe(routeId, wps.SubscriptionRequest{
    Event:  wps.Event_WaveObjUpdate,
    Scopes: []string{"workspace:*"},
})
```

--------------------------------

### YouTube Web Widget Example

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/customwidgets.mdx

Configures a web widget that defaults to the YouTube homepage and uses YouTube as its home page. This is useful for quick access to frequently visited sites.

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

--------------------------------

### Handle `response.created` Event

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/openai-streaming-text.md

Use this event to initialize response tracking. It signals the start of a new response.

```json
{
  "type": "response.created",
  "response": {
    "id": "resp_abc123",
    "created_at": 1640995200,
    "model": "gpt-5"
  }
}
```

--------------------------------

### OpenAI Computer Use Call Example

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/openai-streaming.md

Represents a computer use call, showing its ID and completion status.

```json
{
  "type": "computer_call",
  "id": "computer_abc123",
  "status": "completed"
}
```

--------------------------------

### SSH Authentication: Password Callback Prompt

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/conn-arch.md

Callback function for handling password authentication prompts during SSH connection setup.

```go
createPasswordCallbackPrompt()
```

--------------------------------

### Single User Message Example

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/anthropic-messages-api.md

Demonstrates sending a single user message to the API. This is a basic format for initiating a conversation.

```json
[{"role": "user", "content": "Hello, Claude"}]
```

--------------------------------

### Get Terminal Scrollback with wsh termscrollback

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

Retrieve terminal scrollback using `wsh termscrollback`. Specify a target block with `-b`, line ranges with `--start` and `--end`, or get only the last command's output with `--lastcommand`. Output can be redirected to a file with `-o`.

```sh
wsh termscrollback
```

```sh
wsh termscrollback -b 2
```

```sh
wsh termscrollback --lastcommand
```

--------------------------------

### Lazy Load Monaco Editor

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/monaco-v0.53.md

Import the Monaco setup module lazily where the editor UI is mounted to keep the main bundle slim.

```typescript
// where the editor UI mounts
const { monaco } = await import("./monaco-setup");
const editor = monaco.editor.create(container, { language: "javascript", value: "" });
```

--------------------------------

### Example SSH Config Host

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/connections.mdx

Demonstrates a typical SSH host configuration block. This format can be used to define connection parameters for a specific host.

```ssh-config
Host myhost
   User username
   HostName 203.0.113.254
   IdentityFile ~/.ssh/id_rsa
   AddKeysToAgent yes
```

--------------------------------

### Simple Solid Color Background

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/tab-backgrounds.mdx

Example of a basic tab background configuration using a solid color with specified opacity and active border color.

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

### Start Command in Paused State

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

Initiates a command in a paused state, allowing for review before execution.

```sh
# Start a command in paused state
wsh run -p -- ./server --dev
```

--------------------------------

### Tool Input Start Part SSE Format

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/aisdk-streaming.md

Indicates the beginning of tool input streaming. This is a Server-Sent Event with a JSON object payload.

```text
data: {"type":"tool-input-start","toolCallId":"call_fJdQDqnXeGxTmr4E3YPSR7Ar","toolName":"getWeatherInformation"}

```

--------------------------------

### Tool Definition Example

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/anthropic-messages-api.md

Defines a tool that the model may use, including its name, an optional description, and a JSON schema for its input.

```json
[
  {
    "name": "get_stock_price",
    "description": "Get the current stock price for a given ticker symbol.",
    "input_schema": {
      "type": "object",
      "properties": {
        "symbol": {
          "type": "string",
          "description": "The stock ticker symbol (e.g., AAPL)."
        }
      },
      "required": ["symbol"]
    }
  }
]
```

--------------------------------

### Reasoning Start Part SSE Format

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/aisdk-streaming.md

Indicates the beginning of a reasoning block. This is a Server-Sent Event with a JSON object payload.

```text
data: {"type":"reasoning-start","id":"reasoning_123"}

```

--------------------------------

### Development Workflow with wsh view and wsh run

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh.mdx

Streamline your development process by using wsh view to open files and wsh run to start development servers. Use the -m flag to open blocks in magnified mode.

```bash
# Open directory or markdown files
wsh view .
wsh view README.md
```

```bash
# add a -m to open the block in "magnified" mode
wsh view -m README.md
```

```bash
# Start development server in a new block (-m will magnify the block on startup)
wsh run -m -- npm run dev
```

```bash
# Open documentation in a web block
wsh web open http://localhost:3000
```

--------------------------------

### Build Static Documentation Site

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/README.md

Execute this command to generate the static content for the documentation site into the 'build' directory. This output can be hosted on any static hosting service.

```sh
task docsite:build:public
```

--------------------------------

### Start new chat with wsh ai

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

Use the `-n` flag with `wsh ai` to clear the current chat history and start a new conversation, attaching specified files.

```bash
wsh ai -n report.pdf data.csv -m "summarize these reports"
```

--------------------------------

### wavepath

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

Get paths to Wave Terminal directories and files.

```APIDOC
## wsh wavepath

### Description
The `wavepath` command lets you get the paths to various Wave Terminal directories and files, including configuration, data storage, and logs.

### Usage
```sh
wsh wavepath {config|data|log}
```

This command returns the full path to the requested Wave Terminal system directory or file. It's useful for accessing Wave's configuration files, data storage, or checking logs.

### Flags
- `-o, --open`: Open the path in a new block.
- `-O, --open-external`: Open the path in the default external application.
- `-t, --tail`: Show the last ~100 lines of the log file (only valid for log path).

### Examples
```sh
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

### Paths
- `config`: Where Wave Terminal stores its configuration files.
- `data`: Where Wave Terminal stores its persistent data.
- `log`: The main Wave Terminal log file.

:::tip
Use the `-t` flag with the log path to quickly view recent log entries without having to open the full file. This is particularly useful for troubleshooting.
:::
```

--------------------------------

### Thinking Delta Event Example

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/anthropic-streaming.md

Illustrates the structure of a `thinking_delta` event received during streaming, which contains intermediate reasoning steps.

```JSON
event: content_block_delta
data: {"type": "content_block_delta", "index": 0, "delta": {"type": "thinking_delta", "thinking": "Let me solve this step by step:\n\n1. First break down 27 * 453"}}
```

--------------------------------

### Define Bookmark Structure

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/config.mdx

Each bookmark requires a URL and can optionally include a title, custom icon URL, and display order. The 'id' should start with 'bookmark@'.

```json
{
  "url": "https://example.com",
  "title": "Example Site",
  "iconurl": "https://example.com/custom-icon.png",
  "display:order": 1
}
```

--------------------------------

### Text Start Part SSE Format

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/aisdk-streaming.md

Indicates the beginning of a text block. This is a Server-Sent Event with a JSON object payload.

```text
data: {"type":"text-start","id":"msg_68679a454370819ca74c8eb3d04379630dd1afb72306ca5d"}

```

--------------------------------

### Tool Use Example: Respond with Tool Result

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/anthropic-messages-api.md

Shows how to send the result of a tool execution back to the model. The `tool_use_id` links the result to the original request.

```json
[
  {
    "type": "tool_result",
    "tool_use_id": "toolu_01D7FLrfh4GYq7yT1ULFeyMV",
    "content": "259.75 USD"
  }
]
```

--------------------------------

### Get File Information

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

Displays information about a file, including size, creation time, modification time, and metadata, for local or remote files.

```sh
wsh file info [file-uri]
```

```sh
wsh file info wsh://user@ec2/home/user/config.txt
```

```sh
wsh file info ./local-config.txt
```

--------------------------------

### Signature Delta Event Example

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/anthropic-streaming.md

Shows the format of a `signature_delta` event, which is sent before `content_block_stop` to verify the integrity of thinking content.

```JSON
event: content_block_delta
data: {"type": "content_block_delta", "index": 0, "delta": {"type": "signature_delta", "signature": "EqQBCgIYAhIM1gbcDa9GJwZA2b3hGgxBdjrkzLoky3dl1pkiMOYds..."}}
```

--------------------------------

### Get Connection Status Atom

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/fe-conn-arch.md

Use connection atoms to get the current connection status. This atom depends on the block's connection metadata.

```typescript
connStatus = atom((get) => {
    const blockData = get(this.blockAtom)
    const connName = blockData?.meta?.connection
    return get(getConnStatusAtom(connName))
})
```

--------------------------------

### Message Start Part SSE Format

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/aisdk-streaming.md

Indicates the beginning of a new message with metadata. This is a Server-Sent Event with a JSON object payload.

```text
data: {"type":"start","messageId":"..."}

```

--------------------------------

### OpenAI File Search Call Example

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/openai-streaming.md

Represents a file search operation performed by the OpenAI API, including queries and search results.

```json
{
  "type": "file_search_call",
  "id": "search_abc123",
  "queries": ["OpenAI pricing", "API limits"],
  "results": [
    {
      "attributes": {},
      "file_id": "file_abc123",
      "filename": "pricing.pdf",
      "score": 0.85,
      "text": "OpenAI API pricing starts at..."
    }
  ]
}
```

--------------------------------

### Edit Config File Context Menu Item

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/contextmenu.md

An example context menu item that opens a specific configuration file (e.g., widgets.json) in preview mode using fireAndForget and createBlock.

```typescript
{
    label: "Edit widgets.json",
    click: () => {
        fireAndForget(async () => {
            const path = `${getApi().getConfigDir()}/widgets.json`;
            const blockDef: BlockDef = { meta: { view: "preview", file: path } };
            await createBlock(blockDef, false, true);
        });
    },
}
```

--------------------------------

### StepStartUIPart Type

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/aisdk-uimessage-type.md

Represents the start of a step in a UI message. This type is used to delineate steps within a larger message flow.

```APIDOC
## Type: StepStartUIPart

### Description
A step boundary part of a message.

### Type Definition
```typescript
type StepStartUIPart = {
  type: "step-start";
};
```
```

--------------------------------

### read_file AI Tool for Document Reference

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/tsunami-builder.md

Enables the AI to read user-provided documentation or examples from specified file paths. This is useful for referencing custom specs or existing code.

```json
{
  "tool": "read_file",
  "args": {
    "path": "/docs/api-spec.md"
  }
}
```

--------------------------------

### Queueing Backend Layout Actions

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/layout-simplification.md

Illustrates how layout actions are queued for the backend using `QueueLayoutAction()` in the current implementation.

```go
QueueLayoutAction()
```

--------------------------------

### CLI Commands for Setting Configuration

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/config-system.md

Shell commands demonstrating how to set configuration values using the `wsh` tool, including global settings and block-specific metadata overrides.

```bash
# Set globally
wsh setconfig term:bellsound="custom.wav"

# Set for current block only
wsh setmeta term:bellsound="none"

# Set for specific block
wsh setmeta --block BLOCK_ID term:bellsound="beep"

```

--------------------------------

### Create Message Request (Python)

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/anthropic-messages-api.md

This Python snippet demonstrates how to use the Anthropic SDK to create a message. Ensure the SDK is installed and your API key is configured.

```python
import anthropic

anthropic.Anthropic().messages.create(
    model="claude-sonnet-4-20250514",
    max_tokens=1024,
    messages=[
        {"role": "user", "content": "Hello, world"}
    ]
)
```

--------------------------------

### Block Click Handler Setup

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/focus.md

Defines the click and focus capture handlers for a block component. `onFocusCapture` is used for immediate visual focus updates.

```typescript
const blockModel: BlockComponentModel2 = {
    onClick: setBlockClickedTrue,
    onFocusCapture: handleChildFocus,
    blockRef: blockRef,
};
```

--------------------------------

### Define a Custom Terminal Theme

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/config.mdx

Example of a full terminal theme definition in JSON format. Includes display properties and ANSI color codes.

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

### Define Speedtest-Go Command Widget

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/customwidgets.mdx

Create a widget to run the 'speedtest-go --unix' command. 'cmd:clearonstart' clears previous output each time the command is executed.

```json
{
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
    }
}
```

--------------------------------

### Streaming Response with Extended Thinking Events

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/anthropic-streaming.md

This JSON represents the stream of events received when requesting a response with extended thinking enabled. It includes message start, content block starts and deltas for both thinking and text, and message stop events.

```json
event: message_start
data: {"type": "message_start", "message": {"id": "msg_01...", "type": "message", "role": "assistant", "content": [], "model": "claude-opus-4-1-20250805", "stop_reason": null, "stop_sequence": null}}

event: content_block_start
data: {"type": "content_block_start", "index": 0, "content_block": {"type": "thinking", "thinking": ""}}

event: content_block_delta
data: {"type": "content_block_delta", "index": 0, "delta": {"type": "thinking_delta", "thinking": "Let me solve this step by step:\n\n1. First break down 27 * 453"}}

event: content_block_delta
data: {"type": "content_block_delta", "index": 0, "delta": {"type": "thinking_delta", "thinking": "\n2. 453 = 400 + 50 + 3"}}

event: content_block_delta
data: {"type": "content_block_delta", "index": 0, "delta": {"type": "thinking_delta", "thinking": "\n3. 27 * 400 = 10,800"}}

event: content_block_delta
data: {"type": "content_block_delta", "index": 0, "delta": {"type": "thinking_delta", "thinking": "\n4. 27 * 50 = 1,350"}}

event: content_block_delta
data: {"type": "content_block_delta", "index": 0, "delta": {"type": "thinking_delta", "thinking": "\n5. 27 * 3 = 81"}}

event: content_block_delta
data: {"type": "content_block_delta", "index": 0, "delta": {"type": "thinking_delta", "thinking": "\n6. 10,800 + 1,350 + 81 = 12,231"}}

event: content_block_delta
data: {"type": "content_block_delta", "index": 0, "delta": {"type": "signature_delta", "signature": "EqQBCgIYAhIM1gbcDa9GJwZA2b3hGgxBdjrkzLoky3dl1pkiMOYds..."}}

event: content_block_stop
data: {"type": "content_block_stop", "index": 0}

event: content_block_start
data: {"type": "content_block_start", "index": 1, "content_block": {"type": "text", "text": ""}}

event: content_block_delta
data: {"type": "content_block_delta", "index": 1, "delta": {"type": "text_delta", "text": "27 * 453 = 12,231"}}

event: content_block_stop
data: {"type": "content_block_stop", "index": 1}

event: message_delta
data: {"type": "message_delta", "delta": {"stop_reason": "end_turn", "stop_sequence": null}}

event: message_stop
data: {"type": "message_stop"}
```

--------------------------------

### Frontend Configuration Patterns

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/config-system.md

Demonstrates recommended patterns for accessing settings in frontend code, including settings with block-level overrides, global-only settings, and connection-specific settings.

```typescript
// 1. Settings with block-level overrides (recommended)
const termFontSize = useAtomValue(getOverrideConfigAtom(blockId, "term:fontsize")) ?? 12;

// 2. Global-only settings
const appGlobalHotkey = useAtomValue(getSettingsKeyAtom("app:globalhotkey")) ?? "";

// 3. Connection-specific settings
const connStatus = useAtomValue(getConnStatusAtom(connectionName));

```

--------------------------------

### secret get

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

Retrieve and display the value of a stored secret.

```APIDOC
## wsh secret get

### Description
Retrieve and display the value of a stored secret.

### Usage
```sh
wsh secret get [name]
```

### Examples
```sh
# Get an API key
wsh secret get github_token

# Use in scripts
export API_KEY=$(wsh secret get my_api_key)
```
```

--------------------------------

### Open Wave Configuration Editor

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/config.mdx

Use this command to open the Wave configuration file in the built-in preview editor for easy editing.

```bash
wsh editconfig
```

--------------------------------

### Stream Weather Tool Use with Python

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/anthropic-streaming.md

Use the Anthropic Python SDK to make a streaming request for weather information, enabling tool use. This example demonstrates setting up the client, defining tools, and iterating through the streamed response.

```python
import anthropic

client = anthropic.Anthropic()

tools = [
    {
        "name": "get_weather",
        "description": "Get the current weather in a given location",
        "input_schema": {
            "type": "object",
            "properties": {
                "location": {
                    "type": "string",
                    "description": "The city and state, e.g. San Francisco, CA"
                }
            },
            "required": ["location"]
        }
    }
]

with client.messages.stream(
    model="claude-opus-4-1-20250805",
    max_tokens=1024,
    tools=tools,
    tool_choice={"type": "any"},
    messages=[
        {
            "role": "user",
            "content": "What is the weather like in San Francisco?"
        }
    ],
) as stream:
    for text in stream.text_stream:
        print(text, end="", flush=True)
```

--------------------------------

### Run Development Server

Source: https://github.com/wavetermdev/waveterm/blob/main/BUILD.md

Builds the app and runs it with Vite's development server, enabling Hot Module Reloading.

```sh
task dev
```

--------------------------------

### Add All CPU Data Sysinfo Widget

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/customwidgets.mdx

Configure a custom widget to display all available CPU data. This widget defaults to 100 seconds of data.

```json
{
    "all-cpu" : {
        "icon": "chart-scatter",
        "label": "all-cpu",
        "blockdef": {
            "meta": {
                "view": "sysinfo",
                "sysinfo:type": "All CPU"
            }
        }
    }
}
```

--------------------------------

### Triggering Writes in Layout State

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/layout-simplification.md

Shows an example of how `layoutState.generation++` is used to trigger atom writes in the current system, a pattern that will be eliminated with the write cache.

```typescript
layoutState.generation++
```

--------------------------------

### WslListCommand RPC Interface

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/fe-conn-arch.md

RPC command to retrieve a list of installed WSL distribution names. This command is Windows-specific and formats names as `wsl://[distro]`.

```typescript
WslListCommand(client: RpcClient): Promise<string[]>
```

--------------------------------

### Define Terminal Setting in Go Struct

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/config-system.md

Example of adding a new setting field `TermBellSound` to the `SettingsType` struct in Go, with JSON tagging for configuration mapping.

```go
type SettingsType struct {
    // ... existing fields ...
    TermBellSound string `json:"term:bellsound,omitempty"`
}

```

--------------------------------

### Read a Configuration Value

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/getsetconfigvar.md

Retrieve a configuration value by getting its atom with getSettingsKeyAtom and then accessing its current value via globalStore.get. A fallback value can be provided.

```typescript
const configAtom = getSettingsKeyAtom("app:defaultnewblock");
const configValue = globalStore.get(configAtom) ?? "default value";
```

--------------------------------

### Check Connection Status

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

Displays the status of all active connections since Wave Term started. Useful for monitoring connection health.

```sh
wsh conn status
```

--------------------------------

### Get Wave Terminal Directory Paths

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

Retrieve the full path to Wave Terminal's configuration, data, or log directories. Use the `-o` flag to open in a new block or `-O` to open externally.

```sh
wsh wavepath config
```

```sh
wsh wavepath data
```

```sh
wsh wavepath log
```

```sh
wsh wavepath -o log
```

```sh
wsh wavepath -O config
```

--------------------------------

### Define StepStartUIPart Type

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/aisdk-uimessage-type.md

Defines the TypeScript type for a step start UI part. Use this when initiating a new step in a UI message sequence.

```typescript
type StepStartUIPart = {
  type: "step-start";
};
```

--------------------------------

### AI-Assisted Development with wsh ai

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh.mdx

Leverage the `wsh ai` command to send code, output, or files to the Wave AI sidebar for analysis or debugging. Use flags like `-m` for messages, `-s` to auto-submit, and `-n` to start a new chat.

```bash
# Pipe output to AI sidebar (ask question in UI)
git diff | wsh ai -
```

```bash
# Attach files with a message
wsh ai main.go utils.go -m "find bugs in these files"
```

```bash
# Auto-submit with message
wsh ai config.json -s -m "explain this config"
```

```bash
# Start new chat with attached files
wsh ai -n *.log -m "analyze these logs"
```

```bash
# Attach multiple file types (images, PDFs, code)
wsh ai screenshot.png report.pdf app.py -m "review these"
```

```bash
# Debug with stdin and auto-submit
dmesg | wsh ai -s - -m "help me understand these errors"
```

--------------------------------

### Example Error Event

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/anthropic-streaming.md

This JSON structure represents an error event that might be sent over the SSE stream, such as an 'overloaded_error' during high usage periods.

```json
event: error
data: {"type": "error", "error": {"type": "overloaded_error", "message": "Overloaded"}}
```

--------------------------------

### URL-based Configuration for AI Chat API

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/usechat-backend-design.md

Shows examples of how to configure the AI chat API endpoint using URL query parameters to specify presets. This allows for different AI models or configurations to be selected for different blocks.

```plaintext
POST /api/ai/chat/block-123?preset=claude-coding
POST /api/ai/chat/block-456?preset=gpt4-creative
```

--------------------------------

### Set Default Values

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/config-system.md

Provide default values for new settings in `pkg/wconfig/defaultconfig/settings.json`. Only include defaults for settings that require a non-empty initial value.

```json
{
  "ai:preset": "ai@global",
  "ai:model": "gpt-5-mini",
  // ... existing defaults ...

  "mynew:setting": "default value",
  "mynew:boolsetting": true,
  "mynew:numbersetting": 42.5,
  "mynew:intsetting": 100
}
```

--------------------------------

### Define Block Metadata for Terminal Setting

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/config-system.md

Example of adding a pointer field `TermBellSound` to the `MetaTSType` struct in Go, enabling optional block-level overrides for the terminal bell sound setting.

```go
type MetaTSType struct {
    // ... existing fields ...
    TermBellSound *string `json:"term:bellsound,omitempty"`  // Pointer for optional override
}

```

--------------------------------

### Response Incomplete Event

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/openai-streaming.md

Emitted when a response is incomplete, for example, due to reaching length limits. Includes incomplete details and usage.

```json
{
  "type": "response.incomplete",
  "response": {
    "incomplete_details": {
      "reason": "max_tokens"
    },
    "usage": {
      "input_tokens": 100,
      "output_tokens": 4000
    }
  }
}
```

--------------------------------

### Package Application

Source: https://github.com/wavetermdev/waveterm/blob/main/BUILD.md

Generates a production build and packages the application. Artifacts are placed in the 'make/' directory.

```sh
task package
```

--------------------------------

### Publish Basic Event

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/wps-events.md

Publish a WaveEvent using the global wps.Broker. Ensure the wps package is imported.

```go
import "github.com/wavetermdev/waveterm/pkg/wps"

wps.Broker.Publish(wps.WaveEvent{
    Event: wps.Event_YourNewEvent,
    Data:  yourData,
})
```

--------------------------------

### Text Component Structure

Source: https://github.com/wavetermdev/waveterm/blob/main/tsunami/engine/render.md

Defines the structure for text components (Pattern 1), used for leaf nodes rendering string content directly. Example: `vdom.H("#text", nil, "Hello World")`.

```go
Text string                    // Text content (Pattern 1: text nodes only)
Children = nil                 // Not used
RenderedComp = nil            // Not used
```

--------------------------------

### Get Terminal Scrollback with wsh

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

The `wsh termscrollback` command retrieves the terminal scrollback from a terminal block, allowing for capturing output.

```APIDOC
## wsh termscrollback

### Description
Get the terminal scrollback from a terminal block. This is useful for capturing terminal output for processing or archiving.

### Usage
```sh
wsh termscrollback [-b blockid] [flags]
```

### Flags
- `-b, --block <blockid>`: Specify target terminal block (default: current block).
- `--start <line>`: Starting line number (0 = beginning, default: 0).
- `--end <line>`: Ending line number (0 = all lines, default: 0).
- `--lastcommand`: Get output of last command (requires shell integration).
- `-o, --output <file>`: Write output to file instead of stdout.

### Examples
```sh
# Get all scrollback from current terminal
wsh termscrollback

# Get scrollback from a specific terminal block
wsh termscrollback -b 2

# Get only the last command's output
wsh termscrollback --lastcommand
```
```

--------------------------------

### Tsunami Builder Compilation Pipeline Steps

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/tsunami-builder.md

Outlines the sequence of operations performed after any code change, including writing the file, building, and updating the preview. Handles both success and failure scenarios.

```plaintext
1. Write app.go to disk
2. Run: go build app.go
3. Show build output in build panel
4. If success:
   - Start/restart app process
   - Update preview iframe
   - Show success message in build panel
5. If failure:
   - Parse error output (line numbers, messages)
   - Show error in build panel (bottom of right side)
   - Inject into AI context for next turn
```

--------------------------------

### Request Body Options for AI Chat Configuration

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/usechat-backend-design.md

Provides an example of configuring AI chat parameters such as model, temperature, and max tokens directly within the JSON request body. This offers a structured way to manage AI settings.

```json
{
  "messages": [...],
  "options": {
    "model": "claude-3-sonnet",
    "temperature": 0.7,
    "maxTokens": 2000
  }
}
```

--------------------------------

### Example Input JSON Delta for Tool Use

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/anthropic-streaming.md

This 'content_block_delta' event with an 'input_json_delta' type represents partial JSON updates for the 'input' field of a 'tool_use' content block. Accumulate these deltas to reconstruct the full JSON input.

```json
event: content_block_delta
data: {"type": "content_block_delta","index": 1,"delta": {"type": "input_json_delta","partial_json": "{\"location\": \"San Fra"}}}
```

--------------------------------

### Custom Component Structure

Source: https://github.com/wavetermdev/waveterm/blob/main/tsunami/engine/render.md

Defines the structure for custom components (Pattern 3), used for user-defined components that transform into other components. Example: A `TodoItem` component renders to a `div`.

```go
Text = ""                      // Not used
Children = nil                 // Not used
RenderedComp *ComponentImpl   // Rendered output (Pattern 3: custom components only)
```

--------------------------------

### web_search AI Tool for Research

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/tsunami-builder.md

Allows the AI to perform web searches for APIs, documentation, and examples. This is implemented via the AI provider's backend.

```json
{
  "tool": "web_search",
  "args": {
    "query": "Tsunami framework documentation"
  }
}
```

--------------------------------

### Get Stored Secret Value

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

Retrieve and display the value of a securely stored secret. Can be used to export secrets into environment variables for scripts.

```sh
wsh secret get github_token
```

```sh
export API_KEY=$(wsh secret get my_api_key)
```

--------------------------------

### Manage Secrets via CLI

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/secrets.mdx

Perform common secret management operations like listing, getting, setting, and deleting secrets using the Wave Terminal CLI.

```bash
# List all secret names (not values)
wsh secret list
```

```bash
# Get a specific secret value
wsh secret get MY_SECRET_NAME
```

```bash
# Set a secret (format: name=value, no spaces around =)
wsh secret set GITHUB_TOKEN=ghp_xxxxxxxxxx
wsh secret set DB_PASSWORD=super_secure_password
```

```bash
# Delete a secret
wsh secret delete MY_SECRET_NAME
```

--------------------------------

### Bidirectional Atom Initialization

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/layout-simplification.md

Demonstrates the complex read/write logic involved in initializing bidirectional atoms, as seen in `withLayoutTreeStateAtomFromTab()`.

```typescript
withLayoutTreeStateAtomFromTab()
```

--------------------------------

### Preview Tab Background Metadata

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/customization.mdx

Use the `--print` flag with `wsh setbg` to preview the metadata for a background without applying it.

```bash
wsh setbg --print "#ff0000"
```

--------------------------------

### Set Global Hotkey with Modifier Keys

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/config.mdx

Combine modifier keys like Ctrl, Option, and a letter key by separating them with colons. For example, `"Ctrl:Option:e"` sets Ctrl+Option+e as the global hotkey. This requires a Wave reboot to apply.

```json
"app:globalhotkey": "Ctrl:Option:e"
```

--------------------------------

### Jotai Reference Equality Example

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/layout-simplification.md

Illustrates how Jotai detects changes using reference equality. Even though nested objects might remain the same, creating a new top-level object reference triggers Jotai's update mechanism.

```javascript
const oldState = { rootNode: someTree, focusedNodeId: "node1" };
const newState = { ...oldState };

oldState === newState        // FALSE - different objects!
oldState.rootNode === newState.rootNode  // TRUE - same tree reference

// But Jotai only checks the first comparison, so it detects the change!
```

--------------------------------

### Configure LM Studio for WaveAI

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/waveai-modes.mdx

Use this JSON structure to connect to a local LM Studio server instance.

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

--------------------------------

### Edit Configuration with wsh

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/tab-backgrounds.mdx

Launch the configuration editor for backgrounds.json using the wsh command-line tool.

```bash
wsh editconfig backgrounds.json
```

--------------------------------

### Base/DOM Element Component Structure

Source: https://github.com/wavetermdev/waveterm/blob/main/tsunami/engine/render.md

Defines the structure for base/DOM elements (Pattern 2), used for containers that render multiple children. Example: `vdom.H("div", nil, child1, child2)`.

```go
Text = ""                      // Not used
Children []*ComponentImpl      // Child components (Pattern 2: containers only)
RenderedComp = nil            // Not used
```

--------------------------------

### Get Specific Line Range from Scrollback

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

Retrieve a specific range of lines from the terminal scrollback buffer. Useful for capturing precise output sections.

```sh
wsh termscrollback --start 100 --end 200
```

--------------------------------

### Restart Block Controller

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/fe-conn-arch.md

Restarts a block's controller. The backend verifies the connection status before starting and triggers a connection if necessary. Accepts an optional force parameter.

```typescript
ControllerRestartCommand(
    client: RpcClient,
    data: { blockid: string, force?: boolean }
): Promise<void>
```

--------------------------------

### Example Text Content Block Delta

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/anthropic-streaming.md

A 'content_block_delta' event with a 'text_delta' type shows incremental text updates for a content block. The 'index' specifies which content block is being updated.

```json
event: content_block_delta
data: {"type": "content_block_delta","index": 0,"delta": {"type": "text_delta", "text": "ello frien"}}
```

--------------------------------

### Basic Streaming Request with Python SDK

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/anthropic-streaming.md

Shows how to initiate a streaming request using the Anthropic Python client SDK. This approach simplifies handling the stream compared to direct HTTP requests.

```Python
import anthropic

client = anthropic.Anthropic()

with client.messages.stream(
    model="claude-opus-4-1-20250805",
    messages=[{"role": "user", "content": "Hello"}],
    max_tokens=256,
) as stream:
    for text in stream.text_stream:
        print(text, end="", flush=True)
```

--------------------------------

### Current vs Target Architecture Comparison

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/usechat-backend-design.md

Highlights the differences between the existing complex RPC architecture and the proposed simpler HTTP/SSE architecture for AI chat.

```markdown
Current Architecture
```
Frontend (React) → Custom RPC → Go Backend → AI Providers
- 10+ Jotai atoms for state management
- Custom WaveAIStreamRequest/WaveAIPacketType
- Complex configuration merging in frontend
- Custom streaming protocol over WebSocket
```
```

```markdown
Target Architecture
```
Frontend (useChat) → HTTP/SSE → Go Backend → AI Providers
- Single useChat() hook manages all state
- Standard HTTP POST + SSE streaming
- Backend-driven configuration resolution
- Standard AI SDK streaming format
```
```

--------------------------------

### Get Persistent Variables with wsh

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

The `wsh getvar` command retrieves the value of a persistent variable. It supports retrieving variables from different scopes and listing all variables.

```APIDOC
## wsh getvar

### Description
Get the value of a variable. Returns exit code 0 if the variable exists, 1 if it doesn't. This allows for shell scripting.

### Usage
```sh
wsh getvar [flags] [key]
```

### Examples
```sh
# Check if a variable exists
if wsh getvar API_KEY >/dev/null; then
    echo "API key is set"
fi

# Use a variable in a command
curl -H "Authorization: $(wsh getvar API_KEY)" https://api.example.com

# Get a block-local variable
wsh getvar -l BLOCK_SPECIFIC

# List all variables
wsh getvar --all

# List all variables with null terminators (for scripting)
wsh getvar --all -0
```

### Flags
- `-l, --local`: Get variables local to the current block.
- `--all`: List all variables.
- `-0, --null`: Use null terminators in output instead of newlines.
- `--varfile string`: Use a different variable file (default "var").

Variables can be accessed at different scopes using the `-b` flag:
```sh
# Get/set at block level
wsh getvar -b block MYVAR
wsh setvar -b block MYVAR=value

# Get/set at tab level
wsh getvar -b tab MYVAR
wsh setvar -b tab MYVAR=value

# Get/set at workspace level
wsh getvar -b workspace MYVAR
wsh setvar -b workspace MYVAR=value

# Get/set at client (global) level
wsh getvar -b client MYVAR
wsh setvar -b client MYVAR=value
```
```

--------------------------------

### Create Message

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/anthropic-messages-api.md

This endpoint allows you to send a prompt to the Anthropic API and receive a text response. You can configure parameters such as the model, maximum tokens, and message history to guide the generation.

```APIDOC
## POST /v1/messages

### Description
Sends a prompt to the Anthropic API to generate a text response.

### Method
POST

### Endpoint
/v1/messages

### Parameters
#### Request Body
- **model** (string) - Required - The model to use for generation (e.g., "claude-sonnet-4-20250514").
- **messages** (array) - Required - An array of message objects representing the conversation history.
  - **role** (string) - Required - The role of the message sender (e.g., "user", "assistant").
  - **content** (string) - Required - The content of the message.
- **max_tokens** (integer) - Required - The maximum number of tokens to generate in the response.
- **temperature** (number) - Optional - Controls randomness. Lower values make output more deterministic. Use either `temperature` or `top_p`, not both.
- **top_p** (number) - Optional - Nucleus sampling parameter. Use either `temperature` or `top_p`, not both.

### Request Example
```json
{
  "model": "claude-sonnet-4-20250514",
  "max_tokens": 1024,
  "messages": [
    {"role": "user", "content": "Hello, world"}
  ]
}
```

### Response
#### Success Response (200)
- **id** (string) - Unique identifier for the message.
- **type** (string) - The object type, always "message".
- **role** (string) - The role of the sender, always "assistant".
- **content** (array) - An array of content blocks generated by the model.
  - **type** (string) - The type of content block (e.g., "text").
  - **text** (string) - The text content of the message.
```

--------------------------------

### WSL Connection

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

Connects to a WSL distribution on the local machine. It uses the default distribution if none is provided.

```APIDOC
## wsl

```sh
wsh wsl [-d <distribution-name>]
```

This will connect to a WSL distribution on the local machine. It will use the default if no distribution is provided.
```

--------------------------------

### Get Variables with wsh getvar

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

Retrieve variable values using `wsh getvar`. Use `--all` to list all variables and `-0` for null-terminated output. Variables can be accessed at different scopes using the `-b` flag.

```sh
if wsh getvar API_KEY >/dev/null; then
    echo "API key is set"
fi
```

```sh
curl -H "Authorization: $(wsh getvar API_KEY)" https://api.example.com
```

```sh
wsh getvar -l BLOCK_SPECIFIC
```

```sh
wsh getvar --all
```

```sh
wsh getvar --all -0
```

```sh
wsh getvar -b block MYVAR
```

```sh
wsh setvar -b block MYVAR=value
```

```sh
wsh getvar -b tab MYVAR
```

```sh
wsh setvar -b tab MYVAR=value
```

```sh
wsh getvar -b workspace MYVAR
```

```sh
wsh setvar -b workspace MYVAR=value
```

```sh
wsh getvar -b client MYVAR
```

```sh
wsh setvar -b client MYVAR=value
```

--------------------------------

### Go Function for AI Configuration Resolution

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/usechat-backend-design.md

Demonstrates the backend logic for resolving AI configuration by prioritizing request options, URL presets, block metadata, global settings, and a default preset.

```go
func resolveAIConfig(blockId, presetKey string, requestOptions map[string]any) (*WaveAIOptsType, error) {
    // 1. Load block metadata
    block := getBlock(blockId)
    blockPreset := block.Meta["ai:preset"]
    
    // 2. Load global settings
    settings := getGlobalSettings()
    globalPreset := settings["ai:preset"]
    
    // 3. Resolve preset hierarchy
    finalPreset := presetKey
    if finalPreset == "" {
        finalPreset = blockPreset
    }
    if finalPreset == "" {
        finalPreset = globalPreset
    }
    if finalPreset == "" {
        finalPreset = "default"
    }
    
    // 4. Load and merge preset config
    presetConfig := loadPreset(finalPreset)
    
    // 5. Apply request overrides
    return mergeAIConfig(presetConfig, requestOptions), nil
}
```

--------------------------------

### Get block or tab metadata

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

Retrieves metadata for blocks or tabs. Can specify block ID, use 'this' or 'tab', dump specific keys, or sets of keys with prefixes.

```sh
# get the metadata for the current terminal block
wsh getmeta

# get the metadata for block num 2 (see block numbers by holidng down Ctrl+Shift)
wsh getmeta -b 2

# get the metadata for a blockid (get block ids by right clicking any block header "Copy Block Id")
wsh getmeta -b [blockid]

# get the metadata for a tab
wsh getmeta -b tab

# dump a single metadata key
wsh getmeta [-b [blockid]] [key]

# dump a set of keys with a certain prefix
wsh getmeta -b tab "bg:*"

# dump a set of keys with prefix (and include the 'clear' key)
wsh getmeta -b tab --clear-prefix "bg:*"
```

--------------------------------

### Get Provider Secret Name

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/aimodesconfig.md

Retrieves the standard secret name for a given AI provider. For 'custom' providers, it allows specifying a custom secret name.

```typescript
// Fixed secret names per provider (except custom)
const SECRET_NAMES = {
    openai: "OPENAI_KEY",
    openrouter: "OPENROUTER_KEY",
    azure: "AZURE_KEY",
    "azure-legacy": "AZURE_KEY",
    google: "GOOGLE_KEY",
    // custom provider: user specifies their own secret name
} as const;

function getSecretName(provider: string, customSecretName?: string): string {
    if (provider === "custom") {
        return customSecretName || "CUSTOM_API_KEY";
    }
    return SECRET_NAMES[provider];
}
```

--------------------------------

### Get Override Configuration Atom

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/fe-conn-arch.md

Retrieves a configuration value by checking block metadata, then connection config, and finally falling back to global settings. Returns an Atom for reactive access.

```typescript
function getOverrideConfigAtom<T>(blockId: string, key: T): Atom<T> {
    return atom((get) => {
        // 1. Check block metadata
        const metaKeyVal = get(getBlockMetaKeyAtom(blockId, key))
        if (metaKeyVal != null) return metaKeyVal
        
        // 2. Check connection config
        const connName = get(getBlockMetaKeyAtom(blockId, "connection"))
        const connConfigKeyVal = get(getConnConfigKeyAtom(connName, key))
        if (connConfigKeyVal != null) return connConfigKeyVal
        
        // 3. Fall back to global settings
        const settingsVal = get(getSettingsKeyAtom(key))
        return settingsVal ?? null
    })
}
```

--------------------------------

### Add 3-Minute CPU and Memory Sysinfo Widget

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/customwidgets.mdx

Configure a custom widget to display CPU and Memory usage for the last 180 seconds. This is useful for monitoring build processes.

```json
{
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
    }
}
```

--------------------------------

### Run Standalone Build

Source: https://github.com/wavetermdev/waveterm/blob/main/BUILD.md

Builds the app and runs it standalone without the development server. Changes will not reload automatically.

```sh
task start
```

--------------------------------

### Define Fish Shell Widget

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/customwidgets.mdx

Create a widget to launch a fish shell. Ensure 'fish' is in your system's PATH or provide the direct path to the executable in 'term:localshellpath'.

```json
{
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
    }
}
```

--------------------------------

### Launch Widgets with wsh launch

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

Open pre-configured widgets using `wsh launch`. Provide the widget ID to create a new block. Use the `-m` flag to open in magnified mode.

```sh
wsh launch my-custom-widget
```

```sh
wsh launch -m system-monitor
```

--------------------------------

### Monitor Block Controller Status with Jotai Atom

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/blockcontroller-lifecycle.md

Accesses the block controller's status using a Jotai atom for reactive UI updates. This snippet shows how to get the status and conditionally render UI elements based on it.

```typescript
// Status is automatically available via atom
const shellProcStatus = jotai.useAtomValue(model.shellProcStatus);

// Use in UI
if (shellProcStatus == "running") {
    // Show running state
} else if (shellProcStatus == "done") {
    // Show restart button
}
```

--------------------------------

### Tool Choice Configuration

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/anthropic-messages-api.md

Defines how the model should use provided tools. Options include using a specific tool, any available tool, deciding automatically, or not using tools at all.

```yaml
tool_choice:
  auto: true
```

--------------------------------

### Streaming API Response Events (JSON)

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/anthropic-streaming.md

This JSON represents a sequence of Server-Sent Events (SSE) from the Anthropic API during a streaming request. It details the message start, content block updates (text and tool use), and tool result processing.

```json
event: message_start
data: {"type":"message_start","message":{"id":"msg_01G...","type":"message","role":"assistant","model":"claude-opus-4-1-20250805","content":[],"stop_reason":null,"stop_sequence":null,"usage":{"input_tokens":2679,"cache_creation_input_tokens":0,"cache_read_input_tokens":0,"output_tokens":3}}}

event: content_block_start
data: {"type":"content_block_start","index":0,"content_block":{"type":"text","text":""}}

event: content_block_delta
data: {"type":"content_block_delta","index":0,"delta":{"type":"text_delta","text":"I'll check"}}

event: content_block_delta
data: {"type":"content_block_delta","index":0,"delta":{"type":"text_delta","text":" the current weather in New York City for you"}}

event: ping
data: {"type": "ping"}

event: content_block_delta
data: {"type":"content_block_delta","index":0,"delta":{"type":"text_delta","text":"."}}

event: content_block_stop
data: {"type":"content_block_stop","index":0}

event: content_block_start
data: {"type":"content_block_start","index":1,"content_block":{"type":"server_tool_use","id":"srvtoolu_014hJH82Qum7Td6UV8gDXThB","name":"web_search","input":{}}}

event: content_block_delta
data: {"type":"content_block_delta","index":1,"delta":{"type":"input_json_delta","partial_json":""}}

event: content_block_delta
data: {"type":"content_block_delta","index":1,"delta":{"type":"input_json_delta","partial_json":"{\"query"}}

event: content_block_delta
data: {"type":"content_block_delta","index":1,"delta":{"type":"input_json_delta","partial_json":"\”:"}}

event: content_block_delta
data: {"type":"content_block_delta","index":1,"delta":{"type":"input_json_delta","partial_json":" \"weather"}}

event: content_block_delta
data: {"type":"content_block_delta","index":1,"delta":{"type":"input_json_delta","partial_json":" NY"}}

event: content_block_delta
data: {"type":"content_block_delta","index":1,"delta":{"type":"input_json_delta","partial_json":"C to"}}

event: content_block_delta
data: {"type":"content_block_delta","index":1,"delta":{"type":"input_json_delta","partial_json":"day"}"}}

event: content_block_stop
data: {"type":"content_block_stop","index":1 }

event: content_block_start
data: {"type":"content_block_start","index":2,"content_block":{"type":"web_search_tool_result","tool_use_id":"srvtoolu_014hJH82Qum7Td6UV8gDXThB","content":[{"type":"web_search_result","title":"Weather in New York City in May 2025 (New York) - detailed Weather Forecast for a month","url":"https://world-weather.info/forecast/usa/new_york/may-2025/","encrypted_content":"Ev0DCioIAxgCIiQ3NmU4ZmI4OC1k...","page_age":null},...]}}

event: content_block_stop
data: {"type":"content_block_stop","index":2}

event: content_block_start
data: {"type":"content_block_start","index":3,"content_block":{"type":"text","text":""}}

event: content_block_delta
data: {"type":"content_block_delta","index":3,"delta":{"type":"text_delta","text":"Here's the current weather information for New York"}}

event: content_block_delta
data: {"type":"content_block_delta","index":3,"delta":{"type":"text_delta","text":" City:\n\n# Weather"}}

event: content_block_delta
data: {"type":"content_block_delta","index":3,"delta":{"type":"text_delta","text":" in New York City"}}

event: content_block_delta
data: {"type":"content_block_delta","index":3,"delta":{"type":"text_delta","text":"\n\n"}}

...

event: content_block_stop
data: {"type":"content_block_stop","index":17}

event: message_delta
```

--------------------------------

### Define Multiple AI Presets

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/ai-presets.mdx

Configure various AI models and providers by defining multiple presets in your `ai.json` file. The `display:order` key controls the order in the UI.

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

### Generate Solid Color Background JSON

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/tab-backgrounds.mdx

Use the `setbg` command to preview and generate JSON for a solid color background.

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

### Connect to WSL Distribution

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

Connects to a Windows Subsystem for Linux (WSL) distribution. Uses the default distribution if none is specified.

```sh
wsh wsl [-d <distribution-name>]
```

--------------------------------

### SSH Authentication: Keyboard-Interactive Challenge

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/conn-arch.md

Callback function for handling keyboard-interactive authentication challenges.

```go
createInteractiveKbdInteractiveChallenge()
```

--------------------------------

### Launch Widgets with wsh

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

The `wsh launch` command opens pre-configured widgets directly from the terminal. It searches for the widget ID in user-defined and default widgets.

```APIDOC
## wsh launch

### Description
Opens pre-configured widgets directly from your terminal. Searches for the specified widget ID in both user-defined widgets and default widgets, then creates a new block using the widget's configuration.

### Usage
```sh
wsh launch [flags] widget-id
```

### Flags
- `-m, --magnify`: Open the widget in magnified mode, overriding the widget's default magnification setting.

### Examples
```sh
# Launch a widget with its default settings
wsh launch my-custom-widget

# Launch a widget in magnified mode
wsh launch -m system-monitor
```

The widget's configuration determines the initial block settings, including the view type, metadata, and default magnification state. The `-m` flag can be used to override the widget's default magnification setting.
```

--------------------------------

### Context Injection with Initial System Messages

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/usechat-backend-design.md

Illustrates how to inject context into the AI chat by providing initial system messages via the useChat hook options. This is useful for setting the AI's persona or providing background information.

```typescript
// Add system messages or context via useChat options
const { messages, append } = useChat({
    api: `/api/ai/chat/${blockId}`,
    initialMessages: [
        {
            role: 'system',
            content: 'You are a helpful terminal assistant...'
        }
    ]
});
```

--------------------------------

### Initializing LayoutTreeState from WaveObject

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/layout-simplification.md

Shows how the initial layout state is created when reading from WaveObject on initialization. This process inherently creates a new object reference, ensuring immutability.

```typescript
const waveObjState = this.getter(this.waveObjectAtom);
const initialState: LayoutTreeState = {
  rootNode: waveObjState?.rootnode,  // New reference from backend
  focusedNodeId: waveObjState?.focusednodeid,
  // ...
};
```

--------------------------------

### Configure OpenAI Compatible Provider

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/waveai-modes.mdx

Manual configuration for OpenAI-compatible APIs. Ensure the endpoint is the full URL, not just the base URL.

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

### Jotai Atom Initialization Patterns

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/newview.md

Illustrates how to initialize Jotai atoms for simple fields and derived atoms within a constructor. Follow these patterns for effective state management in models.

```typescript
viewIcon = jotai.atom<string>("circle");
noPadding = jotai.atom<boolean>(true);
```

```typescript
this.viewText = jotai.atom((get) => {
    const blockData = get(this.blockAtom);
    return [/* computed based on blockData */];
});
```

--------------------------------

### View file or directory contents

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

Opens a preview block for any file or directory. Use -m for magnified view. Text/code files open in an editable codeedit block.

```sh
wsh view [path]
wsh view -m [path]           # opens in magnified block
```

--------------------------------

### Open Wave config files with editconfig

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

Use the `wsh editconfig` command to open Wave's configuration files. If no file is specified, it defaults to `settings.json`.

```bash
wsh editconfig [config-file-name]
```

```bash
wsh editconfig
```

```bash
wsh editconfig presets.json
```

```bash
wsh editconfig widgets.json
```

```bash
wsh editconfig presets/ai.json
```

--------------------------------

### Access Settings in Go Backend

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/config-system.md

Retrieve the full configuration object in Go and access specific settings directly from the Settings struct.

```go
// Get the full config
fullConfig := wconfig.GetWatcher().GetFullConfig()

// Access your setting
myValue := fullConfig.Settings.MyNewSetting

```

--------------------------------

### Configure NanoGPT Provider

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/waveai-modes.mdx

Configuration for NanoGPT. Capabilities must be manually specified; check the NanoGPT models API for specific model support.

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

### Configure vLLM for WaveAI

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/waveai-modes.mdx

Use this JSON structure to connect to a high-performance vLLM inference server.

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

### Tsunami Rendering Flow: Pattern Routing

Source: https://github.com/wavetermdev/waveterm/blob/main/tsunami/engine/render.md

Illustrates the pattern routing logic within the Tsunami rendering flow, directing elements to appropriate rendering functions based on tag type.

```go
if elem.Tag == vdom.TextTag {
    // Pattern 1: Text Nodes
    r.renderText(elem.Text, comp)
} else if isBaseTag(elem.Tag) {
    // Pattern 2: Base elements
    r.renderSimple(elem, comp, opts)
} else {
    // Pattern 3: Custom components
    r.renderComponent(cfunc, elem, comp, opts)
}
```

--------------------------------

### Update Documentation Table

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/config-system.md

Document the new setting in the configuration table within `docs/docs/config.mdx`. Include the key name, type, and a functional description.

```markdown
| Key Name            | Type     | Function                                  |
| ------------------- | -------- | ----------------------------------------- |
| mynew:setting       | string   | Description of what this setting controls |
| mynew:boolsetting   | bool     | Enable/disable some feature               |
| mynew:numbersetting | float    | Numeric setting for some parameter        |
| mynew:intsetting    | int      | Integer setting for some configuration    |
| mynew:arraysetting  | string[] | Array of strings for multiple values      |
```

--------------------------------

### Edit Wave AI configuration via CLI

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/waveai-modes.mdx

Use the command line to open the waveai.json configuration file for editing.

```bash
wsh editconfig waveai.json
```

--------------------------------

### Set Default AI Preset via Command Line

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/ai-presets.mdx

Quickly set the default AI preset using the `wsh setconfig` command, which is more convenient than editing `settings.json` directly.

```bash
wsh setconfig ai:preset=ai@claude-sonnet
```

--------------------------------

### Set Global Hotkey to F5

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/config.mdx

To set 'F5' as your global hotkey, assign the string "F5" to the `"app:globalhotkey"` setting in `settings.json`. This change requires a Wave reboot to take effect.

```json
"app:globalhotkey": "F5"
```

--------------------------------

### Define PowerShell Core Widget

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/customwidgets.mdx

Create a widget to launch PowerShell Core (pwsh). Specify the direct path to 'pwsh' if it's not in your system's PATH. Note that 'pwsh.exe' and 'pwsh' work on Windows, but only 'pwsh' on Unix.

```json
{
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
    }
}
```

--------------------------------

### Generate Image Background JSON

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/tab-backgrounds.mdx

Use the `setbg` command to preview and generate JSON for a centered image background with specified opacity.

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

### Download Build Artifacts with Taskfile

Source: https://github.com/wavetermdev/waveterm/blob/main/RELEASES.md

Use the 'artifacts:download' task from Taskfile.yml to download build artifacts. Requires an AWS CLI profile with write permissions for S3 buckets.

```bash
task artifacts:download:<version> -- --profile <aws-profile>
```

--------------------------------

### List All Blocks

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

List all blocks in the current workspace. Can be filtered by workspace, window, tab, or view type. Output defaults to a table but can be JSON for scripting.

```sh
wsh blocks list
```

```sh
wsh blocks list --view=term
```

```sh
wsh blocks list --workspace=12d0c067-378e-454c-872e-77a314248114
```

```sh
wsh blocks list --json
```

--------------------------------

### Send Basic Notification

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

Creates a desktop notification with a specified message.

```sh
# Basic notification
wsh notify "Build completed successfully"
```

--------------------------------

### Package Application (Linux ARM64)

Source: https://github.com/wavetermdev/waveterm/blob/main/BUILD.md

Packages the application on Linux ARM64, using system fpm.

```sh
USE_SYSTEM_FPM=1 task package
```

--------------------------------

### Current Layout Change Flow

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/layout-simplification.md

Illustrates the complex, multi-step process of a layout change in the current architecture, involving state mutation, generation increment, bidirectional atom updates, and backend writes.

```text
User action
  ↓
treeReducer() mutates layoutState
  ↓
layoutState.generation++  ← Only purpose: trigger the write
  ↓
Bidirectional atom setter (checks generation)
  ↓
Write to WaveObject {rootnode, focusednodeid, magnifiednodeid}
  ↓
WaveObject update notification
  ↓
Bidirectional atom getter runs
  ↓
ALL dependent atoms recalculate (every isFocused, etc.)
  ↓
React re-renders with updated state
```

--------------------------------

### GitHub Web Widget with Custom Homepage

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/customwidgets.mdx

Creates a web widget that opens to GitHub but sets Google as its homepage. This allows for a specific initial view while maintaining a different default homepage.

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

--------------------------------

### Set Default AI Preset

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/ai-presets.mdx

Configure the default AI preset by adding the `ai:preset` key to your `settings.json` file.

```json
{
  "ai:preset": "ai@claude-sonnet"
}
```

--------------------------------

### Configure Azure OpenAI Modern API

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/waveai-modes.mdx

Sets up the modern Azure OpenAI provider. Requires specifying the resource name and manually defining capabilities.

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

### create_appgo AI Tool for Bootstrapping Apps

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/tsunami-builder.md

Used by the AI to bootstrap new applications or perform complete rewrites by providing the full app.go file content. It follows the same compilation feedback mechanism as edit_appgo.

```json
{
  "tool": "create_appgo",
  "args": {
    "content": "// Full app.go file content..."
  }
}
```

--------------------------------

### Set Secrets via CLI

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/waveai-modes.mdx

Use the wsh command to store API keys in the system's native keychain.

```bash
wsh secret set OPENAI_KEY=sk-xxxxxxxxxxxxxxxx
wsh secret set OPENROUTER_KEY=sk-xxxxxxxxxxxxxxxx
```

--------------------------------

### Show Context Menu

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/contextmenu.md

Displays the context menu. Requires a menu definition (array of ContextMenuItem) and the triggering mouse event.

```typescript
ContextMenuModel.showContextMenu(menu, event);
```

--------------------------------

### Run Command

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

The `run` command creates a new terminal command block and executes a specified command within it. The command can be provided either as arguments after `--` or using the `-c` flag. Unless the `-x` or `-X` flags are passed, commands can be re-executed by pressing `Enter` once the command has finished running. The command inherits the current environment variables and working directory by default.

```APIDOC
## run

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

Flags:

- `-m, --magnified` - open the block in magnified mode
- `-c, --command string` - run a command string in _shell_
- `-x, --exit` - close block if command exits successfully (stays open if there was an error)
- `-X, --forceexit` - close block when command exits, regardless of exit status
- `--delay int` - if using -x/-X, delay in milliseconds before closing block (default 2000)
- `-p, --paused` - create block in paused state
- `-a, --append` - append output on command restart instead of clearing
- `--cwd string` - set working directory for command

Examples:

```sh
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

When using the `-x` or `-X` flags, the block will automatically close after the command completes. The `-x` flag only closes on successful completion (exit code 0), while `-X` closes regardless of exit status. The `--delay` flag controls how long to wait before closing (default 2000ms).

The `-p` flag creates the block in a paused state, allowing you to review the command before execution.

:::tip
You can use either `--` followed by your command and arguments, or the `-c` flag with a quoted command string. The `--` method is preferred when you want to preserve argument handling, while `-c` is useful for shell commands with pipes or redirections.
:::
```

--------------------------------

### Configure AI Preset with Proxy

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/ai-presets.mdx

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

### Local LLM (Ollama) AI Preset Configuration

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/ai-presets.mdx

Configures a preset to connect to a local Ollama instance for running models like Llama2. Note that the `ai:apitoken` is required but ignored by Ollama.

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

### Context Menu with Submenu and Checkboxes

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/contextmenu.md

Demonstrates a context menu with a submenu containing checkbox items to toggle settings, such as clearing output on restart.

```typescript
const isClearOnStart = true; // Example setting

const menu: ContextMenuItem[] = [
  {
    label: "Clear Output On Restart",
    submenu: [
      {
        label: "On",
        type: "checkbox",
        checked: isClearOnStart,
        click: () => {
          // Set the config to enable clear on restart
        },
      },
      {
        label: "Off",
        type: "checkbox",
        checked: !isClearOnStart,
        click: () => {
          // Set the config to disable clear on restart
        },
      },
    ],
  },
];

ContextMenuModel.showContextMenu(menu, e);
```

--------------------------------

### Send Metadata Command (M)

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/wave-osc-16162.md

Used during the first 'precmd' hook on shell startup to provide shell and system information. Requires a JSON payload with shell details, version, uname, and integration status.

```bash
uname_info=$(uname -smr 2>/dev/null)
printf '\033]16162;M;{"shell":"zsh","shellversion":"5.9","uname":"%s"}\007' "$uname_info"
```

--------------------------------

### Run Command String

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

Executes a command provided as a string using the '-c' flag.

```sh
# Run a command using -c flag
wsh run -c "ls -la"
```

--------------------------------

### Fetch Available Connections in Modal

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/fe-conn-arch.md

Fetches lists of available connections (local, WSL, AWS S3) when the connection change modal is opened. Uses RpcApi for data retrieval.

```typescript
useEffect(() => {
    if (!changeConnModalOpen) return
    
    // Fetch available connections
    RpcApi.ConnListCommand(TabRpcClient, { timeout: 2000 })
        .then(setConnList)
    
    RpcApi.WslListCommand(TabRpcClient, { timeout: 2000 })
        .then(setWslList)
    
    RpcApi.ConnListAWSCommand(TabRpcClient, { timeout: 2000 })
        .then(setS3List)
}, [changeConnModalOpen])
```

--------------------------------

### General Sysinfo Widget Configuration

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/customwidgets.mdx

Provides the general structure for a custom sysinfo widget, including options for icon, label, and meta-view configuration like graph points and sysinfo type. Use this as a template for system monitoring widgets.

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

--------------------------------

### Run Build Command in Magnified Mode

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

Executes a build command and opens the terminal block in magnified mode.

```sh
# Run a build command in magnified mode
wsh run -m -- npm run build
```

--------------------------------

### Define TUI App Command Widget

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/customwidgets.mdx

Create a widget to run a TUI application like 'dua'. The 'cmd:clearonstart' option is omitted as it does not affect behavior for TUI apps that don't return on close.

```json
{
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
    }
}
```

--------------------------------

### Run Command with Arguments

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

Executes a command and its arguments directly after the '--' separator.

```sh
# Run a command specified after --
wsh run -- ls -la
```

--------------------------------

### Documentation Entry for Terminal Setting

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/config-system.md

Markdown table entry documenting the `term:bellsound` setting, specifying its type, and providing a description of its purpose and possible values.

```markdown
| term:bellsound | string | Sound to play for terminal bell ("default", "none", or custom sound file path) |

```

--------------------------------

### Configure Claude Code Session Badges

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/claude-code.mdx

Add this JSON configuration to your `~/.claude/settings.json` file to enable Wave's badge system for visual session status indicators. Restart Claude Code sessions for changes to take effect.

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

### Relevant Imports

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/getsetconfigvar.md

These are the necessary imports for setting and reading configuration variables.

```typescript
import { RpcApi } from "@/app/store/wshclientapi";
import { TabRpcClient } from "@/app/store/wshrpcutil";
import { getSettingsKeyAtom, useSettingsKeyAtom, globalStore } from "@/app/store/global";
```

--------------------------------

### Tool Choice Configuration

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/anthropic-messages-api.md

Determines how the model should utilize the provided tools. Options include using a specific tool, any available tool, deciding automatically, or not using tools at all.

```APIDOC
## Tool Choice

### Description
How the model should use the provided tools. The model can use a specific tool, any available tool, decide by itself, or not use tools at all.

### Discriminator
propertyName: type
mapping:
  any: "#/components/schemas/ToolChoiceAny"
  auto: "#/components/schemas/ToolChoiceAuto"
  none: "#/components/schemas/ToolChoiceNone"
  tool: "#/components/schemas/ToolChoiceTool"

### Types
oneOf:
  - $ref: "#/components/schemas/ToolChoiceAuto"
  - $ref: "#/components/schemas/ToolChoiceAny"
  - $ref: "#/components/schemas/ToolChoiceTool"
  - $ref: "#/components/schemas/ToolChoiceNone"
```

--------------------------------

### Import Context Menu Module

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/contextmenu.md

Imports the necessary ContextMenuModel for displaying context menus.

```typescript
import { ContextMenuModel } from "@/app/store/contextmenu";
```

--------------------------------

### Azure OpenAI AI Preset Configuration

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/ai-presets.mdx

Sets up a preset for Azure AI services, requiring the base URL, model deployment name, and API key. Ensure the base URL does not include query parameters or `api-version`.

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

### Ensure Single Execution of Shell Process Cleanup

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/conn-arch.md

Use sync.Once to guarantee that shell process cleanup logic, including setting exit status and signaling completion, runs only once.

```go
sp.CloseOnce.Do(func() {
    sp.WaitErr = waitErr
    close(sp.DoneCh)       // Signal completion
})
```

--------------------------------

### Set Configuration Value

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

Allows setting various options in the `config/settings.json` file. It validates that a valid config option was provided.

```sh
wsh setconfig [<config-name>=<config-value>]
```

--------------------------------

### Handle AI Chat HTTP Request

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/usechat-backend-design.md

Parses request parameters, resolves AI configuration, and routes to the appropriate provider for streaming. Sets SSE headers for the response.

```go
func (s *WshServer) HandleAIChat(w http.ResponseWriter, r *http.Request) {
    // 1. Parse URL parameters
    blockId := mux.Vars(r)["blockId"]
    presetKey := r.URL.Query().Get("preset")
    
    // 2. Parse request body
    var req struct {
        Messages []struct {
            Role    string `json:"role"`
            Content string `json:"content"`
        } `json:"messages"`
        Options map[string]any `json:"options,omitempty"`
    }
    json.NewDecoder(r.Body).Decode(&req)
    
    // 3. Resolve configuration
    aiOpts, err := resolveAIConfig(blockId, presetKey, req.Options)
    if err != nil {
        http.Error(w, err.Error(), 400)
        return
    }
    
    // 4. Set SSE headers
    w.Header().Set("Content-Type", "text/event-stream")
    w.Header().Set("Cache-Control", "no-cache")
    w.Header().Set("Connection", "keep-alive")
    
    // 5. Route to provider and stream directly
    switch aiOpts.APIType {
    case "openai", "perplexity":
        // Direct proxy - these are already SSE compatible
        streamDirectSSE(w, r.Context(), aiOpts, req.Messages)
    case "anthropic":
        // Direct proxy with minimal field mapping
        streamAnthropicSSE(w, r.Context(), aiOpts, req.Messages)
    case "google":
        // Direct proxy
        streamGoogleSSE(w, r.Context(), aiOpts, req.Messages)
    default:
        // Wave Cloud - only one requiring conversion (WebSocket → SSE)
        if isCloudAIRequest(aiOpts) {
            streamWaveCloudToUseChat(w, r.Context(), aiOpts, req.Messages)
        } else {
            http.Error(w, "Unsupported provider", 400)
        }
    }
}
```

--------------------------------

### Basic Streaming Request with cURL

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/anthropic-streaming.md

Demonstrates how to make a basic streaming request to the Anthropic API using cURL. Ensure your API key is set in the ANTHROPIC_API_KEY environment variable.

```Shell
curl https://api.anthropic.com/v1/messages \
     --header "anthropic-version: 2023-06-01" \
     --header "content-type: application/json" \
     --header "x-api-key: $ANTHROPIC_API_KEY" \
     --data \
  '{
    "model": "claude-opus-4-1-20250805",
    "messages": [{"role": "user", "content": "Hello"}],
    "max_tokens": 256,
    "stream": true
  }'
```

--------------------------------

### Run Command with Working Directory

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

Executes a command within a specified working directory.

```sh
# Run with working directory specified
wsh run --cwd /path/to/dir -- ./script.sh
```

--------------------------------

### SSH Authentication: Public Key Callback

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/conn-arch.md

Callback function for establishing SSH connections using public key authentication, potentially with a passphrase.

```go
createPublicKeyCallback()
```

--------------------------------

### Multi-modal Support with useChat

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/usechat-backend-design.md

Demonstrates how to send multi-modal content, such as text and images, to the AI using the append function provided by the useChat hook. Ensure the 'imageFile' variable is properly defined and contains the image data.

```typescript
// useChat supports multi-modal out of the box
const { messages, append } = useChat({
    api: `/api/ai/chat/${blockId}`,
});

// Send image + text
await append({
    role: 'user',
    content: [
        { type: 'text', text: 'What do you see in this image?' },
        { type: 'image', image: imageFile }
    ]
});
```

--------------------------------

### Rollback Dependencies to Monaco 0.52.x

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/monaco-v0.53.md

Commands to revert to the previous stable configuration using Monaco Editor 0.52.x and the @monaco-editor/loader.

```bash
npm i monaco-editor@0.52.x
npm i -D @monaco-editor/loader
```

--------------------------------

### General Web Widget Configuration

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/customwidgets.mdx

Defines the basic structure for a custom web widget, including icon, label, and the meta view with a default URL. Use this as a template for creating new web widgets.

```json
{
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
    }
}
```

--------------------------------

### Run Command in Specific Directory

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

Executes a command within a specified project directory.

```sh
# Run a command in a specific directory
wsh run --cwd ./project -- make test
```

--------------------------------

### Manage Remote Connections in WaveTerm Views

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/newview.md

Use jotai atoms to control the visibility of connection-related UI elements. Set `manageConnection` to true to show the connection picker, `filterOutNowsh` to true to hide 'nowsh' connections, and `showS3` to true to display S3 connections.

```typescript
this.manageConnection = jotai.atom(true);  // Show connection picker
this.filterOutNowsh = jotai.atom(true);    // Hide nowsh connections
this.showS3 = jotai.atom(true);            // Show S3 connections
```

--------------------------------

### Configure Vite for Monaco Chunking and Electron Base Path

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/monaco-v0.53.md

Configure Vite's build output to isolate Monaco Editor into its own chunk and set the base path for Electron compatibility. The `base: './'` is crucial for worker URLs to resolve correctly under `file://` in packaged apps.

```typescript
import { defineConfig } from "vite";

export default defineConfig({
  base: "./", // important for Electron packaged apps
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/monaco-editor")) return "monaco";
        },
      },
    },
  },
});
```

--------------------------------

### List Files with wsh ls

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

List files in a directory using `wsh file ls`. Use flags like `-l` for long format, `-1` for one file per line, or `-f` to list only files. When piped, it defaults to one file per line.

```sh
wsh file ls wsh://user@ec2/home/user/
```

```sh
wsh file ls ./local-dir/
```

```sh
wsh file ls ./ | grep ".json$"
```

--------------------------------

### Initialize LayoutModel with Local Atom

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/layout-simplification.md

Initializes the LayoutModel with a local primitive atom for state and loads persisted state from a WaveObject atom. Handles pending backend actions and updates the tree structure.

```typescript
class LayoutModel {
  // BEFORE: Bidirectional atom with generation tracking
  // treeStateAtom: WritableLayoutTreeStateAtom
  
  // AFTER: Simple local atom (source of truth)
  private localTreeStateAtom: PrimitiveAtom<LayoutTreeState>;
  
  // Keep reference to WaveObject atom for persistence
  private waveObjectAtom: WritableWaveObjectAtom<LayoutState>;
  
  constructor(tabAtom: Atom<Tab>, ...) {
    this.waveObjectAtom = getLayoutStateAtomFromTab(tabAtom);
    
    // Initialize local atom (starts empty)
    this.localTreeStateAtom = atom<LayoutTreeState>({
      rootNode: undefined,
      focusedNodeId: undefined,
      magnifiedNodeId: undefined,
      leafOrder: undefined,
      pendingBackendActions: undefined,
      generation: 0  // Can be removed entirely or kept for debugging
    });
    
    // Read from WaveObject ONCE during initialization
    this.initializeFromWaveObject();
  }
  
  private async initializeFromWaveObject() {
    const waveObjState = this.getter(this.waveObjectAtom);
    
    // Load persisted state into local atom
    const initialState: LayoutTreeState = {
      rootNode: waveObjState?.rootnode,
      focusedNodeId: waveObjState?.focusednodeid,
      magnifiedNodeId: waveObjState?.magnifiednodeid,
      leafOrder: undefined,  // Computed by updateTree()
      pendingBackendActions: waveObjState?.pendingbackendactions,
      generation: 0
    };
    
    // Set local state
    this.treeState = initialState;
    this.setter(this.localTreeStateAtom, initialState);
    
    // Process any pending backend actions
    if (initialState.pendingBackendActions?.length) {
      await this.processPendingBackendActions();
    }
    
    // Initialize tree (compute leafOrder, etc.)
    this.updateTree();
  }
  
  // Process backend-queued actions (startup only)
  private async processPendingBackendActions() {
    const actions = this.treeState.pendingBackendActions;
    if (!actions?.length) return;
    
    this.treeState.pendingBackendActions = undefined;
    
    for (const action of actions) {
      // Convert backend action to frontend action and run through treeReducer
      // This code already exists in onTreeStateAtomUpdated()
      switch (action.actiontype) {
        case LayoutTreeActionType.InsertNode:
          this.treeReducer({
            type: LayoutTreeActionType.InsertNode,
            node: newLayoutNode(undefined, undefined, undefined, {
              blockId: action.blockid
            }),
            magnified: action.magnified,
            focused: action.focused
          }, false);
          break;
        // ... other action types
      }
    }
  }
}
```

--------------------------------

### Configure Groq Provider

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/waveai-modes.mdx

Configuration for Groq. Capabilities must be manually specified based on the model's features.

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

### Reinstall Wave Shell Extensions

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

Reinstalls the Wave Shell Extensions on a specified SSH or WSL connection. Ensure the connection details are correct.

```sh
wsh conn reinstall [user@host]
```

```sh
wsh conn reinstall [wsl://<distribution-name>]
```

--------------------------------

### Define Remote Terminal Widget

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/customwidgets.mdx

Create a widget to open a terminal for a specific SSH or WSL connection. Use the canonical connection name from connections.json or the dropdown menu.

```json
{
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
	}
}
```

--------------------------------

### Incremental Implementation Phase 2: Switch Consumers Gradually

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/layout-simplification.md

In the second phase, gradually switch consumers to use the new localTreeStateAtom. This involves modifying components that previously relied on treeStateAtom to now use localTreeStateAtom.

```typescript
// Change this gradually
isFocused: atom((get) => {
  // const treeState = get(this.treeStateAtom);  // Old
  const treeState = get(this.localTreeStateAtom);  // New
  ...
})
```

--------------------------------

### blocks list

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

List and query blocks across workspaces, windows, and tabs.

```APIDOC
## wsh blocks list

### Description
List all blocks with optional filtering by workspace, window, tab, or view type. Output can be formatted as a table (default) or JSON for scripting.

### Usage
```sh
wsh blocks list [flags]
```

### Flags
- `--workspace <id>`: Restrict to specific workspace id.
- `--window <id>`: Restrict to specific window id.
- `--tab <id>`: Restrict to specific tab id.
- `--view <type>`: Filter by view type (term, web, preview, edit, sysinfo, waveai).
- `--json`: Output results as JSON.
- `--timeout <ms>`: RPC timeout in milliseconds (default: 5000).

### Examples
```sh
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

### Add New Field to Go Struct

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/config-system.md

Define new configuration fields within the `SettingsType` struct in `pkg/wconfig/settingsconfig.go`. Use appropriate JSON tags and consider using pointer types for optional values.

```go
type SettingsType struct {
    // ... existing fields ...

    // Add your new field with appropriate JSON tag
    MyNewSetting string `json:"mynew:setting,omitempty"`

    // For different types:
    MyBoolSetting   bool    `json:"mynew:boolsetting,omitempty"`
    MyNumberSetting float64 `json:"mynew:numbersetting,omitempty"`
    MyIntSetting    *int64  `json:"mynew:intsetting,omitempty"`    // Use pointer for optional ints
    MyArraySetting  []string `json:"mynew:arraysetting,omitempty"`
}
```

--------------------------------

### Send Command Execution Command (C)

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/wave-osc-16162.md

Sent in the 'preexec' hook before a command runs. Includes a base64-encoded command text for safe character handling. Requires a JSON payload with 'cmd64'.

```bash
cmd64=$(printf '%s' "ls -la" | base64)
printf '\033]16162;C;{"cmd64":"%s"}\007' "$cmd64"
```

--------------------------------

### Extended Thinking Configuration

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/anthropic-messages-api.md

Enables Claude's extended thinking, which includes 'thinking' content blocks showing the model's thought process before the final answer. Requires a minimum budget of 1,024 tokens.

```yaml
thinking:
  enabled: true
```

--------------------------------

### WslConn Structure Definition

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/conn-arch.md

Defines the WslConn struct used for managing WSL connections. It includes fields for synchronization, status, WSL enablement, distro name, client interface, domain socket name, and the connection server command.

```go
type WslConn struct {
    Lock               *sync.Mutex
    Status             string
    WshEnabled         *atomic.Bool
    Name               wsl.WslName      // Distro name
    Client             *wsl.Distro      // WSL distro interface
    DomainSockName     string          // Uses RemoteFullDomainSocketPath
    ConnController     *wsl.WslCmd     // Runs "wsh connserver"
    // ... similar to SSHConn
}
```

--------------------------------

### Reinstall Wave Shell Extensions

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

Reinstalls the Wave Shell Extensions on a specified connection (SSH or WSL).

```APIDOC
## reinstall

### Description
This command reinstalls the Wave Shell Extensions on the specified connection.

### Usage

For ssh connections:
```sh
wsh conn reinstall [user@host]
```

For wsl connections:
```sh
wsh conn reinstall [wsl://<distribution-name>]
```
```

--------------------------------

### Search with Configured Search Engine

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

Performs a search using the configured search engine for the given query.

```sh
# Search with the configured search engine
wsh web open "wave terminal documentation"
```

--------------------------------

### Local Connection View Model Configuration

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/fe-conn-arch.md

Configure the connection name and status for local connections. The connection name can be an empty string, 'local', or 'local:gitbash'. The status is always 'connected' for local connections.

```typescript
connName = "" // or "local" or "local:gitbash"
connStatus = {
    status: "connected",
    connection: "",
    connected: true,
    activeconnnum: 0,  // No color assignment
    wshenabled: true   // Local WSH always available
}
```

--------------------------------

### WaveAI Options Type Definition

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/waveai-architecture.md

Defines the configuration options for AI requests, including model, API type, tokens, and various URL settings.

```go
type WaveAIOptsType struct {
    Model      string `json:"model"`
    APIType    string `json:"apitype,omitempty"`
    APIToken   string `json:"apitoken"`
    OrgID      string `json:"orgid,omitempty"`
    APIVersion string `json:"apiversion,omitempty"`
    BaseURL    string `json:"baseurl,omitempty"`
    ProxyURL   string `json:"proxyurl,omitempty"`
    MaxTokens  int    `json:"maxtokens,omitempty"`
    MaxChoices int    `json:"maxchoices,omitempty"`
    TimeoutMs  int    `json:"timeoutms,omitempty"`
}
```

--------------------------------

### Tool Input Available Part SSE Format

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/aisdk-streaming.md

Indicates that tool input is complete and ready for execution. This is a Server-Sent Event with a JSON object payload.

```text
data: {"type":"tool-input-available","toolCallId":"call_fJdQDqnXeGxTmr4E3YPSR7Ar","toolName":"getWeatherInformation","input":{"city":"San Francisco"}}

```

--------------------------------

### Handle Connection Change

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/fe-conn-arch.md

Updates block metadata with the selected connection and ensures the connection is established. Resets file path and clears working directory.

```typescript
const changeConnection = async (connName: string) => {
    // Update block metadata with new connection
    await RpcApi.SetMetaCommand(TabRpcClient, {
        oref: WOS.makeORef("block", blockId),
        meta: { 
            connection: connName,
            file: newFile,        // Reset file path for new connection
            "cmd:cwd": null      // Clear working directory
        }
    })
    
    // Ensure connection is established
    await RpcApi.ConnEnsureCommand(TabRpcClient, {
        connname: connName,
        logblockid: blockId
    }, { timeout: 60000 })
}
```

--------------------------------

### List Files with wsh

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

The `wsh file ls` command lists files in a directory, supporting various formats and filtering options. It can list files in local or remote directories.

```APIDOC
## wsh file ls

### Description
Lists files in a directory. By default, lists files in the current directory for the current terminal session.

### Usage
```sh
wsh file ls [flags] [file-uri]
```

### Examples
```sh
wsh file ls wsh://user@ec2/home/user/
wsh file ls ./local-dir/
```

### Flags
- `-l, --long`: Use long listing format showing size, timestamps, and metadata.
- `-1, --one`: List one file per line.
- `-f, --files`: List only files (no directories).

When output is piped to another command, automatically switches to one-file-per-line format:
```sh
# Easy to process with grep, awk, etc.
wsh file ls ./ | grep ".json$"
```
```

--------------------------------

### Global Controller Registry in Go

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/blockcontroller-lifecycle.md

The backend maintains a global map to store and access controller instances, keyed by their block IDs. Access to this registry is protected by a mutex for concurrent safety.

```go
var (
    controllerRegistry = make(map[string]Controller)
    registryLock       sync.RWMutex
)
```

--------------------------------

### Basic Wave Terminal Commands

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/gettingstarted.mdx

Execute basic commands within Wave Terminal using the `wsh` utility to interact with graphical features.

```bash
# View a file or directory
wsh view ~/Documents
```

```bash
# Open a webpage
wsh web open github.com
```

```bash
# Get AI assistance
wsh ai -m "how do I find large files in my current directory?" -s
```

--------------------------------

### Simplify treeReducer for Focus Updates

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/layout-simplification.md

Demonstrates the simplified `treeReducer` after removing generation tracking, allowing synchronous updates.

```typescript
treeReducer(action: LayoutTreeAction) {
  insertNode(this.treeState, action);  // generation++
  
  // CRITICAL: Must update focus manager BEFORE atom commits
  if (action.focused) {
    focusManager.requestNodeFocus();  // Synchronous!
  }
  
  // Then atom commits
  this.setter(this.treeStateAtom, ...);
  // Now isFocused sees correct focusType
}
```

```typescript
treeReducer(action: LayoutTreeAction) {
  insertNode(this.treeState, action);  // Just mutates local state
  
  // Update local atom (synchronous)
  this.setter(this.localTreeStateAtom, { ...this.treeState });
  
  // Update focus manager (order doesn't matter - both updated synchronously)
  if (action.focused) {
    focusManager.setBlockFocus();
  }
  
  // Both updates happen in same tick, no race condition possible!
}
```

--------------------------------

### Enable Telemetry via wsh Command

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/telemetry-old.mdx

Use this command to enable telemetry collection. This is an alternative to modifying the settings.json file.

```bash
wsh setconfig telemetry:enabled=true
```

--------------------------------

### Override Configuration Settings in WaveTerm

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/newview.md

Utilize `getOverrideConfigAtom` to create an atom that respects Wave's hierarchical configuration system (global, connection, block). The atom checks block meta, then connection config, and finally global settings, falling back to a default value if none are found.

```typescript
import { getOverrideConfigAtom } from "@/store/global";

this.settingAtom = jotai.atom((get) => {
    // Checks block meta, then connection config, then global settings
    return get(getOverrideConfigAtom(this.blockId, "myview:setting")) ?? defaultValue;
});
```

--------------------------------

### Backgrounds JSON File Format

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/tab-backgrounds.mdx

Defines the structure for custom background configurations, including display name, order, CSS background value, and opacity.

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

### Define a Connection Entirely in connections.json

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/connections.mdx

Configure SSH connection parameters like hostname, identity file, and identity-only settings directly within `connections.json`, bypassing the need for `~/.ssh/config`.

```json
{
    <... other connections go here ...>,
    "myusername@myhost" : {
        "ssh:hostname": "190.0.2.0",
        "ssh:identityfile": ["~/.ssh/myidentityfile"],
        "ssh:identitiesonly": true,
        "ssh:addkeystoagent": true
    },
    <... other connections go here ...>
}
```

--------------------------------

### Run with Custom Close Delay

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

Executes a command and specifies a custom delay before the block closes after successful completion.

```sh
# Run with custom close delay
wsh run -x --delay 5000 -- ./deployment.sh
```

--------------------------------

### Synchronize Connection State with Mutex

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/conn-arch.md

Use a Mutex to protect shared connection state modifications in SSHConn and WslConn.

```go
conn.Lock.Lock()
defer conn.Lock.Unlock()
// ... modify connection state
```

--------------------------------

### Wave AI Modes Configuration Architecture

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/aimodesconfig.md

Visual representation of the Wave AI Modes Configuration UI, showing the Mode List and Mode Editor panels.

```text
┌─────────────────────────────────────────────────────────┐
│  Wave AI Modes Configuration                            │
│  ┌───────────────┐  ┌──────────────────────────────┐   │
│  │               │  │                              │   │
│  │  Mode List    │  │    Mode Editor/Viewer        │   │
│  │               │  │                              │   │
│  │  [Quick]      │  │  Provider: [wave ▼]         │   │
│  │  [Balanced]   │  │                              │   │
│  │  [Deep]       │  │  Display Configuration       │   │
│  │  [Custom]     │  │  ├─ Name: ...                │   │
│  │               │  │  ├─ Icon: ...                │   │
│  │  [+ Add New]  │  │  └─ Description: ...         │   │
│  │               │  │                              │   │
│  │               │  │  Provider Configuration      │   │
│  │               │  │  (Provider-specific fields)  │   │
│  │               │  │                              │   │
│  │               │  │  [Save] [Delete] [Cancel]    │   │
│  └───────────────┘  └──────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

--------------------------------

### Optional useChat() Request Extensions

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/usechat-backend-design.md

Shows how to include optional parameters like temperature, maxTokens, and model overrides within the request payload.

```json
{
  "messages": [...],
  "options": {
    "temperature": 0.7,
    "maxTokens": 1000,
    "model": "gpt-4"  // Override preset model
  }
}
```

--------------------------------

### Send Input Status Command (I)

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/wave-osc-16162.md

Reports the current state of the command line input buffer, typically sent during ZLE hooks. Requires a JSON payload indicating if the buffer is empty.

```bash
# When buffer is empty
I;{"inputempty":true}

# When buffer has content
I;{"inputempty":false}
```

--------------------------------

### Subscribe to WPS Events

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/wps-events.md

Use `wps.Broker.Subscribe` to listen for specific events. You can subscribe to all events of a certain type or to specific scopes.

```go
wps.Broker.Subscribe(routeId, wps.SubscriptionRequest{
    Event:     wps.Event_YourNewEvent,
    AllScopes: true,
})
```

```go
wps.Broker.Subscribe(routeId, wps.SubscriptionRequest{
    Event:  wps.Event_WaveObjUpdate,
    Scopes: []string{"workspace:123"},
})
```

--------------------------------

### Open URL in Web Block

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

Opens a specified URL in a new web block within Wave Terminal.

```sh
# Open a URL
wsh web open https://waveterm.dev
```

--------------------------------

### OpenRouter AI Preset Configuration

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/ai-presets.mdx

Sets up an AI preset for OpenRouter, including display name, order, model, API token, and base URL.

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

### Reconciliation Algorithm: Build and Match Children

Source: https://github.com/wavetermdev/waveterm/blob/main/tsunami/engine/render.md

Implements React's key-based reconciliation logic. It first builds a map of existing children using ChildKey and then matches new elements against this map to determine reuse or remounting.

```go
// Build map of existing children by ChildKey
for idx, child := range curChildren {
    if child.Key != "" {
        curCM[ChildKey{Tag: child.Tag, Idx: 0, Key: child.Key}] = child
    } else {
        curCM[ChildKey{Tag: child.Tag, Idx: idx, Key: ""}] = child
    }
}

// Match new elements against existing map
for idx, elem := range elems {
    elemKey := getElemKey(&elem)
    if elemKey != "" {
        curChild = curCM[ChildKey{Tag: elem.Tag, Idx: 0, Key: elemKey}]
    } else {
        curChild = curCM[ChildKey{Tag: elem.Tag, Idx: idx, Key: ""}]
    }
    // Reuse existing component or create new one
}
```

--------------------------------

### Publish Event with Persistence

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/wps-events.md

Publish an event and specify the number of recent events to persist in memory for late subscribers. 'Persist: 100' keeps the last 100 events.

```go
wps.Broker.Publish(wps.WaveEvent{
    Event:   wps.Event_YourNewEvent,
    Persist: 100,  // Keep last 100 events
    Data:    data,
})
```

--------------------------------

### Open Secrets UI via CLI

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/secrets.mdx

Access the secrets management interface directly from the command line.

```bash
wsh secret ui
```

--------------------------------

### Stream request with web search tool (Python)

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/anthropic-streaming.md

This Python script utilizes the Anthropic client library to make a streaming API call. It configures the model to use the web search tool for fetching current weather data and prints the streamed response.

```python
import anthropic

client = anthropic.Anthropic()

with client.messages.stream(
    model="claude-opus-4-1-20250805",
    max_tokens=1024,
    tools=[
        {
            "type": "web_search_20250305",
            "name": "web_search",
            "max_uses": 5
        }
    ],
    messages=[
        {
            "role": "user",
            "content": "What is the weather like in New York City today?"
        }
    ],
) as stream:
    for text in stream.text_stream:
        print(text, end="", flush=True)
```

--------------------------------

### Go Struct for AI Mode Configuration

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/aimodesconfig.md

Defines the structure for AI mode configurations, including display settings, provider details, AI behavior parameters, and connection information. Used for parsing and managing AI mode settings in Wave Terminal.

```go
type AIModeConfigType struct {
    // Display Configuration
    DisplayName        string   `json:"display:name"`         // Required
    DisplayOrder       float64  `json:"display:order,omitempty"`
    DisplayIcon        string   `json:"display:icon,omitempty"`
    DisplayShortDesc   string   `json:"display:shortdesc,omitempty"`
    DisplayDescription string   `json:"display:description,omitempty"`
    
    // Provider & Model
    Provider           string   `json:"ai:provider,omitempty"`     // wave, google, openrouter, openai, azure, azure-legacy, custom
    APIType            string   `json:"ai:apitype"`                // Required: anthropic-messages, openai-responses, openai-chat
    Model              string   `json:"ai:model"`                  // Required
    
    // AI Behavior
    ThinkingLevel      string   `json:"ai:thinkinglevel,omitempty"` // low, medium, high
    Capabilities       []string `json:"ai:capabilities,omitempty"`  // pdfs, images, tools
    
    // Connection Details
    Endpoint           string   `json:"ai:endpoint,omitempty"`
    APIVersion         string   `json:"ai:apiversion,omitempty"`
    APIToken           string   `json:"ai:apitoken,omitempty"`
    APITokenSecretName string   `json:"ai:apitokensecretname,omitempty"`
    
    // Azure-Specific
    AzureResourceName  string   `json:"ai:azureresourcename,omitempty"`
    AzureDeployment    string   `json:"ai:azuredeployment,omitempty"`
    
    // Wave AI Specific
    WaveAICloud        bool     `json:"waveai:cloud,omitempty"`
    WaveAIPremium      bool     `json:"waveai:premium,omitempty"`
}
```

--------------------------------

### Edit Configuration File

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/config.mdx

Open the termthemes.json configuration file directly using the 'wsh editconfig' command.

```shell
wsh editconfig termthemes.json
```

--------------------------------

### Thinking Configuration

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/anthropic-messages-api.md

Enables Claude's extended thinking process, where responses include intermediate `thinking` content blocks before the final answer. This requires additional tokens.

```APIDOC
## Thinking Configuration

### Description
Configuration for enabling Claude's extended thinking. When enabled, responses include `thinking` content blocks showing Claude's thinking process before the final answer. Requires a minimum budget of 1,024 tokens and counts towards your `max_tokens` limit. See [extended thinking](https://docs.anthropic.com/en/docs/build-with-claude/extended-thinking) for details.

### Discriminator
propertyName: type
mapping:
  disabled: "#/components/schemas/ThinkingConfigDisabled"
  enabled: "#/components/schemas/ThinkingConfigEnabled"

### Types
oneOf:
  - $ref: "#/components/schemas/ThinkingConfigEnabled"
  - $ref: "#/components/schemas/ThinkingConfigDisabled"
```

--------------------------------

### Synchronize Controller Registry Access

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/conn-arch.md

Employ read-write locks for the controller registry to allow concurrent reads while ensuring exclusive access for modifications.

```go
registryLock.RLock()       // Read lock for lookups
registryLock.Lock()        // Write lock for modifications
```

--------------------------------

### Equivalent Message Content Formats

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/anthropic-messages-api.md

Compares two equivalent ways to format message content: as a simple string and as an array with a text content block.

```json
{"role": "user", "content": "Hello, Claude"}
```

```json
{"role": "user", "content": [{"type": "text", "text": "Hello, Claude"}]}
```

--------------------------------

### Backend ResyncController RPC Endpoint Signature

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/blockcontroller-lifecycle.md

This Go function signature defines the entry point for the ResyncController RPC, handling requests from the frontend to synchronize or restart a controller process. It accepts context, tab and block IDs, runtime options, and a force flag.

```go
func ResyncController(ctx context.Context, tabId, blockId string, 
                      rtOpts *waveobj.RuntimeOpts, force bool) error
```

--------------------------------

### Configure Azure OpenAI Legacy Deployment

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/waveai-modes.mdx

Uses the azure-legacy provider for older deployments, requiring both the resource name and the specific deployment name.

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

### Send Notification with Custom Title

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

Creates a desktop notification with a custom title and message.

```sh
# Notification with custom title
wsh notify -t "Deployment Status" "Production deployment finished"
```

--------------------------------

### Read Block Metadata in WaveTerm

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/newview.md

Import `getBlockMetaKeyAtom` to create an atom for reading specific metadata keys from a block. This is typically done in the constructor and then used within a component via `useAtomValue`.

```typescript
import { getBlockMetaKeyAtom } from "@/store/global";

// In constructor:
this.someFlag = getBlockMetaKeyAtom(blockId, "myview:flag");

// In component:
const flag = useAtomValue(model.someFlag);
```

--------------------------------

### File Part SSE Format

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/aisdk-streaming.md

Contains references to files with their media type. This is a Server-Sent Event with a JSON object payload.

```text
data: {"type":"file","url":"https://example.com/file.png","mediaType":"image/png"}

```

--------------------------------

### SSH Known Hosts Verification Callback

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/conn-arch.md

Callback function for verifying SSH host keys against known_hosts files and prompting the user for unknown hosts.

```go
createHostKeyCallback()
```

--------------------------------

### Send Input to Block Controller

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/fe-conn-arch.md

Use this command to send input data to a block's controller. The data is Base64-encoded to support binary content. Requires an RpcClient instance.

```typescript
ControllerInputCommand(
    client: RpcClient,
    data: { blockid: string, inputdata64: string }
): Promise<void>
```

--------------------------------

### SSH Connection States

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/fe-conn-arch.md

Illustrates different connection states for SSH, including connecting, connected with WSH, connected without WSH, and error states. Each state shows relevant properties like status, connection details, and WSH enablement.

```typescript
// Connecting
connStatus = {
    status: "connecting",
    connection: "user@host",
    connected: false,
    activeconnnum: 3,
    wshenabled: false  // Not yet determined
}

// Connected with WSH
connStatus = {
    status: "connected", 
    connection: "user@host",
    connected: true,
    activeconnnum: 3,
    wshenabled: true
}

// Connected without WSH
connStatus = {
    status: "connected",
    connection: "user@host",
    connected: true,
    activeconnnum: 3,
    wshenabled: false,
    wsherror: "wsh installation failed: permission denied"
}

// Error
connStatus = {
    status: "error",
    connection: "user@host",
    connected: false,
    activeconnnum: 3,
    wshenabled: false,
    error: "ssh: connection refused"
}
```

--------------------------------

### Setting Block Metadata via wsh

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/config-system.md

Use the `wsh` command-line tool to set metadata for blocks. This allows for granular configuration overrides at the block or connection level.

```bash
# Set for current block
wsh setmeta namespace:setting=value
```

```bash
# Set for specific block
wsh setmeta --block BLOCK_ID namespace:setting=value
```

--------------------------------

### Backend Detection of Thinking Models

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/usechat-backend-design.md

This Go backend code snippet shows how to detect and format 'thinking models' for streaming. It separates thinking content from regular response text by prefixing each with 'data: ' and a JSON payload, followed by a double newline.

```go
// Backend detects thinking models and formats appropriately
if isThinkingModel(aiOpts.Model) {
    // Send thinking content separately
    fmt.Fprintf(w, "data: {\"type\":\"thinking\",\"text\":%q}\n\n", thinkingText)
    fmt.Fprintf(w, "data: {\"type\":\"text\",\"text\":%q}\n\n", responseText)
}
```

--------------------------------

### Ensure Connection

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

Ensures that a connection to the specified host (SSH or WSL) is active. If not already connected, it will establish a connection.

```APIDOC
## ensure

### Description
This command connects to the specified connection if it isn't already connected.

### Usage

For ssh connections:
```sh
wsh conn ensure [user@host]
```

For wsl connections:
```sh
wsh conn ensure [wsl://<distribution-name>]
```
```

--------------------------------

### Clone Wave Terminal Repository (HTTPS)

Source: https://github.com/wavetermdev/waveterm/blob/main/BUILD.md

Clones the Wave Terminal repository using HTTPS.

```sh
git clone https://github.com/wavetermdev/waveterm.git
```

--------------------------------

### Set Configuration

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

Allows modification of configuration settings in the `config/settings.json` file. It validates the provided configuration option.

```APIDOC
## setconfig

### Description
This allows setting various options in the `config/settings.json` file. It will check to be sure a valid config option was provided.

### Command
```sh
wsh setconfig [<config-name>=<config-value>]
```
```

--------------------------------

### Tool Output Available Part SSE Format

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/aisdk-streaming.md

Contains the result of tool execution. This is a Server-Sent Event with a JSON object payload.

```text
data: {"type":"tool-output-available","toolCallId":"call_fJdQDqnXeGxTmr4E3YPSR7Ar","output":{"city":"San Francisco","weather":"sunny"}}

```

--------------------------------

### Route AI Requests by API Type

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/waveai-architecture.md

This Go function routes incoming AI requests to the appropriate backend based on the APIType specified in the request options. It handles specific providers like Anthropic, Perplexity, and Google, with a fallback to OpenAI or WaveAI Cloud for unknown types.

```go
func RunAICommand(ctx context.Context, request wshrpc.WaveAIStreamRequest) chan wshrpc.RespOrErrorUnion[wshrpc.WaveAIPacketType] {
    // Route based on request.Opts.APIType:
    switch request.Opts.APIType {
    case "anthropic":
        backend = AnthropicBackend{}
    case "perplexity":
        backend = PerplexityBackend{}
    case "google":
        backend = GoogleBackend{}
    default:
        if IsCloudAIRequest(request.Opts) {
            backend = WaveAICloudBackend{}
        } else {
            backend = OpenAIBackend{}
        }
    }
    return backend.StreamCompletion(ctx, request)
}
```

--------------------------------

### Connection Management Commands

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/fe-conn-arch.md

RPC commands for listing, ensuring, connecting, and disconnecting various types of connections.

```APIDOC
## ConnListCommand

### Description
Returns a list of configured SSH connection names. This is used by the connection modal to populate the list of remote connections and filters out connections marked with `display:hidden` configuration.

### Method
ConnListCommand(client: RpcClient): Promise<string[]>

## WslListCommand

### Description
Returns a list of installed WSL distribution names. This command is Windows-specific and will fail silently on other platforms. Connection names are formatted as `wsl://[distro]`.

### Method
WslListCommand(client: RpcClient): Promise<string[]>

## ConnListAWSCommand

### Description
Returns a list of AWS profile names from the AWS configuration file. This is used for S3 preview connections. Connection names are formatted as `aws:[profile]`.

### Method
ConnListAWSCommand(client: RpcClient): Promise<string[]>

## ConnEnsureCommand

### Description
Ensures that a specified connection is in a "connected" state. It will trigger a connection if one is not already active and waits for the connection to complete or time out. This command is used before file operations and by view models.

### Method
ConnEnsureCommand(client: RpcClient, data: { connname: string, logblockid?: string }): Promise<void>

## ConnConnectCommand

### Description
Explicitly connects to a specified host. This command is used by the "Reconnect" action in the overlay. It returns once the connection succeeds or fails.

### Method
ConnConnectCommand(client: RpcClient, data: { host: string, logblockid?: string }): Promise<void>

## ConnDisconnectCommand

### Description
Disconnects an active connection. This command is used by the "Disconnect" action in the connection modal and closes all shells and processes associated with that connection.

### Method
ConnDisconnectCommand(client: RpcClient, connName: string): Promise<void>

## SetMetaCommand

### Description
Updates block metadata, including connection information. This is used when changing a block's connection and triggers the backend to switch the connection context.

### Method
SetMetaCommand(client: RpcClient, data: { oref: string, meta: MetaType }): Promise<void>

## SetConnectionsConfigCommand

### Description
Updates connection-level configuration, persisting changes to the configuration file. This is used, for example, to disable WSH by setting `conn:wshenabled` to `false`.

### Method
SetConnectionsConfigCommand(client: RpcClient, data: { host: string, metamaptype: any }): Promise<void>
```

--------------------------------

### Configure OpenRouter Provider

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/waveai-modes.mdx

Configuration for OpenRouter. Capabilities must be manually specified based on the model's features.

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

### File Info

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

Retrieves and displays information about a file, including size, creation time, modification time, and metadata. Supports local files and remote files via WSH URIs.

```APIDOC
### info

#### Description
Display information about a file including size, creation time, modification time, and metadata.

#### Command
```sh
wsh file info [file-uri]
```

#### Examples
```sh
wsh file info wsh://user@ec2/home/user/config.txt
wsh file info ./local-config.txt
```
```

--------------------------------

### CLI Integration with Wave AI

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/waveai.mdx

Use the `wsh ai` command to interact with Wave AI from your terminal. Supports piping output, attaching files with messages, and auto-submitting with output. Use `-n` for a new chat and `-s` to auto-submit.

```bash
git diff | wsh ai - 

```

```bash
wsh ai main.go -m "find bugs" 

```

```bash
wsh ai $(tail -n 500 my.log) -m "review" -s  # Auto-submit with output

```

--------------------------------

### Copy Files Between Systems

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

Copies files between different storage systems (local, SSH, WSL) with support for flags like force and merge. Maximum file size is 10MB.

```sh
wsh file cp [flags] [source-uri] [destination-uri]
```

```sh
# Copy a remote file to your local filesystem
wsh file cp wsh://user@ec2/home/user/config.txt ./local-config.txt
```

```sh
# Copy a local file to a remote system
wsh file cp ./local-config.txt wsh://user@ec2/home/user/config.txt
```

```sh
# Copy between remote systems
wsh file cp wsh://user@ec2/home/user/config.txt wsh://user@server2/home/user/backup.txt
```

--------------------------------

### Wave AI Frontend Data Flow

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/waveai-architecture.md

Illustrates the data flow within the Wave AI frontend, from user input to streaming response handling.

```plaintext
User Input → sendMessage() → 
├── Add user message to UI
├── Create WaveAIStreamRequest
├── Call RpcApi.StreamWaveAiCommand()
├── Add typing indicator
└── Stream response handling:
    ├── Update message incrementally
    ├── Handle errors
    └── Save complete conversation
```

--------------------------------

### Enable Beta Updates for Wave Term

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/faq.mdx

Configure Wave Term to receive beta updates by setting the autoupdate channel to 'beta' in your settings.json. This requires enabling autoupdate.

```json
"autoupdate:enabled": true,
"autoupdate:channel": "beta"
```

--------------------------------

### Write Data to File

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

Writes data from stdin to a file on a local or remote system (maximum file size 10MB). Use URIs to specify the destination.

```sh
wsh file write [file-uri]
```

```sh
echo "hello" | wsh file write ./greeting.txt
```

```sh
cat config.json | wsh file write //ec2-user@remote01/~/config.json
```

--------------------------------

### Configure OpenAI Provider

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/waveai-modes.mdx

Basic configuration for OpenAI models. The provider automatically handles endpoint and secret name settings.

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

### Enable Extended Thinking with Streaming (cURL)

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/anthropic-streaming.md

Use this cURL command to send a request to the Anthropic API with extended thinking enabled and streaming turned on. Ensure your ANTHROPIC_API_KEY is set in your environment.

```bash
curl https://api.anthropic.com/v1/messages \
     --header "x-api-key: $ANTHROPIC_API_KEY" \
     --header "anthropic-version: 2023-06-01" \
     --header "content-type: application/json" \
     --data \
  '{
      "model": "claude-opus-4-1-20250805",
      "max_tokens": 20000,
      "stream": true,
      "thinking": {
          "type": "enabled",
          "budget_tokens": 16000
      },
      "messages": [
          {
              "role": "user",
              "content": "What is 27 * 453?"
          }
      ]
  }'
```

--------------------------------

### Connect to a Remote Host

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

Connects to a specified remote host (SSH or WSL) without creating a dedicated block for it.

```APIDOC
## connect

### Description
This command connects to the specified connection but does not create a block for it.

### Usage

For ssh connections:
```sh
wsh conn connect [user@host]
```

For wsl connections:
```sh
wsh conn connect [wsl://<distribution-name>]
```
```

--------------------------------

### Set background image or color with setbg

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

The `wsh setbg` command allows setting background images or colors for the current tab with various customization options like opacity, tiling, and centering.

```bash
wsh setbg [--opacity value] [--tile|--center] [--size value] [--border-color color] [--active-border-color color] (image-path|"#color"|color-name)
```

```bash
wsh setbg ~/pictures/background.jpg
```

```bash
wsh setbg --opacity 0.3 ~/pictures/light-pattern.png
```

```bash
wsh setbg --tile --opacity 0.2 ~/pictures/texture.png
```

```bash
wsh setbg --center ~/pictures/logo.png
```

```bash
wsh setbg --center --size 200px ~/pictures/logo.png
```

```bash
wsh setbg "#ff0000"
```

```bash
wsh setbg forestgreen
```

```bash
wsh setbg --opacity 0.7
```

```bash
wsh setbg --border-color "#ff0000" --active-border-color "#00ff00" ~/pictures/background.jpg
```

```bash
wsh setbg --border-color steelblue forestgreen
```

```bash
wsh setbg --clear
```

```bash
wsh setbg --print "#ff0000"
```

--------------------------------

### Tsunami Builder Compilation Error Format

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/tsunami-builder.md

Illustrates the format in which compilation errors are presented to the AI, including the file, line number, code context, and error message.

```plaintext
COMPILATION FAILED

Error at line 45:
  43 | func(props TodoProps) any {
  44 |     return vdom.H("div", nil
> 45 |         vdom.H("span", nil, "test")
     |         ^ missing closing parenthesis
  46 |     )

Message: expected ')', found 'vdom'
```

--------------------------------

### Proposed Write Cache Architecture Flow

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/layout-simplification.md

Presents the simplified flow of the proposed 'write cache' pattern, emphasizing immediate local atom updates and asynchronous, fire-and-forget persistence.

```text
User action
  ↓
Update LOCAL atom (immediate, synchronous)
  ↓
React re-renders (single tick, all atoms see new state)
  ↓
[async, fire-and-forget] Persist to WaveObject
```

--------------------------------

### Define Multiple AI Modes

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/waveai-modes.mdx

Configure multiple AI modes with custom display names, ordering, and provider endpoints.

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

### Stream request with web search tool (cURL)

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/anthropic-streaming.md

Use this cURL command to send a streaming request to the Anthropic API, enabling the web search tool to find current weather information. Ensure your ANTHROPIC_API_KEY is set as an environment variable.

```bash
curl https://api.anthropic.com/v1/messages \
     --header "x-api-key: $ANTHROPIC_API_KEY" \
     --header "anthropic-version: 2023-06-01" \
     --header "content-type: application/json" \
     --data \
  '{
      "model": "claude-opus-4-1-20250805",
      "max_tokens": 1024,
      "stream": true,
      "tools": [
          {
              "type": "web_search_20250305",
              "name": "web_search",
              "max_uses": 5
          }
      ],
      "messages": [
          {
              "role": "user",
              "content": "What is the weather like in New York City today?"
          }
      ]
  }'
```

--------------------------------

### Declare API Key Secret with ConfigAtom

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/tsunami-builder.md

Use app.ConfigAtom to declare secrets like API keys. Set 'Secret: true' to ensure the value is treated as sensitive.

```go
var apiKeyAtom = app.ConfigAtom("api_key", "", &app.AtomMeta{
    Desc: "OpenAI API Key",
    Secret: true,
})
```

--------------------------------

### Keyboard Navigation with Focus Manager

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/waveai-focus-updates.md

This function integrates keyboard navigation with the focus manager. It checks the current focus type and directs navigation, including switching focus from Wave AI to blocks or vice-versa, ensuring proper focus handling during directional navigation.

```typescript
function switchBlockInDirection(tabId: string, direction: NavigateDirection) {
  const layoutModel = getLayoutModelForTabById(tabId);
  const focusType = focusManager.getFocusType();

  if (direction === NavigateDirection.Left) {
    const numBlocks = globalStore.get(layoutModel.numLeafs);
    if (focusType === "waveai") {
      return;
    }
    if (numBlocks === 1) {
      focusManager.requestWaveAIFocus();
      return;
    }
  }

  // For right navigation, switch from Wave AI to blocks
  if (direction === NavigateDirection.Right && focusType === "waveai") {
    focusManager.requestNodeFocus();
    return;
  }

  // Rest of navigation logic...
}
```

--------------------------------

### Preview View Model Connection Management

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/fe-conn-arch.md

Manages connection status and ensures connection for file operations. Use for components that require a stable connection for file access.

```typescript
class PreviewModel implements ViewModel {
    // Always manages connection
    manageConnection = atom(true)
    
    // Connection status
    connStatus = atom((get) => {
        const blockData = get(this.blockAtom)
        const connName = blockData?.meta?.connection
        const connAtom = getConnStatusAtom(connName)
        return get(connAtom)
    })
    
    // Filter out connections without WSH (file ops require WSH)
    filterOutNowsh = atom(true)
    
    // Ensure connection before operations
    connection = atom<Promise<string>>(async (get) => {
        const connName = get(this.blockAtom)?.meta?.connection
        try {
            await RpcApi.ConnEnsureCommand(TabRpcClient, {
                connname: connName
            }, { timeout: 60000 })
            globalStore.set(this.connectionError, "")
        } catch (e) {
            globalStore.set(this.connectionError, e as string)
        }
        return connName
    })
}
```

--------------------------------

### File Operations (Connection-Aware)

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/fe-conn-arch.md

RPC commands for performing file operations that are aware of the active connection context.

```APIDOC
## FileInfoCommand

### Description
Retrieves file metadata such as size, type, and permissions. The path format is `[connName]:[filepath]`, for example, `user@host:~/file.txt`. This command utilizes the connection's WSH for remote files.

### Method
FileInfoCommand(client: RpcClient, data: { info: { path: string } }): Promise<FileInfo>

## FileReadCommand

### Description
Reads the content of a file as a base64 encoded string. Supports streaming for large files. Remote files are read using the connection's WSH.

### Method
FileReadCommand(client: RpcClient, data: { info: { path: string } }): Promise<FileData>
```

--------------------------------

### Define New Event Constant

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/wps-events.md

Add a new event type constant to wpstypes.go. Use descriptive PascalCase for the constant name and lowercase with colons for the string value.

```go
const (
    Event_BlockClose       = "blockclose"
    Event_ConnChange       = "connchange"
    // ... other events ...
    Event_YourNewEvent     = "your:newevent"  // Use colon notation for namespacing
)
```

--------------------------------

### Header-based Configuration Overrides for AI Chat

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/usechat-backend-design.md

Demonstrates how to override AI model and temperature settings using custom HTTP headers. This provides a way to dynamically adjust AI behavior without changing the API endpoint or request body.

```plaintext
POST /api/ai/chat/block-123
X-AI-Model: gpt-4-turbo
X-AI-Temperature: 0.8
```

--------------------------------

### Font Size Atom with Connection Override

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/fe-conn-arch.md

Calculates the font size for a block, prioritizing block meta, then connection config, then global settings. Includes a fallback default and bounds checking.

```typescript
// Font size with connection override
fontSizeAtom = atom((get) => {
    const blockData = get(this.blockAtom)
    const connName = blockData?.meta?.connection
    const fullConfig = get(atoms.fullConfigAtom)
    
    // Check: block meta > connection config > global settings
    const fontSize = blockData?.meta?.["term:fontsize"] ??
                     fullConfig?.connections?.[connName]?.[ "term:fontsize"] ??
                     get(getSettingsKeyAtom("term:fontsize")) ??
                     12
    
    return boundNumber(fontSize, 4, 64)
})
```

--------------------------------

### Reorder a Connection in connections.json

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/connections.mdx

Use `display:order` to change the position of a connection in the dropdown list. Assign a numerical value to control its order.

```json
{
    <... other connections go here ...>,
    "myusername@rarelyused:9999" : {
        "display:order": 100
    },
    <... other connections go here ...>
}
```

--------------------------------

### Server-Sent Event: Finish Step

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/aisdk-streaming.md

Use this Server-Sent Event to indicate that a step in a multi-turn LLM interaction has been completed. This is crucial for managing stitched assistant calls and tool usage within steps.

```text
data: {"type":"finish-step"}

```

--------------------------------

### Basic Terminal Widget Configuration

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/customwidgets.mdx

Defines a basic terminal widget that runs a CLI command. Use 'term' for the view and 'cmd' for the controller to enable a refresh button.

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

--------------------------------

### Connections

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

Provides subcommands for various connection-related features.

```APIDOC
## conn

This has several subcommands which all perform various features related to connections.
```

--------------------------------

### Compute and Execute Move Actions

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/layout.md

Illustrates the structure of actions for computing a node move operation during drag and executing the move upon drop. Requires `LayoutTreeActionType` and `DropDirection` enums.

```typescript
// 1. Compute operation during drag
const computeAction: LayoutTreeComputeMoveNodeAction = {
    type: LayoutTreeActionType.ComputeMove,
    nodeId: targetNodeId,
    nodeToMoveId: draggedNodeId,
    direction: DropDirection.Right
};

// 2. Execute on drop
const moveAction: LayoutTreeMoveNodeAction = {
    type: LayoutTreeActionType.Move,
    parentId: newParentId,
    index: insertIndex,
    node: nodeToMove
};
```

--------------------------------

### Source URL Part SSE Format

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/aisdk-streaming.md

References to external URLs. This is a Server-Sent Event with a JSON object payload.

```text
data: {"type":"source-url","sourceId":"https://example.com","url":"https://example.com"}

```

--------------------------------

### Preview View Model File Operations

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/fe-conn-arch.md

Provides methods to read file information and content from a remote or local connection. Use for accessing file metadata and data within the application.

```typescript
// Reads file from remote/local connection
statFile = atom<Promise<FileInfo>>(async (get) => {
    const fileName = get(this.metaFilePath)
    const path = await this.formatRemoteUri(fileName, get)
    
    return await RpcApi.FileInfoCommand(TabRpcClient, {
        info: { path }
    })
})

fullFile = atom<Promise<FileData>>(async (get) => {
    const fileName = get(this.metaFilePath)
    const path = await this.formatRemoteUri(fileName, get)
    
    return await RpcApi.FileReadCommand(TabRpcClient, {
        info: { path }
    })
})
```

--------------------------------

### Helper for Batch Object Updates

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/wps-events.md

A helper function `SendUpdateEvents` to publish multiple object updates efficiently. Each update is published as a separate `WaveObjUpdate` event.

```go
func (b *BrokerType) SendUpdateEvents(updates waveobj.UpdatesRtnType) {
    for _, update := range updates {
        b.Publish(WaveEvent{
            Event:  Event_WaveObjUpdate,
            Scopes: []string{waveobj.MakeORef(update.OType, update.OID).String()},
            Data:   update,
        })
    }
}
```

--------------------------------

### Configure Ollama for WaveAI

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/waveai-modes.mdx

Use this JSON structure to connect to a local Ollama instance. The ai:apitoken field is mandatory even though Ollama does not validate it.

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

### Remote Development with wsh ssh, edit, and run

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh.mdx

Facilitate remote development by connecting to servers using wsh ssh, editing remote files with wsh edit, and monitoring logs with wsh run. Share variables between sessions using wsh setvar.

```bash
# Connect to remote server with optional key
wsh ssh -i ~/.ssh/mykey.pem dev@server
```

```bash
# Edit remote files
wsh edit /etc/nginx/nginx.conf
```

```bash
# Monitor remote logs
wsh run -- tail -f /var/log/app.log
```

```bash
# Share variables between sessions
wsh setvar -b tab SHARED_ENV=staging
```

--------------------------------

### Open Secrets UI in Magnified Mode

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

Use this command to open the secrets UI in a magnified view. The secrets UI allows for visual management of secrets, avoiding the need for the command line.

```bash
wsh secret ui -m
```

--------------------------------

### Use Appropriate Timeouts for RPC Commands

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/fe-conn-arch.md

Use appropriate timeouts for RPC commands. Connection operations typically require longer timeouts (e.g., 60 seconds), while list operations can use shorter timeouts (e.g., 2 seconds).

```typescript
// Connection operations: longer timeout
{ timeout: 60000 }  // 60 seconds

// List operations: shorter timeout
{ timeout: 2000 }   // 2 seconds
```

--------------------------------

### File Write

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

Writes data from standard input to a specified file. Supports local files and remote files via WSH URIs. Maximum file size is 10MB.

```APIDOC
### write

#### Description
Write data from stdin to a file. The maximum file size is 10MB.

#### Command
```sh
wsh file write [file-uri]
```

#### Examples
```sh
echo "hello" | wsh file write ./greeting.txt
cat config.json | wsh file write //ec2-user@remote01/~/config.json
```
```

--------------------------------

### Standard useChat() Request Format

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/usechat-backend-design.md

Illustrates the JSON structure for sending a complete conversation history from the frontend to the backend, including the latest user message.

```json
{
  "messages": [
    {
      "id": "msg-1",
      "role": "user",
      "content": "Hello world"
    },
    {
      "id": "msg-2",
      "role": "assistant",
      "content": "Hi there!"
    },
    {
      "id": "msg-3",
      "role": "user",
      "content": "How are you?"  // <- NEW message user just typed
    }
  ]
}
```

--------------------------------

### Clone Wave Terminal Repository (SSH)

Source: https://github.com/wavetermdev/waveterm/blob/main/BUILD.md

Clones the Wave Terminal repository using SSH.

```sh
git clone git@github.com:wavetermdev/waveterm.git
```

--------------------------------

### Enable Extended Thinking with Streaming (Python)

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/anthropic-streaming.md

This Python code snippet shows how to use the Anthropic SDK to stream responses with extended thinking enabled. It iterates through the stream, printing thinking deltas and text deltas as they arrive.

```python
import anthropic

client = anthropic.Anthropic()

with client.messages.stream(
    model="claude-opus-4-1-20250805",
    max_tokens=20000,
    thinking={
        "type": "enabled",
        "budget_tokens": 16000
    },
    messages=[
        {
            "role": "user",
            "content": "What is 27 * 453?"
        }
    ],
) as stream:
    for event in stream:
        if event.type == "content_block_delta":
            if event.delta.type == "thinking_delta":
                print(event.delta.thinking, end="", flush=True)
            elif event.delta.type == "text_delta":
                print(event.delta.text, end="", flush=True)
```

--------------------------------

### Resolve Environment Variables in Config

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/config.mdx

Use $ENV:VARIABLE_NAME or $ENV:VARIABLE_NAME:fallback syntax to inject environment variables into any string value in Wave configuration files. This prevents hardcoding secrets.

```json
{
  "ai:apitoken": "$ENV:OPENAI_APIKEY",
  "ai:baseurl": "$ENV:AI_BASEURL:https://api.openai.com/v1"
}
```

--------------------------------

### Edit AI Presets Configuration

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/ai-presets.mdx

Use the `wsh editconfig` command to open the AI presets configuration file in your default editor.

```bash
wsh editconfig presets/ai.json
```

--------------------------------

### Basic Claude AI Preset Configuration

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/ai-presets.mdx

Defines a basic AI preset for Claude 3 Sonnet, including display name, order, API type, model, and API token.

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

### Basic Container Query Usage in Tailwind v4

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/tailwind-container-queries.md

Use the `@container` directive to mark a parent element and then apply container query prefixes like `@sm:` to child elements. These prefixes respond to the container's width, not the viewport.

```html
<aside class="@container w-64 bg-gray-100">
  <div class="w-32 @sm:w-48 @md:w-64 bg-blue-500">Content</div>
</aside>
```

--------------------------------

### Source Document Part SSE Format

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/aisdk-streaming.md

References to documents or files. This is a Server-Sent Event with a JSON object payload.

```text
data: {"type":"source-document","sourceId":"https://example.com","mediaType":"file","title":"Title"}

```

--------------------------------

### AI Preset Configuration Structure

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/waveai-architecture.md

Defines the JSON structure for configuring AI presets, including display names, model details, API credentials, and UI-specific settings. Ensure API tokens are handled securely.

```json
{
  "ai@preset-name": {
    "display:name": "Preset Display Name",
    "display:order": 1,
    "ai:model": "gpt-4",
    "ai:apitype": "openai",
    "ai:apitoken": "sk-...",
    "ai:baseurl": "https://api.openai.com/v1",
    "ai:maxtokens": 4000,
    "ai:fontsize": "14px",
    "ai:fixedfontsize": "12px"
  }
}
```

--------------------------------

### Set Default AI Mode via CLI

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/waveai-modes.mdx

Configures the default AI mode using the wsh command-line interface.

```bash
wsh setconfig waveai:defaultmode="ollama-llama"
```

--------------------------------

### Set Tab Background Image

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/customization.mdx

Use the `wsh setbg` command to set an image as a tab background. Supports various image formats and opacity adjustments.

```bash
# Set an image background with 50% opacity (default)
wsh setbg ~/pictures/background.jpg
```

```bash
# Set a color background (use quotes to prevent # being interpreted as a shell comment)
wsh setbg "#ff0000"          # hex color
wsh setbg forestgreen        # CSS color name
```

```bash
# Adjust opacity
wsh setbg --opacity 0.3 ~/pictures/light-pattern.png
wsh setbg --opacity 0.7      # change only opacity of current background
```

```bash
# Image positioning options
wsh setbg --tile ~/pictures/texture.png          # create tiled pattern
wsh setbg --center ~/pictures/logo.png           # center without scaling
wsh setbg --center --size 200px ~/pictures/logo.png  # center with specific size (px, %, auto)
```

```bash
# Remove background
wsh setbg --clear
```

--------------------------------

### Wave AI Input Smart Blur Handling

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/waveai-focus-updates.md

Simplifies blur handling for the Wave AI input component using `waveAIHasFocusWithin()` to determine if focus is truly leaving the Wave AI panel.

```typescript
// MODIFY: handleFocus - advisory only
const handleFocus = useCallback(() => {
  focusManager.requestWaveAIFocus();
}, []);

// MODIFY: handleBlur - simplified with waveAIHasFocusWithin()
const handleBlur = useCallback((e: React.FocusEvent) => {
  // Window blur - preserve state
  if (e.relatedTarget === null) {
    return;
  }

  // Still within Wave AI (focus or selection) - don't revert
  if (waveAIHasFocusWithin()) {
    return;
  }

  // Focus truly leaving Wave AI, revert to node focus
  focusManager.requestNodeFocus();
}, []);
```

--------------------------------

### User/Assistant Message with Text and Image

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/openai-request.md

Represents a user or assistant message containing both text and an image. The content must be an array of blocks, not a plain string.

```json
{
  "role": "user",
  "content": [
    {
      "type": "input_text",
      "text": "Hello, analyze this image"
    },
    {
      "type": "input_image",
      "image_url": "data:image/png;base64,iVBORw0KG..."
    }
  ]
}
```

--------------------------------

### Temperature Configuration

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/anthropic-messages-api.md

Configures the amount of randomness injected into the response. Use lower values for analytical tasks and higher values for creative tasks. Defaults to 1.0.

```yaml
temperature: 1
```

--------------------------------

### Theme and Style a Connection in connections.json

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/connections.mdx

Customize the appearance of a connection's terminal widgets using `term:theme`, `term:fontsize`, and `term:fontfamily`. These settings apply only to widgets using this specific connection.

```json
{
    <... other connections go here ...>,
    "myusername@myhost" : {
        "term:theme": "warmyellow",
        "term:fontsize": 16,
        "term:fontfamily": "menlo"
    },
    <... other connections go here ...>
}
```

--------------------------------

### Publish Connection Status Change Event

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/conn-arch.md

Publish connection status changes using the Wave Publish/Subscribe system, specifying relevant scopes and the connection status data.

```go
wps.Broker.Publish(wps.WaveEvent{
    Event: wps.Event_ConnChange,
    Scopes: []string{fmt.Sprintf("connection:%s", connName)},
    Data: connStatus,
})
```

--------------------------------

### Connect to a Remote System

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

Connects to a specified SSH or WSL connection without creating a block for it. Useful for establishing a connection in the background.

```sh
wsh conn connect [user@host]
```

```sh
wsh conn connect [wsl://<distribution-name>]
```

--------------------------------

### Manage Blocks with wsh

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh.mdx

Control Wave blocks, which represent visual elements, using wsh commands. This includes opening web pages, performing web searches, running commands, and retrieving block information.

```bash
# Create a new block showing a webpage
wsh web open github.com
```

```bash
# Do a web search in a new block
wsh web open "wave terminal"
```

```bash
# Run a command in a new block and auto-close when done
wsh run -x -- npm test
```

```bash
# Get information about the current block
wsh getmeta
```

--------------------------------

### OpenAI GPT-4.1 AI Preset Configuration

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/ai-presets.mdx

Defines an AI preset for OpenAI's GPT-4.1 model, specifying display name, order, model, and API token.

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

### Append Data to File

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

Appends data from stdin to a file on a local or remote system. Input is buffered locally (up to 10MB total file size limit) before writing.

```sh
wsh file append [file-uri]
```

```sh
cat additional-content.txt | wsh file append ./notes.txt
```

```sh
echo "new line" | wsh file append //user@remote/~/notes.txt
```

--------------------------------

### Dynamically Import Language Contributions

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/monaco-v0.53.md

Optionally import specific language contributions on demand to further reduce the initial bundle size. This is useful if not all language features are needed immediately.

```typescript
if (lang === "json") {
  await import("monaco-editor/esm/vs/language/json/monaco.contribution");
}
```

--------------------------------

### Auto-submit analysis with wsh ai

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

The `-s` flag with `wsh ai` enables immediate submission of files for analysis. This can be used with configuration files or piped input.

```bash
wsh ai config.json -s -m "explain this configuration"
```

```bash
tail -n 50 app.log | wsh ai -s - -m "what's causing these errors?"
```

--------------------------------

### Enable Durable Sessions Globally

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/durable-sessions.mdx

Configure durable sessions to be enabled by default for all SSH connections in your settings.json file.

```json
{
  "term:durable": true
}
```

--------------------------------

### View Recent Log Entries

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

Display the last approximately 100 lines of the Wave Terminal log file. Useful for quick troubleshooting.

```sh
wsh wavepath -t log
```

--------------------------------

### LayoutModel State Management Atoms

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/layout.md

Illustrates the Jotai atoms used within the LayoutModel for managing persistent state, computed leaf nodes, additional node properties, pending actions, and drag state.

```typescript
class LayoutModel {
    treeStateAtom: WritableLayoutTreeStateAtom;
    leafs: PrimitiveAtom<LayoutNode[]>;
    additionalProps: PrimitiveAtom<Record<string, LayoutNodeAdditionalProps>>;
    pendingTreeAction: AtomWithThrottle<LayoutTreeAction>;
    activeDrag: PrimitiveAtom<boolean>;
}
```

--------------------------------

### Tools Definition

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/anthropic-messages-api.md

Defines the tools that the model can use. If `tools` are included in the API request, the model may return `tool_use` content blocks. Each tool definition requires a name, an optional description, and an input schema.

```APIDOC
## Tools

### Description
Definitions of tools that the model may use. If you include `tools` in your API request, the model may return `tool_use` content blocks that represent the model's use of those tools. You can then run those tools using the tool input generated by the model and then optionally return results back to the model using `tool_result` content blocks. There are two types of tools: **client tools** and **server tools**. The behavior described below applies to client tools. For [server tools](https://docs.anthropic.com/en/docs/agents-and-tools/tool-use/overview#server-tools), see their individual documentation as each has its own behavior (e.g., the [web search tool](https://docs.anthropic.com/en/docs/agents-and-tools/tool-use/web-search-tool)). Each tool definition includes: `name`: Name of the tool. `description`: Optional, but strongly-recommended description of the tool. `input_schema`: [JSON schema](https://json-schema.org/draft/2020-12) for the tool `input` shape that the model will produce in `tool_use` output content blocks.

### Example Tool Definition
```json
[
  {
    "name": "get_stock_price",

```

--------------------------------

### Ensure Connection is Active

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

Connects to the specified SSH or WSL connection if it is not already connected. Ensures the connection is available.

```sh
wsh conn ensure [user@host]
```

```sh
wsh conn ensure [wsl://<distribution-name>]
```

--------------------------------

### Publish Event with Scopes

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/wps-events.md

Publish an event targeted to specific scopes. Subscribers can filter events based on these scopes.

```go
wps.Broker.Publish(wps.WaveEvent{
    Event:  wps.Event_WaveObjUpdate,
    Scopes: []string{oref.String()},  // Target specific object
    Data:   updateData,
})
```

--------------------------------

### edit_appgo AI Tool for String Replacement

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/tsunami-builder.md

The primary AI tool for modifying app.go files. It performs string replacements and immediately attempts to build the application, returning compilation feedback.

```json
{
  "tool": "edit_appgo",
  "args": {
    "old_str": "unique string to find",
    "new_str": "replacement string",
    "description": "what this change does"
  }
}
```

--------------------------------

### File Copy

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

Copies files between different storage systems (local, SSH, WSL). Supports flags for overwriting and merging. Maximum file size is 10MB.

```APIDOC
### cp

#### Description
Copy files between different storage systems (maximum file size 10MB).

#### Command
```sh
wsh file cp [flags] [source-uri] [destination-uri]
```

#### Examples
```sh
# Copy a remote file to your local filesystem
wsh file cp wsh://user@ec2/home/user/config.txt ./local-config.txt

# Copy a local file to a remote system
wsh file cp ./local-config.txt wsh://user@ec2/home/user/config.txt

# Copy between remote systems
wsh file cp wsh://user@ec2/home/user/config.txt wsh://user@server2/home/user/backup.txt
```

#### Flags
- `-f, --force` - overwrites any conflicts when copying
- `-m, --merge` - does not clear existing directory entries when copying a directory, instead merging its contents with the destination's
```

--------------------------------

### Apply Terminal Theme via Metadata

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/config.mdx

Apply a terminal theme using the 'wsh setmeta' command. The theme identifier is the JSON key value from termthemes.json.

```shell
wsh setmeta this term:theme="default-dark"
```

--------------------------------

### Google Gemini AI Preset Configuration

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/ai-presets.mdx

Configures a preset for Google's Gemini models, specifying display name, order, API type, model, and API key obtained from Google AI Studio.

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

### Define Tile Layout Contents Interface

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/layout.md

Interface for defining content rendering callbacks within the tile layout system. Used to customize how nodes and their previews are displayed.

```typescript
interface TileLayoutContents {
    renderContent: (nodeModel: NodeModel) => React.ReactNode;
    renderPreview?: (nodeModel: NodeModel) => React.ReactElement;
    onNodeDelete?: (data: TabLayoutData) => Promise<void>;
}
```

--------------------------------

### Initialize Component State

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/aimodesconfig.md

Initializes the state variables for the `WaveAIVisualContent` component using the `useState` hook. This includes managing the selected mode, adding new modes, and controlling the visibility of secret modals.

```typescript
// In WaveAIVisualContent component:
const [selectedModeKey, setSelectedModeKey] = useState<string | null>(null);
const [isAddingMode, setIsAddingMode] = useState(false);
const [showSecretModal, setShowSecretModal] = useState(false);
const [secretModalProvider, setSecretModalProvider] = useState<string>("");
```

--------------------------------

### Frontend Usage of Terminal Bell Sound Setting

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/config-system.md

React component code demonstrating how to use the `getOverrideConfigAtom` hook to access the `term:bellsound` setting, with a fallback to a default value.

```typescript
// Use override config for hierarchical resolution
const bellSoundAtom = getOverrideConfigAtom(blockId, "term:bellsound");
const bellSound = useAtomValue(bellSoundAtom) ?? "default";

```

--------------------------------

### Debounce Persistence to Backend

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/layout-simplification.md

Implements debouncing for `persistToBackend` to handle rapid layout changes efficiently.

```typescript
private persistDebounceTimer: NodeJS.Timeout | null = null;

private persistToBackend() {
  if (this.persistDebounceTimer) {
    clearTimeout(this.persistDebounceTimer);
  }
  
  this.persistDebounceTimer = setTimeout(() => {
    const waveObj = this.getter(this.waveObjectAtom);
    if (!waveObj) return;
    
    waveObj.rootnode = this.treeState.rootNode;
    waveObj.focusednodeid = this.treeState.focusedNodeId;
    waveObj.magnifiednodeid = this.treeState.magnifiedNodeId;
    waveObj.leaforder = this.treeState.leafOrder;
    
    this.setter(this.waveObjectAtom, waveObj);
    this.persistDebounceTimer = null;
  }, 100);
}
```

--------------------------------

### Create Message Request (Bash)

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/anthropic-messages-api.md

Use this cURL command to send a message to the Anthropic API. Ensure your ANTHROPIC_API_KEY and the anthropic-version header are set correctly.

```bash
curl https://api.anthropic.com/v1/messages \
     --header "x-api-key: $ANTHROPIC_API_KEY" \
     --header "anthropic-version: 2023-06-01" \
     --header "content-type: application/json" \
     --data \
'{ \
    "model": "claude-sonnet-4-20250514", \
    "max_tokens": 1024, \
    "messages": [ \
        {"role": "user", "content": "Hello, world"} \
    ] \
}'
```

--------------------------------

### Process Pending Backend Actions on Initialization

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/focus-layout.md

Executes pending backend actions asynchronously if any exist on initial state. This is typically used for layout operations queued by the backend.

```typescript
if (initialState.pendingBackendActions?.length) {
    fireAndForget(() => this.processPendingBackendActions());
}
```

--------------------------------

### Publish Object Updates

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/wps-events.md

Publish object updates with `wps.Broker.Publish`. The `Data` field should contain a `waveobj.WaveObjUpdate` struct.

```go
wps.Broker.Publish(wps.WaveEvent{
    Event:  wps.Event_WaveObjUpdate,
    Scopes: []string{oref.String()},
    Data: waveobj.WaveObjUpdate{
        UpdateType: waveobj.UpdateType_Update,
        OType:      obj.GetOType(),
        OID:        waveobj.GetOID(obj),
        Obj:        obj,
    },
})
```

--------------------------------

### S3 Connection View Model Settings

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/fe-conn-arch.md

Control the visibility of S3 connections in the terminal and preview views. 'showS3' is set to false for the terminal and true for the preview.

```typescript
// Terminal: S3 not shown
showS3 = atom(false)

// Preview: S3 shown
showS3 = atom(true)
```

--------------------------------

### Run Command in Magnified Mode

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

Executes a command and opens the terminal block in magnified mode.

```sh
# Run in magnified mode
wsh run -m -- make build
```

--------------------------------

### Perplexity AI Preset Configuration

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/ai-presets.mdx

Defines an AI preset for using Perplexity's models, including display name, order, model, and API token.

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

### LayoutTreeState Interface Definition

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/layout.md

Represents the complete state of the layout system. Includes the root node, focused/magnified node IDs, leaf ordering, pending backend actions, and a generation counter for state versioning.

```typescript
interface LayoutTreeState {
    rootNode: LayoutNode;
    focusedNodeId?: string;
    magnifiedNodeId?: string;
    leafOrder?: LeafOrderEntry[];
    pendingBackendActions: LayoutActionData[];
    generation: number;
}
```

--------------------------------

### WaveAI Stream Request Structure

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/waveai-architecture.md

Defines the structure for a streaming AI request, including client ID, options, and the prompt message sequence.

```go
type WaveAIStreamRequest struct {
    ClientId string                    `json:"clientid,omitempty"`
    Opts     *WaveAIOptsType           `json:"opts"`
    Prompt   []WaveAIPromptMessageType `json:"prompt"`
}
```

--------------------------------

### UseLayoutEffect for Focus Logic

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/focus.md

Responds to block clicks to manage focus. It resets click state, checks if focus is already within the block, and then attempts to set focus.

```typescript
useLayoutEffect(() => {
    if (!blockClicked) {
        return;
    }
    setBlockClicked(false);
    const focusWithin = focusedBlockId() == nodeModel.blockId;
    if (!focusWithin) {
        setFocusTarget();
    }
    if (!isFocused) {
        nodeModel.focusNode();
    }
}, [blockClicked, isFocused]);
```

--------------------------------

### Response Created Event

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/openai-streaming.md

Emitted when a new response begins. Includes response metadata like ID, creation time, model, and service tier.

```json
{
  "type": "response.created",
  "response": {
    "id": "resp_abc123",
    "created_at": 1640995200,
    "model": "gpt-5",
    "service_tier": "default"
  }
}
```

--------------------------------

### Define MyViewModel Class

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/newview.md

Create a ViewModel class to manage the state and logic for your custom view. It uses Jotai atoms for state management and defines derived atoms for dynamic content.

```typescript
import { BlockNodeModel } from "@/app/block/blocktypes";
import { globalStore } from "@/app/store/jotaiStore";
import { WOS, useBlockAtom } from "@/store/global";
import * as jotai from "jotai";
import { MyView } from "./myview";

export class MyViewModel implements ViewModel {
    viewType: string;
    blockId: string;
    nodeModel: BlockNodeModel;
    blockAtom: jotai.Atom<Block>;
    
    // Define your atoms (simple field initializers)
    viewIcon = jotai.atom<string>("circle");
    viewName = jotai.atom<string>("My View");
    noPadding = jotai.atom<boolean>(true);
    
    // Derived atom (created in constructor)
    viewText!: jotai.Atom<HeaderElem[]>;

    constructor(blockId: string, nodeModel: BlockNodeModel) {
        this.viewType = "myview";
        this.blockId = blockId;
        this.nodeModel = nodeModel;
        this.blockAtom = WOS.getWaveObjectAtom<Block>(`block:${blockId}`);
        
        // Create derived atoms that depend on block data or other atoms
        this.viewText = jotai.atom((get) => {
            const blockData = get(this.blockAtom);
            const rtn: HeaderElem[] = [];
            
            // Add header buttons/text based on state
            rtn.push({
                elemtype: "iconbutton",
                icon: "refresh",
                title: "Refresh",
                click: () => this.refresh(),
            });
            
            return rtn;
        });
    }

    get viewComponent(): ViewComponent {
        return MyView;
    }

    refresh() {
        // Update state using globalStore
        // Never use React hooks in model methods
        console.log("refreshing...");
    }

    giveFocus(): boolean {
        // Focus your view component
        return true;
    }

    dispose() {
        // Cleanup resources (unsubscribe from events, etc.)
    }
}

```

--------------------------------

### Attach different file types with wsh ai

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

The `wsh ai` command supports attaching various file types, including images, PDFs, and code files, for review.

```bash
wsh ai architecture.png api-spec.pdf server.go -m "review the system design"
```

--------------------------------

### Stream Wave Cloud to UseChat SSE

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/usechat-backend-design.md

Converts Wave Cloud's WebSocket stream to the useChat SSE format. Handles packet processing, error reporting, and usage information.

```go
func streamWaveCloudToUseChat(w http.ResponseWriter, ctx context.Context, opts *WaveAIOptsType, messages []Message) {
    // Use existing Wave Cloud WebSocket logic
    waveReq := wshrpc.WaveAIStreamRequest{
        Opts:   opts,
        Prompt: convertMessagesToPrompt(messages),
    }
    
    stream := waveai.RunAICommand(ctx, waveReq) // Returns WebSocket stream
    
    // Convert Wave Cloud packets to useChat SSE format
    for packet := range stream {
        if packet.Error != nil {
            fmt.Fprintf(w, "data: {\"type\":\"error\",\"error\":%q}\n\n", packet.Error.Error())
            break
        }
        
        resp := packet.Response
        if resp.Text != "" {
            fmt.Fprintf(w, "data: {\"type\":\"text\",\"text\":%q}\n\n", resp.Text)
        }
        if resp.FinishReason != "" {
            usage := ""
            if resp.Usage != nil {
                usage = fmt.Sprintf(",\"usage\":{\"prompt_tokens\":%d,\"completion_tokens\":%d,\"total_tokens\":%d}",
                    resp.Usage.PromptTokens, resp.Usage.CompletionTokens, resp.Usage.TotalTokens)
            }
            fmt.Fprintf(w, "data: {\"type\":\"finish\",\"finish_reason\":%q%s}\n\n", resp.FinishReason, usage)
        }
        
        w.(http.Flusher).Flush()
    }
    
    fmt.Fprintf(w, "data: [DONE]\n\n")
}
```

--------------------------------

### Jotai Atom for Layout Tree State

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/layout.md

Demonstrates the structure of a Jotai atom used for synchronizing the layout tree state between the frontend and backend. It handles reading from and writing to a backend atom, including generation tracking.

```typescript
const layoutTreeStateAtom = atom(
    (get) => {
        // Read from backend
        const layoutState = get(backendLayoutStateAtom);
        return transformToTreeState(layoutState);
    },
    (get, set, treeState) => {
        // Write to backend
        if (generationNewer(treeState)) {
            set(backendLayoutStateAtom, transformFromTreeState(treeState));
        }
    }
);
```

--------------------------------

### Publish Event Asynchronously

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/wps-events.md

Publish events in a separate goroutine to prevent blocking the caller. Recommended for performance-critical paths or when locks are held.

```go
go func() {
    wps.Broker.Publish(wps.WaveEvent{
        Event: wps.Event_YourNewEvent,
        Data:  data,
    })
}()
```

--------------------------------

### Set Git Bash as Default Shell in Wave Term

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/faq.mdx

Configure Wave Term to use Git Bash as the default shell on Windows by specifying the path to bash.exe in your settings.json. Remember to escape backslashes in the JSON string.

```json
"term:localshellpath": "C:\\Program Files\\Git\\bin\\bash.exe"
```

--------------------------------

### Jotai State Update: Old vs. New

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/layout-simplification.md

Compares the current method of mutating and bumping generation for state updates with the proposed method of replacing the entire state object using a setter. The new approach is more reliable and direct.

```typescript
// OLD way (current):
// 1. Mutate this.treeState.focusedNodeId = newId
// 2. Bump this.treeState.generation++
// 3. Set bidirectional atom (checks generation, writes to WaveObject, reads back, updates)
// 4. Derived atoms see new state from the round-trip

// NEW way (proposed):
// 1. Mutate this.treeState.focusedNodeId = newId  (same!)
// 2. this.setter(localTreeStateAtom, { ...this.treeState })  (new object reference!)
// 3. Derived atoms immediately see new state (no round-trip!)
```

--------------------------------

### Wave AI Panel Focus Capture and Click Handling

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/waveai-focus-updates.md

Adds a capture phase handler for focus events and modifies the click handler to include selection protection, ensuring DOM focus is only moved when no selection is active.

```typescript
const handleFocusCapture = useCallback((event: React.FocusEvent) => {
    console.log("Wave AI focus capture", getElemAsStr(event.target));
    focusManager.requestWaveAIFocus();  // Sets visual state immediately
}, []);

// MODIFY: Click handler with selection protection
const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const isInteractive = target.closest('button, a, input, textarea, select, [role="button"], [tabindex]');

    if (isInteractive) {
        return;
    }

    // NEW: Check for selection protection
    const hasSelection = waveAIHasSelection();
    if (hasSelection) {
        // Just update visual focus, don't move DOM focus
        focusManager.requestWaveAIFocus();
        return;
    }

    // No selection, safe to move DOM focus
    setTimeout(() => {
        if (!waveAIHasSelection()) {  // Double-check after timeout
            model.focusInput();
        }
    }, 0);
};

// Add data attribute and onFocusCapture to the div
<div
    data-waveai-panel="true"
    className={...}
    onFocusCapture={handleFocusCapture}
    onClick={handleClick}
    // ... rest
>
```

--------------------------------

### Backend Reads and Writes in Wave Terminal

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/layout-simplification.md

Details the specific data the backend reads (LeafOrder) and writes (PendingBackendActions) in the Wave Terminal layout system, highlighting fields that are never read by the backend.

```text
Backend Reads (from [`pkg/wshrpc/wshserver/resolvers.go`](../pkg/wshrpc/wshserver/resolvers.go:196-206)):
- **`LeafOrder`** - Used to resolve block numbers in commands (e.g., `wsh block:1` → blockId lookup)

Backend Writes (from [`pkg/wcore/layout.go`](../pkg/wcore/layout.go)):
- **`PendingBackendActions`** - Queued layout actions via [`QueueLayoutAction()`](../pkg/wcore/layout.go:101-118)

Backend NEVER touches:
- **`RootNode`** - Never read, only written by frontend for persistence
- **`FocusedNodeId`** - Never read, only written by frontend for persistence
- **`MagnifiedNodeId`** - Never read, only written by frontend for persistence
```

--------------------------------

### Attach files with message using wsh ai

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

Use the `wsh ai` command to attach files to a message for analysis. Supports glob patterns for log files.

```bash
wsh ai app.py -m "find potential bugs"
```

```bash
wsh ai *.log -m "analyze these error logs"
```

--------------------------------

### Incremental Implementation Phase 1: Add Local Atom Alongside Existing

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/layout-simplification.md

During the initial phase of incremental implementation, add the new localTreeStateAtom alongside the existing treeStateAtom. Both atoms are kept in sync temporarily to allow for a gradual transition.

```typescript
class LayoutModel {
  treeStateAtom: WritableLayoutTreeStateAtom;  // Keep old
  localTreeStateAtom: PrimitiveAtom<LayoutTreeState>;  // Add new
  
  // Keep both in sync temporarily
}
```

--------------------------------

### Connect via SSH

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

Connects to a remote machine using Wave's internal SSH implementation. An identity file can be specified with the -i flag.

```sh
wsh ssh [user@host]
```

--------------------------------

### allConnStatusAtom for All Connection Statuses

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/fe-conn-arch.md

Provides an array containing the status of all active connections. This atom is used in the connection modal to display available connections and automatically updates when any individual connection's status changes.

```typescript
const allConnStatusAtom = atom<ConnStatus[]>((get) => {
    const connStatusMap = get(ConnStatusMapAtom)
    const connStatuses = Array.from(connStatusMap.values()).map((atom) => get(atom))
    return connStatuses
})
```

--------------------------------

### Handle `response.completed` Event

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/openai-streaming-text.md

Use this event to finalize the response. It includes usage statistics like input and output tokens.

```json
{
  "type": "response.completed",
  "response": {
    "usage": {
      "input_tokens": 100,
      "output_tokens": 200
    }
  }
}
```

--------------------------------

### Jotai Atoms for Configuration State Management

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/waveai-architecture.md

Defines Jotai atoms for managing AI configuration state, including presets and options.

```typescript
presetKey: Atom<string>           // Current AI preset selection
presetMap: Atom<{[k: string]: MetaType}>  // Available AI presets
mergedPresets: Atom<MetaType>     // Merged configuration hierarchy
aiOpts: Atom<WaveAIOptsType>      // Final AI options for requests
```

--------------------------------

### Function Call Object (Tool Invocation)

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/openai-request.md

Structure for tool invocations sent from the model. The arguments are a JSON-encoded string.

```json
{
  "type": "function_call",
  "call_id": "call_abc123",
  "name": "search_files",
  "arguments": "{\"query\":\"test\",\"path\":\"./src\"}"
}
```

--------------------------------

### Interact with Blocks using wsh

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh.mdx

Use wsh commands to open files in the editor, retrieve metadata from blocks, or send terminal output to AI conversations.

```bash
# Open a file in the editor
wsh edit config.json
```

```bash
# Get the current file path from a preview block
wsh getmeta -b 2 file
```

```bash
# Send output to an AI assistant (the "-" reads from stdin)
ls -la | wsh ai - "what are the largest files here?"
```

--------------------------------

### Run Command and Auto-Close on Success

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

Executes a command and automatically closes the block if it completes successfully.

```sh
# Run and auto-close on successful completion
wsh run -x -- npm test
```

--------------------------------

### Enable Durable Sessions Per Connection

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/durable-sessions.mdx

Configure durable sessions for a specific SSH connection in your connections.json file.

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

### Display File Content

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

Displays the contents of a file from a local or remote system (maximum file size 10MB). Supports URIs for remote access.

```sh
wsh file cat [file-uri]
```

```sh
wsh file cat wsh://user@ec2/home/user/config.txt
```

```sh
wsh file cat ./local-config.txt
```

--------------------------------

### Stored AI Prompt Message Format

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/waveai-architecture.md

Defines the structure for AI prompt messages stored in history, specifying the role, content, and an optional name.

```go
type WaveAIPromptMessageType struct {
    Role    string `json:"role"`     // "user" | "assistant" | "system" | "error"
    Content string `json:"content"`
    Name    string `json:"name,omitempty"`
}
```

--------------------------------

### Complex Gradient Background

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/tab-backgrounds.mdx

Demonstrates a complex tab background using multiple linear and radial gradients with opacity and blend mode.

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

### Desktop Notification

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

Creates a desktop notification from Wave Terminal. This allows you to trigger desktop notifications from scripts or commands, appearing using your system's native notification system. It works on remote machines as well as your local machine.

```APIDOC
## notify

The `notify` command creates a desktop notification from Wave Terminal.

```sh
wsh notify [message] [-t title] [-s]
```

This allows you to trigger desktop notifications from scripts or commands. The notification will appear using your system's native notification system. It works on remote machines as well as your local machine.

Flags:

- `-t, --title string` - set the notification title (default "Wsh Notify")
- `-s, --silent` - disable the notification sound

Examples:

```sh
# Basic notification
wsh notify "Build completed successfully"

# Notification with custom title
wsh notify -t "Deployment Status" "Production deployment finished"

# Silent notification
wsh notify -s "Background task completed"
```

This is particularly useful for long-running commands where you want to be notified of completion or status changes.
```

--------------------------------

### Subscribe to Configuration Update Events

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/fe-conn-arch.md

Subscribes to configuration update events ('config'). The handler updates a global store atom with the full configuration, applying changes immediately.

```typescript
waveEventSubscribe({
    eventType: "config",
    handler: (event) => {
        const fullConfig = event.data.fullconfig
        globalStore.set(atoms.fullConfigAtom, fullConfig)
    }
})
```

--------------------------------

### Handle Single or Multiple Rendered Elements

Source: https://github.com/wavetermdev/waveterm/blob/main/tsunami/engine/render.md

Determines if a single element should be rendered directly or multiple elements should be wrapped in a fragment. This logic is used when processing the return value of a component function.

```go
// Single element: renders directly to RenderedComp
// Multiple elements: wrapped in fragment, then rendered to RenderedComp
if len(rtnElemArr) == 1 {
    rtnElem = &rtnElemArr[0]
} else {
    rtnElem = &vdom.VDomElem{Tag: vdom.FragmentTag, Children: rtnElemArr}
}
```

--------------------------------

### FileReadCommand RPC Interface

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/fe-conn-arch.md

RPC command to read file content as base64, supporting streaming for large files. Remote files are accessed via the connection's WSH.

```typescript
FileReadCommand(
    client: RpcClient,
    data: { info: { path: string } }
): Promise<FileData>
```

--------------------------------

### Tool Input Delta Part SSE Format

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/aisdk-streaming.md

Incremental chunks of tool input as it's being generated. This is a Server-Sent Event with a JSON object payload.

```text
data: {"type":"tool-input-delta","toolCallId":"call_fJdQDqnXeGxTmr4E3YPSR7Ar","inputTextDelta":"San Francisco"}

```

--------------------------------

### SSH Connection

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

Uses Wave's internal SSH implementation to connect to a specified remote machine. The `-i` flag can be used to specify a path to an identity file.

```APIDOC
## ssh

```sh
wsh ssh [user@host]
```

This will use Wave's internal ssh implementation to connect to the specified remote machine. The `-i` flag can be used to specify a path to an identity file.
```

--------------------------------

### Integrate In-Block Search with WaveTerm

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/newview.md

To add in-block search functionality, import and use the `useSearch` hook. Note that `useSearch` should be called within a component, not directly in the model.

```typescript
import { useSearch } from "@/app/element/search";

// In model:
this.searchAtoms = useSearch();  // Call in component, not model!

// In component:
const searchAtoms = useSearch();
// Pass to model or use directly
```

--------------------------------

### AI Context Structure for Tsunami Builder

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/tsunami-builder.md

Defines the structure of the context sent to the AI, including system instructions, conversation history, and the current application state. Old context is cleaned to save tokens.

```plaintext
[System Instructions]
  - General system prompt
  - Full system.md (Tsunami framework guide)

[Conversation History]
  - Recent messages (with prompt caching)

[Current Context] (injected fresh each turn, removed from previous turns)
  - Current app.go content
  - Compilation results (success or errors with line numbers)
  - Static files listing (e.g., "/static/logo.png")
```

--------------------------------

### Function Call Output Object (Tool Result)

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/openai-request.md

Structure for sending tool execution results back to the model. The 'call_id' must match the original function call.

```json
{
  "type": "function_call_output",
  "call_id": "call_abc123",
  "output": "Found 3 files matching query"
}
```

--------------------------------

### Stream Weather Tool Use with cURL

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/anthropic-streaming.md

Use cURL to send a streaming request to the Anthropic API, asking Claude to use the 'get_weather' tool. Ensure your ANTHROPIC_API_KEY is set in your environment.

```bash
curl https://api.anthropic.com/v1/messages \
  -H "content-type: application/json" \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -d '{
    "model": "claude-opus-4-1-20250805",
    "max_tokens": 1024,
    "tools": [
      {
        "name": "get_weather",
        "description": "Get the current weather in a given location",
        "input_schema": {
          "type": "object",
          "properties": {
            "location": {
              "type": "string",
              "description": "The city and state, e.g. San Francisco, CA"
            }
          },
          "required": ["location"]
        }
      }
    ],
    "tool_choice": {"type": "any"},
    "messages": [
      {
        "role": "user",
        "content": "What is the weather like in San Francisco?"
      }
    ],
    "stream": true
}'
```

--------------------------------

### File Append

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

Appends data from standard input to a specified file. Input is buffered locally before writing. Supports local files and remote files via WSH URIs. Maximum file size is 10MB.

```APIDOC
### append

#### Description
Append data from stdin to a file. Input is buffered locally (up to 10MB total file size limit) before being written.

#### Command
```sh
wsh file append [file-uri]
```

#### Examples
```sh
cat additional-content.txt | wsh file append ./notes.txt
echo "new line" | wsh file append //user@remote/~/notes.txt
```
```

--------------------------------

### Open URL in Magnified Web Block

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

Opens a specified URL in a new web block, with the block displayed in magnified mode.

```sh
# Open in magnified mode
wsh web open -m https://github.com
```

--------------------------------

### FileInfoCommand RPC Interface

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/fe-conn-arch.md

RPC command to retrieve file metadata. Supports remote files by using the connection's WSH and requires paths in the format `[connName]:[filepath]`.

```typescript
FileInfoCommand(
    client: RpcClient,
    data: { info: { path: string } }
): Promise<FileInfo>
```

--------------------------------

### Check Secret Existence

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/secrets.mdx

Verify if a secret exists and check its name spelling by listing all available secrets.

```bash
wsh secret list
```

--------------------------------

### Frontend Configuration Override Resolution

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/config-system.md

Use `getOverrideConfigAtom` for hierarchical configuration resolution. This automatically resolves settings in the order of block metadata, connection config, global settings, and finally defaults.

```typescript
const settingValue = useAtomValue(getOverrideConfigAtom(blockId, "namespace:setting"));
```

--------------------------------

### Resize Handle Properties Interface

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/layout.md

Defines the properties required for rendering a resize handle component. Includes positioning, orientation, and identification details for managing resize operations.

```typescript
interface ResizeHandleProps {
    id: string;
    parentNodeId: string;
    parentIndex: number;
    centerPx: number;              // Handle position
    transform: CSSProperties;      // CSS positioning
    flexDirection: FlexDirection;  // Handle orientation
}
```

--------------------------------

### Execute Script and Auto-Close on Success

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

Executes a script and automatically closes the block upon successful completion.

```sh
# Execute a script and auto-close after success
wsh run -x -- ./backup-script.sh
```

--------------------------------

### Add Field to Block Metadata

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/config-system.md

If block-level overrides are needed, add the new field to the `MetaTSType` struct in `pkg/waveobj/wtypemeta.go`. Ensure JSON tags and types match the settings field, using pointer types for optional overrides.

```go
type MetaTSType struct {
    // ... existing fields ...

    // Add your new field with matching JSON tag and type
    MyNewSetting *string `json:"mynew:setting,omitempty"`  // Use pointer for optional values

    // For different types:
    MyBoolSetting   *bool    `json:"mynew:boolsetting,omitempty"`
    MyNumberSetting *float64 `json:"mynew:numbersetting,omitempty"`
    MyIntSetting    *int     `json:"mynew:intsetting,omitempty"`
    MyArraySetting  []string `json:"mynew:arraysetting,omitempty"`
}
```

--------------------------------

### Asynchronous Persistence to Backend

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/focus-layout.md

Debounced (100ms) function to persist layout state to the backend using `setTimeout`. Updates `waveObj` properties and setters the `waveObjectAtom`.

```typescript
private persistToBackend() {
    // Debounced (100ms) to avoid excessive writes
    setTimeout(() => {
        waveObj.rootnode = this.treeState.rootNode;
        waveObj.focusednodeid = this.treeState.focusedNodeId;
        waveObj.magnifiednodeid = this.treeState.magnifiedNodeId;
        waveObj.leaforder = this.treeState.leafOrder;
        this.setter(this.waveObjectAtom, waveObj);
    }, 100);
}
```

--------------------------------

### Regenerate Schema and Types

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/config-system.md

Run the `task generate` command to automatically regenerate the JSON schema and TypeScript types after making changes to the configuration settings.

```bash
task generate
```

--------------------------------

### Widget Structure Definition

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/customwidgets.mdx

Defines the basic JSON structure for a custom widget, including common properties like icon, label, color, and the blockdef for defining widget behavior.

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

### Set a Configuration Variable

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/getsetconfigvar.md

Use RpcApi.SetConfigCommand to update configuration values. Provide the key/value pair for the config variable you wish to change.

```typescript
await RpcApi.SetConfigCommand(TabRpcClient, { "web:defaulturl": url });
```

--------------------------------

### secret ui

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

Open the secrets management interface.

```APIDOC
## wsh secret ui

### Description
Open the secrets management interface in a new block. This provides a graphical interface for viewing and managing all your secrets.

### Usage
```sh
wsh secret ui [-m]
```

### Flags
- `-m, --magnified`: Open the secrets UI in magnified mode.

### Examples
```sh
# Open the secrets UI
wsh secret ui
```
```

--------------------------------

### Default Wave Term Configuration

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/config.mdx

This JSON object represents the default configuration settings for Wave Term v0.14.0. It includes settings for AI presets, application behavior, autoupdates, connections, editor, web defaults, window management, telemetry, and terminal options. Some settings may require an application restart to take effect.

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

### Simplify layoutAtom.ts Helper Function

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/layout-simplification.md

Replaces a complex bidirectional atom with a simplified helper function for accessing WaveObject atoms.

```typescript
// frontend/layout/lib/layoutAtom.ts

// BEFORE: Complex bidirectional atom (60 lines)
// AFTER: Can be deleted entirely or simplified to just helper for WaveObject access

export function getLayoutStateAtomFromTab(
  tabAtom: Atom<Tab>,
  get: Getter
): WritableWaveObjectAtom<LayoutState> {
  const tabData = get(tabAtom);
  if (!tabData) return;
  const layoutStateOref = WOS.makeORef("layout", tabData.layoutstate);
  return WOS.getWaveObjectAtom<LayoutState>(layoutStateOref);
}

// No more withLayoutTreeStateAtomFromTab() - not needed!
```

--------------------------------

### Replace Existing Web Block

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

Replaces an existing web block with the specified ID with a new web block containing the given URL.

```sh
# Replace an existing block
wsh web open -r 2 https://example.com
```

--------------------------------

### Configure Monaco Editor ESM Workers

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/monaco-v0.53.md

Set up the MonacoEnvironment to use module workers for different languages. This is essential for the ESM build and requires explicit worker wiring.

```typescript
// monaco-setup.ts
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import "monaco-editor/esm/vs/editor/editor.all.css";

(self as any).MonacoEnvironment = {
  getWorker(_moduleId: string, label: string) {
    switch (label) {
      case "json":
        return new Worker(new URL("monaco-editor/esm/vs/language/json/json.worker.js", import.meta.url), {
          type: "module",
        });
      case "css":
        return new Worker(new URL("monaco-editor/esm/vs/language/css/css.worker.js", import.meta.url), {
          type: "module",
        });
      case "html":
        return new Worker(new URL("monaco-editor/esm/vs/language/html/html.worker.js", import.meta.url), {
          type: "module",
        });
      case "typescript":
      case "javascript":
        return new Worker(new URL("monaco-editor/esm/vs/language/typescript/ts.worker.js", import.meta.url), {
          type: "module",
        });
      default:
        return new Worker(new URL("monaco-editor/esm/vs/editor/editor.worker.js", import.meta.url), { type: "module" });
    }
  },
};

export { monaco };
```

--------------------------------

### File Move

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

Moves files between different storage systems (local, SSH, WSL). The source file is deleted after a successful move. Maximum file size is 10MB.

```APIDOC
### mv

#### Description
Move files between different storage systems (maximum file size 10MB). The source file will be deleted once the operation completes successfully.

#### Command
```sh
wsh file mv [flags] [source-uri] [destination-uri]
```

#### Examples
```sh
# Move a remote file to your local filesystem
wsh file mv wsh://user@ec2/home/user/config.txt ./local-config.txt

# Move a local file to a remote system
wsh file mv ./local-config.txt wsh://user@ec2/home/user/config.txt
```
```

--------------------------------

### Stream OpenAI Chat Completion

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/usechat-backend-design.md

Streams chat completion directly from OpenAI, converting the response to the useChat SSE format. Handles errors and stream termination.

```go
func streamOpenAIToUseChat(w http.ResponseWriter, ctx context.Context, opts *WaveAIOptsType, messages []Message) {
    client := openai.NewClient(opts.APIToken)
    
    stream, err := client.CreateChatCompletionStream(ctx, openai.ChatCompletionRequest{
        Model:    opts.Model,
        Messages: convertToOpenAIMessages(messages),
        Stream:   true,
    })
    if err != nil {
        fmt.Fprintf(w, "data: {\"type\":\"error\",\"error\":%q}\n\n", err.Error())
        fmt.Fprintf(w, "data: [DONE]\n\n")
        return
    }
    defer stream.Close()
    
    for {
        response, err := stream.Recv()
        if errors.Is(err, io.EOF) {
            fmt.Fprintf(w, "data: [DONE]\n\n")
            return
        }
        if err != nil {
            fmt.Fprintf(w, "data: {\"type\":\"error\",\"error\":%q}\n\n", err.Error())
            fmt.Fprintf(w, "data: [DONE]\n\n")
            return
        }
        
        // Direct transformation: OpenAI format → useChat format
        for _, choice := range response.Choices {
            if choice.Delta.Content != "" {
                fmt.Fprintf(w, "data: {\"type\":\"text\",\"text\":%q}\n\n", choice.Delta.Content)
            }
            if choice.FinishReason != "" {
                fmt.Fprintf(w, "data: {\"type\":\"finish\",\"finish_reason\":%q}\n\n", choice.FinishReason)
            }
        }
        
        w.(http.Flusher).Flush()
    }
}
```

--------------------------------

### Check Connection Before Operations

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/fe-conn-arch.md

Before performing operations that require a connection, check the connection status. If not connected, abort the operation.

```typescript
if (connStatus?.status != "connected") {
    return // Don't attempt operation
}
```

--------------------------------

### AIBackend Interface Definition in Go

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/waveai-architecture.md

Defines the core AIBackend interface in Go, specifying the StreamCompletion method for handling AI requests.

```go
type AIBackend interface {
    StreamCompletion(
        ctx context.Context,
        request wshrpc.WaveAIStreamRequest,
    ) chan wshrpc.RespOrErrorUnion[wshrpc.WaveAIPacketType]
}
```

--------------------------------

### Temperature Configuration

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/anthropic-messages-api.md

Controls the randomness of the model's output. Lower values make the output more focused and deterministic, while higher values increase creativity.

```APIDOC
## Temperature

### Description
Amount of randomness injected into the response. Defaults to `1.0`. Ranges from `0.0` to `1.0`. Use `temperature` closer to `0.0` for analytical / multiple choice, and closer to `1.0` for creative and generative tasks. Note that even with `temperature` of `0.0`, the results will not be fully deterministic.

### Type
number

### Range
minimum: 0
maximum: 1

### Examples
- 1
```

--------------------------------

### FileUIPart Type

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/aisdk-uimessage-type.md

Represents a file part of a UIMessage, including its media type, optional filename, and a URL to the file. The URL can be a direct link or a Data URL.

```typescript
type FileUIPart = {
  type: "file";
  /**
   * IANA media type of the file.
   */
  mediaType: string;
  /**
   * Optional filename of the file.
   */
  filename?: string;
  /**
   * The URL of the file.
   * It can either be a URL to a hosted file or a Data URL.
   */
  url: string;
};
```

--------------------------------

### Access Settings in React Components

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/config-system.md

Use override config atoms for hierarchical resolution, automatically checking block metadata, connection config, global settings, and defaults. Use getSettingsKeyAtom for global-only settings.

```typescript
import { getOverrideConfigAtom, useAtomValue } from "@/store/global";

// In a React component
const MyComponent = ({ blockId }: { blockId: string }) => {
    // Use override config atom for hierarchical resolution
    // This automatically checks: block metadata → connection config → global settings → default
    const mySettingAtom = getOverrideConfigAtom(blockId, "mynew:setting");
    const mySetting = useAtomValue(mySettingAtom) ?? "fallback value";

    // For global-only settings (no block overrides)
    const globalOnlySetting = useAtomValue(getSettingsKeyAtom("mynew:globalsetting")) ?? "fallback";

    return <div>Setting value: {mySetting}</div>;
};

```

--------------------------------

### Imperative Jotai Store Access

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/newview.md

Demonstrates how to access and modify Jotai atoms imperatively using `globalStore.get()` and `globalStore.set()`. Use this pattern in models when not within a React component context.

```typescript
refresh() {
    const currentData = globalStore.get(this.blockAtom);
    globalStore.set(this.dataAtom, newData);
}
```

--------------------------------

### Web View Header Controls with Jotai

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/newview.md

Defines the header elements for a web view using Jotai atoms. This includes navigation buttons and a URL input field with a refresh button. Use this for dynamic header generation based on URL state.

```typescript
this.viewText = jotai.atom((get) => {
    const url = get(this.url);
    const rtn: HeaderElem[] = [];
    
    // Navigation buttons
    rtn.push({
        elemtype: "iconbutton",
        icon: "chevron-left",
        click: this.handleBack.bind(this),
        disabled: this.shouldDisableBackButton(),
    });
    
    // URL input with nested controls
    rtn.push({
        elemtype: "div",
        className: "block-frame-div-url",
        children: [
            {
                elemtype: "input",
                value: url,
                onChange: this.handleUrlChange.bind(this),
                onKeyDown: this.handleKeyDown.bind(this),
            },
            {
                elemtype: "iconbutton",
                icon: "rotate-right",
                click: this.handleRefresh.bind(this),
            }
        ],
    });
    
    return rtn;
});
```

--------------------------------

### Move Files Between Systems

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

Moves files between different storage systems (local, SSH, WSL). The source file is deleted upon successful completion. Maximum file size is 10MB.

```sh
wsh file mv [flags] [source-uri] [destination-uri]
```

```sh
# Move a remote file to your local filesystem
wsh file mv wsh://user@ec2/home/user/config.txt ./local-config.txt
```

```sh
# Move a local file to a remote system
wsh file mv ./local-config.txt wsh://user@ec2/home/user/config.txt
```

--------------------------------

### File Cat

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

Displays the content of a specified file. Supports local files and remote files via WSH URIs. Maximum file size is 10MB.

```APIDOC
### cat

#### Description
Display the contents of a file (maximum file size 10MB).

#### Command
```sh
wsh file cat [file-uri]
```

#### Examples
```sh
wsh file cat wsh://user@ec2/home/user/config.txt
wsh file cat ./local-config.txt
```
```

--------------------------------

### Web Block

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

Opens URLs in a web block within Wave Terminal. You can open a specific URL or perform a search using the configured search engine.

```APIDOC
## web

The `web` command opens URLs in a web block within Wave Terminal.

```sh
wsh web open [url] [-m] [-r blockid]
```

You can open a specific URL or perform a search using the configured search engine.

Flags:

- `-m, --magnified` - open the web block in magnified mode
- `-r, --replace <blockid>` - replace an existing block instead of creating a new one

Examples:

```sh
# Open a URL
wsh web open https://waveterm.dev

# Search with the configured search engine
wsh web open "wave terminal documentation"

# Open in magnified mode
wsh web open -m https://github.com

# Replace an existing block
wsh web open -r 2 https://example.com
```

The command will open a new web block with the desired page, or replace an existing block if the `-r` flag is used. Note that `--replace` and `--magnified` cannot be used together.
```

--------------------------------

### Define Event Data Structure

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/wps-events.md

Optionally define a Go struct for structured event data. This structure will be used as the payload for the event.

```go
type YourEventData struct {
    Field1 string `json:"field1"`
    Field2 int    `json:"field2"`
}
```

--------------------------------

### Process Last Command Output with grep

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

Pipe the output of the last command to grep for filtering. Requires shell integration to be enabled.

```sh
wsh termscrollback --lastcommand | grep "ERROR"
```

--------------------------------

### Save Last Command Output to File

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

Save the output of the most recent command to a file. Requires shell integration to be enabled.

```sh
wsh termscrollback --lastcommand -o last-output.txt
```

--------------------------------

### LayoutModel Action Processing Reducer

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/layout.md

Demonstrates the reducer pattern used by LayoutModel to process various layout tree actions, such as moving or inserting nodes. After processing, it calls 'updateTree' to recompute derived state.

```typescript
treeReducer(action: LayoutTreeAction) {
    switch (action.type) {
        case LayoutTreeActionType.Move:
            moveNode(this.treeState, action);
            break;
        case LayoutTreeActionType.InsertNode:
            insertNode(this.treeState, action);
            break;
    }
    this.updateTree();
}
```

--------------------------------

### NodeModel Interface Definition

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/layout.md

A runtime model for individual layout nodes, providing React-friendly state management via Jotai atoms. Includes properties for additional data, inner rectangle dimensions, block number, focus/magnification status, and methods for interaction.

```typescript
interface NodeModel {
    additionalProps: Atom<LayoutNodeAdditionalProps>;
    innerRect: Atom<CSSProperties>;
    blockNum: Atom<number>;
    nodeId: string;
    blockId: string;
    isFocused: Atom<boolean>;
    isMagnified: Atom<boolean>;
    isEphemeral: Atom<boolean>;
    toggleMagnify: () => void;
    focusNode: () => void;
    onClose: () => void;
    dragHandleRef?: React.RefObject<HTMLDivElement>;
}
```

--------------------------------

### Reasoning Summary Part Added Event

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/openai-streaming.md

Emitted when a new part of the reasoning summary is added. Includes the item ID and summary index.

```json
{
  "type": "response.reasoning_summary_part.added",
  "item_id": "reasoning_abc123",
  "summary_index": 0
}
```

--------------------------------

### termscrollback

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

Commands for interacting with the terminal scrollback buffer, including saving to files and processing output.

```APIDOC
## wsh termscrollback

### Description
Commands for interacting with the terminal scrollback buffer.

### Usage
```sh
# Get a specific line range (lines 100-200)
wsh termscrollback --start 100 --end 200

# Save scrollback to a file
wsh termscrollback -o terminal-log.txt

# Save last command output to a file
wsh termscrollback --lastcommand -o last-output.txt

# Process last command output with grep
wsh termscrollback --lastcommand | grep "ERROR"
```

### Flags
- `--start <lines>`: Specify the starting line number for scrollback.
- `--end <lines>`: Specify the ending line number for scrollback.
- `-o, --output <file>`: Save the output to the specified file.
- `--lastcommand`: Process only the output of the last command.

:::note
The `--lastcommand` flag requires shell integration to be enabled. This feature allows you to capture just the output from the most recent command, which is particularly useful for scripting and automation.
:::
```

--------------------------------

### Preview View Model Error Handling

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/fe-conn-arch.md

Manages file operation errors in the preview view. It catches exceptions during file stat operations, updates an error message atom, and re-throws the error.

```typescript
// File operations return errors
errorMsgAtom = atom(null) as PrimitiveAtom<ErrorMsg>

statFile = atom(async (get) => {
    try {
        const fileInfo = await RpcApi.FileInfoCommand(...)
        return fileInfo
    } catch (e) {
        globalStore.set(this.errorMsgAtom, {
            status: "File Read Failed",
            text: `${e}`
        })
        throw e
    }
})
```

--------------------------------

### Access Local Files from Remote Machines with wsh file

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh.mdx

Utilize the `wsh://local/~/` prefix or the `/~/` shorthand to access local files when working on remote machines. This allows reading, appending, copying, and executing local files remotely.

```bash
# Read a local file from a remote machine
wsh file cat wsh://local/~/config/app.json
```

```bash
# Run a local script on the remote machine using shell process substitution
bash <(wsh file cat wsh://local/~/scripts/deploy.sh)
```

```bash
python <(wsh file cat wsh://local/~/scripts/deploy.py)
```

```bash
# Append remote output to a local log file
echo "Remote machine log entry" | wsh file append wsh://local/~/app.log
```

```bash
# Copy a local file to the remote machine
wsh file cp wsh://local/~/data.csv ./remote-data.csv
```

```bash
# Copy remote file back to local machine
wsh file cp ./results.txt wsh://local/~/results.txt
```

```bash
# You can also use the shorthand /~/ instead of wsh://local/~/
wsh file cat /~/config/app.json
```

--------------------------------

### WaveEvent Structure

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/wps-events.md

Defines the structure of events within the WPS system, including event type, scopes, sender, persistence, and data payload.

```go
type WaveEvent struct {
    Event   string   `json:"event"`      // Event type constant
    Scopes  []string `json:"scopes,omitempty"` // Optional scopes for targeted delivery
    Sender  string   `json:"sender,omitempty"` // Optional sender identifier
    Persist int      `json:"persist,omitempty"` // Number of events to persist in history
    Data    any      `json:"data,omitempty"`    // Event payload
}
```

--------------------------------

### Move Files with wsh

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

The `wsh file mv` command allows you to move files between local and remote systems. It supports overwriting conflicts with the `-f` flag.

```APIDOC
## wsh file mv

### Description
Moves files between local and remote systems.

### Usage
```sh
wsh file mv [flags] <source-uri> <destination-uri>
```

### Flags
- `-f, --force`: Overwrites any conflicts when moving.
```

--------------------------------

### Append content to AI sidebar

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

Attaches files (images, PDFs, text) to the Wave AI sidebar for review or auto-submission. Supports multiple files, messages, and new conversations.

```sh
# Pipe command output to AI (ask question in UI)
git diff | wsh ai -
docker logs mycontainer | wsh ai -

# Attach files without auto-submit (review in UI first)
wsh ai main.go utils.go
wsh ai screenshot.png logs.txt
```

--------------------------------

### ViewModel Interface Definition

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/newview.md

Defines the contract for all view types in Wave Terminal, specifying required and optional properties for state, UI configuration, and behavior.

```typescript
interface ViewModel {
    // Required: The type identifier for this view (e.g., "term", "web", "preview")
    viewType: string;

    // Required: The React component that renders this view
    viewComponent: ViewComponent<ViewModel>;

    // Optional: Icon shown in block header (FontAwesome icon name or IconButtonDecl)
    viewIcon?: jotai.Atom<string | IconButtonDecl>;

    // Optional: Display name shown in block header (e.g., "Terminal", "Web", "Preview")
    viewName?: jotai.Atom<string>;

    // Optional: Additional header elements (text, buttons, inputs) shown after the name
    viewText?: jotai.Atom<string | HeaderElem[]>;

    // Optional: Icon button shown before the view name in header
    preIconButton?: jotai.Atom<IconButtonDecl>;

    // Optional: Icon buttons shown at the end of the header (before settings/close)
    endIconButtons?: jotai.Atom<IconButtonDecl[]>;

    // Optional: Custom background styling for the block
    blockBg?: jotai.Atom<MetaType>;

    // Optional: If true, completely hides the block header
    noHeader?: jotai.Atom<boolean>;

    // Optional: If true, shows connection picker in header for remote connections
    manageConnection?: jotai.Atom<boolean>;

    // Optional: If true, filters out 'nowsh' connections from connection picker
    filterOutNowsh?: jotai.Atom<boolean>;

    // Optional: If true, shows S3 connections in connection picker
    showS3?: jotai.Atom<boolean>;

    // Optional: If true, removes default padding from content area
    noPadding?: jotai.Atom<boolean>;

    // Optional: Atoms for managing in-block search functionality
    searchAtoms?: SearchAtoms;

    // Optional: Returns whether this is a basic terminal (for multi-input feature)
    isBasicTerm?: (getFn: jotai.Getter) => boolean;

    // Optional: Returns context menu items for the settings dropdown
    getSettingsMenuItems?: () => ContextMenuItem[];

    // Optional: Focuses the view when called, returns true if successful
    giveFocus?: () => boolean;

    // Optional: Handles keyboard events, returns true if handled
    keyDownHandler?: (e: WaveKeyboardEvent) => boolean;

    // Optional: Cleanup when block is closed
    dispose?: () => void;
}
```

--------------------------------

### ViewModel Interface

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/newview.md

The ViewModel interface defines the contract for all view types in Wave Terminal. It includes properties for view identification, component rendering, and various UI configurations.

```APIDOC
## ViewModel Interface

Every view must implement the `ViewModel` interface defined in [`frontend/types/custom.d.ts`](../frontend/types/custom.d.ts:285-341):

```typescript
interface ViewModel {
    // Required: The type identifier for this view (e.g., "term", "web", "preview")
    viewType: string;

    // Required: The React component that renders this view
    viewComponent: ViewComponent<ViewModel>;

    // Optional: Icon shown in block header (FontAwesome icon name or IconButtonDecl)
    viewIcon?: jotai.Atom<string | IconButtonDecl>;

    // Optional: Display name shown in block header (e.g., "Terminal", "Web", "Preview")
    viewName?: jotai.Atom<string>;

    // Optional: Additional header elements (text, buttons, inputs) shown after the name
    viewText?: jotai.Atom<string | HeaderElem[]>;

    // Optional: Icon button shown before the view name in header
    preIconButton?: jotai.Atom<IconButtonDecl>;

    // Optional: Icon buttons shown at the end of the header (before settings/close)
    endIconButtons?: jotai.Atom<IconButtonDecl[]>;

    // Optional: Custom background styling for the block
    blockBg?: jotai.Atom<MetaType>;

    // Optional: If true, completely hides the block header
    noHeader?: jotai.Atom<boolean>;

    // Optional: If true, shows connection picker in header for remote connections
    manageConnection?: jotai.Atom<boolean>;

    // Optional: If true, filters out 'nowsh' connections from connection picker
    filterOutNowsh?: jotai.Atom<boolean>;

    // Optional: If true, shows S3 connections in connection picker
    showS3?: jotai.Atom<boolean>;

    // Optional: If true, removes default padding from content area
    noPadding?: jotai.Atom<boolean>;

    // Optional: Atoms for managing in-block search functionality
    searchAtoms?: SearchAtoms;

    // Optional: Returns whether this is a basic terminal (for multi-input feature)
    isBasicTerm?: (getFn: jotai.Getter) => boolean;

    // Optional: Returns context menu items for the settings dropdown
    getSettingsMenuItems?: () => ContextMenuItem[];

    // Optional: Focuses the view when called, returns true if successful
    giveFocus?: () => boolean;

    // Optional: Handles keyboard events, returns true if handled
    keyDownHandler?: (e: WaveKeyboardEvent) => boolean;

    // Optional: Cleanup when block is closed
    dispose?: () => void;
}
```
```

--------------------------------

### Handle RPC Command Errors

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/fe-conn-arch.md

Always wrap RPC command calls in a try-catch block to handle potential errors. Update the UI to reflect any connection failures.

```typescript
try {
    await RpcApi.ConnConnectCommand(...)
} catch (e) {
    console.error("Connection failed:", e)
    // Update UI to show error
}
```

--------------------------------

### Use ConnEnsureCommand for File Operations

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/fe-conn-arch.md

For file operations, use ConnEnsureCommand to ensure the connection is established. Includes a timeout for the operation and a logblockid for better logging.

```typescript
await RpcApi.ConnEnsureCommand(TabRpcClient, {
    connname: connName,
    logblockid: blockId  // For better logging
}, { timeout: 60000 })
```

--------------------------------

### Terminal View Model Error Handling

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/fe-conn-arch.md

Handles the visibility of the restart button based on the connection status. If the connection is not 'connected', the restart button is hidden.

```typescript
// Shell won't start if connection failed
endIconButtons = atom((get) => {
    const connStatus = get(this.connStatus)
    if (connStatus?.status != "connected") {
        return []  // Hide restart button
    }
    // ... show restart button
})
```

--------------------------------

### Node Management Functions

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/layout.md

Provides utility functions for managing layout nodes, including creating new nodes, finding nodes and their parents, traversing the tree, and modifying the tree structure.

```typescript
// Create new node
newLayoutNode(flexDirection?, size?, children?, data?)

// Tree traversal
findNode(node, id)
findParent(node, id)
walkNodes(node, beforeCallback?, afterCallback?)

// Modifications
addChildAt(node, index, ...children)
removeChild(parent, childToRemove)
balanceNode(node) // Optimize tree structure
```

--------------------------------

### Register Custom View

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/newview.md

Register your custom view model with the `BlockRegistry` by mapping a unique string key to your ViewModel class. This key will be used to identify the view type in block metadata.

```typescript
const BlockRegistry: Map<string, ViewModelClass> = new Map();
BlockRegistry.set("term", TermViewModel);
BlockRegistry.set("preview", PreviewModel);
BlockRegistry.set("web", WebViewModel);
// ... existing registrations ...
BlockRegistry.set("myview", MyViewModel);  // Add your view here

```

--------------------------------

### Set manageConnection Atom

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/fe-conn-arch.md

Control the visibility of the connection button in the UI by setting the manageConnection atom. Set to true to show, false to hide.

```typescript
// Show connection button for views that need connections
manageConnection = atom(true)

// Hide for views that don't use connections
manageConnection = atom(false)
```

--------------------------------

### Edit file contents

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

Opens a codeedit block for the specified file, returning immediately. Use -m for magnified view. For blocking editor behavior, see 'wsh editor'.

```sh
wsh edit [path]
wsh edit -m [path]           # opens in magnified block
```

--------------------------------

### Send Reset Alternate Buffer Command (R)

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/wave-osc-16162.md

Resets the terminal to the normal buffer if it's currently in alternate buffer mode. Can be sent anytime to ensure the terminal is not stuck in alternate mode.

```bash
R
```

--------------------------------

### Bash Tool Schema (2025-01-24)

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/anthropic-messages-api.md

Defines the structure for the bash tool, including optional cache control.

```APIDOC
## BashTool_20250124

### Description
Represents the bash tool for executing shell commands.

### Properties
- **cache_control** (object | null) - Optional - Configuration for caching the tool's output. See `CacheControlEphemeral`.
- **name** (string) - Required - The name of the tool, must be 'bash'.
- **type** (string) - Required - The type of the tool, must be 'bash_20250124'.
```

--------------------------------

### Force Restart Block Controller

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/blockcontroller-lifecycle.md

Initiates a forced restart of a block controller. It triggers UI feedback and then calls the `ControllerResyncCommand` RPC with the `forcerestart` flag set to true, including current terminal size options.

```typescript
// In term-model.ts
forceRestartController() {
    this.triggerRestartAtom();  // UI feedback
    const termsize = {
        rows: this.termRef.current?.terminal?.rows,
        cols: this.termRef.current?.terminal?.cols,
    };
    RpcApi.ControllerResyncCommand(TabRpcClient, {
        tabid: globalStore.get(atoms.staticTabId),
        blockid: this.blockId,
        forcerestart: true,
        rtopts: { termsize: termsize },
    });
}
```

--------------------------------

### Set block or tab metadata

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

Updates metadata key-value pairs for blocks or tabs. Supports direct key=value assignment, JSON files, and stdin for complex updates.

```sh
wsh setmeta -b [blockid] [key]=[value]
wsh setmeta -b [blockid] file=~/myfile.txt
wsh setmeta -b [blockid] url=https://waveterm.dev/

# set the metadata for the current tab using the given json file
wsh setmeta -b tab --json [jsonfile]

# set the metadata for the current tab using a json file read from stdin
wsh setmeta -b tab --json
```

```sh
wsh getmeta -b [other-tab-id] "bg:*" --clear-prefix | wsh setmeta -b tab --json -
```

--------------------------------

### Handle `error` Event

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/openai-streaming-text.md

This optional event should be handled to gracefully manage errors, such as rate limit exceedances.

```json
{
  "type": "error",
  "code": "rate_limit_exceeded",
  "message": "Rate limit exceeded"
}
```

--------------------------------

### Default Value for Terminal Setting

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/config-system.md

Specifies the default value for the `term:bellsound` setting in a JSON configuration file. This value is used if no other override is applied.

```json
{
  "term:bellsound": "default"
}

```

--------------------------------

### Bash Tool Schema (2024-10-22)

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/anthropic-messages-api.md

Defines the structure for the bash tool, including optional cache control.

```APIDOC
## BashTool_20241022

### Description
Represents the bash tool for executing shell commands.

### Properties
- **cache_control** (object | null) - Optional - Configuration for caching the tool's output. See `CacheControlEphemeral`.
- **name** (string) - Required - The name of the tool, must be 'bash'.
- **type** (string) - Required - The type of the tool, must be 'bash_20241022'.
```

--------------------------------

### ReasoningUIPart Type

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/aisdk-uimessage-type.md

Represents a reasoning part of a UIMessage, typically used for explaining the model's thought process. It includes text content, an optional state, and provider metadata.

```typescript
type ReasoningUIPart = {
  type: "reasoning";
  /**
   * The reasoning text.
   */
  text: string;
  /**
   * The state of the reasoning part.
   */
  state?: "streaming" | "done";
  /**
   * The provider metadata.
   */
  providerMetadata?: Record<string, any>;
};
```

--------------------------------

### Connection Button UI Component

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/fe-conn-arch.md

React component for displaying connection status with colored icons. It uses jotai for state management and memoization for performance.

```typescript
export const ConnectionButton = React.memo(
    React.forwardRef<HTMLDivElement, ConnectionButtonProps>(
        ({ connection, changeConnModalAtom }, ref) => {
            const connStatusAtom = getConnStatusAtom(connection)
            const connStatus = jotai.useAtomValue(connStatusAtom)
            // ... renders connection status with colored icon
        }
    )
)
```

--------------------------------

### Run Command and Force Auto-Close

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

Executes a command and automatically closes the block regardless of its exit status.

```sh
# Run and auto-close regardless of exit status
wsh run -X -- ./long-running-task.sh
```

--------------------------------

### Terminal View Focus Implementation

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/focus.md

Handles focus for terminal views. It prioritizes search focus, then checks the terminal mode, and finally calls XTerm's focus method if in 'term' mode.

```typescript
giveFocus(): boolean {
    if (this.searchAtoms && globalStore.get(this.searchAtoms.isOpen)) {
        return true;
    }
    let termMode = globalStore.get(this.termMode);
    if (termMode == "term") {
        if (this.termRef?.current?.terminal) {
            this.termRef.current.terminal.focus();
            return true;
        }
    }
    return false;
}
```

--------------------------------

### Max-Width Container Queries in Tailwind v4

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/tailwind-container-queries.md

Employ the `@max-` prefix for max-width container queries, enabling styles to apply when the container is below a certain breakpoint. Ensure the prefix is applied correctly before the `@` symbol.

```html
<div class="@container">
  <!-- Shows on small containers, hides on large -->
  <div class="block @max-sm:hidden">Only on containers < sm</div>
  
  <!-- Custom breakpoint -->
  <div class="@max-w600:fixed @max-w600:bg-background">
    Fixed overlay on small, normal on large
  </div>
</div>
```

--------------------------------

### Connection Status

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

Retrieves the status of all active connections managed by Wave Shell.

```APIDOC
## status

### Description
This command gives the status of all connections made since waveterm started.

### Command
```sh
wsh conn status
```
```

--------------------------------

### Find Wave AI Panel Utility

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/waveai-focus-updates.md

A utility function to find the nearest ancestor element with the `data-waveai-panel` attribute. This is used to determine if an element is part of the Wave AI interface.

```typescript
// Find if element is within Wave AI panel
export function findWaveAIPanel(element: HTMLElement): HTMLElement | null {
  let current: HTMLElement = element;
  while (current) {
    if (current.hasAttribute("data-waveai-panel")) {
      return current;
    }
    current = current.parentElement;
  }
  return null;
}
```

--------------------------------

### Control Terminal Durability via Command Line

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/durable-sessions.mdx

Use the 'wsh setmeta' command to enable or disable durable sessions for the current terminal block.

```bash
wsh setmeta term:durable=true
```

```bash
wsh setmeta term:durable=false
```

--------------------------------

### Block Controller RPC: Force Restart

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/fe-conn-arch.md

Initiates a forced restart of a block's shell process via RPC. Use when a terminal needs to be forcefully restarted from the frontend.

```typescript
// User clicks restart button in terminal
forceRestartController() {
    // Backend handles connection verification and process startup
    RpcApi.ControllerRestartCommand(TabRpcClient, {
        blockid: this.blockId,
        force: true
    })
}
```

--------------------------------

### Reasoning End Part SSE Format

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/aisdk-streaming.md

Indicates the completion of a reasoning block. This is a Server-Sent Event with a JSON object payload.

```text
data: {"type":"reasoning-end","id":"reasoning_123"}

```

--------------------------------

### Create MyView React Component

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/newview.md

Implement the React component for your custom view. It receives view model props and uses Jotai's `useAtomValue` hook to access atom values.

```typescript
import { ViewComponentProps } from "@/app/block/blocktypes";
import { MyViewModel } from "./myview-model";
import { useAtomValue } from "jotai";
import "./myview.scss";

export const MyView: React.FC<ViewComponentProps<MyViewModel>> = ({ 
    blockId, 
    model, 
    contentRef 
}) => {
    // Use atoms from the model (these are React hooks - call at top level!)
    const blockData = useAtomValue(model.blockAtom);
    
    return (
        <div className="myview-container" ref={contentRef}>
            <div>Block ID: {blockId}</div>
            <div>View: {model.viewType}</div>
            {/* Your view content here */}
        </div>
    );
};

```

--------------------------------

### Update Layout Tree and Focus Manager

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/waveai-focus-updates.md

This reducer handles layout tree actions, updating the tree state and synchronously requesting focus from the focus manager when actions like inserting or focusing nodes occur. It ensures focus is claimed before atoms commit, maintaining state consistency.

```typescript
treeReducer(action: LayoutTreeAction, setState = true): boolean {
  // Process the action (mutates this.treeState)
  switch (action.type) {
    case LayoutTreeActionType.InsertNode:
      insertNode(this.treeState, action);
      // If inserting with focus, claim focus from Wave AI
      if ((action as LayoutTreeInsertNodeAction).focused) {
        focusManager.requestNodeFocus();
      }
      break;

    case LayoutTreeActionType.InsertNodeAtIndex:
      insertNodeAtIndex(this.treeState, action);
      if ((action as LayoutTreeInsertNodeAtIndexAction).focused) {
        focusManager.requestNodeFocus();
      }
      break;

    case LayoutTreeActionType.FocusNode:
      focusNode(this.treeState, action);
      // Explicit focus change always claims focus
      focusManager.requestNodeFocus();
      break;

    case LayoutTreeActionType.MagnifyNodeToggle:
      magnifyNodeToggle(this.treeState, action);
      // Magnifying also focuses the node
      focusManager.requestNodeFocus();
      break;

    // ... other cases don't affect focus
  }

  if (setState) {
    this.updateTree();
    this.setter(this.localTreeStateAtom, { ...this.treeState });
    this.persistToBackend();
  }

  return true;
}
```

--------------------------------

### Publish Status Updates

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/wps-events.md

Publish status updates using `wps.Broker.Publish`. Set `Persist` to `1` to keep only the latest status.

```go
wps.Broker.Publish(wps.WaveEvent{
    Event:   wps.Event_ControllerStatus,
    Scopes:  []string{blockId},
    Persist: 1,  // Keep only latest status
    Data:    statusData,
})
```

--------------------------------

### Base64 Image Source Schema

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/anthropic-messages-api.md

Defines the structure for providing image data in base64 format.

```APIDOC
## Base64ImageSource

### Description
Represents an image source encoded in base64.

### Properties
- **data** (string) - Required - The base64 encoded image data.
- **media_type** (string) - Required - The MIME type of the image (e.g., 'image/jpeg', 'image/png'). Must be one of: 'image/jpeg', 'image/png', 'image/gif', 'image/webp'.
- **type** (string) - Required - The type of source, must be 'base64'.
```

--------------------------------

### ConnStatusMapAtom for Connection Status Registry

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/fe-conn-arch.md

This atom serves as a global registry for connection status. Each connection has its own status atom, updated by backend wave events. Components subscribe to individual connection atoms to track their status.

```typescript
const ConnStatusMapAtom = atom(new Map<string, PrimitiveAtom<ConnStatus>>())
```

--------------------------------

### SSHConn Structure Definition

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/conn-arch.md

Defines the structure for an SSH connection, including its state, options, underlying client, and communication channels.

```go
type SSHConn struct {
    Lock               *sync.Mutex
    Status             string           // Connection state
    WshEnabled         *atomic.Bool     // WSH availability flag
    Opts               *remote.SSHOpts  // Connection parameters
    Client             *ssh.Client      // Underlying SSH client
    DomainSockName     string          // Unix socket for RPC
    DomainSockListener net.Listener    // Socket listener
    ConnController     *ssh.Session    // Runs "wsh connserver"
    Error              string          // Connection error
    WshError           string          // WSH-specific error
    WshVersion         string          // Installed WSH version
    // ...
}
```

--------------------------------

### Base64 PDF Source Schema

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/anthropic-messages-api.md

Defines the structure for providing PDF data in base64 format.

```APIDOC
## Base64PDFSource

### Description
Represents a PDF source encoded in base64.

### Properties
- **data** (string) - Required - The base64 encoded PDF data.
- **media_type** (string) - Required - The MIME type of the document, must be 'application/pdf'.
- **type** (string) - Required - The type of source, must be 'base64'.
```

--------------------------------

### Frontend AI Chat Integration with useChat Hook

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/usechat-backend-design.md

Integrates AI chat functionality into the frontend using the useChat hook from @ai-sdk/react. It handles message display, input handling, submission, loading states, and error display. Initial messages can be loaded from an aidata file, and conversations are saved on completion.

```typescript
import { useChat } from '@ai-sdk/react';

function WaveAI({ blockId }: { blockId: string }) {
    // Get current preset from block metadata or settings
    const preset = useAtomValue(currentPresetAtom);
    
    const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
        api: `/api/ai/chat/${blockId}?preset=${preset}`,
        initialMessages: [], // Load from existing aidata file
        onFinish: (message) => {
            // Save conversation to aidata file
            saveConversation(blockId, messages);
        }
    });
    
    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto">
                {messages.map(message => (
                    <div key={message.id} className={`message ${message.role}`}>
                        <Markdown text={message.content} />
                    </div>
                ))}
                {isLoading && <TypingIndicator />}
                {error && <div className="error">{error.message}</div>}
            </div>
            
            <form onSubmit={handleSubmit} className="border-t p-4">
                <input
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Type a message..."
                    className="w-full p-2 border rounded"
                />
            </form>
        </div>
    );
}
```

--------------------------------

### Layout Tree Action Types

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/layout.md

Defines the various action types that can be performed on the layout tree, such as moving, resizing, inserting, and deleting nodes. Used to categorize operations within the layout system.

```typescript
enum LayoutTreeActionType {
    ComputeMove = "computemove",      // Preview move operation
    Move = "move",                    // Execute move
    Swap = "swap",                    // Swap two nodes
    ResizeNode = "resize",            // Resize node(s)
    InsertNode = "insert",            // Insert new node
    InsertNodeAtIndex = "insertatindex", // Insert at specific index
    DeleteNode = "delete",            // Remove node
    FocusNode = "focus",              // Change focus
    MagnifyNodeToggle = "magnify",    // Toggle magnification
    SplitHorizontal = "splithorizontal", // Split horizontally
    SplitVertical = "splitvertical",  // Split vertically
    // ... more actions
}
```

--------------------------------

### Web Search Call Schema

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/openai-streaming.md

Schema for a web search tool call, including its ID, status, and the search action with a query.

```json
{
  "type": "web_search_call",
  "id": "search_abc123",
  "status": "completed",
  "action": {
    "type": "search",
    "query": "OpenAI API documentation"
  }
}
```

--------------------------------

### Reasoning Delta Part SSE Format

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/aisdk-streaming.md

Contains incremental reasoning content for a reasoning block. This is a Server-Sent Event with a JSON object payload.

```text
data: {"type":"reasoning-delta","id":"reasoning_123","delta":"This is some reasoning"}

```

--------------------------------

### Remove File or Directory

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

Removes a file or directory from a local or remote system. Use the `-r` flag for recursive deletion of directories.

```sh
wsh file rm [flag] [file-uri]
```

```sh
wsh file rm wsh://user@ec2/home/user/config.txt
```

```sh
wsh file rm ./local-config.txt
```

--------------------------------

### Run Shell Command and Force Close

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

Executes a shell command and forces the block to close upon completion, regardless of exit status.

```sh
# Run a shell command and force close after completion
wsh run -X -c "find . -name '*.log' -delete"
```

--------------------------------

### useChat SSE Response Format

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/usechat-backend-design.md

Defines the Server-Sent Events (SSE) format expected by the useChat() hook, including text chunks, finish reasons, and usage statistics.

```sse
data: {"type":"text","text":"Hello"}

data: {"type":"text","text":" world"}

data: {"type":"text","text":"!"}

data: {"type":"finish","finish_reason":"stop","usage":{"prompt_tokens":10,"completion_tokens":3,"total_tokens":13}}

data: [DONE]
```

--------------------------------

### SetConnectionsConfigCommand RPC Interface

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/fe-conn-arch.md

RPC command to update connection-level configuration, persisting changes to the config file. Used for settings like disabling WSH.

```typescript
SetConnectionsConfigCommand(
    client: RpcClient,
    data: {
        host: string,           // Connection name
        metamaptype: any        // Config updates
    }
): Promise<void>
```

--------------------------------

### Text End Part SSE Format

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/aisdk-streaming.md

Indicates the completion of a text block. This is a Server-Sent Event with a JSON object payload.

```text
data: {"type":"text-end","id":"msg_68679a454370819ca74c8eb3d04379630dd1afb72306ca5d"}

```

--------------------------------

### Hide Wave Cloud Modes via CLI

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/waveai-modes.mdx

Disables Wave's built-in cloud AI modes using the wsh command-line interface.

```bash
wsh setconfig waveai:showcloudmodes=false
```

--------------------------------

### Handle `response.output_text.delta` Event

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/openai-streaming-text.md

Stream text chunks using this event. Accumulate the 'delta' fields to reconstruct the full text response.

```json
{
  "type": "response.output_text.delta",
  "item_id": "msg_abc123",
  "delta": "Hello, how can I"
}
```

--------------------------------

### Text Output Value Type

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/openai-request.md

Represents a text-based output from a tool execution.

```json
{
  "type": "function_call_output",
  "call_id": "call_abc123",
  "output": "Result text here"
}
```

--------------------------------

### Configure Google Gemini Provider

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/waveai-modes.mdx

Defines the configuration block for the Google Gemini model, which automatically sets the endpoint and required API token secret name.

```json
{
  "google-gemini": {
    "display:name": "Gemini 3.5 Flash",
    "ai:provider": "google",
    "ai:model": "gemini-3.5-flash"
  }
}
```

--------------------------------

### ConnListAWSCommand RPC Interface

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/fe-conn-arch.md

RPC command to retrieve a list of AWS profile names from the configuration. Used for S3 preview connections and formats names as `aws:[profile]`.

```typescript
ConnListAWSCommand(client: RpcClient): Promise<string[]>
```

--------------------------------

### Output Item Done Event

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/openai-streaming.md

Emitted when an output item is completed. For function calls, this includes the arguments and status.

```json
{
  "type": "response.output_item.done",
  "output_index": 0,
  "item": {
    "type": "message",
    "id": "msg_abc123"
  }
}
```

```json
{
  "type": "response.output_item.done",
  "output_index": 1,
  "item": {
    "type": "function_call",
    "id": "call_abc123",
    "call_id": "call_abc123",
    "name": "get_weather",
    "arguments": "{\"location\": \"San Francisco\"}",
    "status": "completed"
  }
}
```

--------------------------------

### Layout Focus Integration Update

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/waveai-focus-updates.md

Updates the `isFocused` atom in the layout model to use the focus manager's `focusType` for accurate focus state determination, ensuring physical DOM focus remains with Wave AI when appropriate.

```typescript
isFocused: atom((get) => {
  const treeState = get(this.localTreeStateAtom);
  const isFocused = treeState.focusedNodeId === nodeid;
  const focusType = get(focusManager.focusType);
  return isFocused && focusType === "node";
});
```

--------------------------------

### Send Done (Exit Status) Command (D)

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/wave-osc-16162.md

Reports the exit status of the previous command in the 'precmd' hook. Requires a JSON payload with the 'exitcode'.

```bash
# After command exits with status 0
printf '\033]16162;D;{"exitcode":0}\007'

# After command exits with status 1
printf '\033]16162;D;{"exitcode":1}\007'
```

--------------------------------

### Reasoning Text Delta Event

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/openai-streaming.md

Emitted for incremental reasoning text updates. Includes the item ID, summary index, and the text delta.

```json
{
  "type": "response.reasoning_summary_text.delta",
  "item_id": "reasoning_abc123",
  "summary_index": 0,
  "delta": "Let me think about this step by step..."
}
```

--------------------------------

### Simplified treeReducer for LayoutModel

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/layout-simplification.md

Handles layout tree actions by calling appropriate reducer functions and updating the local state atom. Persists changes to the backend asynchronously.

```typescript
class LayoutModel {
  treeReducer(action: LayoutTreeAction, setState = true): boolean {
    // Run the tree operation (mutates this.treeState)
    switch (action.type) {
      case LayoutTreeActionType.InsertNode:
        insertNode(this.treeState, action);
        break;
      case LayoutTreeActionType.FocusNode:
        focusNode(this.treeState, action);
        break;
      case LayoutTreeActionType.DeleteNode:
        deleteNode(this.treeState, action);
        break;
      // ... all other cases unchanged
    }
    
    if (setState) {
      // Update tree (compute leafOrder, validate, etc.)
      this.updateTree();
      
      // Update local atom IMMEDIATELY (synchronous)
      this.setter(this.localTreeStateAtom, { ...this.treeState });
      
      // Persist to backend asynchronously (fire and forget)
      this.persistToBackend();
    }
    
    return true;
  }
  
  // Fire-and-forget persistence
  private async persistToBackend() {
    const waveObj = this.getter(this.waveObjectAtom);
    if (!waveObj) return;
    
    // Update WaveObject fields
    waveObj.rootnode = this.treeState.rootNode;           // Persistence only
    waveObj.focusednodeid = this.treeState.focusedNodeId; // Persistence only
    waveObj.magnifiednodeid = this.treeState.magnifiedNodeId; // Persistence only
    waveObj.leaforder = this.treeState.leafOrder;         // Backend reads this for command resolution!
    
    // Write to backend (don't await - fire and forget)
    this.setter(this.waveObjectAtom, waveObj);
    
    // Optional: Debounce if rapid changes are a concern
  }
}
```

--------------------------------

### Configure SSH Password Secret

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/secrets.mdx

Integrate secrets into SSH connection configurations by specifying the secret name for the password field. Ensure the secret is set in your store.

```json
{
    "myserver": {
        "ssh:hostname": "example.com",
        "ssh:user": "myuser",
        "ssh:passwordsecretname": "SERVER_PASSWORD"
    }
}
```

```bash
wsh secret set SERVER_PASSWORD=my_actual_password
```

--------------------------------

### Response Completed Event

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/openai-streaming.md

Emitted upon successful completion of a response. Includes usage details and service tier.

```json
{
  "type": "response.completed",
  "response": {
    "incomplete_details": null,
    "usage": {
      "input_tokens": 100,
      "input_tokens_details": {
        "cached_tokens": 50
      },
      "output_tokens": 200,
      "output_tokens_details": {
        "reasoning_tokens": 150
      }
    },
    "service_tier": "default"
  }
}
```

--------------------------------

### Clear/Reset Pattern in Go Structs

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/config-system.md

Defines boolean fields in Go structs to enable clearing or resetting all settings within a specific namespace. The `omitempty` tag ensures these fields are omitted if false.

```go
AppClear  bool `json:"app:*,omitempty"`
TermClear bool `json:"term:*,omitempty"`

```

--------------------------------

### API Endpoint Structure for Chat and Persistence

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/usechat-backend-design.md

Defines the RESTful endpoints for handling chat streaming and conversation persistence, using blockId for context and presetKey for configuration.

```http
POST /api/ai/chat/{blockId}?preset={presetKey}
```

```http
POST /api/ai/conversations/{blockId}     # Save conversation
```

```http
GET  /api/ai/conversations/{blockId}     # Load conversation
```

--------------------------------

### Wave AI Component Structure

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/aimodesconfig.md

TypeScript structure outlining the visual components of the Wave AI Modes configuration, including the Mode List and Mode Editor.

```typescript
WaveAIVisualContent
├─ ModeList (left panel)
│  ├─ Header with "Add New Mode" button
│  ├─ List of existing modes (sorted by display:order)
│  │  └─ ModeListItem (icon, name, short desc, provider badge)
│  └─ Empty state if no modes
│
└─ ModeEditor (right panel)
   ├─ Provider selector dropdown (when creating/editing)
   ├─ Display section (common to all providers)
   │  ├─ Name input (required)
   │  ├─ Icon picker (optional)
   │  ├─ Display order (optional, number)
   │  ├─ Short description (optional)
   │  └─ Description textarea (optional)
   │
   ├─ Provider Configuration section (dynamic based on provider)
   │  └─ [Provider-specific form fields]
   │
   └─ Action buttons (Save, Delete, Cancel)
```

--------------------------------

### Try Reconnect to Failed Connection

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/fe-conn-arch.md

Initiates a reconnection attempt to a specified host. Used when a connection is in a disconnected or error state.

```typescript
// Reconnect to failed connection
const handleTryReconnect = () => {
    RpcApi.ConnConnectCommand(TabRpcClient, {
        host: connName,
        logblockid: nodeModel.blockId
    }, { timeout: 60000 })
}
```

--------------------------------

### Messages API Parameters

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/anthropic-messages-api.md

This section outlines the parameters available for the Messages API, which are used to define the input and behavior of the model's response.

```APIDOC
## Messages API Parameters

### Description
Parameters for constructing messages and controlling model behavior.

### Parameters

#### `messages` (array) - Required
An array of messages to be sent to the model. Each message should follow the `InputMessage` schema.

#### `max_tokens` (integer) - Required
The maximum number of tokens to generate before stopping. Models may stop before reaching this limit. Different models have different maximum values.

#### `container` (string | null)
Container identifier for reuse across requests.

#### `mcp_servers` (array) - Optional
MCP servers to be utilized in this request. Maximum of 20 items.

#### `metadata` (object) - Optional
An object describing metadata about the request.

#### `service_tier` (string) - Optional
Determines whether to use priority capacity (if available) or standard capacity. Possible values: `auto`, `standard_only`.

#### `stop_sequences` (array) - Optional
Custom text sequences that will cause the model to stop generating. If a sequence is encountered, the `stop_reason` will be `"stop_sequence"`.

#### `stream` (boolean) - Optional
Whether to incrementally stream the response using server-sent events.

#### `system` (string | array) - Optional
System prompt to provide context and instructions to the model. Can be a string or an array of `RequestTextBlock` objects.
```

--------------------------------

### ShellProc Structure Definition

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/conn-arch.md

Defines the ShellProc struct for managing shell processes. It holds connection information, the command interface, synchronization for closing, a channel to signal completion, and the process's exit status.

```go
type ShellProc struct {
    ConnName  string          // Connection identifier
    Cmd       ConnInterface   // Actual process interface
    CloseOnce *sync.Once      // Ensures single close
    DoneCh    chan any        // Signals process completion
    WaitErr   error           // Process exit status
}
```

--------------------------------

### BlockNodeModel Interface

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/focus.md

Defines the structure for a block node model, including its ID, focus state, and methods for closing and focusing.

```typescript
export interface BlockNodeModel {
    blockId: string;
    isFocused: Atom<boolean>;
    onClose: () => void;
    focusNode: () => void;
}
```

--------------------------------

### Read Config Value in React Component

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/getsetconfigvar.md

Within a React component, use useSettingsKeyAtom to read configuration values. This hook is a wrapper around getSettingsKeyAtom for use in React.

```tsx
const configValue = useSettingsKeyAtom("app:defaultnewblock") ?? "default value";
```

--------------------------------

### Update Block Metadata via RPC Command

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/newview.md

Use `RpcApi.SetMetaCommand` to update block metadata. This requires importing `RpcApi`, `TabRpcClient`, and `WOS`. The command takes the block's object reference and the metadata key-value pairs to set.

```typescript
import { RpcApi } from "@/app/store/wshclientapi";
import { TabRpcClient } from "@/app/store/wshrpcutil";
import { WOS } from "@/store/global";

await RpcApi.SetMetaCommand(TabRpcClient, {
    oref: WOS.makeORef("block", this.blockId),
    meta: { "myview:key": value },
});
```

--------------------------------

### Committing Layout State Changes with Jotai

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/focus-layout.md

Commits changes to the layout state by updating a Jotai atom with a new object reference, triggering reactivity. Includes asynchronous persistence to the backend.

```typescript
treeReducer(action: LayoutTreeAction, setState = true): boolean {
    // Mutate tree state
    focusNode(this.treeState, action);
    
    if (setState) {
        this.updateTree();  // Compute leafOrder, etc.
        this.setter(this.localTreeStateAtom, { ...this.treeState });  // Sync update
        this.persistToBackend();  // Async persistence
    }
}
```

--------------------------------

### Reference Secrets in AI Mode

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/waveai-modes.mdx

Configure an AI mode to automatically utilize a stored secret by provider name.

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

### secret list

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

Display all stored secret names.

```APIDOC
## wsh secret list

### Description
Display all stored secret names (values are not shown).

### Usage
```sh
wsh secret list
```

### Example
```sh
# List all secrets
wsh secret list
```
```

--------------------------------

### Define ContextMenuItem Type

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/contextmenu.md

Defines the structure for individual context menu items, specifying properties like label, type, click handlers, and submenu options.

```typescript
type ContextMenuItem = {
  label?: string;
  type?: "separator" | "normal" | "submenu" | "checkbox" | "radio";
  role?: string; // Electron role (optional)
  click?: () => void; // Callback for item selection (not needed if role is set)
  submenu?: ContextMenuItem[]; // For nested menus
  checked?: boolean; // For checkbox or radio items
  visible?: boolean;
  enabled?: boolean;
  sublabel?: string;
};
```

--------------------------------

### SourceUrlUIPart Type

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/aisdk-uimessage-type.md

Represents a source URL part of a UIMessage, linking to external resources. It includes a source ID, URL, and an optional title.

```typescript
type SourceUrlUIPart = {
  type: "source-url";
  sourceId: string;
  url: string;
  title?: string;
  providerMetadata?: Record<string, any>;
};
```

--------------------------------

### Stream Messages with Python SDK

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/anthropic-streaming.md

Use the `client.messages.stream` method for synchronous streaming of responses. This is useful for real-time output where you want to process each text chunk as it arrives.

```Python
import anthropic

client = anthropic.Anthropic()

with client.messages.stream(
max_tokens=1024,
messages=[{"role": "user", "content": "Hello"}],
model="claude-opus-4-1-20250805",
) as stream:
for text in stream.text_stream:
print(text, end="", flush=True)
```

--------------------------------

### SSE Event Flow

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/anthropic-streaming.md

Describes the sequence of Server-Sent Events (SSE) used for streaming API responses.

```APIDOC
## Event Types

### Event Flow
Server-sent events for streaming messages follow a specific sequence:

1.  **`message_start`**: Initiates the stream with a `Message` object containing empty `content`.
2.  **Content Blocks**: A series of events for each content block:
    *   `content_block_start`: Marks the beginning of a content block.
    *   `content_block_delta`: Provides incremental updates for the content block (e.g., text or tool use input).
    *   `content_block_stop`: Marks the end of a content block.
3.  **`message_delta`**: One or more events indicating top-level changes to the `Message` object, including cumulative token counts in the `usage` field.
4.  **`message_stop`**: Signals the end of the message stream.

### Ping Events
`ping` events may be interspersed within the stream and should be handled gracefully.

### Error Events
Error events, such as `overloaded_error`, may be sent in the stream, typically corresponding to specific HTTP error codes in a non-streaming context.

Example Error Event:
```json
event: error
data: {"type": "error", "error": {"type": "overloaded_error", "message": "Overloaded"}}
```

### Other Events
New event types may be introduced according to the API's versioning policy. Clients should be designed to handle unknown event types without failing.
```

--------------------------------

### Expose Type for Frontend Generation

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/wps-events.md

Add custom types to ExtraTypes in tsgen.go to ensure TypeScript definitions are generated for frontend use. Run 'task generate' to update types.

```go
// add extra types to generate here
var ExtraTypes = []any{
    waveobj.ORef{},
    // ... other types ...
    uctypes.RateLimitInfo{},  // Example: already added
    YourEventData{},
}
```

--------------------------------

### Terminal View: Manage Connection Atom

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/newview.md

This derived atom determines whether to show the connection picker based on the terminal mode. It returns `true` for regular terminal mode and `false` for vdom mode.

```typescript
this.manageConnection = jotai.atom((get) => {
    const termMode = get(this.termMode);
    if (termMode == "vdom") return false;
    return true;  // Show connection picker for regular terminal mode
});

```

--------------------------------

### Stopping Existing Controller on Registration

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/blockcontroller-lifecycle.md

When a new controller is registered for a block ID, any existing controller for that same ID is automatically stopped. This ensures that only one controller is active per block at any given time.

```go
if existingController != nil {
    existingController.Stop(false, Status_Done)
    wstore.DeleteRTInfo(waveobj.MakeORef(waveobj.OType_Block, blockId))
}
```

--------------------------------

### ConnConnectCommand RPC Interface

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/fe-conn-arch.md

RPC command to explicitly connect to a specified host. Used for 'Reconnect' actions and returns upon connection success or failure.

```typescript
ConnConnectCommand(
    client: RpcClient,
    data: { host: string, logblockid?: string }
): Promise<void>
```

--------------------------------

### Output Item Added Event

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/openai-streaming.md

Emitted when a new output item, such as a message or tool call, is added to the response. Specifies the item type and index.

```json
{
  "type": "response.output_item.added",
  "output_index": 0,
  "item": {
    "type": "message",
    "id": "msg_abc123"
  }
}
```

--------------------------------

### Text Annotation Added Event

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/openai-streaming.md

Emitted when citations or annotations are added to text. Supports URL and file citations with relevant details.

```json
{
  "type": "response.output_text.annotation.added",
  "annotation": {
    "type": "url_citation",
    "url": "https://example.com/article",
    "title": "Example Article"
  }
}
```

```json
{
  "type": "response.output_text.annotation.added",
  "annotation": {
    "type": "file_citation",
    "file_id": "file_abc123",
    "filename": "document.pdf",
    "quote": "This is the relevant quote",
    "start_index": 100,
    "end_index": 150
  }
}
```

--------------------------------

### Set Block-Specific Override Metadata

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/config-system.md

Use RpcApi.SetMetaCommand to set block-specific metadata for configuration overrides. This allows individual blocks to have their own setting values.

```typescript
// Set block-specific override
await RpcApi.SetMetaCommand(TabRpcClient, {
  oref: WOS.makeORef("block", blockId),
  meta: { "mynew:setting": "block-specific value" },
});

```

--------------------------------

### Move Files with wsh

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

Use `wsh file mv` to move files between remote systems or local directories. The `-f` flag can be used to force overwriting of existing files.

```sh
wsh file mv wsh://user@ec2/home/user/config.txt wsh://user@server2/home/user/backup.txt
```

--------------------------------

### Filter Connection List

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/fe-conn-arch.md

Filters a list of connections based on a search term and configuration settings like 'display:hidden' and 'conn:wshenabled'.

```typescript
function filterConnections(
    connList: Array<string>,
    connSelected: string,
    fullConfig: FullConfigType,
    filterOutNowsh: boolean
): Array<string> {
    const connectionsConfig = fullConfig.connections
    return connList.filter((conn) => {
        const hidden = connectionsConfig?.[conn]?.[ "display:hidden"] ?? false
        const wshEnabled = connectionsConfig?.[conn]?.[ "conn:wshenabled"] ?? true
        return conn.includes(connSelected) && 
               !hidden && 
               (wshEnabled || !filterOutNowsh)
    })
}
```

--------------------------------

### Edit file and block until closed

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

Opens a codeedit block for a file and blocks execution until the editor is closed. Useful for setting the $EDITOR environment variable.

```sh
wsh editor [path]
wsh editor -m [path]         # opens in magnified block
```

```sh
export EDITOR="wsh editor"
```

--------------------------------

### Custom Data Part SSE Format

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/aisdk-streaming.md

Allows streaming of arbitrary structured data with type-specific handling. This is a Server-Sent Event with a JSON object payload.

```text
data: {"type":"data-weather","data":{"location":"SF","temperature":100}}

```

--------------------------------

### Clear Badge

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

Clears the badge on a specific tab. The `--pid` flag is not supported on Windows.

```APIDOC
## Clear the badge on a specific tab
wsh badge --clear -b tab

:::note
The `--pid` flag is not supported on Windows.
:::
```

--------------------------------

### Jotai Atoms for UI State Management

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/waveai-architecture.md

Defines Jotai atoms for managing the UI state of the Wave AI feature, such as input locking and header elements.

```typescript
locked: PrimitiveAtom<boolean>    // Prevents input during AI response
viewIcon: Atom<string>            // Header icon
viewName: Atom<string>            // Header title
viewText: Atom<HeaderElem[]>      // Dynamic header elements
endIconButtons: Atom<IconButtonDecl[]>  // Header action buttons
```

--------------------------------

### ConnStatus Interface for Connection State

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/fe-conn-arch.md

Defines the structure for connection status, including connection name, connection state (init, connecting, connected, disconnected, error), active connection number, WSH availability, and potential error messages.

```typescript
interface ConnStatus {
    status: "init" | "connecting" | "connected" | "disconnected" | "error"
    connection: string           // Connection name
    connected: boolean           // Is currently connected
    activeconnnum: number        // Color assignment number (1-8)
    wshenabled: boolean         // WSH available on this connection
    error?: string              // Error message if status is "error"
    wsherror?: string           // WSH-specific error
}
```

--------------------------------

### Batch Related RPC Operations

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/fe-conn-arch.md

Batch related operations into a single command, such as setting multiple metadata fields in one SetMetaCommand, to improve efficiency.

```typescript
// Good: Single SetMetaCommand with all changes
await RpcApi.SetMetaCommand(TabRpcClient, {
    oref: blockRef,
    meta: {
        connection: newConn,
        file: newPath,
        "cmd:cwd": null
    }
})

// Bad: Multiple SetMetaCommand calls
```

--------------------------------

### Send Input Data to Controller

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/blockcontroller-lifecycle.md

Encodes string input data to base64 and sends it to the block controller via an RPC call. This function is part of the terminal's model for handling user input.

```typescript
sendDataToController(data: string) {
    const b64data = stringToBase64(data);
    RpcApi.ControllerInputCommand(TabRpcClient, { 
        blockid: this.blockId, 
        inputdata64: b64data 
    });
}
```

--------------------------------

### Save Scrollback to File

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

Save the entire terminal scrollback content to a specified file. Useful for logging or archiving terminal output.

```sh
wsh termscrollback -o terminal-log.txt
```

--------------------------------

### ConnListCommand RPC Interface

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/fe-conn-arch.md

RPC command to retrieve a list of configured SSH connection names. Used by the connection modal and filters out connections marked with `display:hidden`.

```typescript
ConnListCommand(client: RpcClient): Promise<string[]>
```

--------------------------------

### ConnEnsureCommand RPC Interface

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/fe-conn-arch.md

RPC command to ensure a connection is in a 'connected' state, triggering a connection if necessary. It waits for the connection to complete or timeout and is used before file operations.

```typescript
ConnEnsureCommand(
    client: RpcClient,
    data: { connname: string, logblockid?: string }
): Promise<void>
```

--------------------------------

### Simplify NodeModel isFocused Atom

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/layout-simplification.md

Replaces complex dependency on bidirectional treeStateAtom with a simple dependency on localTreeStateAtom for focused state.

```typescript
class LayoutModel {
  getNodeModel(node: LayoutNode): NodeModel {
    return {
      // BEFORE: Complex dependency on bidirectional treeStateAtom
      // isFocused: atom((get) => {
      //   const treeState = get(this.treeStateAtom);  // Triggers on any tree change
      //   ...
      // })
      
      // AFTER: Simple dependency on local atom
      isFocused: atom((get) => {
        const treeState = get(this.localTreeStateAtom);  // Simple read
        const focusType = get(focusManager.focusType);
        return treeState.focusedNodeId === node.id && focusType === "node";
      }),
      
      // All other atoms similarly simplified...
      isMagnified: atom((get) => {
        const treeState = get(this.localTreeStateAtom);
        return treeState.magnifiedNodeId === node.id;
      }),
      
      // ... rest unchanged
    };
  }
}
```

--------------------------------

### Access Connection Status in WaveTerm

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/newview.md

An atom that derives the connection status based on block metadata. It retrieves the connection name from the block's meta information and then uses `getConnStatusAtom` to fetch the actual status.

```typescript
const connStatus = jotai.atom((get) => {
    const blockData = get(this.blockAtom);
    const connName = blockData?.meta?.connection;
    return get(getConnStatusAtom(connName));
});
```

--------------------------------

### Terminal View: Dynamic Header Buttons

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/newview.md

This derived atom generates an array of header buttons based on the shell process status. It includes a 'Restart Shell' button when the shell is running.

```typescript
this.endIconButtons = jotai.atom((get) => {
    const shellProcStatus = get(this.shellProcStatus);
    const buttons: IconButtonDecl[] = [];
    
    if (shellProcStatus == "running") {
        buttons.push({
            elemtype: "iconbutton",
            icon: "refresh",
            title: "Restart Shell",
            click: this.forceRestartController.bind(this),
        });
    }
    return buttons;
});

```

--------------------------------

### Granting Physical Focus to Terminal

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/focus-layout.md

The `giveFocus()` method on a view model attempts to grant browser focus to the terminal component if it's in 'term' mode and the terminal reference is available.

```typescript
giveFocus(): boolean {
    if (termMode == "term" && this.termRef?.current?.terminal) {
        this.termRef.current.terminal.focus();
        return true;
    }
    return false;
}
```

--------------------------------

### Cache Control Ephemeral Schema

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/anthropic-messages-api.md

Defines ephemeral cache control settings.

```APIDOC
## CacheControlEphemeral

### Description
Configuration for ephemeral cache control.

### Properties
- **ttl** (string) - Optional - The time-to-live for the cache control breakpoint. Can be '5m' or '1h'. Defaults to '5m'.
- **type** (string) - Required - The type of cache control, must be 'ephemeral'.
```

--------------------------------

### Add Focus Manager Methods in focusManager.ts

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/waveai-focus-updates.md

Adds new methods to the FocusManager class to handle Wave AI and node focus requests. These methods update both the new `focusType` atom and the old `waveAIFocusedAtom` during the migration phase to maintain backward compatibility.

```typescript
class FocusManager {
  // NEW methods that ALSO update the old waveAIFocusedAtom during migration
  requestWaveAIFocus(): void {
    globalStore.set(this.focusType, "waveai");
    globalStore.set(atoms.waveAIFocusedAtom, true); // ← Keep old atom in sync during migration!
  }

  requestNodeFocus(): void {
    // NO defensive checks - when called, we TAKE focus (selections may be lost)
    globalStore.set(this.focusType, "node");
    globalStore.set(atoms.waveAIFocusedAtom, false); // ← Keep old atom in sync during migration!
  }

  getFocusType(): FocusStrType {
    return globalStore.get(this.focusType);
  }

  waveAIFocusWithin(): boolean {
    return waveAIHasFocusWithin();
  }

  nodeFocusWithin(): boolean {
    return focusedBlockId() != null;
  }
}
```

--------------------------------

### Terminal View Model Connection Management

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/fe-conn-arch.md

Manages connection button visibility based on terminal mode and controller status. Use when standard terminals require connection management.

```typescript
class TermViewModel implements ViewModel {
    // Connection management flag
    manageConnection = atom((get) => {
        const termMode = get(this.termMode)
        if (termMode == "vdom") return false  // VDOM mode doesn't show conn button
        
        const isCmd = get(this.isCmdController)
        if (isCmd) return false  // Cmd controller doesn't manage connections
        
        return true  // Standard terminals show connection button
    })
    
    // Connection status for this block
    connStatus = atom((get) => {
        const blockData = get(this.blockAtom)
        const connName = blockData?.meta?.connection
        const connAtom = getConnStatusAtom(connName)
        return get(connAtom)
    })
    
    // Filter connections without WSH
    filterOutNowsh = atom(false)
}
```

--------------------------------

### React Jotai Hook Usage

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/newview.md

Shows how React components should interact with Jotai atoms using hooks like `useAtomValue` and `useAtom`. This is the standard way to consume atom state within React functional components.

```typescript
const data = useAtomValue(model.dataAtom);
const [value, setValue] = useAtom(model.valueAtom);
```

--------------------------------

### ToolUIPart Type Definition

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/aisdk-uimessage-type.md

Defines the structure for tool-related message parts, including tool invocations and their results. It supports various states like input-streaming, input-available, output-available, and output-error, with type safety for tool inputs and outputs.

```typescript
type ToolUIPart<TOOLS extends UITools = UITools> = ValueOf<{
  [NAME in keyof TOOLS & string]: {
    type: `tool-${NAME}`;
    toolCallId: string;
  } & (
    | {
        state: "input-streaming";
        input: DeepPartial<TOOLS[NAME]["input"]> | undefined;
        providerExecuted?: boolean;
        output?: never;
        errorText?: never;
      }
    | {
        state: "input-available";
        input: TOOLS[NAME]["input"];
        providerExecuted?: boolean;
        output?: never;
        errorText?: never;
      }
    | {
        state: "output-available";
        input: TOOLS[NAME]["input"];
        output: TOOLS[NAME]["output"];
        errorText?: never;
        providerExecuted?: boolean;
      }
    | {
        state: "output-error";
        input: TOOLS[NAME]["input"];
        output?: never;
        errorText: string;
        providerExecuted?: boolean;
      }
  );
}>;
```

--------------------------------

### Create Custom Typed UIMessage

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/aisdk-uimessage-type.md

Define a custom UIMessage type by specifying schemas for metadata, data parts, and tools. This ensures type safety for your application's state.

```typescript
import { InferUITools, ToolSet, UIMessage, tool } from "ai";
import z from "zod";

const metadataSchema = z.object({
  someMetadata: z.string().datetime(),
});

type MyMetadata = z.infer<typeof metadataSchema>;

const dataPartSchema = z.object({
  someDataPart: z.object({}),
  anotherDataPart: z.object({}),
});

type MyDataPart = z.infer<typeof dataPartSchema>;

const tools = {
  someTool: tool({})
} satisfies ToolSet;

type MyTools = InferUITools<typeof tools>;

export type MyUIMessage = UIMessage<MyMetadata, MyDataPart, MyTools>;
```

--------------------------------

### Set Variables with wsh setvar

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

Manage persistent variables using `wsh setvar`. Variables are set globally by default. Use `-l` for block-local variables and `-r` to remove them.

```sh
wsh setvar API_KEY=abc123
```

```sh
wsh setvar HOST=localhost PORT=8080 DEBUG=true
```

```sh
wsh setvar -l BLOCK_SPECIFIC=value
```

```sh
wsh setvar -r API_KEY PORT
```

--------------------------------

### Block Controller RPC: Send Input

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/fe-conn-arch.md

Sends base64 encoded input data to a block's shell process via RPC. Use for sending commands or data to an active shell session.

```typescript
sendDataToController(data: string) {
    const b64data = stringToBase64(data)
    RpcApi.ControllerInputCommand(TabRpcClient, {
        blockid: this.blockId,
        inputdata64: b64data
    })
}
```

--------------------------------

### Text Delta Part SSE Format

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/aisdk-streaming.md

Contains incremental text content for a text block. This is a Server-Sent Event with a JSON object payload.

```text
data: {"type":"text-delta","id":"msg_68679a454370819ca74c8eb3d04379630dd1afb72306ca5d","delta":"Hello"}

```

--------------------------------

### Authentication Error Schema

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/anthropic-messages-api.md

Defines the structure for authentication errors, including a message and a type.

```APIDOC
## AuthenticationError

### Description
Represents an error related to authentication.

### Properties
- **message** (string) - Required - A human-readable description of the authentication error.
- **type** (string) - Required - The type of error, must be 'authentication_error'.
```

--------------------------------

### Hide Wave Cloud Modes in settings.json

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/waveai-modes.mdx

Disables Wave's built-in cloud AI modes by adding the key-value pair to the settings.json file.

```json
  "waveai:showcloudmodes": false
```

--------------------------------

### OpenAPI Specification for POST /v1/messages

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/anthropic-messages-api.md

Defines the OpenAPI schema for the POST /v1/messages endpoint, including parameters, headers, and request body structure.

```yaml
paths:
  path: /v1/messages
  method: post
  servers:
    - url: https://api.anthropic.com
  request:
    security: []
    parameters:
      path: {}
      query: {}
      header:
        anthropic-beta:
          schema:
            - type: array
              items:
                allOf:
                  - type: string
              required: false
              title: Anthropic-Beta
              description: >-
                Optional header to specify the beta version(s) you want to use.


                To use multiple betas, use a comma separated list like
                `beta1,beta2` or specify the header multiple times for each
                beta.
        anthropic-version:
          schema:
            - type: string
              required: true
              title: Anthropic-Version
              description: >-
                The version of the Anthropic API you want to use.


                Read more about versioning and our version history
                [here](https://docs.anthropic.com/en/api/versioning).
        x-api-key:
          schema:
            - type: string
              required: true
              title: X-Api-Key
              description: >-
                Your unique API key for authentication.


                This key is required in the header of all API requests, to
                authenticate your account and access Anthropic's services. Get
                your API key through the
                [Console](https://console.anthropic.com/settings/keys). Each key
                is scoped to a Workspace.
      cookie: {}
    body:
      application/json:
        schemaArray:
          - type: object
            properties:
              model:
                allOf:
                  - description: >-
                      The model that will complete your prompt.


                      See
                      [models](https://docs.anthropic.com/en/docs/models-overview)
                      for additional details and options.
                    examples:
                      - claude-sonnet-4-20250514
                    maxLength: 256
                    minLength: 1
                    title: Model
                    type: string
              messages:
                allOf:
                  - description: >-
                      Input messages.


                      Our models are trained to operate on alternating `user`
                      and `assistant` conversational turns. When creating a new
                      `Message`, you specify the prior conversational turns with
                      the `messages` parameter, and the model then generates the
                      next `Message` in the conversation. Consecutive `user` or
                      `assistant` turns in your request will be combined into a
                      single turn.


                      Each input message must be an object with a `role` and
                      `content`. You can specify a single `user`-role message,
                      or you can include multiple `user` and `assistant`
                      messages.


                      If the final message uses the `assistant` role, the
                      response content will continue immediately from the
                      content in that message. This can be used to constrain
                      part of the model's response.


                      Example with a single `user` message:


                      ```json

                      [{"role": "user", "content": "Hello, Claude"}]

                      ```


                      Example with multiple conversational turns:


                      ```json

                      [
                        {"role": "user", "content": "Hello there."},
                        {"role": "assistant", "content": "Hi, I'm Claude. How can I help you?"},
                        {"role": "user", "content": "Can you explain LLMs in plain English?"},
                      ]

                      ```


                      Example with a partially-filled response from Claude:


                      ```json

                      [
                        {"role": "user", "content": "What's the Greek name for Sun? (A) Sol (B) Helios (C) Sun"},
                        {"role": "assistant", "content": "The best answer is ("},
                      ]

                      ```


                      Each input message `content` may be either a single
                      `string` or an array of content blocks, where each block
                      has a specific `type`. Using a `string` for `content` is
                      shorthand for an array of one content block of type
                      `"text"`. The following input messages are equivalent:


                      ```json

                      {"role": "user", "content": "Hello, Claude"}

                      ```


                      ```json

```

--------------------------------

### Terminal View Model End Icon Buttons

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/fe-conn-arch.md

Determines which icon buttons to display based on connection and shell process status. Use to control UI elements for shell interaction.

```typescript
endIconButtons = atom((get) => {
    const connStatus = get(this.connStatus)
    const shellProcStatus = get(this.shellProcStatus)
    
    // Only show restart button if connected
    if (connStatus?.status != "connected") {
        return []
    }
    
    // Show appropriate icon based on shell state
    if (shellProcStatus == "init") {
        return [{ icon: "play", title: "Click to Start Shell" }]
    } else if (shellProcStatus == "running") {
        return [{ icon: "refresh", title: "Shell Running. Click to Restart" }]
    } else if (shellProcStatus == "done") {
        return [{ icon: "refresh", title: "Shell Exited. Click to Restart" }]
    }
})
```

--------------------------------

### Atomically Load and Store Flags

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/conn-arch.md

Utilize atomic operations for reading and updating boolean flags like WshEnabled to ensure thread safety without explicit locking.

```go
conn.WshEnabled.Load()    // Read WSH enabled status
conn.WshEnabled.Store(v)  // Update atomically
```

--------------------------------

### Shallow Copy for Jotai Atom Update

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/layout-simplification.md

This code snippet demonstrates how to update a Jotai atom with a shallow copy of the current state. This is sufficient for Jotai to detect a change because it compares object references.

```typescript
this.setter(this.localTreeStateAtom, { ...this.treeState });
```

--------------------------------

### Focus Target Decision Logic

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/focus.md

Determines where to direct focus. It first tries to use the view model's `giveFocus` method, falling back to focusing a dummy input if that fails.

```typescript
const setFocusTarget = useCallback(() => {
    const ok = viewModel?.giveFocus?.();
    if (ok) {
        return;
    }
    focusElemRef.current?.focus({ preventScroll: true });
}, []);
```

--------------------------------

### TextUIPart Type

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/aisdk-uimessage-type.md

Represents a text-based part of a UIMessage. It includes the text content and an optional state indicating if it's currently streaming or done.

```typescript
type TextUIPart = {
  type: "text";
  /**
   * The text content.
   */
  text: string;
  /**
   * The state of the text part.
   */
  state?: "streaming" | "done";
};
```

--------------------------------

### useChat SSE Error Format

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/usechat-backend-design.md

Specifies the SSE format for reporting errors back to the frontend, including an error type and message.

```sse
data: {"type":"error","error":"API key invalid"}

data: [DONE]
```

--------------------------------

### Trigger Controller Restart on Enter Key

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/blockcontroller-lifecycle.md

Restarts a controller when the 'Enter' key is pressed and the shell process status is 'done' or 'init'. This is handled within the terminal component's event listener.

```typescript
const shellProcStatus = globalStore.get(this.shellProcStatus);
if ((shellProcStatus == "done" || shellProcStatus == "init") && 
    keyutil.checkKeyPressed(waveEvent, "Enter")) {
    this.forceRestartController();
    return false;
}
```

--------------------------------

### Stream Messages with TypeScript SDK

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/anthropic-streaming.md

Utilize the `client.messages.stream` method in the TypeScript SDK for asynchronous streaming. The `.on('text', ...)` handler processes incoming text chunks.

```TypeScript
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();

await client.messages.stream({
    messages: [{role: 'user', content: "Hello"}],
    model: 'claude-opus-4-1-20250805',
    max_tokens: 1024,
}).on('text', (text) => {
    console.log(text);
});
```

--------------------------------

### POST /v1/messages

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/anthropic-messages-api.md

The Messages API allows you to send prompts to Anthropic models and receive completions. This endpoint is used for generating text based on the provided messages and model.

```APIDOC
## POST /v1/messages

### Description
This endpoint allows you to send prompts to Anthropic models and receive completions. It is used for generating text based on the provided messages and model.

### Method
POST

### Endpoint
https://api.anthropic.com/v1/messages

### Headers
- **anthropic-beta** (array of strings) - Optional: Specify beta versions to use (e.g., `beta1,beta2`).
- **anthropic-version** (string) - Required: The version of the Anthropic API (e.g., `2023-06-01`).
- **x-api-key** (string) - Required: Your unique API key for authentication.

### Request Body
- **model** (string) - Required: The model to use for completion (e.g., `claude-sonnet-4-20250514`).
- **messages** (array) - Required: An array of message objects representing the conversation history. Each object should have a `role` (string: `user` or `assistant`) and `content` (string or array of content blocks).

#### Message Content Block Types
- **text** (string): Plain text content.

### Request Example
```json
{
  "model": "claude-sonnet-4-20250514",
  "messages": [
    {"role": "user", "content": "Hello, Claude"}
  ]
}
```

### Response
#### Success Response (200)
- **content** (array): The response content from the model.
- **model** (string): The model that generated the response.
- **role** (string): The role of the response (always `assistant`).
- **stop_reason** (string): The reason the model stopped generating text (e.g., `end_turn`, `max_tokens`).
- **type** (string): The type of the response (always `message`).

#### Response Example
```json
{
  "content": [
    {
      "type": "text",
      "text": "Hi there. How can I help you today?"
    }
  ],
  "model": "claude-sonnet-4-20250514",
  "role": "assistant",
  "stop_reason": "end_turn",
  "type": "message"
}
```
```

--------------------------------

### ViewComponent Props

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/newview.md

The React component for a view receives these props, providing access to block context and the view's model.

```APIDOC
### Key Concepts

**ViewComponent**: The React component receives these props:

```typescript
type ViewComponentProps<T extends ViewModel> = {
    blockId: string;                              // Unique ID for this block
    blockRef: React.RefObject<HTMLDivElement>;    // Ref to block container
    contentRef: React.RefObject<HTMLDivElement>;  // Ref to content area
    model: T;                                      // Your ViewModel instance
};
```
```

--------------------------------

### Text Delta Event

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/openai-streaming.md

Emitted for incremental text content updates. Includes the item ID, the text delta, and optional log probabilities.

```json
{
  "type": "response.output_text.delta",
  "item_id": "msg_abc123",
  "delta": "Hello, how can I",
  "logprobs": [
    {
      "token": "Hello",
      "logprob": -0.1,
      "top_logprobs": [
        {
          "token": "Hello",
          "logprob": -0.1
        },
        {
          "token": "Hi",
          "logprob": -2.3
        }
      ]
    }
  ]
}
```

--------------------------------

### WaveAI Stream Response Packet

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/waveai-architecture.md

Defines the structure for individual packets in a streaming AI response, including model details, content, and potential errors.

```go
type WaveAIPacketType struct {
    Type         string           `json:"type"`
    Model        string           `json:"model,omitempty"`
    Created      int64            `json:"created,omitempty"`
    FinishReason string           `json:"finish_reason,omitempty"`
    Usage        *WaveAIUsageType `json:"usage,omitempty"`
    Index        int              `json:"index,omitempty"`
    Text         string           `json:"text,omitempty"`
    Error        string           `json:"error,omitempty"`
}
```

--------------------------------

### Manage Persistent State with wsh setvar

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh.mdx

Store and retrieve variables across terminal sessions using wsh setvar and wsh getvar. Variables can be stored globally or within a specific workspace.

```bash
# Store a variable that persists across sessions
wsh setvar API_KEY=abc123
```

```bash
# Store globally
wsh setvar DEPLOY_ENV=prod
```

```bash
# Or store in the current workspace
wsh setvar -b workspace DEPLOY_ENV=staging
```

```bash
# Use stored variables in commands
curl -H "Authorization: $(wsh getvar API_KEY)" https://api.example.com
```

--------------------------------

### Header Element Definitions

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/newview.md

TypeScript interfaces defining various header element types for UI construction. Use these to structure complex headers with interactive components.

```typescript
// Icon button
{
    elemtype: "iconbutton",
    icon: "refresh",
    title: "Tooltip text",
    click: () => { /* handler */ },
    disabled?: boolean,
    iconColor?: string,
    iconSpin?: boolean,
    noAction?: boolean,  // Shows icon but no click action
}
```

```typescript
// Text element
{
    elemtype: "text",
    text: "Display text",
    className?: string,
    noGrow?: boolean,
    ref?: React.RefObject<HTMLElement>,
    onClick?: (e: React.MouseEvent) => void,
}
```

```typescript
// Text button
{
    elemtype: "textbutton",
    text: "Button text",
    className?: string,
    title: "Tooltip",
    onClick: (e: React.MouseEvent) => void,
}
```

```typescript
// Input field
{
    elemtype: "input",
    value: string,
    className?: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void,
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void,
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void,
    ref?: React.RefObject<HTMLInputElement>,
}
```

```typescript
// Container with children
{
    elemtype: "div",
    className?: string,
    children: HeaderElem[],
    onMouseOver?: (e: React.MouseEvent) => void,
    onMouseOut?: (e: React.MouseEvent) => void,
}
```

```typescript
// Menu button (dropdown)
{
    elemtype: "menubutton",
    // ... MenuButtonProps ...
}
```

--------------------------------

### File Remove

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

Removes a specified file. Supports local files and remote files via WSH URIs. Supports recursive deletion with a flag.

```APIDOC
### rm

#### Description
Remove a file.

#### Command
```sh
wsh file rm [flag] [file-uri]
```

#### Examples
```sh
wsh file rm wsh://user@ec2/home/user/config.txt
wsh file rm ./local-config.txt
```

#### Flags
- `-r, --recursive` - recursively deletes directory entries
```

--------------------------------

### Update AI Mode Configuration

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/aimodesconfig.md

Updates a specific AI mode configuration within the global store. It parses the current modes, applies the update to the specified mode, and then updates the `fileContentAtom` and `hasEditedAtom`.

```typescript
function updateMode(key: string, mode: AIModeConfigType) {
    const modes = parseAIModes(globalStore.get(model.fileContentAtom));
    if (!modes) return;
    
    modes[key] = mode;
    const newJson = JSON.stringify(modes, null, 2);
    globalStore.set(model.fileContentAtom, newJson);
    globalStore.set(model.hasEditedAtom, true);
}
```

--------------------------------

### Content Block Delta Types

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/anthropic-streaming.md

Details the different types of deltas for content blocks, including text and tool use input.

```APIDOC
## Content Block Delta Types

### Text Delta
Represents incremental updates for text content within a content block.

Example Text Delta:
```json
event: content_block_delta
data: {"type": "content_block_delta","index": 0,"delta": {"type": "text_delta", "text": "ello frien"}}
```

### Input JSON Delta (for Tool Use)
Represents partial JSON string updates for the `input` field of a `tool_use` content block. These deltas are cumulative and should be parsed into a complete JSON object upon receiving a `content_block_stop` event.

Example Input JSON Delta:
```json
event: content_block_delta
data: {"type": "content_block_delta","index": 1,"delta": {"type": "input_json_delta","partial_json": "{\"location\": \"San Fra"}}
```

Note: The SDKs provide helpers for managing these partial JSON deltas.
```

--------------------------------

### Frontend Event Subscription for Controller Status

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/blockcontroller-lifecycle.md

The frontend subscribes to controller status updates via WebSocket events. This enables a reactive UI that automatically updates when the backend publishes changes to the controller's runtime status.

```typescript
this.shellProcStatusUnsubFn = waveEventSubscribe({
    eventType: "controllerstatus",
    scope: WOS.makeORef("block", blockId),
    handler: (event) => {
        let bcRTS: BlockControllerRuntimeStatus = event.data;
        this.updateShellProcStatus(bcRTS);
    },
});
```

--------------------------------

### ChildKey Structure for Reconciliation

Source: https://github.com/wavetermdev/waveterm/blob/main/tsunami/engine/render.md

Defines the structure used to identify child elements during reconciliation. It includes the component tag, position index for non-keyed elements, and an explicit key for keyed elements.

```go
type ChildKey struct {
    Tag string  // Component type must match
    Idx int     // Position index for non-keyed elements
    Key string  // Explicit key for keyed elements
}
```

--------------------------------

### Two-Step Effect Chain for Physical DOM Focus

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/focus-layout.md

Uses `useLayoutEffect` to manage physical DOM focus. The first effect updates a `blockClicked` state based on `isFocused`, and the second effect triggers focus if `blockClicked` is true and focus is not already within the target block.

```typescript
// Step 1: isFocused → blockClicked
useLayoutEffect(() => {
    setBlockClicked(isFocused);
}, [isFocused]);

// Step 2: blockClicked → physical focus
useLayoutEffect(() => {
    if (!blockClicked) return;
    setBlockClicked(false);
    const focusWithin = focusedBlockId() == nodeModel.blockId;
    if (!focusWithin) {
        setFocusTarget();  // Calls viewModel.giveFocus()
    }
}, [blockClicked, isFocused]);
```

--------------------------------

### SourceDocumentUIPart Type

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/aisdk-uimessage-type.md

Represents a source document part of a UIMessage, providing information about a document. It includes source ID, media type, title, and an optional filename.

```typescript
type SourceDocumentUIPart = {
  type: "source-document";
  sourceId: string;
  mediaType: string;
  title: string;
  filename?: string;
  providerMetadata?: Record<string, any>;
};
```

--------------------------------

### Jotai Atoms for Message State Management

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/waveai-architecture.md

Defines Jotai atoms for managing chat message state, including adding, updating, and retrieving messages.

```typescript
messagesAtom: PrimitiveAtom<Array<ChatMessageType>>
messagesSplitAtom: SplitAtom<Array<ChatMessageType>>
latestMessageAtom: Atom<ChatMessageType>
addMessageAtom: WritableAtom<unknown, [message: ChatMessageType], void>
updateLastMessageAtom: WritableAtom<unknown, [text: string, isUpdating: boolean], void>
removeLastMessageAtom: WritableAtom<unknown, [], void>
```

--------------------------------

### Image Output Value Type

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/openai-request.md

Represents an image-based output from a tool execution. The output is an array containing an image content block.

```json
{
  "type": "function_call_output",
  "call_id": "call_abc123",
  "output": [
    {
      "type": "input_image",
      "image_url": "data:image/png;base64,..."
    }
  ]
}
```

--------------------------------

### Handle AI Mode Reordering

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/aimodesconfig.md

Updates the `display:order` property for AI modes when they are reordered. This function parses the current AI modes from file content, sorts them by their order, finds the dragged and target indices, and then recalculates and assigns new order values.

```typescript
function handleModeReorder(draggedKey: string, targetKey: string) {
    const modes = parseAIModes(fileContent);
    const modesList = Object.entries(modes)
        .sort((a, b) => (a[1]["display:order"] || 0) - (b[1]["display:order"] || 0));
    
    // Find indices
    const draggedIndex = modesList.findIndex(([k]) => k === draggedKey);
    const targetIndex = modesList.findIndex(([k]) => k === targetKey);
    
    // Recalculate display:order for all modes
    const newOrder = [...modesList];
    newOrder.splice(draggedIndex, 1);
    newOrder.splice(targetIndex, 0, modesList[draggedIndex]);
    
    // Assign new order values (0, 10, 20, 30...)
    newOrder.forEach(([key, mode], index) => {
        modes[key] = { ...mode, "display:order": index * 10 };
    });
    
    updateFileContent(JSON.stringify(modes, null, 2));
}
```

--------------------------------

### Set filterOutNowsh Atom

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/fe-conn-arch.md

Filter connections based on WSH requirements using the filterOutNowsh atom. Set to true to filter out connections without WSH, false to allow all.

```typescript
// Filter connections without WSH (file ops, etc.)
filterOutNowsh = atom(true)

// Allow all connections (basic shell)
filterOutNowsh = atom(false)
```

--------------------------------

### FocusManager Class Definition

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/waveai-focus-updates.md

Defines the structure and new methods for the FocusManager class, including selection-aware focus checking and focus transition methods. Note that `requestNodeFocus()` is intentionally not defensive to ensure focus is taken when explicitly requested.

```typescript
class FocusManager {
  // Existing
  focusType: PrimitiveAtom<"node" | "waveai">;  // Single source of truth
  blockFocusAtom: Atom<string | null>;

  // NEW: Selection-aware focus checking
  waveAIFocusWithin(): boolean;
  nodeFocusWithin(): boolean;

  // NEW: Focus transitions (INTENTIONALLY not defensive)
  requestNodeFocus(): void; // from Wave AI → node (BREAKS selections - that's the point!)
  requestWaveAIFocus(): void; // from node → Wave AI

  // NEW: Get current focus type
  getFocusType(): FocusStrType;

  // ENHANCED: Smart refocus based on focusType
  refocusNode(): void; // already handles both types
}
```

--------------------------------

### Function Call Arguments Delta Event

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/openai-streaming.md

Emitted for streaming function call arguments. Includes the item ID, output index, and the argument delta.

```json
{
  "type": "response.function_call_arguments.delta",
  "item_id": "call_abc123",
  "output_index": 1,
  "delta": "\"location\": \"San"
}
```

--------------------------------

### Chat Message Interface for UI

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/waveai-architecture.md

Defines the structure for chat messages displayed in the user interface, including an ID, sender role, and text content.

```typescript
interface ChatMessageType {
    id: string;
    user: string;        // "user" | "assistant" | "error"
    text: string;
    isUpdating?: boolean;
}
```

--------------------------------

### Text Content Block

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/openai-request.md

A content block for text within a message. Use this for standard textual input.

```json
{
  "type": "input_text",
  "text": "message content here"
}
```

--------------------------------

### Function Call Content Block (in Assistant Messages)

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/openai-request.md

Represents a function call embedded within an assistant's message. Includes call ID, function name, and arguments.

```json
{
  "type": "function_call",
  "call_id": "call_abc123",
  "name": "search_files",
  "arguments": {"query": "test"}
}
```

--------------------------------

### Relevant TypeScript Types for Waveterm Views

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/view-prompt.md

Defines the core TypeScript types used for creating ViewModels and ViewComponents in Waveterm, including interfaces for various header elements and icon buttons.

```typescript
type ViewComponentProps<T extends ViewModel> = {
  blockId: string;
  blockRef: React.RefObject<HTMLDivElement>;
  contentRef: React.RefObject<HTMLDivElement>;
  model: T;
};

type ViewComponent = React.FC<ViewComponentProps<any>>;

interface ViewModel {
  viewType: string;
  viewIcon?: jotai.Atom<string | IconButtonDecl>;
  viewName?: jotai.Atom<string>;
  viewText?: jotai.Atom<string | HeaderElem[]>;
  preIconButton?: jotai.Atom<IconButtonDecl>;
  endIconButtons?: jotai.Atom<IconButtonDecl[]>;
  blockBg?: jotai.Atom<MetaType>;
  manageConnection?: jotai.Atom<boolean>;
  noPadding?: jotai.Atom<boolean>;
  searchAtoms?: SearchAtoms;
  viewComponent: ViewComponent;
  dispose?: () => void;
  giveFocus?: () => boolean;
  keyDownHandler?: (e: WaveKeyboardEvent) => boolean;
}

interface IconButtonDecl {
  elemtype: "iconbutton";
  icon: string | React.ReactNode;
  click?: (e: React.MouseEvent<any>) => void;
}
type HeaderElem =
  | IconButtonDecl
  | ToggleIconButtonDecl
  | HeaderText
  | HeaderInput
  | HeaderDiv
  | HeaderTextButton
  | ConnectionButton
  | MenuButton;

type IconButtonCommon = {
  icon: string | React.ReactNode;
  iconColor?: string;
  iconSpin?: boolean;
  className?: string;
  title?: string;
  disabled?: boolean;
  noAction?: boolean;
};

type IconButtonDecl = IconButtonCommon & {
  elemtype: "iconbutton";
  click?: (e: React.MouseEvent<any>) => void;
  longClick?: (e: React.MouseEvent<any>) => void;
};

type ToggleIconButtonDecl = IconButtonCommon & {
  elemtype: "toggleiconbutton";
  active: jotai.WritableAtom<boolean, [boolean], void>;
};

type HeaderTextButton = {
  elemtype: "textbutton";
  text: string;
  className?: string;
  title?: string;
  onClick?: (e: React.MouseEvent<any>) => void;
};

type HeaderText = {
  elemtype: "text";
  text: string;
  ref?: React.RefObject<HTMLDivElement>;
  className?: string;
  noGrow?: boolean;
  onClick?: (e: React.MouseEvent<any>) => void;
};

type HeaderInput = {
  elemtype: "input";
  value: string;
  className?: string;
  isDisabled?: boolean;
  ref?: React.RefObject<HTMLInputElement>;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
};

type HeaderDiv = {
  elemtype: "div";
  className?: string;
  children: HeaderElem[];
  onMouseOver?: (e: React.MouseEvent<any>) => void;
  onMouseOut?: (e: React.MouseEvent<any>) => void;
  onClick?: (e: React.MouseEvent<any>) => void;
};

type ConnectionButton = {
  elemtype: "connectionbutton";
  icon: string;
  text: string;
  iconColor: string;
  onClick?: (e: React.MouseEvent<any>) => void;
  connected: boolean;
};

type MenuItem = {
  label: string;
  icon?: string | React.ReactNode;
  subItems?: MenuItem[];
  onClick?: (e: React.MouseEvent<any>) => void;
};

type MenuButtonProps = {
  items: MenuItem[];
  className?: string;
  text: string;
  title?: string;
  menuPlacement?: Placement;
};

type MenuButton = {
  elemtype: "menubutton";
} & MenuButtonProps;

```

--------------------------------

### Regenerate Types Command

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/config-system.md

Shell command to regenerate type definitions, typically used after modifying configuration structs or metadata definitions.

```bash
task generate

```

--------------------------------

### Disable WSH for a Connection in connections.json

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/connections.mdx

Manually disable the WSH (Wave Shell) feature for a specific connection by setting `conn:enablewsh` to `false` in `connections.json`. This can also be done automatically when initially disabling WSH in the GUI.

```json
{
    <... other connections go here ...>,
    "root@wshless" : {
        "conn:enablewsh": false,
    },
    <... other connections go here ...>
}
```

--------------------------------

### Handle Block Controller Status Updates

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/blockcontroller-lifecycle.md

Processes incoming status updates for a block controller. It updates the global store only if the new status is a newer version than the currently stored one, preventing issues with out-of-order events.

```typescript
handler: (event) => {
    let bcRTS: BlockControllerRuntimeStatus = event.data;
    this.updateShellProcStatus(bcRTS);
}
```

```typescript
updateShellProcStatus(fullStatus: BlockControllerRuntimeStatus) {
    if (fullStatus == null) return;
    const curStatus = globalStore.get(this.shellProcFullStatus);
    // Only update if newer version
    if (curStatus == null || curStatus.version < fullStatus.version) {
        globalStore.set(this.shellProcFullStatus, fullStatus);
    }
}
```

--------------------------------

### LayoutNode Interface Definition

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/layout.md

Defines the structure of a node within the layout tree. Leaf nodes contain 'data', while container nodes have 'children'. All nodes specify a 'flexDirection' and 'size' for layout.

```typescript
interface LayoutNode {
    id: string;
    data?: TabLayoutData;
    children?: LayoutNode[];
    flexDirection: FlexDirection;
    size: number;
}
```

--------------------------------

### Hide a Connection in connections.json

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/connections.mdx

Use `display:hidden` to prevent a connection from appearing in the dropdown menu. This is useful for connections defined in `~/.ssh/config` that are not meant for direct remote access.

```json
{
    <... other connections go here ...>,
    "git@github.com" : {
        "display:hidden": true
    },
    <... other connections go here ...>
}
```

--------------------------------

### Send Silent Notification

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

Creates a desktop notification with a specified message, disabling the notification sound.

```sh
# Silent notification
wsh notify -s "Background task completed"
```

--------------------------------

### Set Persistent Variables with wsh

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

The `wsh setvar` command sets persistent variables at different scopes (block, tab, workspace, or client-wide). Variables can be removed using the `-r` flag.

```APIDOC
## wsh setvar

### Description
Set one or more variables. By default, variables are set at the client (global) level. Use `-l` for block-local variables.

### Usage
```sh
wsh setvar [flags] KEY=VALUE...
```

### Examples
```sh
# Set a single variable
wsh setvar API_KEY=abc123

# Set multiple variables at once
wsh setvar HOST=localhost PORT=8080 DEBUG=true

# Set a block-local variable
wsh setvar -l BLOCK_SPECIFIC=value

# Remove variables
wsh setvar -r API_KEY PORT
```

### Flags
- `-l, --local`: Set variables local to the current block.
- `-r, --remove`: Remove the specified variables instead of setting them.
- `--varfile string`: Use a different variable file (default "var").
- `-b [blockid]`: Used to set a specific zone (block, tab, workspace, client, or UUID).
```

--------------------------------

### Compute Connection Color Number

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/fe-conn-arch.md

Calculates the color index for a connection based on its active connection number, cycling through a predefined number of colors.

```typescript
function computeConnColorNum(connStatus: ConnStatus): number {
    const connColorNum = (connStatus?.activeconnnum ?? 1) % NumActiveConnColors
    return connColorNum == 0 ? NumActiveConnColors : connColorNum
}
```

--------------------------------

### SetMetaCommand RPC Interface

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/fe-conn-arch.md

RPC command to update block metadata, including changing the block's connection. Triggers the backend to switch the connection context.

```typescript
SetMetaCommand(
    client: RpcClient,
    data: {
        oref: string,           // WaveObject reference
        meta: MetaType          // Metadata updates
    }
): Promise<void>
```

--------------------------------

### Error Output Value Type

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/openai-request.md

Represents an error output from a tool execution. The output is a JSON-encoded string containing 'ok' and 'error' fields.

```json
{
  "type": "function_call_output",
  "call_id": "call_abc123",
  "output": "{\"ok\":\"false\",\"error\":\"File not found\"}"
}
```

--------------------------------

### Wave AI Selection Check

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/waveai-focus-updates.md

Determines if there is an active, non-collapsed text selection within the Wave AI panel. This is crucial for differentiating between focus and active selection states.

```typescript
// Check if there's an active selection in Wave AI
export function waveAIHasSelection(): boolean {
  const sel = document.getSelection();
  if (!sel || sel.rangeCount === 0 || sel.isCollapsed) {
    return false;
  }

  let anchor = sel.anchorNode;
  if (anchor instanceof Text) {
    anchor = anchor.parentElement;
  }
  if (anchor instanceof HTMLElement) {
    return findWaveAIPanel(anchor) != null;
  }

  return false;
}
```

--------------------------------

### Visual Focus Update Handler

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/focus.md

Updates the layout state when a child element gains focus. This handler is attached via `onFocusCapture` to ensure immediate visual feedback.

```typescript
const handleChildFocus = useCallback(
    (event: React.FocusEvent<HTMLDivElement, Element>) => {
        if (!isFocused) {
            nodeModel.focusNode();  // Updates layout state immediately
        }
    },
    [isFocused]
);
```

--------------------------------

### secret set

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

Store a secret value securely.

```APIDOC
## wsh secret set

### Description
Store a secret value securely. This command requires an appropriate system secret manager to be available and will fail if only basic text storage is available.

### Usage
```sh
wsh secret set [name]=[value]
```

### Examples
```sh
# Set an API token
wsh secret set github_token=ghp_abc123xyz

# Set a database password
wsh secret set db_password=mySecurePassword123
```

:::warning
The `set` command requires a proper system secret manager (Keychain, Secret Service, or Credential Manager). It will not work with basic text storage for security reasons.
:::
```

--------------------------------

### ViewComponent Props Definition

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/newview.md

Defines the properties passed to the React ViewComponent, including block identifiers, references, and the ViewModel instance.

```typescript
type ViewComponentProps<T extends ViewModel> = {
    blockId: string;                              // Unique ID for this block
    blockRef: React.RefObject<HTMLDivElement>;    // Ref to block container
    contentRef: React.RefObject<HTMLDivElement>;  // Ref to content area
    model: T;                                      // Your ViewModel instance
};

```

--------------------------------

### Server-Sent Event: Stream Termination

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/aisdk-streaming.md

The stream concludes with this special Server-Sent Event marker. Clients should listen for this literal string to know when the entire stream has been transmitted.

```text
data: [DONE]

```

--------------------------------

### Set Stored Secret Value

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

Securely store a secret value. Requires a system secret manager (Keychain, Secret Service, or Credential Manager).

```sh
wsh secret set github_token=ghp_abc123xyz
```

```sh
wsh secret set db_password=mySecurePassword123
```

--------------------------------

### Generate Unique Mode Key

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/aimodesconfig.md

Generates a unique key for AI modes, prioritizing a semantic key (provider@model) and appending a random suffix if a collision occurs. Handles sanitization of the model name for consistent key generation.

```typescript
function generateModeKey(provider: string, model: string): string {
    // Try semantic key first: provider@model-sanitized
    const sanitized = model.toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
    const semanticKey = `${provider}@${sanitized}`;
    
    // Check for collision, if exists append random suffix
    if (existingModes[semanticKey]) {
        const randomId = crypto.randomUUID().slice(-6);
        return `${provider}@${sanitized}-${randomId}`;
    }
    return semanticKey;
}
// Examples: openai@gpt-4o, openrouter@claude-3-5-sonnet, azure@custom-fb4a2c
```

--------------------------------

### Response Structure

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/anthropic-messages-api.md

Details the structure of a typical response from the Anthropic Messages API, including various content block types and metadata.

```APIDOC
## Response Structure

### Description
This outlines the structure of the response from the Anthropic Messages API, detailing the different types of content blocks and metadata returned.

### Content
An array of content blocks. Each block has a `type` property that determines its schema. Supported types include:
- `text`
- `tool_use`
- `server_tool_use`
- `code_execution_tool_result`
- `web_search_tool_result`
- `thinking`
- `redacted_thinking`
- `mcp_tool_use`
- `mcp_tool_result`
- `container_upload`

### Model
The model that processed the request. Example: `claude-sonnet-4-20250514`.

### Stop Reason
The reason the model stopped generating output. Possible values include:
- `end_turn`: Natural stopping point.
- `max_tokens`: Exceeded `max_tokens` limit.
- `stop_sequence`: A custom stop sequence was generated.
- `tool_use`: The model invoked one or more tools.
- `pause_turn`: The turn was paused for long-running operations.
- `refusal`: Streaming classifiers intervened due to policy violations.

In non-streaming mode, this is always non-null. In streaming mode, it's null for `message_start` events and non-null otherwise.

### Stop Sequence
If a custom stop sequence was generated, its value is provided here. Otherwise, it is `null`.

### Usage
Information about billing and rate-limit usage, based on token counts.
```

--------------------------------

### Message Object

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/anthropic-messages-api.md

Represents a message exchanged with the Anthropic API. It includes content, metadata, and usage information.

```APIDOC
## Message Object

### Description
Represents a message object returned by the API. This object contains the content of the message, sender's role, model used, and token usage statistics.

### Properties
- **content** (array) - The content of the message, typically an array of text blocks.
- **id** (string) - Unique identifier for the message.
- **model** (string) - The model that generated this message.
- **role** (string) - The role of the sender ('assistant' or 'user').
- **stop_reason** (string) - The reason the model stopped generating text.
- **stop_sequence** (string | null) - The specific stop sequence that was triggered, if any.
- **type** (string) - The type of the object, always 'message'.
- **usage** (object) - An object detailing token usage for the request.
  - **input_tokens** (integer) - The number of input tokens used.
  - **output_tokens** (integer) - The number of output tokens generated.
- **container** (object | null) - Information about the container used, if applicable (e.g., for tool use).

### Example
```json
{
  "content": [
    {
      "text": "Hi! My name is Claude.",
      "type": "text"
    }
  ],
  "id": "msg_013Zva2CMHLNnXjNJJKqJ2EF",
  "model": "claude-sonnet-4-20250514",
  "role": "assistant",
  "stop_reason": "end_turn",
  "stop_sequence": null,
  "type": "message",
  "usage": {
    "input_tokens": 2095,
    "output_tokens": 503
  },
  "container": null
}
```
```

--------------------------------

### getConnStatusAtom Function to Retrieve Connection Status

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/fe-conn-arch.md

Retrieves or creates a status atom for a given connection name. It returns a cached atom if it exists, otherwise, it creates a new one initialized to a default state. This is used by view models to track their associated connection.

```typescript
function getConnStatusAtom(connName: string): PrimitiveAtom<ConnStatus>
```

--------------------------------

### Set or clear badge indicator with badge

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

The `wsh badge` command adds or removes a visual indicator on a block or tab header. It supports custom icons, colors, priorities, and can be linked to a process ID for automatic clearing.

```bash
wsh badge [icon]
```

```bash
wsh badge --clear
```

```bash
wsh badge
```

```bash
wsh badge circle-check --color green
```

```bash
wsh badge triangle-exclamation --color red --priority 20 -b 2
```

```bash
wsh badge --pid 12345
```

```bash
wsh badge circle-check --beep
```

```bash
wsh badge --clear
```

--------------------------------

### Subscribe to Connection Status Events

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/fe-conn-arch.md

Subscribes to connection status events ('connstatus'). The handler updates a frontend atom with the connection status, automatically re-rendering subscribed components.

```typescript
waveEventSubscribe({
    eventType: "connstatus",
    handler: (event) => {
        const status: ConnStatus = event.data
        updateConnStatusAtom(status.connection, status)
    }
})
```

--------------------------------

### Add focus manager calls to treeReducer

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/waveai-focus-updates.md

Integrate calls to the focus manager within the treeReducer in layoutModel.ts for various layout actions. This ensures that the focus manager is updated whenever the layout programmatically changes focus, maintaining system consistency.

```typescript
case LayoutTreeActionType.FocusNode:
  focusNode(this.treeState, action);
  focusManager.requestNodeFocus();  // ← NEW
  break;

case LayoutTreeActionType.InsertNode:
  insertNode(this.treeState, action);
  if ((action as LayoutTreeInsertNodeAction).focused) {
    focusManager.requestNodeFocus();  // ← NEW
  }
  break;

case LayoutTreeActionType.MagnifyNodeToggle:
  magnifyNodeToggle(this.treeState, action);
  focusManager.requestNodeFocus();  // ← NEW
  break;
```

--------------------------------

### API Error Schema

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/anthropic-messages-api.md

Defines the structure for API errors, including a message and a type.

```APIDOC
## APIError

### Description
Represents a generic API error.

### Properties
- **message** (string) - Required - A human-readable description of the error.
- **type** (string) - Required - The type of error, must be 'api_error'.
```

--------------------------------

### Error Part SSE Format

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/aisdk-streaming.md

Error parts are appended to the message as they are received. This is a Server-Sent Event with a JSON object payload.

```text
data: {"type":"error","errorText":"error message"}

```

--------------------------------

### Billing Error Schema

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/anthropic-messages-api.md

Defines the structure for billing errors, including a message and a type.

```APIDOC
## BillingError

### Description
Represents an error related to billing.

### Properties
- **message** (string) - Required - A human-readable description of the billing error.
- **type** (string) - Required - The type of error, must be 'billing_error'.
```

--------------------------------

### Set Tree State Atom (Jotai)

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/layout-simplification.md

This method updates the Jotai atom for tree state. It can optionally bump the generation count to trigger updates. Note that it sets the same object reference, relying on the generation count for Jotai's change detection.

```typescript
setTreeStateAtom(bumpGeneration = false) {
    if (bumpGeneration) {
        this.treeState.generation++;
    }
    this.lastTreeStateGeneration = this.treeState.generation;
    this.setter(this.treeStateAtom, this.treeState);  // ← Sets same object!
}
```

--------------------------------

### Wave AI Focus Within Check

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/waveai-focus-updates.md

Checks if the currently active element or the selection anchor is within the Wave AI panel. This function helps determine if Wave AI currently has focus or a selection.

```typescript
// Check if Wave AI panel has focus or selection (like focusedBlockId())
export function waveAIHasFocusWithin(): boolean {
  // Check if activeElement is within Wave AI panel
  const focused = document.activeElement;
  if (focused instanceof HTMLElement) {
    const waveAIPanel = findWaveAIPanel(focused);
    if (waveAIPanel) return true;
  }

  // Check if selection is within Wave AI panel
  const sel = document.getSelection();
  if (sel && sel.anchorNode && sel.rangeCount > 0 && !sel.isCollapsed) {
    let anchor = sel.anchorNode;
    if (anchor instanceof Text) {
      anchor = anchor.parentElement;
    }
    if (anchor instanceof HTMLElement) {
      const waveAIPanel = findWaveAIPanel(anchor);
      if (waveAIPanel) return true;
    }
  }

  return false;
}
```

--------------------------------

### PDF File Content Block

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/openai-request.md

A content block for PDF files within a message. The file content is base64-encoded.

```json
{
  "type": "input_file",
  "file_data": "JVBERi0xLjQKJeLjz9M...",
  "filename": "document.pdf"
}
```

--------------------------------

### Error Event

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/openai-streaming.md

Emitted when an error occurs during the response process. Includes error code, message, and optional parameters.

```json
{
  "type": "error",
  "code": "rate_limit_exceeded",
  "message": "Rate limit exceeded. Please try again later.",
  "param": null,
  "sequence_number": 5
}
```

--------------------------------

### Derived Atom Accessing Nested Fields

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/layout-simplification.md

Demonstrates how a derived atom can access nested fields within the state object. This works because Jotai's reactivity is triggered by the reference change of the main state object, not deep equality checks.

```typescript
// Hypothetical derived atom
someAtom: atom((get) => {
    const treeState = get(this.localTreeStateAtom);
    return treeState.rootNode.children.length;  // Nested access
})
```

--------------------------------

### DataUIPart Type Definition

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/aisdk-uimessage-type.md

Defines a data part for custom data types within a UIMessage. The type is determined by the name of the data part, allowing for structured, custom data components.

```typescript
type DataUIPart<DATA_TYPES extends UIDataTypes> = ValueOf<{
  [NAME in keyof DATA_TYPES & string]: {
    type: `data-${NAME}`;
    id?: string;
    data: DATA_TYPES[NAME];
  };
}>;
```

--------------------------------

### Disable WSH for Connection

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/fe-conn-arch.md

Updates the connection configuration to disable the WebSocket Secure (WSH) protocol for a specific host. Useful for troubleshooting WSH-related errors.

```typescript
// Disable WSH for this connection
const handleDisableWsh = async () => {
    await RpcApi.SetConnectionsConfigCommand(TabRpcClient, {
        host: connName,
        metamaptype: { "conn:wshenabled": false }
    })
}
```

--------------------------------

### UIMessage Interface Definition

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/aisdk-uimessage-type.md

The core UIMessage interface defines the structure for messages, including ID, role, optional metadata, and an array of message parts. It uses generic types for customization.

```typescript
interface UIMessage<METADATA = unknown, DATA_PARTS extends UIDataTypes = UIDataTypes, TOOLS extends UITools = UITools> {
  /**
   * A unique identifier for the message.
   */
  id: string;

  /**
   * The role of the message.
   */
  role: "system" | "user" | "assistant";

  /**
   * The metadata of the message.
   */
  metadata?: METADATA;

  /**
   * The parts of the message. Use this for rendering the message in the UI.
   */
  parts: Array<UIMessagePart<DATA_PARTS, TOOLS>>;
}
```

--------------------------------

### Parse AI Modes JSON

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/aimodesconfig.md

Parses a JSON string into an object of AI mode configurations. Returns null if the JSON is invalid, which can be used to display an error.

```typescript
function parseAIModes(jsonString: string): Record<string, AIModeConfigType> | null {
    try {
        return JSON.parse(jsonString);
    } catch {
        return null; // Show "invalid JSON" error
    }
}
```

--------------------------------

### Delete Block

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

Deletes the block with the specified id.

```APIDOC
## deleteblock

```sh
wsh deleteblock -b [blockid]
```

This will delete the block with the specified id.
```

--------------------------------

### Disconnect Connection

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

Completely disconnects the specified connection (SSH or WSL). This action affects all blocks using the connection.

```APIDOC
## disconnect

### Description
This command completely disconnects the specified connection. This will apply to all blocks where the connection is being used.

### Usage

For ssh connections:
```sh
wsh conn disconnect [user@host]
```

For wsl connections:
```sh
wsh conn disconnect [wsl://<distribution name>]
```
```

--------------------------------

### Disconnect Connection

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

Completely disconnects the specified SSH or WSL connection. This action affects all blocks using this connection.

```sh
wsh conn disconnect [user@host]
```

```sh
wsh conn disconnect [wsl://<distribution name>]
```

--------------------------------

### Unsubscribe from WPS Events

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/wps-events.md

Use `wps.Broker.Unsubscribe` to stop receiving events for a specific event type.

```go
wps.Broker.Unsubscribe(routeId, wps.Event_YourNewEvent)
```

--------------------------------

### Check for Focused Element or Selection

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/focus.md

Determines if a block has DOM focus or a text selection. It checks the active element and the document's selection to identify the focused block.

```typescript
export function focusedBlockId(): string {
    const focused = document.activeElement;
    if (focused instanceof HTMLElement) {
        const blockId = findBlockId(focused);
        if (blockId) {
            return blockId;
        }
    }
    const sel = document.getSelection();
    if (sel && sel.anchorNode && sel.rangeCount > 0 && !sel.isCollapsed) {
        let anchor = sel.anchorNode;
        if (anchor instanceof Text) {
            anchor = anchor.parentElement;
        }
        if (anchor instanceof HTMLElement) {
            const blockId = findBlockId(anchor);
            if (blockId) {
                return blockId;
            }
        }
    }
    return null;
}
```

--------------------------------

### Handle Connection Changes for Controller Resync

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/blockcontroller-lifecycle.md

Resyncs the controller when connection status or name changes. This effect hook in the `TermResyncHandler` component ensures the controller is updated based on network connectivity.

```typescript
// In term.tsx - TermResyncHandler component
React.useEffect(() => {
    const isConnected = connStatus?.status == "connected";
    const wasConnected = lastConnStatus?.status == "connected";
    if (isConnected == wasConnected && curConnName == lastConnName) {
        return;  // No change
    }
    model.termRef.current?.resyncController("resync handler");
    setLastConnStatus(connStatus);
}, [connStatus]);
```

--------------------------------

### Drop Direction Enum

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/layout.md

Defines the possible directions for dropping a node during drag-and-drop operations. Includes inner, outer, and center drop zones for precise node placement.

```typescript
enum DropDirection {
    Top = 0, Right = 1, Bottom = 2, Left = 3,
    OuterTop = 4, OuterRight = 5, OuterBottom = 6, OuterLeft = 7,
    Center = 8
}
```

--------------------------------

### Error Response

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/anthropic-messages-api.md

Structure for error responses from the Anthropic API, detailing the type and message of the error.

```APIDOC
## Error Response

### Description
Represents an error returned by the API. This object includes a nested 'error' object with details about the specific error encountered.

### Properties
- **error** (object) - Contains details about the error.
  - **message** (string) - A human-readable description of the error.
  - **type** (string) - The type of error (e.g., 'invalid_request_error', 'authentication_error').
- **type** (string) - The type of the response object, always 'error'.

### Example
```json
{
  "error": {
    "message": "Invalid request",
    "type": "invalid_request_error"
  },
  "type": "error"
}
```
```

--------------------------------

### Server-Sent Event: Finish Message

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/aisdk-streaming.md

This Server-Sent Event signals the completion of a message in the streaming response. It's part of the standard SSE format for indicating the end of a message payload.

```text
data: {"type":"finish"}

```

--------------------------------

### Updated Derived Atom: isFocused with Local State

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/layout-simplification.md

This version of the `isFocused` derived atom subscribes to `localTreeStateAtom` instead of `treeStateAtom`, ensuring it reacts to changes in the localized state.

```typescript
isFocused: atom((get) => {
    const treeState = get(this.localTreeStateAtom);  // Subscribe to localTreeStateAtom
    const isFocused = treeState.focusedNodeId === nodeid;
    const waveAIFocused = get(atoms.waveAIFocusedAtom);
    return isFocused && !waveAIFocused;
}),
```

--------------------------------

### ConnDisconnectCommand RPC Interface

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/fe-conn-arch.md

RPC command to disconnect an active connection. Used by the connection modal to close all shells and processes on that connection.

```typescript
ConnDisconnectCommand(client: RpcClient,
    connName: string
): Promise<void>
```

--------------------------------

### Clear Badge on Tab

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

Clears the badge on a specific tab using its identifier.

```sh
wsh badge --clear -b tab
```

--------------------------------

### Derived isFocused Atom Recalculation

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/focus-layout.md

A derived Jotai atom that recalculates based on `localTreeStateAtom`. It returns true only if the node's ID matches the focused node ID and Wave AI is not focused.

```typescript
isFocused: atom((get) => {
    const treeState = get(this.localTreeStateAtom);
    const isFocused = treeState.focusedNodeId === nodeid;
    const waveAIFocused = get(atoms.waveAIFocusedAtom);
    return isFocused && !waveAIFocused;
})
```

--------------------------------

### Derived Atom: isFocused Calculation

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/layout-simplification.md

This derived Jotai atom calculates whether a node is focused. It subscribes to the `treeStateAtom` and checks the `focusedNodeId` against the current node's ID, also considering `waveAIFocusedAtom`.

```typescript
isFocused: atom((get) => {
    const treeState = get(this.treeStateAtom);  // Subscribe to treeStateAtom
    const isFocused = treeState.focusedNodeId === nodeid;
    const waveAIFocused = get(atoms.waveAIFocusedAtom);
    return isFocused && !waveAIFocused;
}),
```

--------------------------------

### Image Content Block

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/openai-request.md

A content block for image data within a message. Supports data URLs or web URLs. The 'filename' field is removed during cleaning.

```json
{
  "type": "input_image",
  "image_url": "data:image/png;base64,..."
}
```

--------------------------------

### secret delete

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

Remove a secret from secure storage.

```APIDOC
## wsh secret delete

### Description
Remove a secret from secure storage.

### Usage
```sh
wsh secret delete [name]
```

### Examples
```sh
# Delete an API key
wsh secret delete github_token

# Delete multiple secrets
wsh secret delete old_api_key
wsh secret delete temp_token
```
```

--------------------------------

### Delete Block by ID

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

Deletes a specific terminal block using its unique identifier.

```sh
wsh deleteblock -b [blockid]
```

--------------------------------

### Handle Anthropic Streaming Message Stop

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/anthropic-streaming.md

Recognize the 'message_stop' event to determine the end of a streamed message from the Anthropic API. This event signifies that no further deltas will be sent for the current message.

```json
event: message_stop
data: {"type":"message_stop"}

```

--------------------------------

### Derived Atom: isMagnified Calculation

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/layout-simplification.md

This derived Jotai atom determines if a node is magnified. It subscribes to the `treeStateAtom` and checks if the `magnifiedNodeId` matches the current node's ID.

```typescript
isMagnified: atom((get) => {
    const treeState = get(this.treeStateAtom);  // Subscribe to treeStateAtom
    return treeState.magnifiedNodeId === nodeid;
}),
```

--------------------------------

### Remove Generation Tracking Field

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/layout-simplification.md

Removes the `generation` field from the `LayoutTreeState` interface, simplifying state management.

```typescript
// frontend/layout/lib/types.ts

export interface LayoutTreeState {
  rootNode?: LayoutNode;
  focusedNodeId?: string;
  magnifiedNodeId?: string;
  leafOrder?: LayoutLeafEntry[];
  pendingBackendActions?: LayoutActionData[];
  // generation: number;  ← DELETE THIS
}
```

--------------------------------

### Handle Anthropic Streaming Message Delta

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/anthropic-streaming.md

Process incoming 'message_delta' events from the Anthropic API stream. This event contains partial updates to the message, including stop reasons and usage statistics, particularly for tool use.

```json
data: {"type":"message_delta","delta":{"stop_reason":"end_turn","stop_sequence":null},"usage":{"input_tokens":10682,"cache_creation_input_tokens":0,"cache_read_input_tokens":0,"output_tokens":510,"server_tool_use":{"web_search_requests":1}}}

```

--------------------------------

### Subscribing to isFocused Atom in React

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/focus-layout.md

React component subscribes to the `isFocused` atom using `useAtomValue`. This triggers immediate CSS class updates for the visual focus ring.

```typescript
const isFocused = useAtomValue(nodeModel.isFocused);
```

--------------------------------

### Update isFocused atom to use focus manager

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/waveai-focus-updates.md

Modify the isFocused atom in layoutModel.ts to derive its state from the focus manager's focusType. This change ensures that the isFocused state accurately reflects whether a node is focused via the node-specific focus type.

```typescript
isFocused: atom((get) => {
  const treeState = get(this.localTreeStateAtom);
  const isFocused = treeState.focusedNodeId === nodeid;
  const focusType = get(focusManager.focusType); // ← Use focus manager
  return isFocused && focusType === "node";
});
```

--------------------------------

### Delete Stored Secret

Source: https://github.com/wavetermdev/waveterm/blob/main/docs/docs/wsh-reference.mdx

Remove a secret from secure storage by its name. Can be used to delete single or multiple secrets.

```sh
wsh secret delete github_token
```

```sh
wsh secret delete old_api_key
```

```sh
wsh secret delete temp_token
```

--------------------------------

### Mutating Focused Node ID in Layout Operations

Source: https://github.com/wavetermdev/waveterm/blob/main/aiprompts/focus-layout.md

Directly mutates `layoutState.focusedNodeId` within layout operations like insertNode. Ensure `action.node.id` is valid before assignment.

```typescript
if (action.magnified) {
    layoutState.magnifiedNodeId = action.node.id;
    layoutState.focusedNodeId = action.node.id;
}
if (action.focused) {
    layoutState.focusedNodeId = action.node.id;
}
```