# Actual Focus.. 🌀

> **The new way of focus and productivity — open source, completely free.**

Actual Focus.. is a progressive Pomodoro and productivity application built with **Svelte 5** and **Tauri v2**. It's born from a simple frustration: the abundance of paywalls for basic productivity tools. This project aims to provide a calm, high-performance sanctuary for deep work, leveraging research-backed focus protocols without the bloat.

## 🌿 Philosophy

- **Non profit**: Built for the community, not for profit.
- **Calm by Design**: Inspired by the aesthetics of *Fred Again..*, focusing on minimalism and intentionality.
- **Open Source**: Everything is transparent and community-driven.
- **Sovereign**: Your data stays on your machine, always.

## 🚀 Key Features

- **Progressive Pomodoro**: Customizable focus intervals (default 45m protocol).
- **Dynamic Categories**: Organize your sessions with custom tags and icons.
- **Bio-Technical Sanctuary**: A UI designed to reduce cognitive load while providing essential feedback.
- **Native Performance**: Built on Tauri v2 for a lightweight, cross-platform desktop experience.
- **Persistence**: Your settings and session history are saved locally via Rust-powered state management.

## 🛠️ Technical Stack

- **Frontend**: [Svelte 5](https://svelte.dev/) (using modern `$state` and `$derived` runes).
- **Backend/Native**: [Tauri v2](https://v2.tauri.app/) & [Rust](https://www.rust-lang.org/).
- **Styling**: Vanilla CSS with a customized Material 3 Design System.
- **Icons**: [Material Symbols](https://fonts.google.com/icons).

## 📥 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [Rust](https://www.rust-lang.org/tools/install)
- [pnpm](https://pnpm.io/) (recommended)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/nojustbenja/actual-focus..git
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Run in development mode:

   ```bash
   pnpm tauri dev
   ```

## 🏗️ Version 0.0.3 (Current)

- [x] Core Pomodoro Timer Logic.
- [x] Category Management.
- [x] Persistent Storage (Tauri + Rust).
- [x] UI Refinement (Removal of redundant noise).
- [ ] Session History Visualization (Coming soon).


---

Made with ❤️ by [nojustbenja](https://github.com/nojustbenja)

