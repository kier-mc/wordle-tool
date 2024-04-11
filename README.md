# Wordle Tool

A fully accessible/responsive webapp built to WCAG AA standards and designed to assist with finding solutions to the online game [Wordle](https://www.nytimes.com/games/wordle/index.html). Designed to provide varying levels of assistance, depending on how much help you want or require.

Make an initial guess on Wordle (SLATE or CRANE are good starting points) and enter the feedback you receive into the app and press "Find Matches". You can use the filters to narrow the results down further or tailor them to your preferences.

If you aren't familiar with Wordle, letters highlighted with a green background are correct letters in the correct position, letters highlighted with a yellow background are correct letters in an incorrect position and letters highlighted with a grey background are incorrect letters that do not appear at all in the solution.

## Running locally

1. Clone the repo and install the dependencies

```bash
git clone https://github.com/kier-mc/wordle-tool
bun install
```

2. Launch the development server:

```bash
bun run dev
```

## Planned features

1. Additional filters and results sorting
2. Dictionary lookup for word definitions
3. Toggleable light/dark modes
